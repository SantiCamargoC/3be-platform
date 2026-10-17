import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 })
    }

    const { taller_id, storage_path } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Validar usuario
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: 'Usuario no autenticado' }), { status: 401 })
    }

    // Usar service_role para chequear licencia activa
    const adminSupabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const tenantId = user.app_metadata?.tenant_id || user.user_metadata?.tenant_id

    const { data: licencias } = await adminSupabase
      .from('licencias')
      .select('id')
      .eq('taller_id', taller_id)
      .eq('activa', true)
      .or(`user_id.eq.${user.id},tenant_id.eq.${tenantId}`)

    if (!licencias || licencias.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No cuentas con una licencia activa para este taller' }),
        { status: 403 }
      )
    }

    // Generar URL firmada temporal de 1 hora en bucket 'videos'
    const { data: signedUrlData, error: signErr } = await adminSupabase
      .storage
      .from('videos')
      .createSignedUrl(storage_path, 3600)

    if (signErr) {
      return new Response(JSON.stringify({ error: signErr.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ url: signedUrlData.signedUrl }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})

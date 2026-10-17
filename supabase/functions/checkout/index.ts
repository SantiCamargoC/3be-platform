import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const { tenant_id, user_id, producto_id, cantidad, monto_cop } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const referencia = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const { data: order, error } = await supabase
      .from('ordenes')
      .insert({
        tenant_id,
        user_id,
        producto_id,
        cantidad: cantidad || 1,
        monto_total_cop: monto_cop,
        estado: 'pendiente',
        referencia_pasarela: referencia,
      })
      .select()
      .single()

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }

    return new Response(
      JSON.stringify({
        order_id: order.id,
        reference: referencia,
        amount: monto_cop,
        currency: 'COP',
      }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})

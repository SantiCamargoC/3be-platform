import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { tenantId, periodo } = await request.json()

    if (!tenantId) {
      return NextResponse.json({ error: 'tenantId requerido' }, { status: 400 })
    }

    const supabase = await createClient()

    // Llamada a la función RPC segura en base de datos
    const { data, error } = await supabase.rpc('get_indicadores_agregados', {
      p_tenant_id: tenantId,
      p_periodo: periodo || undefined,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json(
      { error: 'Error procesando solicitud RPC' },
      { status: 500 }
    )
  }
}

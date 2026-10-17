import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    // 1. Simulación o verificación de firma de webhook de pasarela (Wompi / PayU)
    // En producción se valida el checksum SHA256 con el secret de la pasarela
    const signature = request.headers.get('x-signature') || 'test-signature'

    if (!data || !data.transaction) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 })
    }

    const transaction = data.transaction
    const reference = transaction.reference
    const status = transaction.status // 'APPROVED', 'DECLINED', etc.

    if (status === 'APPROVED') {
      const supabase = await createClient()

      // Actualizar estado de orden
      const { data: order } = await supabase
        .from('ordenes')
        .update({ estado: 'pagada' })
        .eq('referencia_pasarela', reference)
        .select()
        .single()

      if (order) {
        // Registrar pago
        await supabase.from('pagos').insert({
          orden_id: order.id,
          pasarela: 'wompi',
          transaccion_id: transaction.id,
          monto_cop: order.monto_total_cop,
          estado: 'aprobado',
          respuesta_raw: body,
        })

        // Activar licencias automáticamente
        await supabase.from('licencias').insert({
          tenant_id: order.tenant_id,
          user_id: order.user_id,
          taller_id: order.producto_id, // o taller asociado
          cantidad: order.cantidad || 1,
          usadas: 0,
          origen: 'compra',
          orden_id: order.id,
          activa: true,
        })
      }
    }

    return NextResponse.json({ received: true, status: 'processed' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error procesando webhook de pasarela' },
      { status: 500 }
    )
  }
}

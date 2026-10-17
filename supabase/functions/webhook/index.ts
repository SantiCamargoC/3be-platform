import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const payload = await req.json()
    const { data } = payload

    if (!data?.transaction) {
      return new Response(JSON.stringify({ error: 'Payload inválido' }), { status: 400 })
    }

    const { reference, status, id: transactionId, amount_in_cents } = data.transaction

    if (status === 'APPROVED') {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      // Actualizar orden
      const { data: order, error: orderErr } = await supabase
        .from('ordenes')
        .update({ estado: 'pagada' })
        .eq('referencia_pasarela', reference)
        .select()
        .single()

      if (order && !orderErr) {
        // Registrar pago
        await supabase.from('pagos').insert({
          orden_id: order.id,
          pasarela: 'wompi',
          transaccion_id: transactionId,
          monto_cop: order.monto_total_cop,
          estado: 'aprobado',
          respuesta_raw: payload,
        })

        // Activar licencias para tenant o usuario B2C
        await supabase.from('licencias').insert({
          tenant_id: order.tenant_id,
          user_id: order.user_id,
          taller_id: order.producto_id,
          cantidad: order.cantidad || 1,
          usadas: 0,
          origen: 'compra',
          orden_id: order.id,
          activa: true,
        })
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})

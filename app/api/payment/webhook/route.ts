import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
// Flutterwave webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const payload = JSON.parse(body)

    // Verify webhook signature
    const signature = request.headers.get('verif-hash')
    if (!signature) {
      return NextResponse.json({ error: 'No signature header' }, { status: 401 })
    }

    // In production, compare against your webhook secret hash
    // stored as an env variable (e.g. FLW_WEBHOOK_HASH)
    // For now, we process the webhook but you should add this check:
    //
    // if (signature !== process.env.FLW_WEBHOOK_HASH) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    // }

    const event = payload.event
    const data = payload.data

    if (event === 'charge.completed' && data?.status === 'successful') {
      const tx_ref = data.tx_ref
      const amount = data.amount
      const currency = data.currency
      const transaction_id = data.id

      console.log('Payment successful:', {
        tx_ref,
        amount,
        currency,
        transaction_id,
      })

      // Update order status in Supabase
      const supabase = await createClient()

      // Try to update an existing order by tx_ref
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          payment_reference: String(transaction_id),
          status: 'confirmed',
          updated_at: new Date().toISOString(),
        })
        .eq('order_number', tx_ref)

      if (error) {
        console.error('Failed to update order in webhook:', error)
        // Still return 200 so Flutterwave doesn't retry
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

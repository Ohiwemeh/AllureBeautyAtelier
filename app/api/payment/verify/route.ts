import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/flutterwave/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('transaction_id')
    const txRef = searchParams.get('tx_ref')

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Missing transaction_id parameter' },
        { status: 400 }
      )
    }

    const verification = await verifyPayment(transactionId)

    if (verification.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment verification failed', details: verification },
        { status: 400 }
      )
    }

    const txData = verification.data
    if (!txData || txData.status !== 'successful') {
      return NextResponse.json(
        {
          error: 'Payment was not successful',
          status: txData?.status || 'unknown',
        },
        { status: 400 }
      )
    }

    // Update the order in Supabase
    const supabase = await createClient()

    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'processing',
        payment_status: 'paid',
        flw_transaction_id: String(txData.id),
        payment_reference: txData.flw_ref || null,
      })
      .eq('flw_tx_ref', txData.tx_ref || txRef)

    if (updateError) {
      console.error('Failed to update order after payment:', updateError)
    }

    return NextResponse.json({
      success: true,
      tx_ref: txData.tx_ref || txRef,
      amount: txData.amount,
      currency: txData.currency,
      transaction_id: txData.id,
      flw_ref: txData.flw_ref,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Verification failed'
    console.error('Payment verify error:', error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

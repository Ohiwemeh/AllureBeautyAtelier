import { NextRequest, NextResponse } from 'next/server'
import { initializePayment } from '@/lib/flutterwave/server'
import { flutterwaveConfig } from '@/lib/flutterwave/config'
import { generateOrderNumber } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      name,
      phone,
      amount,
      currency = 'NGN',
      items,
      subtotal,
      shipping,
      tax,
      shippingAddress,
    } = body

    if (!email || !name || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, amount' },
        { status: 400 }
      )
    }

    const tx_ref = generateOrderNumber()

    const paymentData = await initializePayment({
      tx_ref,
      amount,
      currency,
      customer: {
        email,
        name,
        phone_number: phone,
      },
      customizations: {
        title: 'Allure Beauty Atelier',
        description: `Order ${tx_ref}`,
      },
      redirect_url: `${flutterwaveConfig.appUrl}/orders/confirmation?tx_ref=${tx_ref}`,
      meta: {
        items,
        source: 'allure-beauty-atelier',
      },
    })

    const link = paymentData.data?.link
    if (!link) {
      throw new Error('No payment link returned from Flutterwave. Response: ' + JSON.stringify(paymentData))
    }

    // Get current user from the session-based client
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use service role client to bypass RLS when inserting the order
    const adminSupabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const { data: order, error: orderError } = await adminSupabase
      .from('orders')
      .insert({
        order_number: tx_ref,
        user_id: user?.id || null,
        status: 'pending',
        subtotal: subtotal || amount,
        shipping: shipping || 0,
        tax: tax || 0,
        total: amount,
        currency,
        flw_tx_ref: tx_ref,
        payment_status: 'pending',
        shipping_address: shippingAddress || null,
      })
      .select('id')
      .single()

    if (orderError) {
      // Now we can see the real error — and block if critical
      console.error('Failed to create pending order:', orderError)
      return NextResponse.json(
        { error: 'Could not create order: ' + orderError.message },
        { status: 500 }
      )
    }

    // Insert order items
    if (order && items?.length) {
      const orderItems = items.map((item: { id: string; name: string; qty: number; price: number }) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.qty,
        unit_price: item.price,
        total_price: item.price * item.qty,
      }))

      const { error: itemsError } = await adminSupabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) {
        console.error('Failed to create order items:', itemsError)
        // Non-critical — order exists, items can be re-synced
      }
    }

    return NextResponse.json({ tx_ref, link })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Payment initialization failed'
    console.error('Payment init error:', error)
    return NextResponse.json({ error: message, details: String(error) }, { status: 500 })
  }
}
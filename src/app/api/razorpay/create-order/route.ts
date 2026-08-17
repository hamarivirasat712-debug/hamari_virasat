import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Razorpay will be initialized inside the request handler
// Ensure you have RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env.local

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR', email } = body;

    if (!amount || !email) {
      return NextResponse.json({ error: 'Amount and email are required' }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || '';

    if (!key_id || !key_secret) {
      console.error('Razorpay keys missing:', { key_id: !!key_id, key_secret: !!key_secret });
      return NextResponse.json(
        { error: 'Razorpay API credentials (RAZORPAY_KEY_SECRET) are missing on the server. Please check environment variables.' },
        { status: 500 }
      );
    }

    // Razorpay expects amount in paise (smallest unit)
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        email,
      },
    };

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

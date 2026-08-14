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

    // Razorpay expects amount in paise (smallest unit)
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        email,
      },
    };

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

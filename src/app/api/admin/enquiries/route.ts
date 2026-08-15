import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminSession } from '@/lib/adminAuth';

// GET — fetch all enquiries (admin only)
export async function GET() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — save an enquiry (called from EnquiryForm)
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('enquiries').insert([{
    name: body.name,
    email: body.email,
    phone: body.phone || null,
    interest: body.interest || null,
    message: body.message || null,
    type: body.type || 'enquiry',
  }]).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, id: data.id });
}

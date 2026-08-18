import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminSession } from '@/lib/adminAuth';

// GET — fetch all intake submissions (admin only)
export async function GET() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — save an intake form submission (called from IntakeClient on submit)
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('submissions').insert([{
    customer_email: body.email,
    customer_name: body.name,
    customer_phone: body.phone || null,
    gotra: body.gotra || null,
    kuldevi: body.kuldevi || null,
    kuldevta: body.kuldevta || null,
    selected_ritual_names: body.selectedRitualNames || [],
    ritual_data: body.rituals || [],
    custom_ritual_name: body.customRitualName || null,
  }]).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, id: data.id });
}

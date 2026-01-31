import { apiFetch } from '../../../lib/api';
import { NextResponse } from 'next/server';

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Forward request to backend reset-password endpoint
    // Expected body: { email, otp, newPassword }
    const response = await apiFetch(`${apiUrl}/user/reset-password`, 'POST', body);
    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

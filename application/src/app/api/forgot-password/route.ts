import { apiFetch } from '../../../lib/api';
import { NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Forward request to backend forgot-password endpoint
    const response = await apiFetch(`${apiUrl}/user/forgot-password`, 'POST', body);
    // Assuming backend returns { message: string }
    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

import { dbRegisterNewUser } from '@/db/functions/user';
import { sendUserActionEmail } from '@/email/send';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const creds = registerRequestSchema.parse(json);

    const userId = nanoid();

    await dbRegisterNewUser(userId, creds.email, creds.name, creds.password);
    await sendUserActionEmail({ to: creds.email, action: 'verify-email' });

    return new NextResponse(JSON.stringify({ message: 'Ok' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to register:', error);
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

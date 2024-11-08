import { dbRegisterNewUser, dbSetUserEmailVerified } from '@/db/functions/user';
import { emailSchema, passwordSchema, userNameSchema } from '@/utils/schemas';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerRequestSchema = z.object({
  email: emailSchema,
  name: userNameSchema,
  password: passwordSchema,
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const creds = registerRequestSchema.parse(json);

    const userId = nanoid();

    const user = await dbRegisterNewUser(userId, creds.email, creds.name, creds.password);
    await dbSetUserEmailVerified({ userId: user.id, status: true });

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

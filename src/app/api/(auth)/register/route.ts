import { dbRegisterNewUser } from '@/db/functions/user';
import { sendUserActionEmail } from '@/email/send';
import { emailSchema, passwordSchema, userNameSchema } from '@/utils/schemas';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerRequestSchema = z.object({
  email: emailSchema,
  name: userNameSchema,
  password: passwordSchema,
  isNewsletterSub: z.boolean(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = registerRequestSchema.parse(json);

    const userId = nanoid();

    const user = await dbRegisterNewUser({
      id: userId,
      email: body.email,
      name: body.name,
      plainPassword: body.password,
      isNewsletterSub: body.isNewsletterSub,
    });
    await sendUserActionEmail({ to: user.email, action: 'verify-email' });

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

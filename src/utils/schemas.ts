import { env } from '@/env';
import { z } from 'zod';

import { getPasswordValidator } from './password';

export const nameSchema = z.string().min(1, 'Name is required');
export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = getPasswordValidator(env.NEXT_PUBLIC_passwordValidator);
import { z } from 'zod';

export const emailSchema = z.string().email({ message: 'The email is not valid' });
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
  .regex(/[a-z]/, 'Password must include at least one lowercase letter')
  .regex(/\d/, 'Password must include at least one number')
  .regex(/[@$!%*?&]/, 'Password must include at least one special character');

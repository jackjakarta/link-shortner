import { z } from 'zod';

import { urlSchema } from './schemas';

export type SVGProps = React.ComponentProps<'svg'>;
export type PasswordValidatorLevel = 'weak' | 'medium' | 'strong';
export type Url = z.infer<typeof urlSchema>;

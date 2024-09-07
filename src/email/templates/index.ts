import { dbInsertOrUpdateActionToken } from '@/db/functions/token';
import { type TokenAction } from '@/db/schema';
import { env } from '@/env';

import { InformationEmailMetadata, MailTemplateResponse } from '../types';
import { buildInformationEmailTemplate } from './information-template';
// import { resetPasswordTemplate } from './reset-password';
import { verifyMailTemplate } from './verify-email';

export function buildActionUrl(searchParams: URLSearchParams) {
  return `${env.NEXT_PUBLIC_baseUrl}/user-action?${searchParams.toString()}`;
}

export async function createUserActionMailTemplate(
  email: string,
  action: TokenAction,
): Promise<MailTemplateResponse | undefined> {
  //   if (action === 'reset-password' && (await dbGetUserByEmail(email)) === undefined) {
  //     console.warn(`Cannot send email to non-existing user with email '${email}'`);
  //     return undefined;
  //   }

  const userActionRow = await dbInsertOrUpdateActionToken({ email, action });

  if (userActionRow === undefined) {
    console.warn(`Failed to retrieve or create action token for email '${email}'`);
    return undefined;
  }

  const searchParams = new URLSearchParams({
    token: userActionRow.token,
  });

  const actionUrl = buildActionUrl(searchParams);

  switch (action) {
    case 'verify-email':
      return {
        success: true,
        mailTemplate: verifyMailTemplate(actionUrl),
        createdAt: userActionRow.createdAt,
      };
    // case 'reset-password':
    //   return {
    //     success: true,
    //     mailTemplate: resetPasswordTemplate(actionUrl),
    //     createdAt: userActionRow.createdAt,
    //   };
    default:
      return undefined;
  }
}

export async function createInformationMailTemplate(
  email: string,
  information: InformationEmailMetadata,
) {
  switch (information.type) {
    case 'email-verified-success':
      return buildInformationEmailTemplate(
        'Konto aktiviert',
        'Konto aktiviert',
        `Ihr Konto wurde erfolgreich aktiviert.`,
      );
    case 'reset-password-success':
      return buildInformationEmailTemplate(
        'Passwort zurückgesetzt',
        'Passwort zurückgesetzt',
        `Ihr Passwort wurde erfolgreich zurückgesetzt.`,
      );
  }
}

import { dbInsertOrUpdateActionToken } from '@/db/functions/token';
import { dbGetUserByEmail } from '@/db/functions/user';
import { type TokenAction } from '@/db/schema';
import { env } from '@/env';

import { InformationEmailMetadata, MailTemplateResponse } from '../types';
import { buildInformationEmailTemplate } from './information-template';
import { resetPasswordTemplate } from './reset-password';
import { verifyMailTemplate } from './verify-email';

export function buildActionUrl(searchParams: URLSearchParams) {
  return `${env.NEXT_PUBLIC_baseUrl}/user-action?${searchParams.toString()}`;
}

export async function createUserActionMailTemplate(
  email: string,
  action: TokenAction,
): Promise<MailTemplateResponse | undefined> {
  if (action === 'reset-password' && (await dbGetUserByEmail({ email })) === undefined) {
    console.warn(`Cannot send email to non-existing user with email '${email}'`);
    return undefined;
  }

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
        subject: verifyMailTemplate(actionUrl).Subject.Data,
        mailTemplate: verifyMailTemplate(actionUrl).Body.Html.Data,
        createdAt: userActionRow.createdAt,
      };
    case 'reset-password':
      return {
        success: true,
        subject: resetPasswordTemplate(actionUrl).Subject.Data,
        mailTemplate: resetPasswordTemplate(actionUrl).Body.Html.Data,
        createdAt: userActionRow.createdAt,
      };
    default:
      return undefined;
  }
}

export async function createInformationMailTemplate(
  // email: string,
  information: InformationEmailMetadata,
) {
  switch (information.type) {
    case 'email-verified-success':
      return buildInformationEmailTemplate(
        'Account verified',
        'Account activated',
        `Your account has been successfully activated.`,
      );
    case 'reset-password-success':
      return buildInformationEmailTemplate(
        'Password reset',
        'Password reset',
        `Your password has been successfully reset.`,
      );
  }
}

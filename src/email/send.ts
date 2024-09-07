'use server';

import { type TokenAction } from '@/db/schema';
import { env } from '@/env';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { fromEnv } from '@aws-sdk/credential-provider-env';

import { createInformationMailTemplate, createUserActionMailTemplate } from './templates';
import { EmailActionResult, InformationEmailMetadata } from './types';

const ses = new SESClient({
  credentials: fromEnv(),
  region: env.awsRegion,
});

export type EmailMetadata = {
  subscriptionType: null;
};

export type SendUserActionEmail = typeof sendUserActionEmail;

/**
 * Sends emails to user with a specific user action to be executed by the user
 * via an action link. This function should only be used for sending email where the user receives
 * some kind of proceed link inside the template
 * */
export async function sendUserActionEmail(
  to: string,
  action: TokenAction,
): Promise<EmailActionResult> {
  const result = await createUserActionMailTemplate(to, action);
  if (!result || !result.success) {
    return {
      success: false,
      error: `Could not generate mail template for action '${action}' and email: '${to}'`,
    };
  }

  const { mailTemplate } = result;
  if (mailTemplate === undefined) {
    console.warn(`Could not generate mail template for action '${action}' and email: '${to}'`);
    return {
      success: false,
      error: 'For more information look inside the logs',
    };
  }
  try {
    const response = await ses.send(
      new SendEmailCommand({
        Source: env.emailAccount,
        Destination: { ToAddresses: [to] },
        Message: mailTemplate,
      }),
    );
    console.info('Email send returned the following response:', response);

    return { success: true, messageId: response.MessageId };
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.error('Email send returned the following error:', e);

    return {
      success: false,
      error:
        e instanceof Error ? `${e.name}, ${e.message}, ${e.stack}` : 'error could not be parsed',
    };
  }
}

/**
 * Sends information mails to the user about some successful or not successul executed action
 * This email shall not contain any forwarding or proceed actions inside the mail and serves
 * for information purposes only
 * */
export async function sendUserActionInformationEmail(
  to: string,
  information: InformationEmailMetadata,
) {
  const mailTemplate = await createInformationMailTemplate(to, information);

  if (mailTemplate === undefined) {
    console.warn(
      `Could not generate mail template for information '${information.type}' and email: '${to}'`,
    );

    return {
      success: false,
      error: 'For more information look inside the logs',
    };
  }
  try {
    const response = await ses.send(
      new SendEmailCommand({
        Source: env.emailAccount,
        Destination: { ToAddresses: [to] },
        Message: mailTemplate,
      }),
    );

    console.info('Email send returned the following response:', response);
    return { success: true, messageId: response.MessageId };
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.error('Email send returned the following error:', e);

    return {
      success: false,
      error:
        e instanceof Error ? `${e.name}, ${e.message}, ${e.stack}` : 'error could not be parsed',
    };
  }
}

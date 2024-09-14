'use server';

import { type TokenAction } from '@/db/schema';
import { env } from '@/env';
import Mailjet from 'node-mailjet';

import { createInformationMailTemplate, createUserActionMailTemplate } from './templates';
import { EmailActionResult, InformationEmailMetadata } from './types';

export type EmailMetadata = {
  subscriptionType: null;
};

export type SendUserActionEmail = typeof sendUserActionEmail;

/**
 * Sends emails to user with a specific user action to be executed by the user
 * via an action link. This function should only be used for sending email where the user receives
 * some kind of proceed link inside the template
 * */
export async function sendUserActionEmail({
  to,
  action,
}: {
  to: string;
  action: TokenAction;
}): Promise<EmailActionResult> {
  const mailjet = Mailjet.apiConnect(env.mailJetApiKey, env.mailJetApiSecret);
  const result = await createUserActionMailTemplate(to, action);

  if (!result || !result.success) {
    return {
      success: false,
      error: `Could not generate mail template for action '${action}' and email: '${to}'`,
    };
  }

  const { mailTemplate, subject } = result;
  if (mailTemplate === undefined) {
    console.warn(`Could not generate mail template for action '${action}' and email: '${to}'`);
    return {
      success: false,
      error: 'For more information look inside the logs',
    };
  }

  // Step 2: Extract mailTemplate data
  try {
    // Step 3: Send email using Mailjet
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'info@lnkto.xyz', // Use your sender email
            Name: 'LnkTo - Link Shortener', // Use your sender name
          },
          To: [
            {
              Email: to, // Using 'to' from function argument
              // Name: Optional, can be included if you have the user's name
            },
          ],
          Subject: subject, // The subject of the email
          TextPart: 'Please verify.', // Fallback to a default text if textTemplate is missing
          HTMLPart: mailTemplate, // The HTML content of the email
        },
      ],
    });

    console.log('Email successfully sent:', request.body); // Logging success response

    // Return success
    return { success: true };
  } catch (e: unknown) {
    // Step 4: Handle any errors during email sending
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
  const mailjet = Mailjet.apiConnect(env.mailJetApiKey, env.mailJetApiSecret);
  const mailTemplate = await createInformationMailTemplate(information);

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
    const request = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'info@lnkto.xyz',
            Name: 'LnkTo - Link Shortener',
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: mailTemplate.Subject.Data,
          TextPart: 'Information about your account.',
          HTMLPart: mailTemplate.Body.Html.Data,
        },
      ],
    });

    console.log('Email successfully sent:', request.body); // Logging success response

    // Return success
    return { success: true };
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

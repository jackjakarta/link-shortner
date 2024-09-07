// TODO: this is not a type union, so there can be some metadat depending on the type,
// like some organization name
export type InformationEmailMetadata =
  | {
      type: 'email-verified-success';
    }
  | {
      type: 'reset-password-success';
    };

export type MailTemplateResult = {
  success: true;
  mailTemplate: { Subject: { Data: string }; Body: { Html: { Data: string } } };
  createdAt: Date;
};

export type MailTemplateError = {
  success: false;
  error: string;
};

export type MailTemplateResponse = MailTemplateResult | MailTemplateError;

export type EmailActionResult = {
  success: boolean;
  messageId?: string;
  error?: string;
  createdAt?: Date;
};

export type InformationEmailType = InformationEmailMetadata['type'];

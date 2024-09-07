import { generalTemplate } from './general-template';

const resetPasswordBody = (url: string) =>
  generalTemplate(`            <div
              class="main"
              style="
                background-color: #ffffff;
                color: #353740;
                padding: 40px 20px;
                text-align: left;
                line-height: 1.5;
              "
            >
              <h1
                style="
                  color: #202123;
                  font-size: 32px;
                  line-height: 40px;
                  margin: 0 0 20px;
                "
              >
               Klicken Sie auf den Link, um ihr Passwort zurückzusetzen.
              </h1>
              <p style="margin: 24px 0 0; text-align: left">
                <a href="${url}" class="button">Passwort zurücksetzen</a>
              </p>
            </div>
`);

export function resetPasswordTemplate(actionUrl: string) {
  return {
    Subject: { Data: 'Passwort zurücksetzen' },
    Body: {
      Html: {
        Data: resetPasswordBody(actionUrl),
      },
    },
  };
}

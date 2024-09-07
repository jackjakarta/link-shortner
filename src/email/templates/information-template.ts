import { generalTemplate } from './general-template';

export function buildInformationEmailTemplate(subject: string, header: string, content: string) {
  const data = generalTemplate(`<div
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
	      ${header}
              </h1>
              <p style="font-size: 16px; line-height: 24px">
	      ${content}
              </p>
            </div>
`);

  return {
    Subject: { Data: subject },
    Body: {
      Html: {
        Data: data,
      },
    },
  };
}

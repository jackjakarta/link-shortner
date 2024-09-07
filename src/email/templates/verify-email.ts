export function verifyMailTemplate(actionUrl: string) {
  return {
    Subject: { Data: 'Bestätigen Sie Ihre Registrierung' },
    Body: {
      Html: {
        Data: emailTemplate.replace('$REGISTER_LINK', actionUrl),
      },
    },
  };
}

const emailTemplate = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <style type="text/css">
          .ExternalClass,
          .ExternalClass div,
          .ExternalClass font,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass td,
          img {
            line-height: 100%;
          }
    
          .footerLink{
            color: #2f3237 !important;
            text-decoration: none;
          }
    
          #outlook a {
            padding: 0;
          }
    
          .ExternalClass,
          .ReadMsgBody {
            width: 100%;
          }
    
          a {
            color: #2f3237;
            text-decoration: double;
          }
          .ii a[href] { color: #ffffff; }
    
          .button {
            display: inline-block;
            background-color: #2f3237;
            color: #ffffff !important;
            padding: 10px 20px;
            border-radius: 0;
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
            text-decoration: none;
          }
    
          a,
          blockquote,
          body,
          li,
          p,
          table,
          td {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
    
          table,
          td {
            mso-table-lspace: 0;
            mso-table-rspace: 0;
          }
    
          img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            outline: 0;
            text-decoration: none;
          }
    
          table {
            border-collapse: collapse !important;
          }
    
          #bodyCell,
          #bodyTable,
          body {
            height: 100% !important;
            margin: 0;
            padding: 0;
            font-family: "Inter", sans-serif;
          }
    
          #bodyCell {
            padding: 20px;
          }
    
          #bodyTable {
            width: 560px;
          }
    
          @media only screen and (max-width: 480px) {
            #bodyTable,
            body {
              width: 100% !important;
            }
    
            a,
            blockquote,
            body,
            li,
            p,
            table,
            td {
              -webkit-text-size-adjust: none !important;
            }
    
            body {
              min-width: 100% !important;
            }
    
            #bodyTable {
              max-width: 560px !important;
            }
    
            #signIn {
              max-width: 280px !important;
            }
          }
        </style>
      </head>
    
      <body style="background-color: #ffffff">
        <center>
          <table
            style="
              width: 560px;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              margin: 0;
              padding: 0;
              font-family: 'Inter', sans-serif;
              border-collapse: collapse !important;
              height: 100% !important;
              background-color: #ffffff;
            "
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            height="100%"
            width="100%"
            id="bodyTable"
          >
            <tr>
              <td
                align="center"
                valign="top"
                id="bodyCell"
                style="
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  margin: 0;
                  padding: 0;
                  font-family: 'Inter', sans-serif;
                  height: 100% !important;
                "
              >
                <div
                  class="top"
                  style="
                    background-color: #ffffff;
                    color: #202123;
                    padding: 27px 20px 0 15px;
                  "
                >
                  <p
                    style="
                      text-align: left;
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                      margin: 0;
                    "
                  >
                    <img
                      src="https://deutschlandgpt.de/wp-content/uploads/2024/06/DGPT-01.png"
                      width="560"
                      height="168"
                      alt="DeutschlandGPT"
                      title=""
                      style="
                        width: 140px;
                        height: auto;
                        -ms-interpolation-mode: bicubic;
                        border: 0;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                      "
                    />
                  </p>
                </div>
                <div
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
                    Bestätigen Sie Ihre Registrierung
                  </h1>
    
                  <p style="font-size: 16px; line-height: 24px">
                    Bitte bestätigen Sie Ihre E-Mail-Adresse, um die Registrierung abzuschließen.
                  </p>
    
                  <p style="margin: 24px 0 0; text-align: left">
                    <a href="$REGISTER_LINK" class="button" style="text-color: #fff; color: #fff">Registrierung bestätigen</a>
                  </p>
                </div>
                <div
                  class="footer"
                  style="
                    text-align: left;
                    background: #ffffff;
                    color: #6e6e80;
                    padding: 0 20px 20px;
                    font-size: 13px;
                    line-height: 1.4;
                  "
                >
                  <p>
                    Vielen Dank, dass Sie sich für DeutschlandGPT entschieden haben.
                  </p>
                  <p>
                    <a class="footerLink" href="mailto:info@deutschlandgpt.de"
                      >info@deutschlandgpt.de</a
                    >
                    |
                    <a class="footerLink" target="_blank" href="https://dialog.deutschlandgpt.de/agb/"
                      >Nutzungsbedingungen</a
                    >
                    |
                    <a class="footerLink" target="_blank" href="https://dialog.deutschlandgpt.de/privacy-policy/"
                      >Datenschutz</a
                    >
                    |
                    <a class="footerLink" target="_blank" href="https://www.deutschlandgpt.de/agbs/"
                      >AGBs</a
                    >
                    | <a class="footerLink" target="_blank" href="https://www.deutschlandgpt.de/impressum/">Impressum</a>
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>
    `;

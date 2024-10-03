export const generalTemplate = (bodyContent: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />
    <style type="text/css">
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        outline: none;
        text-decoration: none;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        height: 100% !important;
        font-family: 'Inter', sans-serif;
        background-color: #ffffff;
      }
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #2f3237;
        text-decoration: none;
      }
      .button {
        display: inline-block;
        background-color: #2f3237;
        color: #ffffff !important;
        padding: 10px 20px;
        border-radius: 0px;
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
        text-decoration: none;
      }
      .footerLink {
        color: #2f3237 !important;
        text-decoration: none;
      }
      /* Responsive Styles */
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          margin: auto !important;
        }
        .stack-column,
        .stack-column-center {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .stack-column-center {
          text-align: center !important;
        }
        .padding {
          padding: 10px !important;
        }
      }
    </style>
  </head>
  <body>
    <center>
      <table
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        style="background-color: #ffffff;"
      >
        <tr>
          <td>
            <table
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              class="email-container"
              style="max-width: 600px; margin: auto;"
            >
              <!-- Body Content -->
              <tr>
                <td
                  style="
                    padding: 20px;
                    text-align: left;
                    font-size: 16px;
                    line-height: 1.5;
                    color: #202123;
                  "
                >
                  ${bodyContent}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td
                  style="
                    padding: 20px;
                    background-color: #f9f9f9;
                    text-align: left;
                    font-size: 13px;
                    line-height: 1.4;
                    color: #6e6e80;
                  "
                >
                  <p>
                    Thank you for choosing GermanyGPT.
                  </p>
                  <p>
                    <a class="footerLink" href="mailto:info@deutschlandgpt.de"
                      >info@deutschlandgpt.de</a
                    >
                    |
                    <a
                      class="footerLink"
                      target="_blank"
                      href="https://dialog.deutschlandgpt.de/agb/"
                      >Terms of Use</a
                    >
                    |
                    <a
                      class="footerLink"
                      target="_blank"
                      href="https://dialog.deutschlandgpt.de/privacy-policy/"
                      >Privacy Policy</a
                    >
                    |
                    <a
                      class="footerLink"
                      target="_blank"
                      href="https://www.deutschlandgpt.de/agbs/"
                      >General Terms and Conditions</a
                    >
                    |
                    <a
                      class="footerLink"
                      target="_blank"
                      href="https://www.deutschlandgpt.de/impressum/"
                      >Imprint</a
                    >
                  </p>
                </td>
              </tr>
              <!-- End Footer -->
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`;

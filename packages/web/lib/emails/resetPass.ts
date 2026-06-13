import { EmailType } from "@/lib/mailer";

interface VerifyEmailTemplateProps {
  resetPassLink: string;
  emailType: EmailType;
}

export const resetPassTemplate = ({
  resetPassLink,
  emailType,
}: VerifyEmailTemplateProps) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 24px !important;
      }
      .button {
        width: 100% !important;
        display: block !important;
      }
      .heading {
        font-size: 20px !important;
      }
      .text {
        font-size: 14px !important;
      }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#09090b; font-family:Inter, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table class="container" width="520" cellpadding="0" cellspacing="0"
          style="
            background:#18181b;
            border:1px solid #27272a;
            border-radius:12px;
            padding:40px;
          ">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <h2 style="margin:0; color:#fafafa; font-weight:600; letter-spacing:0.5px;">
                XCHG LAB
              </h2>
              <p style="margin:6px 0 0; color:#a1a1aa; font-size:13px;">
                Secure Trading Platform
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #27272a; padding:24px 0;"></td>
          </tr>

          <!-- Content -->
          <tr>
            <td align="center">

              <h3 class="heading"
                style="
                  margin:0 0 16px;
                  color:#fafafa;
                  font-size:24px;
                  font-weight:600;
                ">
                ${
                  emailType === EmailType.VERIFY
                    ? "Verify your email"
                    : "Reset your password"
                }
              </h3>

              <p class="text"
                style="
                  margin:0 0 28px;
                  color:#a1a1aa;
                  font-size:16px;
                  line-height:1.6;
                ">
                ${
                  emailType === EmailType.VERIFY
                    ? "Thanks for signing up. Please confirm your email address by clicking the button below."
                    : "We received a password reset request. Click below to continue."
                }
              </p>

              <!-- Button -->
              <a href="${resetPassLink}" target="_blank"
                class="button"
                style="
                  display:inline-block;
                  padding:14px 26px;
                  background:#fafafa;
                  color:#09090b;
                  text-decoration:none;
                  font-weight:600;
                  font-size:14px;
                  border-radius:8px;
                ">
                ${
                  emailType === EmailType.VERIFY
                    ? "Verify Email"
                    : "Reset Password"
                }
              </a>

              <p style="
                  margin-top:28px;
                  font-size:12px;
                  color:#71717a;
                ">
                This link expires in 20 minutes.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="font-size:12px; color:#52525b; line-height:1.5;">
                If you did not request this, you can safely ignore this email.
              </p>
              <p style="font-size:11px; color:#3f3f46; margin-top:6px;">
                © ${new Date().getFullYear()} XCHG LAB
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

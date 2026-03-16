import nodemailer from "nodemailer";
import { prisma } from "@exchange-lab/db";
import { MailtrapTransport } from "mailtrap";
import crypto from "crypto";
import { verifyEmailTemplate } from "@/lib/emails/verifyEmail";
import { resetPassTemplate } from "./emails/resetPass";

export enum EmailType {
  VERIFY = "VERIFY",
  RESET = "RESET",
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: EmailType;
  userId: string;
}) => {
  try {
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await prisma.token.upsert({
      where: { userId },
      update: {
        verifyToken: hashedToken,
        verifyTokenExp: new Date(Date.now() + 1000 * 60 * 20),
      },
      create: {
        userId,
        verifyToken: hashedToken,
        verifyTokenExp: new Date(Date.now() + 1000 * 60 * 20),
      },
    });
    const MAIL_TOKEN = process.env.MAILTRAP_TOKEN;
    const transporter = nodemailer.createTransport(
      MailtrapTransport({
        token: MAIL_TOKEN!,
        sandbox: true,
        testInboxId: 4437988,
      }),
    );

    const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${rawToken}`;
    const resetPassLink = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpass?token=${rawToken}`;
    const verifyHtml = verifyEmailTemplate({
      verifyLink,
      emailType,
    });
    const resetPassHtml = resetPassTemplate({
      resetPassLink,
      emailType,
    });
    await transporter.sendMail({
      from: {
        address: "mailer@xchglab.com",
        name: "XCHG LAB",
      },
      to: email,
      subject:
        emailType === EmailType.VERIFY
          ? "Verify Your Email"
          : "Reset Your Password",
      html: emailType === EmailType.VERIFY ? verifyHtml : resetPassHtml,
    });
  } catch (error: any) {
    console.error(error);
    throw new Error("Email sending failed");
  }
};

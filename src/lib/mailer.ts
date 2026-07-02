import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  token: string
) {
  console.log("===== MAILER CALLED =====");
  console.log("To:", email);

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  console.log("Reset URL:", resetUrl);

  await transporter.verify();
  console.log("SMTP VERIFIED");

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your JoinNexiva password",
    html: `
      <h2>Reset your password</h2>
      <p><a href="${resetUrl}">Reset Password</a></p>
    `,
  });

  console.log("MESSAGE ID:", info.messageId);
}
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
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset your JoinNexiva password",
      html: `
        <h2>Reset Your Password</h2>

        <p>You recently requested to reset your JoinNexiva password.</p>

        <p>Click the button below to choose a new password:</p>

        <p>
          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 24px;
              background:#16a34a;
              color:#ffffff;
              text-decoration:none;
              border-radius:8px;
              font-weight:bold;
            "
          >
            Reset Password
          </a>
        </p>

        <p>If the button doesn't work, copy and paste this link into your browser:</p>

        <p>${resetUrl}</p>

        <hr />

        <p>This link expires in 1 hour.</p>

        <p>If you didn't request a password reset, you can safely ignore this email.</p>

        <p>— The JoinNexiva Team</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
}
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/src/lib/mailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to avoid revealing whether
    // an email address exists.
    if (!user) {
      return NextResponse.json({
        success: true,
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60
    ); // 1 hour

    console.log("STEP 1 - User found:", email);

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    console.log("STEP 2 - Token saved");

    try {
      console.log("STEP 3 - About to send email");

      await sendPasswordResetEmail(email, token);

      console.log("✅ Email sent successfully.");
    } catch (error) {
      console.error("❌ EMAIL ERROR:");
      console.error(error);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Get authenticated session
    const session = await getAuthSession();

    // Block unauthenticated users
    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find actual DB user
    const dbUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!dbUser) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const userId = dbUser.id;

    // Request body
    const body = await req.json();

    const {
      listingId,
      phone,
      amount,
    } = body;

    // Validation
    if (!listingId) {
      return Response.json(
        { error: "listingId required" },
        { status: 400 }
      );
    }

    // Prevent duplicate purchases
    const existingPayment = await prisma.payment.findFirst({
      where: {
        userId,
        listingId,
        status: "completed",
      },
    });

    if (existingPayment) {
      return Response.json(
        {
          error: "Listing already unlocked",
          alreadyPurchased: true,
        },
        { status: 409 }
      );
    }

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        userId,
        listingId,
        phone,
        amount: amount || 150,
        status: "completed",
      },
    });

    console.log("✅ PAYMENT SAVED:", payment);

    return Response.json({
      success: true,
      payment,
    });

  } catch (err) {
    console.error("❌ PAYMENT ERROR:", err);

    return Response.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}
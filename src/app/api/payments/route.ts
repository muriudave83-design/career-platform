import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount: body.amount,
        status: "completed",
      },
    });

    return Response.json(payment);
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return Response.json({ hasAccess: false }, { status: 400 });
    }

    const payment = await prisma.payment.findFirst({
      where: {
        userId,
        status: "completed",
      },
    });

    return Response.json({ hasAccess: !!payment });
  } catch (err) {
    console.error(err);
    return Response.json({ hasAccess: false }, { status: 500 });
  }
}
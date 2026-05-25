import { prisma } from "@/lib/prisma";

export async function GET() {
  const payments = await prisma.payment.findMany({
    include: {
      user: true,
      listing: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({
    payments,
  });
}
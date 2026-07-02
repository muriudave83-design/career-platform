import { prisma } from "@/lib/prisma";

export async function hasAccess(userId: string) {
  const payment = await prisma.payment.findFirst({
    where: {
      userId,
      status: "completed",
    },
  });

  return !!payment;
}

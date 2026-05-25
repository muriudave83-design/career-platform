import { prisma } from "@/lib/prisma";

interface HasListingAccessParams {
  userId: string;
  listingId: string;
}

export async function hasListingAccess({
  userId,
  listingId,
}: HasListingAccessParams) {
  // Check completed payment
  const payment = await prisma.payment.findFirst({
    where: {
      userId,
      listingId,
      status: "completed",
    },
  });

  // Convert to true/false
  return !!payment;
}
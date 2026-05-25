import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ListingClient from "./ListingClient";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: {
      id,
    },
  });

  if (!listing) {
    notFound();
  }

  return (
    <ListingClient listing={listing} />
  );
}
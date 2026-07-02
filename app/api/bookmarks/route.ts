import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, listingId } = await req.json();

    // check if bookmark exists
    const existing = await prisma.bookmark.findFirst({
      where: {
        userId,
        listingId,
      },
    });

    if (existing) {
    await prisma.bookmark.delete({
        where: {
        id: existing.id,
        },
    });
    } else {
    const created = await prisma.bookmark.create({
        data: {
        userId,
        listingId,
        },
    });

    console.log("CREATED:", created);
    }

    return NextResponse.json({ message: "Toggled bookmark" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to toggle bookmark" },
      { status: 500 }
    );
  }
}

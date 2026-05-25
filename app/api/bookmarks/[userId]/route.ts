import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      include: {
        listing: true,
      },
    });

    // ✅ DEBUG (IMPORTANT)
    console.log("BOOKMARKS:", bookmarks);

    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}
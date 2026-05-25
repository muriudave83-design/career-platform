import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";

export async function GET() {
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

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },

      include: {
        listing: true,
      },
    });

    return Response.json(bookmarks);
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}
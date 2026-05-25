import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { hasListingAccess } from "@/lib/hasListingAccess";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Get authenticated session
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return Response.json(
        { hasAccess: false },
        { status: 401 }
      );
    }

    // ✅ Get current user
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return Response.json(
        { hasAccess: false },
        { status: 404 }
      );
    }

    // ✅ Get listing id
    const { id } = await context.params;

    // ✅ Check entitlement
    const access = await hasListingAccess({
      userId: user.id,
      listingId: id,
    });

    return Response.json({
      hasAccess: access,
    });

  } catch (err) {
    console.error("ACCESS CHECK ERROR:", err);

    return Response.json(
      { hasAccess: false },
      { status: 500 }
    );
  }
}
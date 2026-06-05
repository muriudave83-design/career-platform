import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/src/lib/auth";
import { hasListingAccess } from "@/src/lib/hasListingAccess";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Require login
    const session = await getAuthSession();

    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Find user
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

    // ✅ Listing ID
    const { id } = await context.params;

    // ✅ Check entitlement
    const hasAccess = await hasListingAccess({
      userId: user.id,
      listingId: id,
    });

    if (!hasAccess) {
      return Response.json(
        { error: "Premium access required" },
        { status: 403 }
      );
    }

    // ✅ Protected content
    return Response.json({
      recruiterEmail: "recruiter@microsoft.com",
      recruiterPhone: "+254712345678",
      tips: [
        "Tailor your CV to backend systems.",
        "Highlight API scalability projects.",
        "Mention Azure or AWS experience.",
      ],
    });

  } catch (err) {
    console.error("PREMIUM ACCESS ERROR:", err);

    return Response.json(
      { error: "Failed to fetch premium content" },
      { status: 500 }
    );
  }
}
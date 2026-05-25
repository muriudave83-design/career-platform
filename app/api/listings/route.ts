import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const location = searchParams.get("location");
  const course = searchParams.get("course");

  const listings = await prisma.listing.findMany({
    where: {
      location: location || undefined,
      // later we’ll improve course filtering
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({ listings });
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    title,
    company,
    location,
    description,
    applyUrl,
    isPremium,
    isVerified,
    isUrgent,
    isHighAccept,
    difficulty,
    tips,
  } = body;

  if (
    applyUrl &&
    !applyUrl.startsWith("http://") &&
    !applyUrl.startsWith("https://")
  ) {
    return Response.json(
      {
        error:
          "Apply URL must start with http:// or https://",
      },
      {
        status: 400,
      }
    );
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      company,
      location,
      description,
      applyUrl,
      isPremium,
      isVerified: isVerified ?? false,
      isUrgent: isUrgent ?? false,
      isHighAccept: isHighAccept ?? false,
      difficulty,
      tips,
    },
  });

  return Response.json({ listing });
}
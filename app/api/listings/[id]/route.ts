import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const updated =
      await prisma.listing.update({
        where: {
          id,
        },
        data: body,
      });

    return Response.json({
      success: true,
      listing: updated,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: "Failed to update listing",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.listing.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: "Failed to delete listing",
      },
      {
        status: 500,
      }
    );
  }
}
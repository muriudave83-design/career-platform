export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(
      "✅ MPESA CALLBACK:",
      JSON.stringify(body, null, 2)
    );

    return Response.json({
      ResultCode: 0,
      ResultDesc: "Accepted",
    });

  } catch (err) {
    console.error("❌ CALLBACK ERROR:", err);

    return Response.json(
      {
        ResultCode: 1,
        ResultDesc: "Callback failed",
      },
      { status: 500 }
    );
  }
}

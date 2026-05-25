export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      phone,
      amount,
    } = body;

    // Normalize phone
    const formattedPhone = phone
      .replace(/^0/, "254")
      .replace(/\+/g, "");

    // FORCE official sandbox number
    const sandboxPhone = "254708374149";

    // Ensure amount is numeric
    const numericAmount = Number(amount);

    // MPESA credentials
    const consumerKey =
      process.env.MPESA_CONSUMER_KEY!.trim();

    const consumerSecret =
      process.env.MPESA_CONSUMER_SECRET!.trim();

    // Generate auth token
    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const tokenRes = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const tokenData = await tokenRes.json();

    console.log(
      "✅ RAW TOKEN DATA:",
      JSON.stringify(tokenData, null, 2)
    );

    if (!tokenData.access_token) {
      return Response.json({
        error: "Failed to get access token",
        tokenData,
      });
    }

    // Generate timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    // MPESA shortcode & passkey
    const shortcode =
      process.env.MPESA_SHORTCODE!.trim();

    const passkey =
      process.env.MPESA_PASSKEY!.trim();

    // Generate password
    const password = Buffer.from(
      `${shortcode}${passkey}${timestamp}`
    ).toString("base64");

    console.log("✅ TIMESTAMP:", timestamp);
    console.log("✅ PASSWORD:", password);

    // Send STK push request
    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: numericAmount,
      PartyA: sandboxPhone,
      PartyB: shortcode,
      PhoneNumber: sandboxPhone,
      CallBackURL:
        process.env.MPESA_CALLBACK_URL,
      AccountReference: "Career Platform",
      TransactionDesc: "Premium Listing Unlock",
    };

    console.log(
      "✅ FINAL STK PAYLOAD:",
      JSON.stringify(stkPayload, null, 2)
    );

    const stkRes = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkPayload),
      }
    );

    const stkData = await stkRes.json();
    // TEMP DEV FALLBACK
    if (stkData.errorCode) {
    return Response.json({
        success: true,
        simulated: true,
        stkData,
        CheckoutRequestID:
        "ws_CO_DEV_" + Date.now(),
    });
    }

    console.log("✅ STK RESPONSE:", stkData);

    console.log("✅ MPESA TOKEN:", tokenData);

    return Response.json({
      success: true,
      stkData,
    });

  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "STK push failed" },
      { status: 500 }
    );
  }
}
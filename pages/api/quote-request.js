export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    zip,
    purchaseTimeline,
    trailerType,
    additionalInfo,
    repCode,
    unitId,
    unitTitle,
    source,
    sourcePage,
  } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phone || !zip) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    const payload = {
      firstName,
      lastName,
      email,
      phone,
      zip,
      purchaseTimeline: purchaseTimeline || "not-specified",
      trailerType: trailerType || "not-specified",
      additionalInfo: additionalInfo || "",
      repCode,
      unitId: unitId || null,
      unitTitle: unitTitle || null,
      source,
      sourcePage,
      leadType: "quote_request",
    };

    console.log("Sending to SalesHub:", JSON.stringify(payload, null, 2));
    console.log("API Key present:", !!process.env.SALESHUB_API_KEY);

    const response = await fetch("https://saleshub.remotivelogistics.com/api/leads/quote-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.SALESHUB_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    console.log("SalesHub response status:", response.status);

    // Get raw text first to debug
    const rawText = await response.text();
    console.log("SalesHub raw response:", rawText);

    // Try to parse as JSON
    let data;
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch (parseError) {
      console.error("Failed to parse SalesHub response as JSON:", rawText);
      return res.status(500).json({
        success: false,
        message: "Invalid response from server",
      });
    }

    if (response.ok && data.success) {
      return res.status(200).json({
        success: true,
        leadId: data.leadId || data.customerId,
        message: data.message || "Quote request submitted successfully",
      });
    } else {
      console.error("SalesHub API error:", data);
      return res.status(response.status || 500).json({
        success: false,
        message: data.message || "Unable to process your request",
      });
    }
  } catch (error) {
    console.error("Quote request API error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

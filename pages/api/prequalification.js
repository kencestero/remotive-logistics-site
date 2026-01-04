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
    creditRange,
    repCode,
    source,
    sourcePage,
    recommendedPath,
  } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phone || !zip || !creditRange) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  // Validate credit range (now with underscores)
  const validCreditRanges = ["780+", "700_779", "650_699", "620_649", "below_620"];
  if (!validCreditRanges.includes(creditRange)) {
    return res.status(400).json({
      success: false,
      message: "Invalid credit range",
    });
  }

  try {
    const response = await fetch(
      "https://saleshub.remotivelogistics.com/api/leads/prequalification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.SALESHUB_API_KEY,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          zip,
          creditRange,
          repCode,
          source,
          sourcePage,
          recommendedPath,
        }),
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return res.status(200).json({
        success: true,
        leadId: data.leadId,
        message: data.message || "Submission successful",
      });
    } else {
      console.error("SalesHub API error:", data);
      return res.status(response.status || 500).json({
        success: false,
        message: data.message || "Unable to process your request",
      });
    }
  } catch (error) {
    console.error("Prequalification API error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

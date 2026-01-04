export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { firstName, lastName, email, phone, zipcode, creditBand, source, pageUrl, repCode } =
    req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phone || !zipcode || !creditBand) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  // Validate credit band
  const validCreditBands = ["780+", "700-779", "650-699", "620-649", "below-620"];
  if (!validCreditBands.includes(creditBand)) {
    return res.status(400).json({
      success: false,
      message: "Invalid credit band",
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
          zipcode,
          creditBand,
          source: source || "get-approved",
          pageUrl: pageUrl || "/get-approved",
          ...(repCode && { repCode }),
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
      // Log error server-side for debugging
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

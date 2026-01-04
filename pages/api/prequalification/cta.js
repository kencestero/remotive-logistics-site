export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { leadId, ctaClicked } = req.body;

  if (!leadId || !ctaClicked) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const response = await fetch(
      "https://saleshub.remotivelogistics.com/api/leads/prequalification/cta",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.SALESHUB_API_KEY,
        },
        body: JSON.stringify({ leadId, ctaClicked }),
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error("SalesHub CTA API error:", data);
      return res.status(response.status || 500).json({ success: false });
    }
  } catch (error) {
    console.error("CTA tracking error:", error);
    return res.status(500).json({ success: false });
  }
}

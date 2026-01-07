import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a helpful AI assistant for Remotive Logistics, a trailer sales company.

COMPANY INFO:
- We sell enclosed cargo trailers in various sizes
- Available sizes: 4x6, 5x8, 6x10, 6x12, 7x14, 7x16, 8.5x16
- We offer financing options through RockSolid Funding and ClickLease
- We deliver trailers across the United States
- All trailers are Diamond Cargo brand - high quality, durable
- Prices vary by size and features - encourage customers to browse inventory

KEY SERVICES:
1. Trailer Sales (enclosed cargo trailers)
2. Financing Pre-Qualification (available at /get-approved)
3. Delivery nationwide
4. Expert guidance on trailer selection

COMMON QUESTIONS:
- "What size trailer do I need?" - Ask about their use case (business equipment, moving, storage)
- "Do you finance?" - Yes! Direct them to /get-approved for pre-qualification
- "Do you deliver?" - Yes, nationwide delivery available
- "What brands?" - Diamond Cargo trailers
- "Prices?" - Vary by size, encourage browsing /trailers

TONE:
- Friendly and helpful
- Professional but not stuffy
- Focus on solving customer problems
- If unsure, offer to connect them with the sales team

If asked about specific pricing, inventory, or custom orders, suggest they:
1. Browse the inventory at https://remotivelogistics.com/trailers
2. Contact the team directly
3. Get pre-qualified for financing at https://remotivelogistics.com/get-approved

Always be concise - 2-3 sentences max unless explaining something complex.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Build conversation history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: "model",
          parts: [
            {
              text: "Understood. I'm ready to help customers with trailer sales, financing, and delivery questions.",
            },
          ],
        },
        ...history.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return res.status(200).json({ response });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error:
        "Sorry, I'm having trouble responding right now. Please try again or contact us directly.",
    });
  }
}

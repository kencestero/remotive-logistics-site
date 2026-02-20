import { fetchPublicInventory } from "@/lib/saleshub-inventory";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing unit ID" });
  }

  try {
    const data = await fetchPublicInventory();

    if (data._fallback) {
      return res.status(503).json({ error: "Inventory temporarily unavailable" });
    }

    const unit = data.units.find((u) => u.id === id);

    if (!unit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    // Return only safe public fields — no VIN, cost, or margin
    return res.status(200).json({
      id: unit.id,
      title: unit.title,
      size: unit.size,
      axle: unit.axle,
      startingPrice: unit.startingPrice,
      imageUrl: unit.imageUrl,
    });
  } catch (error) {
    console.error("[inventory-unit] Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

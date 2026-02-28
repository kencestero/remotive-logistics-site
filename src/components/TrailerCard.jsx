import Link from "next/link";
import { getStatusLabel, getTrailerImage } from "@/lib/inventory";

/**
 * TrailerCard - Display a trailer type in a grid card format (no pricing)
 */
export default function TrailerCard({ trailer }) {
  const statusLabel = getStatusLabel(trailer.status);
  const imageSrc = getTrailerImage(trailer);

  // Status badge color classes
  const statusColors = {
    Stock: "status-in-stock",
    "In-Transit": "status-arriving",
    Sold: "status-sold",
    "On Sale": "status-sale",
    Repo: "status-repo",
  };

  const statusClass = statusColors[trailer.status] || "status-default";

  // Axle type display
  const axleLabel = trailer.axleType === "TA" ? "Tandem Axle" : "Single Axle";

  return (
    <div className="trailer-card">
      {/* Image with status badge */}
      <div className="trailer-card-image">
        <img src={imageSrc} alt={trailer.name} />
        <span className={`trailer-status-badge ${statusClass}`}>{statusLabel}</span>
      </div>

      {/* Content */}
      <div className="trailer-card-content">
        <span className="trailer-category">{trailer.category}</span>
        <h4 className="trailer-name">{trailer.name}</h4>

        {/* Quick Specs */}
        <div className="trailer-quick-specs">
          <span className="spec-tag">{trailer.size}</span>
          <span className="spec-tag">{axleLabel}</span>
          {trailer.standardHeight && (
            <span className="spec-tag">{trailer.standardHeight} Height</span>
          )}
        </div>

        {/* View Specs Button */}
        <Link href={`/trailers/${trailer.slug}`} className="view-details-btn">
          VIEW SPECS
        </Link>
      </div>
    </div>
  );
}

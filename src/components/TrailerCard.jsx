import Link from "next/link";
import { formatPrice, getStatusLabel, getTrailerImage } from "@/lib/inventory";

/**
 * TrailerCard - Display a trailer in a grid card format (Roxbury-style)
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

  // Get first 3 specs for preview
  const specsPreview = trailer.specs ? Object.entries(trailer.specs).slice(0, 3) : [];

  return (
    <div className="trailer-card">
      {/* Image with category-based fallback */}
      <div className="trailer-card-image">
        <img src={imageSrc} alt={trailer.name} />
        <span className={`trailer-status-badge ${statusClass}`}>{statusLabel}</span>
      </div>

      {/* Content */}
      <div className="trailer-card-content">
        <span className="trailer-category">{trailer.category}</span>
        <h4 className="trailer-name">{trailer.name}</h4>
        <div className="trailer-price">{formatPrice(trailer.price)}</div>

        {/* Specs Preview */}
        {specsPreview.length > 0 && (
          <div className="trailer-specs-preview">
            {specsPreview.map(([key, value]) => (
              <div key={key} className="spec-preview-row">
                <span className="spec-key">{key.replace(/_/g, " ")}</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* View Details Button */}
        <Link href={`/inventory/${trailer.slug}`} className="view-details-btn">
          VIEW DETAILS
        </Link>
      </div>
    </div>
  );
}

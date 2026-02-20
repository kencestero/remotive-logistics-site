import Link from "next/link";
import { formatPrice } from "@/lib/inventory";

/**
 * InventoryCard — Displays a single available unit from SalesHub inventory.
 * Shows image, title, key specs, starting price, financing badge, and two CTAs.
 */
export default function InventoryCard({ unit }) {
  const { id, title, size, axleType, package: pkg, startingPrice, image, status } = unit;

  const axleLabel =
    axleType === "TA" ? "Tandem Axle" : axleType === "SA" ? "Single Axle" : axleType;

  const quoteUrl = `/get-a-quote?unitId=${encodeURIComponent(id)}&source=inventory`;

  const imageSrc = image || "/assets/img/default-trailer-images/6X12SA.webp";

  return (
    <div className="trailer-card">
      <div className="trailer-card-image">
        <img src={imageSrc} alt={title} loading="lazy" />
        {status === "AVAILABLE" && (
          <span className="trailer-status-badge status-in-stock">In Stock</span>
        )}
      </div>

      <div className="trailer-card-content">
        <h4 className="trailer-name">{title}</h4>

        <div className="trailer-quick-specs">
          {size && <span className="spec-tag">{size}</span>}
          {axleLabel && <span className="spec-tag">{axleLabel}</span>}
          {pkg && <span className="spec-tag">{pkg}</span>}
        </div>

        <div className="trailer-price-block">
          <span className="price-label">Starting at</span>
          <span className="trailer-price">{formatPrice(startingPrice)}</span>
        </div>

        <div className="inventory-financing-badge">
          <i className="fa-solid fa-calculator"></i>
          <span>Financing available</span>
        </div>

        <div className="inventory-card-actions">
          <Link href={quoteUrl} className="view-details-btn">
            Check Availability
          </Link>
          <Link href={quoteUrl} className="button-outline inventory-finance-btn">
            Get Financing
          </Link>
        </div>
      </div>
    </div>
  );
}

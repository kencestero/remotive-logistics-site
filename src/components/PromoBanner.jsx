/**
 * PromoBanner - Finance/RTO estimates and discount disclaimers
 * Placeholders for future calculator integration
 */
export default function PromoBanner({ price }) {
  // Placeholder estimates (will be replaced with real calculators)
  const monthlyFinance = Math.round(price / 48); // Rough 48-month estimate
  const monthlyRTO = Math.round(price / 36); // Rough 36-month RTO estimate

  return (
    <div className="promo-banner">
      {/* Finance Estimate */}
      <div className="promo-item">
        <div className="promo-icon">
          <i className="fa-solid fa-calculator" />
        </div>
        <div className="promo-content">
          <span className="promo-label">Finance Estimate</span>
          <span className="promo-value">~${monthlyFinance}/mo*</span>
        </div>
      </div>

      {/* RTO Estimate */}
      <div className="promo-item">
        <div className="promo-icon">
          <i className="fa-solid fa-handshake" />
        </div>
        <div className="promo-content">
          <span className="promo-label">Rent-to-Own</span>
          <span className="promo-value">~${monthlyRTO}/mo*</span>
        </div>
      </div>

      {/* First Responder Discount */}
      <div className="promo-item promo-discount">
        <div className="promo-icon">
          <i className="fa-solid fa-shield-halved" />
        </div>
        <div className="promo-content">
          <span className="promo-label">First Responder Discount</span>
          <span className="promo-value">$250 Off</span>
        </div>
      </div>

      {/* Disclaimers */}
      <div className="promo-disclaimers">
        <p>*Estimates only. Actual terms vary based on credit approval.</p>
        <p>
          First Responder discount requires proof of service. Cannot be combined with other offers.
        </p>
      </div>
    </div>
  );
}

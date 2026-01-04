import { useState, useMemo } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/inventory";

/**
 * FinanceCalculator - Mini collapsible finance calculator
 * 24/36/48/60 months at 8.99% APR with adjustable down payment
 */
export default function FinanceCalculator({ price }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(48);
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.2)); // Default 20%

  const APR = 8.99;
  const terms = [24, 36, 48, 60];

  // Calculate financed amount
  const financedAmount = Math.max(0, price - downPayment);

  // Calculate monthly payment
  const monthlyPayment = useMemo(() => {
    if (!financedAmount || financedAmount <= 0) return 0;

    const monthlyRate = APR / 100 / 12;
    const numPayments = selectedTerm;

    // Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const payment =
      (financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    return payment;
  }, [financedAmount, selectedTerm]);

  // Calculate total cost
  const totalCost = monthlyPayment * selectedTerm + downPayment;

  // Handle down payment change
  const handleDownPaymentChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numValue = parseInt(value) || 0;
    // Clamp between 0 and trailer price
    setDownPayment(Math.min(Math.max(0, numValue), price));
  };

  // Calculate down payment percentage for display
  const downPaymentPercent = ((downPayment / price) * 100).toFixed(0);

  return (
    <div className="finance-calculator">
      <button
        className="finance-calculator-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>
          <i className="fa-solid fa-calculator" />
          Estimate Monthly Payment
        </span>
        <i className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"}`} />
      </button>

      {isExpanded && (
        <div className="finance-calculator-content">
          {/* Term selector */}
          <div className="term-selector">
            <label>Select Term:</label>
            <div className="term-buttons">
              {terms.map((term) => (
                <button
                  key={term}
                  className={`term-btn ${selectedTerm === term ? "active" : ""}`}
                  onClick={() => setSelectedTerm(term)}
                >
                  {term} mo
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="finance-results">
            <div className="finance-result-main">
              <span className="result-label">Estimated Monthly Payment</span>
              <span className="result-value">{formatPrice(monthlyPayment)}</span>
              <span className="result-sub">/month</span>
            </div>

            <div className="finance-result-details">
              <div className="detail-row">
                <span>Trailer Price:</span>
                <span>{formatPrice(price)}</span>
              </div>
              <div className="detail-row down-payment-row">
                <span>Down Payment ({downPaymentPercent}%):</span>
                <div className="down-payment-input">
                  <span className="currency-prefix">$</span>
                  <input
                    type="text"
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    aria-label="Down payment amount"
                  />
                </div>
              </div>
              <div className="detail-row">
                <span>Amount Financed:</span>
                <span>{formatPrice(financedAmount)}</span>
              </div>
              <div className="detail-row">
                <span>APR:</span>
                <span>{APR}%</span>
              </div>
              <div className="detail-row">
                <span>Term:</span>
                <span>{selectedTerm} months</span>
              </div>
              <div className="detail-row total">
                <span>Total Cost:</span>
                <span>{formatPrice(totalCost)}</span>
              </div>
            </div>
          </div>

          <p className="finance-disclaimer">
            *Estimated payment for illustration purposes only. Actual rates and terms depend on
            credit approval. Does not include taxes, registration, or fees.
          </p>

          <Link href="/get-approved" className="button button-2 finance-cta">
            Get Pre-Approved
          </Link>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import Layout from "@/src/layouts/Layout";

const LENDER_URLS = {
  rocksolid: "https://www.rocksolidfunding.com/loan-application/",
  clicklease: "https://app.clicklease.com/inlineapp?token=b2ac1485-d611-4584-bcbc-1ccfc9d83cf1",
};

const QuoteThankYou = () => {
  const openLenderApp = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="prequalify-hero">
        <div className="container">
          <div className="prequalify-hero-content">
            <div className="success-icon">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <h1>Thank You!</h1>
            <p>
              Your quote request has been received. A member of our team will be in touch with you
              shortly to discuss your trailer needs and provide you with pricing options.
            </p>
          </div>
        </div>
      </section>

      {/* Financing Options Section */}
      <section className="financing-comparison-section gap">
        <div className="container">
          <div className="financing-intro">
            <h2>Explore Your Financing Options</h2>
            <p>
              While you wait, take a look at the financing options we offer to help you get into
              your new trailer. We've partnered with trusted lenders to provide flexible payment
              solutions for every credit situation.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="financing-comparison-table-vs">
            {/* Header with logos */}
            <div className="vs-header">
              <div className="lender-column rocksolid">
                <img
                  src="/assets/img/rocks.png"
                  alt="RockSolid Funding"
                  className="lender-logo-large clickable"
                  onClick={() => openLenderApp(LENDER_URLS.rocksolid)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && openLenderApp(LENDER_URLS.rocksolid)}
                />
                <span className="lender-type-badge rocksolid-badge">Conventional Financing</span>
              </div>
              <div className="vs-divider">
                <span>V/S</span>
              </div>
              <div className="lender-column clicklease">
                <img
                  src="/assets/img/clickl.png"
                  alt="ClickLease"
                  className="lender-logo-large clickable"
                  onClick={() => openLenderApp(LENDER_URLS.clicklease)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && openLenderApp(LENDER_URLS.clicklease)}
                />
                <span className="lender-type-badge clicklease-badge">Lease-to-Own</span>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="vs-rows">
              {/* Row 1: Pre-Payment Penalty */}
              <div className="vs-row">
                <div className="vs-value rocksolid-value">
                  <span>No Penalty</span>
                </div>
                <div className="vs-feature">Pre-Payment Penalty</div>
                <div className="vs-value clicklease-value">
                  <span>Yes, Fees May Apply</span>
                </div>
              </div>

              {/* Row 2: Credit Hard Inquiry */}
              <div className="vs-row">
                <div className="vs-value rocksolid-value">
                  <span>Yes</span>
                </div>
                <div className="vs-feature">Credit Hard Inquiry</div>
                <div className="vs-value clicklease-value">
                  <span>No</span>
                </div>
              </div>

              {/* Row 3: Approval Rate */}
              <div className="vs-row">
                <div className="vs-value rocksolid-value">
                  <span>Must Be 620+ Credit Score</span>
                </div>
                <div className="vs-feature">Approval Rate</div>
                <div className="vs-value clicklease-value">
                  <span>Near 100%, Terms May Apply</span>
                </div>
              </div>

              {/* Row 4: Monthly Payments */}
              <div className="vs-row">
                <div className="vs-value rocksolid-value">
                  <span>Lowest Payments</span>
                </div>
                <div className="vs-feature">Monthly Payments</div>
                <div className="vs-value clicklease-value">
                  <span>Higher Due to Rates</span>
                </div>
              </div>

              {/* Row 5: Down Payment */}
              <div className="vs-row">
                <div className="vs-value rocksolid-value">
                  <span>Up to $0 Down if Approved</span>
                </div>
                <div className="vs-feature">Down Payment</div>
                <div className="vs-value clicklease-value">
                  <span>Tax and Fees Up Front</span>
                </div>
              </div>

              {/* Row 6: Fast Pick Up */}
              <div className="vs-row">
                <div className="vs-value rocksolid-value">
                  <span>Fast! Within 1 Business Day</span>
                </div>
                <div className="vs-feature">Fast Pick Up</div>
                <div className="vs-value clicklease-value">
                  <span>Fast! Within 1 Business Day</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="financing-cta-section">
            <div className="financing-cta-card">
              <h3>Traditional Financing</h3>
              <p>
                Great rates for qualified buyers. If you have good to excellent credit, RockSolid
                offers competitive terms with flexible payment options.
              </p>
              <button
                className="button button-2"
                onClick={() => openLenderApp(LENDER_URLS.rocksolid)}
              >
                Apply with RockSolid
              </button>
            </div>
            <div className="financing-cta-card">
              <h3>Lease-to-Own</h3>
              <p>
                No credit? Bad credit? No problem. ClickLease makes it easy to get approved with a
                soft credit check that won't affect your score.
              </p>
              <button
                className="button button-2"
                onClick={() => openLenderApp(LENDER_URLS.clicklease)}
              >
                Apply with ClickLease
              </button>
            </div>
          </div>

          {/* Back to Home */}
          <div className="back-home-section">
            <Link href="/trailers" className="button button-outline">
              <i className="fa-solid fa-arrow-left"></i> Browse Our Trailers
            </Link>
            <Link href="/" className="button button-outline">
              <i className="fa-solid fa-home"></i> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QuoteThankYou;

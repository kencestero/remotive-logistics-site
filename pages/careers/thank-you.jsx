import Layout from "@/src/layouts/Layout";
import Link from "next/link";

const ThankYou = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-content">
                <ul className="crumbs d-flex">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/careers">
                      <i className="fa-solid fa-right-long" /> Careers
                    </Link>
                  </li>
                  <li className="two">
                    <Link href="/careers/thank-you">
                      <i className="fa-solid fa-right-long" /> Thank You
                    </Link>
                  </li>
                </ul>
                <h1>Application Received</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Content */}
      <section className="gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="contact-form-wrapper" style={{ textAlign: "center" }}>
                {/* Success Icon */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 2rem",
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="fa-solid fa-check"
                    style={{ fontSize: "2.5rem", color: "#ffffff" }}
                  />
                </div>

                <h2 style={{ marginBottom: "1rem" }}>Thank You for Applying!</h2>

                <p style={{ fontSize: "1.125rem", marginBottom: "2rem", lineHeight: "1.6" }}>
                  We received your application for Remotive Logistics. If you're a fit for the role,
                  someone from our team will call you soon.
                </p>

                {/* Tip Box */}
                <div
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "12px",
                    marginBottom: "2rem",
                    textAlign: "left",
                  }}
                >
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                    <i
                      className="fa-solid fa-lightbulb"
                      style={{ marginRight: "0.5rem", color: "var(--primary)" }}
                    />
                    Quick Tip
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted)", margin: 0 }}>
                    Keep your phone nearby and watch for calls from unknown numbers. We typically
                    respond within 1–2 business days.
                  </p>
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Link href="/" className="button button-2">
                    Back to Home
                  </Link>
                  <Link href="/careers" className="button">
                    View Careers
                  </Link>
                </div>

                {/* Contact Info */}
                <div
                  style={{
                    marginTop: "3rem",
                    paddingTop: "2rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <p
                    style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "0.5rem" }}
                  >
                    Questions about your application?
                  </p>
                  <p style={{ fontSize: "0.875rem" }}>
                    <i
                      className="fa-solid fa-envelope"
                      style={{ marginRight: "0.5rem", color: "var(--primary)" }}
                    />
                    <a href="mailto:info@remotivelogistics.com" style={{ color: "var(--link)" }}>
                      info@remotivelogistics.com
                    </a>
                  </p>
                  <p style={{ fontSize: "0.875rem" }}>
                    <i
                      className="fa-solid fa-phone"
                      style={{ marginRight: "0.5rem", color: "var(--primary)" }}
                    />
                    <a href="tel:+18667366848" style={{ color: "var(--link)" }}>
                      1-866-736-6848
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ThankYou;

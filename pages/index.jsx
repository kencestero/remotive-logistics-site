import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { getTrailers } from "@/lib/inventory";
import TrailerCard from "@/src/components/TrailerCard";

const Index = ({ featuredTrailers }) => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section-premium gap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="hero-content">
                <h1>Quality Trailers. Remote Convenience.</h1>
                <p>
                  Browse our selection of enclosed, open, dump, and utility trailers — all from the
                  comfort of your home. Customer service is our number one priority.
                </p>
                <div className="hero-cta">
                  <Link href="/trailers" className="button button-2">
                    Browse Trailers
                  </Link>
                  <Link href="/contact" className="button button-outline">
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={400}>
              <div className="hero-image-container">
                <img
                  src="/assets/img/blackoutR.png"
                  alt="Premium enclosed trailer"
                  className="hero-trailer-img"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works gap">
        <div className="container">
          <div className="hading text-center" data-aos="fade-up">
            <h2>How It Works</h2>
            <p>Simple, transparent, and built around your convenience</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
              <div className="step-card">
                <div className="step-number">01</div>
                <h4>Browse & Select</h4>
                <p>
                  Explore our inventory of quality trailers online. Filter by type, size, and
                  features to find exactly what you need.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="step-card">
                <div className="step-number">02</div>
                <h4>Get Expert Guidance</h4>
                <p>
                  Our team helps you understand options, pricing, and financing. We answer questions
                  honestly — no pressure, no gimmicks.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
              <div className="step-card">
                <div className="step-number">03</div>
                <h4>Complete Your Purchase</h4>
                <p>
                  Choose cash, financing, or rent-to-own. We handle the details so you can focus on
                  putting your trailer to work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trailers */}
      <section
        className="featured-trailers subtle-glow-top gap"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container">
          <div className="hading text-center" data-aos="fade-up">
            <h2>Featured Trailers</h2>
            <p>Quality trailers at competitive prices</p>
          </div>
          <div className="trailer-grid" data-aos="fade-up" data-aos-delay={100}>
            {featuredTrailers.map((trailer) => (
              <TrailerCard key={trailer.id} trailer={trailer} />
            ))}
          </div>
          <div className="text-center" style={{ marginTop: "2rem" }}>
            <Link href="/trailers" className="button button-2">
              View All Trailers
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us gap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="content-block">
                <h2>Why Remotive Logistics?</h2>
                <p>
                  We're not just selling trailers — we're building relationships based on trust,
                  transparency, and service.
                </p>
                <ul className="feature-list">
                  <li>
                    <i className="fa-solid fa-laptop-house" />
                    <div>
                      <strong>100% Remote</strong>
                      <span>Shop from the comfort of your home</span>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-comments" />
                    <div>
                      <strong>No Pressure Sales</strong>
                      <span>Honest guidance, not pushy tactics</span>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-dollar-sign" />
                    <div>
                      <strong>Flexible Payment Options</strong>
                      <span>Cash, financing, or rent-to-own</span>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-language" />
                    <div>
                      <strong>Bilingual Support</strong>
                      <span>We speak English and Spanish</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="founder-quote">
                <blockquote>
                  "Customer service is our number one focus. We work hard to make sure every
                  customer feels heard, informed, and respected."
                </blockquote>
                <cite>
                  <strong>Kenneth Cestero Campos</strong>
                  <span>Founder, Remotive Logistics LLC</span>
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Categories */}
      <section
        className="trailer-categories gap"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container">
          <div className="hading text-center" data-aos="fade-up">
            <h2>What We Offer</h2>
            <p>A curated selection of quality trailers for every need</p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={100}>
              <Link href="/trailers" className="category-card">
                <i className="fa-solid fa-box" />
                <h4>Enclosed Cargo</h4>
                <p>Protect your cargo from weather and theft</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={200}>
              <Link href="/trailers" className="category-card">
                <i className="fa-solid fa-car" />
                <h4>Car Haulers</h4>
                <p>Open and enclosed options available</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={300}>
              <Link href="/trailers" className="category-card">
                <i className="fa-solid fa-dumpster" />
                <h4>Dump Trailers</h4>
                <p>Built tough for heavy loads</p>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={400}>
              <Link href="/trailers" className="category-card">
                <i className="fa-solid fa-tractor" />
                <h4>Equipment & Utility</h4>
                <p>Versatile solutions for any job</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="cta-section gap"
        style={{
          background: "linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)",
          position: "relative",
        }}
      >
        <div className="cta-glow-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" data-aos="fade-up">
              <h2 style={{ color: "var(--primary-contrast)" }}>Ready to Find Your Trailer?</h2>
              <p style={{ color: "var(--primary-contrast)", opacity: 0.9 }}>
                Browse our inventory or contact us for personalized assistance.
              </p>
              <div className="cta-buttons">
                <Link
                  href="/trailers"
                  className="button"
                  style={{
                    backgroundColor: "var(--primary-contrast)",
                    color: "var(--primary)",
                  }}
                >
                  Browse Trailers
                </Link>
                <Link
                  href="/contact"
                  className="button button-outline"
                  style={{
                    borderColor: "var(--primary-contrast)",
                    color: "var(--primary-contrast)",
                  }}
                >
                  Contact Us
                </Link>
              </div>
              <p style={{ color: "var(--primary-contrast)", marginTop: "1.5rem" }}>
                <i className="fa-solid fa-phone" style={{ marginRight: "0.5rem" }} />
                1-866-REMOTIV
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const allTrailers = getTrailers();
  // Get first 3 non-sold trailers for featured section
  const featuredTrailers = allTrailers.filter((t) => t.status !== "Sold").slice(0, 3);

  return {
    props: {
      featuredTrailers,
    },
  };
}

export default Index;

import Layout from "@/src/layouts/Layout";
import Link from "next/link";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="page-header gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-content" data-aos="fade-up">
                <ul className="crumbs d-flex">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className="two">
                    <Link href="/about">
                      <i className="fa-solid fa-right-long" /> About Us
                    </Link>
                  </li>
                </ul>
                <h1>About Remotive Logistics</h1>
                <p>Making trailer sales simple, transparent, and accessible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="about-content gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="content-block" data-aos="fade-up">
                <h2>Who We Are</h2>
                <p>
                  Remotive Logistics was founded with a simple but powerful vision: to make buying
                  and selling transportable products easier, more transparent, and accessible—fully
                  remote and from the comfort of your home.
                </p>
                <p>
                  Logistics has always been about moving goods efficiently. What often gets lost is
                  the human side of the process. At Remotive Logistics, we focus on restoring that
                  balance by combining modern technology with genuine, best-in-class customer
                  service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="content-block text-center" data-aos="fade-up">
                <h2>Our Mission</h2>
                <p className="lead">
                  Our mission is to create meaningful opportunities for individuals to grow
                  professionally while delivering a best-in-class customer experience.
                </p>
                <p>
                  We are committed to empowering motivated sales professionals with the tools,
                  training, and support needed to succeed—while maintaining the highest standards of
                  integrity, transparency, and service. Every interaction, whether with a customer
                  or a team member, is guided by our core belief that long-term success is built on
                  trust, education, and accountability.
                </p>
                <p>
                  <strong>Customer service remains our number one priority.</strong> We strive to
                  ensure that every customer feels informed, respected, and confident throughout
                  their experience with Remotive Logistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="content-block">
                <h2>What We Do</h2>
                <p>
                  We provide trailer and logistics solutions for individuals, small businesses, and
                  growing fleets. Our remote-first model allows us to serve customers efficiently
                  while keeping communication clear, responsive, and honest.
                </p>
                <p>We help customers:</p>
                <ul className="check-list">
                  <li>
                    <i className="fa-solid fa-circle-check" />
                    Understand which trailer truly fits their needs
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" />
                    Navigate pricing clearly and realistically
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" />
                    Explore cash, finance, and rent-to-own options
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check" />
                    Move forward confidently without pressure or confusion
                  </li>
                </ul>
                <p>
                  <em>
                    If we don't have an answer immediately, we will find it. Transparency matters.
                  </em>
                </p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="content-block">
                <h2>What We Sell</h2>
                <p>We offer a curated selection of high-quality trailers, including:</p>
                <ul className="trailer-list">
                  <li>
                    <i className="fa-solid fa-truck-ramp-box" /> Enclosed cargo trailers
                  </li>
                  <li>
                    <i className="fa-solid fa-car" /> Open and enclosed car haulers
                  </li>
                  <li>
                    <i className="fa-solid fa-dumpster" /> Dump trailers
                  </li>
                  <li>
                    <i className="fa-solid fa-tractor" /> Equipment and utility trailers
                  </li>
                  <li>
                    <i className="fa-solid fa-utensils" /> Concession / food trailers
                  </li>
                  <li>
                    <i className="fa-solid fa-sailboat" /> Watercraft trailers
                  </li>
                  <li>
                    <i className="fa-solid fa-tag" /> Used and clearance units
                  </li>
                </ul>
                <p>
                  Inventory changes regularly, but our commitment to value, quality, and service
                  does not.
                </p>
                <Link href="/trailers" className="button button-2">
                  Browse Trailers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="financing-section gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="content-block" data-aos="fade-up">
                <h2>Financing & Payment Options</h2>
                <p>We offer multiple purchasing options to fit different needs:</p>
                <div className="payment-options">
                  <div className="payment-option">
                    <i className="fa-solid fa-money-bill-wave" />
                    <h4>Cash Purchases</h4>
                    <p>Straightforward buying with competitive pricing</p>
                  </div>
                  <div className="payment-option">
                    <i className="fa-solid fa-clock-rotate-left" />
                    <h4>Rent-to-Own</h4>
                    <p>Flexible payment plans to fit your budget</p>
                  </div>
                  <div className="payment-option">
                    <i className="fa-solid fa-building-columns" />
                    <h4>Conventional Financing</h4>
                    <p>Through trusted lenders including C3 Leasing and partner banks</p>
                  </div>
                </div>
                <p className="disclaimer">
                  <small>
                    Conventional financing (including C3 Leasing and other partner banks) will
                    become available after the first month of company operations. Until then, our
                    team will guide customers through available options and upcoming programs. All
                    payment estimates are provided for informational purposes only and are subject
                    to approval and final terms.
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Service Section */}
      <section className="customer-service gap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="content-block">
                <h2>Our #1 Priority: Customer Service</h2>
                <p>
                  Customer service is not a department at Remotive Logistics — it is our foundation.
                </p>
                <p>We believe:</p>
                <ul className="belief-list">
                  <li>
                    <strong>Clear communication</strong> builds trust
                  </li>
                  <li>
                    <strong>Respecting your time</strong> matters
                  </li>
                  <li>
                    <strong>Honest information</strong> leads to better decisions
                  </li>
                </ul>
                <p>
                  Our representatives go through product-focused training to ensure the information
                  you receive is accurate and reliable. We don't believe in selling just to sell —
                  we believe in helping customers make the right decision for their situation.
                </p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="founder-message">
                <h3>Founder's Message</h3>
                <p>My name is Ken, and welcome to Remotive Logistics.</p>
                <p>
                  This company was founded with the goal of creating real opportunities — both for
                  customers and for people who want to build a career selling transportable products
                  remotely, from anywhere.
                </p>
                <p>
                  As a father of six and a husband, my priority is building something meaningful and
                  lasting. I want Remotive Logistics to be a company built on strong values, honest
                  work, and a foundation solid enough to pass on to future generations.
                </p>
                <p>
                  Customer service is our number one focus. We work hard to make sure every customer
                  feels heard, informed, and respected. If we don't know something, we won't guess —
                  we'll find the right answer.
                </p>
                <p>
                  Thank you for taking the time to learn more about us. We look forward to earning
                  your trust.
                </p>
                <p className="founder-signature">
                  <strong>Kenneth Cestero Campos</strong>
                  <br />
                  Founder, Remotive Logistics LLC
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section gap" style={{ backgroundColor: "var(--primary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" data-aos="fade-up">
              <h2 style={{ color: "var(--primary-contrast)" }}>Ready to Find Your Trailer?</h2>
              <p style={{ color: "var(--primary-contrast)", opacity: 0.9 }}>
                Browse our selection of quality trailers at competitive prices.
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
                  View Trailers
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
                1-866-REMOTIV &nbsp;|&nbsp; We speak English and Spanish
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

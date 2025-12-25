import Layout from "@/src/layouts/Layout";
import Link from "next/link";

const Careers = () => {
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
                    <Link href="/careers">
                      <i className="fa-solid fa-right-long" /> Careers
                    </Link>
                  </li>
                </ul>
                <h1>Join Our Team</h1>
                <p>Build a remote sales career with Remotive Logistics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Overview */}
      <section className="careers-intro gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="content-block text-center" data-aos="fade-up">
                <h2>Contracted Sales Representative</h2>
                <p className="lead">
                  This is a 100% remote, commission-based role where you set your own schedule and
                  control your earnings. We provide the tools, training, and leads — you bring the
                  work ethic and customer service mindset.
                </p>
                <div className="job-badges">
                  <span className="badge">
                    <i className="fa-solid fa-laptop-house" /> 100% Remote
                  </span>
                  <span className="badge">
                    <i className="fa-solid fa-clock" /> Set Your Schedule
                  </span>
                  <span className="badge">
                    <i className="fa-solid fa-chart-line" /> Commission-Based
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Work Image */}
      <section className="careers-image-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="careers-image-wrapper" data-aos="fade-up">
                <img
                  src="/assets/img/remotecareers.webp"
                  alt="Remote work from anywhere"
                  className="careers-featured-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="what-we-provide gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="section-title" data-aos="fade-up">
                What We Provide
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
              <div className="provide-card">
                <i className="fa-solid fa-graduation-cap" />
                <h4>Training</h4>
                <p>
                  In-house product training and weekly coaching sessions on sales techniques,
                  product knowledge, and objection handling.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="provide-card">
                <i className="fa-solid fa-bullhorn" />
                <h4>Leads</h4>
                <p>
                  Shared lead access through company campaigns. Individual call-ins and walk-ups are
                  assigned to the representative who handles them.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
              <div className="provide-card">
                <i className="fa-solid fa-toolbox" />
                <h4>Tools</h4>
                <p>
                  CRM access, inventory system, marketing materials, and sales scripts to help you
                  succeed.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
              <div className="provide-card">
                <i className="fa-solid fa-users" />
                <h4>Community</h4>
                <p>
                  Access to a Discord sales room for real-time collaboration, motivation, and live
                  deal support.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={500}>
              <div className="provide-card">
                <i className="fa-solid fa-headset" />
                <h4>Support</h4>
                <p>
                  Available 7 days a week to help with customer questions, financing, and closing
                  deals.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={600}>
              <div className="provide-card">
                <i className="fa-solid fa-sack-dollar" />
                <h4>Bonuses</h4>
                <p>
                  Starter bonuses, performance bonuses, and a referral program for team members who
                  recruit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth & Compensation */}
      <section className="compensation gap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="content-block">
                <h2>Growth & Compensation</h2>
                <p>
                  Your earnings are directly tied to your performance. The more you sell, the more
                  you earn — with a clear, transparent commission structure.
                </p>
                <ul className="compensation-list">
                  <li>
                    <i className="fa-solid fa-percent" />
                    <div>
                      <strong>Base Commission</strong>
                      <span>Per unit sold, with transparent calculation</span>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-rocket" />
                    <div>
                      <strong>Starter Bonus</strong>
                      <span>$500 after first 5 units sold</span>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-trophy" />
                    <div>
                      <strong>Performance Bonus</strong>
                      <span>$1,000 for every 10 units after first 5</span>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-user-plus" />
                    <div>
                      <strong>Referral Bonus</strong>
                      <span>Earn when someone you refer sells their first unit</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="content-block">
                <h2>Recognition & Accountability</h2>
                <p>
                  We believe in celebrating success and maintaining high standards. Your performance
                  is visible, and your achievements are recognized.
                </p>
                <ul className="recognition-list">
                  <li>
                    <i className="fa-solid fa-star" />
                    Public leaderboard and performance shout-outs
                  </li>
                  <li>
                    <i className="fa-solid fa-calendar-check" />
                    Weekly minimum activity expectations
                  </li>
                  <li>
                    <i className="fa-solid fa-comments" />
                    Weekly one-on-ones for feedback and coaching
                  </li>
                  <li>
                    <i className="fa-solid fa-gauge-high" />
                    Clear performance metrics and goals
                  </li>
                </ul>
                <p className="note">
                  <em>
                    This is a contracted, commission-only opportunity. Your success is directly tied
                    to your effort and results. We're looking for self-motivated individuals ready
                    to build something real.
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="ideal-candidate gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="content-block text-center" data-aos="fade-up">
                <h2>Who We're Looking For</h2>
                <p>
                  We're looking for motivated individuals who want to work remotely, control their
                  income, and grow with a team that values results.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="candidate-list">
                <h4>You might be a great fit if:</h4>
                <ul>
                  <li>
                    <i className="fa-solid fa-check" /> You're self-motivated and disciplined
                  </li>
                  <li>
                    <i className="fa-solid fa-check" /> You have strong communication skills
                  </li>
                  <li>
                    <i className="fa-solid fa-check" /> You're comfortable with remote work
                  </li>
                  <li>
                    <i className="fa-solid fa-check" /> You can handle rejection and stay positive
                  </li>
                  <li>
                    <i className="fa-solid fa-check" /> You're coachable and open to feedback
                  </li>
                  <li>
                    <i className="fa-solid fa-check" /> You have a quiet space to take calls
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="candidate-list">
                <h4>Experience is a plus, but not required:</h4>
                <ul>
                  <li>
                    <i className="fa-solid fa-plus" /> Sales or customer service background
                  </li>
                  <li>
                    <i className="fa-solid fa-plus" /> Knowledge of trailers or equipment
                  </li>
                  <li>
                    <i className="fa-solid fa-plus" /> CRM or sales software experience
                  </li>
                  <li>
                    <i className="fa-solid fa-plus" /> Bilingual (English/Spanish)
                  </li>
                </ul>
                <p className="mt-3">
                  <strong>We train you on the product.</strong> What matters most is your work ethic
                  and attitude.
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
              <h2 style={{ color: "var(--primary-contrast)" }}>Ready to Apply?</h2>
              <p
                style={{
                  color: "var(--primary-contrast)",
                  opacity: 0.9,
                  maxWidth: "600px",
                  margin: "0 auto 1.5rem",
                }}
              >
                If this sounds like the opportunity you've been looking for, we'd love to hear from
                you. Send us a message and tell us why you'd be a great fit for Remotive Logistics.
              </p>
              <Link
                href="/careers/apply"
                className="button"
                style={{
                  backgroundColor: "var(--primary-contrast)",
                  color: "var(--primary)",
                }}
              >
                Apply Now
              </Link>
              <p style={{ color: "var(--primary-contrast)", marginTop: "1.5rem", opacity: 0.9 }}>
                <i className="fa-solid fa-envelope" style={{ marginRight: "0.5rem" }} />
                info@remotivelogistics.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;

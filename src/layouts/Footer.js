import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gap no-bottom" style={{ backgroundColor: "var(--surface)" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <div className="footer-description">
              <Link href="/">
                <img
                  src="/assets/img/logo.svg"
                  alt="Remotive Logistics"
                  height={50}
                  style={{ display: "block" }}
                />
              </Link>
              <h2>Quality Trailers, Remote Convenience</h2>
              <p>
                Making trailer sales simple, transparent, and accessible — fully remote and from the
                comfort of your home. Customer service is our number one priority.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="menu">
              <h4>Quick Links</h4>
              <ul className="footer-menu">
                <li>
                  <Link href="/trailers">
                    Trailers
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
                <li>
                  <Link href="/about">
                    About Us
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
                <li>
                  <Link href="/careers">
                    Careers
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    Contact
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="menu contacts">
              <h4>Contact Us</h4>
              <div className="footer-location">
                <i className="fa-solid fa-globe" />
                <p>100% Remote — Serving Customers Nationwide</p>
              </div>
              <a href="mailto:info@remotivelogistics.com">
                <i className="fa-solid fa-envelope" />
                info@remotivelogistics.com
              </a>
              <a href="tel:+18667366848">
                <i className="fa-solid fa-phone" />
                1-866-REMOTIV
              </a>
              <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "var(--muted)" }}>
                <i className="fa-solid fa-language" style={{ marginRight: "0.5rem" }} />
                We speak English and Spanish
              </p>
            </div>
          </div>
        </div>
        <div className="footer-two gap no-bottom">
          <p>Copyright © {currentYear}. Remotive Logistics LLC. All rights reserved.</p>
          <div className="privacy">
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

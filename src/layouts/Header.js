import Link from "next/link";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

const Header = ({ extraClass }) => {
  // Theme toggle - default to dark mode
  const [theme, setTheme] = useState("dark");
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Read theme from localStorage on mount, default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Hide tooltip after 20 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // mobile menu
  const [mobileToggle, setMobileToggle] = useState(false);

  return (
    <>
      {/* Top Contact Bar - Roxbury Style */}
      <div className="top-contact-bar">
        <div className="container">
          <div className="top-contact-inner">
            <div className="contact-item">
              <i className="fa-solid fa-phone" />
              <a href="tel:+18667366848">1-866-REMOTIV (736-6848)</a>
            </div>
            <div className="contact-item">
              <i className="fa-solid fa-envelope" />
              <a href="mailto:info@remotivelogistics.com">info@remotivelogistics.com</a>
            </div>
            <div className="contact-item">
              <i className="fa-solid fa-location-dot" />
              <span>PO BOX 2, Bloomingdale, NJ 07403</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Stripe */}
      <div className="diagonal-stripe"></div>

      {/* Main Header */}
      <header className={`main-header ${extraClass || ""}`}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <div className="header-logo">
              <Link href="/">
                <img src="/assets/img/logo.svg" alt="Remotive Logistics" height={50} />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="header-nav">
              <ul className="nav-links">
                <li>
                  <Link href="/trailers">Inventory</Link>
                </li>
                <li>
                  <Link href="/get-approved">Get Approved</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>

            {/* Actions */}
            <div className="header-actions">
              <div className="theme-toggle-wrapper">
                <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                  {theme === "light" ? (
                    <i className="fa-solid fa-moon" />
                  ) : (
                    <i className="fa-solid fa-sun" />
                  )}
                </button>
                {showTooltip && theme === "dark" && (
                  <div className="theme-tooltip">Click me for Light Mode</div>
                )}
              </div>
              <a
                href="https://saleshub.remotivelogistics.com"
                className="saleshub-button-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/img/saleshub-button.webp"
                  alt="Remotive SalesHub Portal"
                  className="saleshub-button-img"
                />
              </a>
              <Link href="/contact" className="button button-2">
                Get a Quote
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="mobile-toggle" onClick={() => setMobileToggle(true)}>
              <i className="fa-solid fa-bars" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-nav hmburger-menu ${mobileToggle ? "open" : ""}`}
          id="mobile-nav"
          style={{ display: "block" }}
        >
          <div className="res-log">
            <Link href="/">
              <img
                src="/assets/img/logo.svg"
                alt="Remotive Logistics"
                height={50}
                style={{ display: "block" }}
              />
            </Link>
          </div>
          <MobileMenu />
          <a href="#" id="res-cross" onClick={() => setMobileToggle(false)} />
        </div>
      </header>
    </>
  );
};
export default Header;

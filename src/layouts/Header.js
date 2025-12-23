import Link from "next/link";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

const Header = ({ extraClass }) => {
  // Theme toggle
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Read theme from localStorage on mount
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
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
    <header className={extraClass}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-2">
            <div className="header-style">
              <Link href="/">
                <img
                  src="/assets/img/logo.svg"
                  alt="Remotive Logistics"
                  height={50}
                  style={{ display: "block" }}
                />
              </Link>
              <div className="extras bag">
                <div className="bar-menu" onClick={() => setMobileToggle(true)}>
                  <i className="fa-solid fa-bars" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <nav className="navbar">
              <ul className="navbar-links">
                <li className="navbar-dropdown">
                  <Link href="/trailers">Trailers</Link>
                </li>
                <li className="navbar-dropdown">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="navbar-dropdown">
                  <Link href="/careers">Careers</Link>
                </li>
                <li className="navbar-dropdown">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="extras bag">
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: "0.5rem",
                  marginRight: "1rem",
                  color: "inherit",
                }}
              >
                {theme === "light" ? (
                  <i className="fa-solid fa-moon" />
                ) : (
                  <i className="fa-solid fa-sun" />
                )}
              </button>
              <Link href="/contact" className="button button-2">
                Get a Quote
              </Link>
            </div>
          </div>
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
        </div>
      </div>
    </header>
  );
};
export default Header;

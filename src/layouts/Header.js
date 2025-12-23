import Link from "next/link";
import { useState, useEffect } from "react";
import CheckoutFuntion from "../components/CheckoutFuntion";
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
  const onClick = (e) => {
    const body = document.querySelector("body");
    body.classList.toggle("active");
    e.preventDefault();
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
                <a href="#" className="menu-btn" onClick={(e) => onClick(e)}>
                  <i className="fa-solid fa-bag-shopping" />
                </a>
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
                  <Link href="/">Home</Link>
                </li>
                <li className="navbar-dropdown">
                  <Link href="about">About Us</Link>
                </li>
                <li className="navbar-dropdown">
                  <Link href="restaurants">Restaurants</Link>
                  <div className="dropdown">
                    <Link href="restaurants">Restaurants</Link>
                    <Link href="restaurant-card">Restaurant Card</Link>
                    <Link href="checkout">Checkout</Link>
                  </div>
                </li>
                <li className="navbar-dropdown">
                  <Link href="#">Pages</Link>
                  <div className="dropdown">
                    <Link href="blog">Blog</Link>
                    <Link href="single-blog">Single Blog</Link>
                    <Link href="services">Services</Link>
                    <Link href="faq">FAQ</Link>
                    <Link href="pricing-table">Pricing Table</Link>
                    <Link href="become-partner">Become A Partner</Link>
                    <Link href="404">404</Link>
                  </div>
                </li>
                <li className="navbar-dropdown">
                  <Link href="contacts">Contacts</Link>
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
              <a href="#" id="desktop-menu" className="menu-btn" onClick={(e) => onClick(e)}>
                <i className="fa-solid fa-bag-shopping" />
              </a>
              <Link href="checkout" className="button button-2">
                Order Now
              </Link>
            </div>
          </div>
          <div className="menu-wrap">
            <div className="menu-inner ps ps--active-x ps--active-y">
              <span className="menu-cls-btn" onClick={(e) => onClick(e)}>
                <i className="cls-leftright" />
                <i className="cls-rightleft" />
              </span>
              <CheckoutFuntion sidebar />
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

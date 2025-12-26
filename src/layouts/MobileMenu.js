import Link from "next/link";

const MobileMenu = () => {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/trailers">Trailers</Link>
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
      <li className="staff-login-mobile">
        <a href="https://saleshub.remotivelogistics.com" target="_blank" rel="noopener noreferrer">
          <i className="fa-solid fa-user-lock" /> Staff Login
        </a>
      </li>
    </ul>
  );
};
export default MobileMenu;

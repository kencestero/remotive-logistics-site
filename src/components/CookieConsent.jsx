import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

const COOKIE_KEY = "remotive_cookie_consent";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState(null); // null = unknown, "accepted", "declined"

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored === "accepted") {
      setConsent("accepted");
      return;
    }
    if (stored === "declined") {
      setConsent("declined");
      return;
    }
    // First-time visitor — show banner after 1.5s
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  return (
    <>
      {/* Load GTM only if accepted and GTM_ID is set */}
      {consent === "accepted" && GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      )}

      {/* Cookie Banner */}
      {visible && (
        <div className="cookie-banner">
          <div className="cookie-banner-inner">
            <div className="cookie-banner-text">
              <i className="fa-solid fa-cookie-bite"></i>
              <p>
                We use cookies to improve your experience and analyze site traffic. By clicking
                &ldquo;Accept&rdquo; you consent to our use of cookies. See our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link> for details.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
                Accept
              </button>
              <button className="cookie-btn cookie-btn-decline" onClick={handleDecline}>
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

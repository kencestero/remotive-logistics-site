import Layout from "@/src/layouts/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CREDIT_BANDS = [
  { value: "", label: "Select your estimated credit score" },
  { value: "780+", label: "Excellent (780+)" },
  { value: "700-779", label: "Good (700-779)" },
  { value: "650-699", label: "Fair (650-699)" },
  { value: "620-649", label: "Below Average (620-649)" },
  { value: "below-620", label: "Rebuilding (Below 620)" },
];

const LENDER_URLS = {
  rocksolid: "https://www.rocksolidfunding.com/loan-application/",
  clicklease: "https://app.clicklease.com/inlineapp?token=b2ac1485-d611-4584-bcbc-1ccfc9d83cf1",
};

// Format phone number as user types: 0000000000 -> 000-000-0000
const formatPhoneNumber = (value) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  // Limit to 10 digits
  const trimmed = digits.slice(0, 10);

  // Format based on length
  if (trimmed.length <= 3) {
    return trimmed;
  } else if (trimmed.length <= 6) {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
  } else {
    return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
  }
};

const GetApproved = () => {
  const router = useRouter();
  const [repCode, setRepCode] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipcode: "",
    creditBand: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // Get recommended path based on credit band
  const getRecommendedPath = (creditBand) => {
    if (["780+", "700-779", "650-699", "620-649"].includes(creditBand)) {
      return "rock_solid";
    }
    return "clicklease";
  };

  // Extract rep code from URL query parameter
  useEffect(() => {
    if (router.isReady && router.query.rep) {
      setRepCode(router.query.rep);
    }
  }, [router.isReady, router.query.rep]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\d\s\-\(\)]+$/.test(formData.phone) ||
      formData.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.zipcode.trim()) {
      newErrors.zipcode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipcode)) {
      newErrors.zipcode = "Please enter a valid ZIP code";
    }
    if (!formData.creditBand) {
      newErrors.creditBand = "Please select your credit range";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-format phone number
    const formattedValue = name === "phone" ? formatPhoneNumber(value) : value;

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/prequalification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone.replace(/\D/g, ""), // Send digits only
          zip: formData.zipcode,
          creditRange: formData.creditBand.replace(/-/g, "_"), // 650-699 -> 650_699
          repCode: repCode || null,
          source: "website",
          sourcePage: "/get-approved",
          recommendedPath: getRecommendedPath(formData.creditBand),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({
          success: true,
          creditBand: formData.creditBand,
          leadId: data.leadId,
        });
      } else {
        setSubmitResult({
          success: false,
          error: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        error: "Unable to submit. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRecommendation = () => {
    const { creditBand } = submitResult;

    if (["780+", "700-779", "650-699"].includes(creditBand)) {
      return {
        message: "You're likely a strong candidate for traditional financing.",
        primaryAction: {
          label: "Continue with RockSolid",
          url: LENDER_URLS.rocksolid,
        },
        secondaryAction: {
          label: "Try Lease-to-Own instead",
          url: LENDER_URLS.clicklease,
        },
      };
    }

    if (creditBand === "620-649") {
      return {
        message: "You may qualify with a co-signer or flexible options.",
        primaryAction: {
          label: "Apply with RockSolid",
          url: LENDER_URLS.rocksolid,
        },
        secondaryAction: {
          label: "Try Lease-to-Own",
          url: LENDER_URLS.clicklease,
        },
        showBoth: true,
      };
    }

    // below-620
    return {
      message: "Lease-to-Own is the best starting option for you.",
      primaryAction: {
        label: "Apply for Lease-to-Own",
        url: LENDER_URLS.clicklease,
      },
      secondaryAction: {
        label: "Try RockSolid with a co-signer",
        url: LENDER_URLS.rocksolid,
      },
    };
  };

  const openLenderApp = (url, ctaLabel) => {
    // Track which CTA was clicked
    fetch("/api/prequalification/cta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: submitResult?.leadId,
        ctaClicked: ctaLabel,
      }),
    }).catch(() => {}); // Fire and forget

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="prequalify-hero">
        <div className="container">
          <div className="prequalify-hero-content">
            <h1>Get Approved Today</h1>
            <p>Fast, simple trailer financing options. No obligation.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="prequalify-form-section">
        <div className="container">
          <div className="prequalify-form-wrapper">
            {!submitResult?.success ? (
              <>
                <form onSubmit={handleSubmit} className="prequalify-form" noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "error" : ""}
                        placeholder="John"
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <span className="error-message">{errors.firstName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "error" : ""}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "error" : ""}
                        placeholder="000-000-0000"
                        autoComplete="tel"
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="zipcode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        className={errors.zipcode ? "error" : ""}
                        placeholder="12345"
                        autoComplete="postal-code"
                        maxLength={10}
                      />
                      {errors.zipcode && <span className="error-message">{errors.zipcode}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="creditBand">Estimated Credit Score</label>
                    <select
                      id="creditBand"
                      name="creditBand"
                      value={formData.creditBand}
                      onChange={handleChange}
                      className={errors.creditBand ? "error" : ""}
                    >
                      {CREDIT_BANDS.map((band) => (
                        <option key={band.value} value={band.value}>
                          {band.label}
                        </option>
                      ))}
                    </select>
                    <span className="helper-text">
                      Don't know your score? A general estimate is fine.
                    </span>
                    {errors.creditBand && (
                      <span className="error-message">{errors.creditBand}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="button button-2 submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "See My Options"}
                  </button>

                  {submitResult?.success === false && (
                    <div className="submit-error">{submitResult.error}</div>
                  )}
                </form>

                {/* Trust Notes */}
                <div className="trust-notes">
                  <p>
                    <i className="fa-solid fa-lock"></i> Secure submission
                  </p>
                  <p>
                    <i className="fa-solid fa-shield-halved"></i> We do not sell your information
                  </p>
                  <p>
                    <i className="fa-solid fa-file-contract"></i> Final approval determined by
                    lender
                  </p>
                </div>
              </>
            ) : (
              /* Success / Recommendation UI */
              <div className="recommendation-container">
                <div className="success-icon">
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <h2>Thank You!</h2>
                <p className="recommendation-message">{getRecommendation().message}</p>

                {/* Lender Badge */}
                {getRecommendedPath(submitResult.creditBand) === "rock_solid" ? (
                  <div className="lender-badge">
                    <img
                      src="/assets/img/lenders/rocksolid-logo.webp"
                      alt="Rock Solid Funding"
                      className="lender-logo"
                    />
                    <div className="lender-trust">
                      <div className="stars">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                      </div>
                      <span className="trust-text">Trusted Financing Partner</span>
                    </div>
                  </div>
                ) : (
                  <div className="lender-badge">
                    <img
                      src="/assets/img/lenders/clicklease-logo.webp"
                      alt="ClickLease"
                      className="lender-logo"
                    />
                    <div className="lender-trust">
                      <div className="stars">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <span className="trust-text">Lease-to-Own Partner</span>
                    </div>
                  </div>
                )}

                <div className="recommendation-actions">
                  <button
                    className="button button-2"
                    onClick={() =>
                      openLenderApp(
                        getRecommendation().primaryAction.url,
                        getRecommendation().primaryAction.label
                      )
                    }
                  >
                    {getRecommendation().primaryAction.label}
                  </button>

                  {getRecommendation().showBoth ? (
                    <button
                      className="button button-outline"
                      onClick={() =>
                        openLenderApp(
                          getRecommendation().secondaryAction.url,
                          getRecommendation().secondaryAction.label
                        )
                      }
                    >
                      {getRecommendation().secondaryAction.label}
                    </button>
                  ) : (
                    <button
                      className="secondary-link"
                      onClick={() =>
                        openLenderApp(
                          getRecommendation().secondaryAction.url,
                          getRecommendation().secondaryAction.label
                        )
                      }
                    >
                      {getRecommendation().secondaryAction.label}
                    </button>
                  )}
                </div>

                <p className="post-submit-note">
                  A team member may reach out to assist with your application.
                </p>

                {/* Trust Notes */}
                <div className="trust-notes">
                  <p>
                    <i className="fa-solid fa-lock"></i> Secure submission
                  </p>
                  <p>
                    <i className="fa-solid fa-shield-halved"></i> We do not sell your information
                  </p>
                  <p>
                    <i className="fa-solid fa-file-contract"></i> Final approval determined by
                    lender
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetApproved;

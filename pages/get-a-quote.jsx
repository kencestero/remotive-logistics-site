import Layout from "@/src/layouts/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { formatPrice } from "@/lib/inventory";

const PURCHASE_TIMELINE = [
  { value: "", label: "Select your timeline" },
  { value: "asap", label: "As soon as possible" },
  { value: "week-or-two", label: "Within a week or Two" },
  { value: "month-or-more", label: "Within a month or more" },
];

const TRAILER_TYPES = [
  { value: "", label: "Select trailer type" },
  { value: "Enclosed Cargo", label: "Enclosed Cargo Trailer" },
  { value: "Dump", label: "Dump Trailer" },
  { value: "Utility", label: "Utility Trailer" },
  { value: "Car Hauler", label: "Car Hauler" },
  { value: "Concession", label: "Concession Trailer" },
  { value: "Other", label: "Other / Not Sure" },
];

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

const GetAQuote = () => {
  const router = useRouter();
  const [repCode, setRepCode] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipcode: "",
    purchaseTimeline: "",
    trailerType: "",
    additionalInfo: "",
  });
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [errors, setErrors] = useState({});
  const [showGeneralError, setShowGeneralError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract query parameters from URL (rep code and trailer type)
  useEffect(() => {
    if (router.isReady) {
      if (router.query.rep) {
        setRepCode(router.query.rep);
      }
      // Auto-select trailer type if coming from a trailer page
      if (router.query.type) {
        setFormData((prev) => ({ ...prev, trailerType: router.query.type }));
      }
      // Also check for trailer name to help with selection
      if (router.query.trailer) {
        // Try to match trailer name to a type
        const trailerName = router.query.trailer.toLowerCase();
        if (trailerName.includes("dump")) {
          setFormData((prev) => ({ ...prev, trailerType: "Dump" }));
        } else if (trailerName.includes("cargo") || trailerName.includes("enclosed")) {
          setFormData((prev) => ({ ...prev, trailerType: "Enclosed Cargo" }));
        } else if (trailerName.includes("utility")) {
          setFormData((prev) => ({ ...prev, trailerType: "Utility" }));
        } else if (trailerName.includes("car hauler")) {
          setFormData((prev) => ({ ...prev, trailerType: "Car Hauler" }));
        } else if (trailerName.includes("concession")) {
          setFormData((prev) => ({ ...prev, trailerType: "Concession" }));
        }
      }
      // If coming from inventory page with a specific unit
      if (router.query.unitId) {
        fetch(`/api/inventory-unit?id=${encodeURIComponent(router.query.unitId)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((unit) => {
            if (unit) {
              setSelectedUnit(unit);
              // Auto-populate trailer type from unit title
              const titleLower = unit.title.toLowerCase();
              if (titleLower.includes("dump")) {
                setFormData((prev) => ({ ...prev, trailerType: "Dump" }));
              } else if (titleLower.includes("cargo") || titleLower.includes("enclosed")) {
                setFormData((prev) => ({ ...prev, trailerType: "Enclosed Cargo" }));
              } else if (titleLower.includes("utility")) {
                setFormData((prev) => ({ ...prev, trailerType: "Utility" }));
              }
              // Prepend unit info to additional info
              setFormData((prev) => ({
                ...prev,
                additionalInfo:
                  prev.additionalInfo ||
                  `Interested in: ${unit.title} (${formatPrice(unit.startingPrice)})`,
              }));
            }
          })
          .catch(() => {
            // Silently fail — the form still works without unit preloading
          });
      }
    }
  }, [router.isReady, router.query]);

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
    } else if (!/^\d{5}$/.test(formData.zipcode)) {
      newErrors.zipcode = "Please enter a 5-digit ZIP code";
    }

    setErrors(newErrors);

    // Show general error message if any required fields are missing
    if (Object.keys(newErrors).length > 0) {
      setShowGeneralError(true);
    } else {
      setShowGeneralError(false);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Auto-format phone number
    if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    }
    // Zipcode: only allow digits, max 5
    else if (name === "zipcode") {
      formattedValue = value.replace(/\D/g, "").slice(0, 5);
    }
    // Limit additional info to 1000 characters
    else if (name === "additionalInfo" && value.length > 1000) {
      formattedValue = value.slice(0, 1000);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Hide general error when user starts fixing issues
    if (showGeneralError) {
      setShowGeneralError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote-request", {
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
          purchaseTimeline: formData.purchaseTimeline,
          trailerType: formData.trailerType,
          additionalInfo: formData.additionalInfo,
          repCode: repCode || null,
          unitId: selectedUnit?.id || null,
          unitTitle: selectedUnit?.title || null,
          source: router.query.source || "website",
          sourcePage: "/get-a-quote",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to thank you page
        router.push("/quote-thank-you");
      } else {
        setErrors({ submit: data.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setErrors({ submit: "Unable to submit. Please check your connection and try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="prequalify-hero">
        <div className="container">
          <div className="prequalify-hero-content">
            <h1>Get a Free Quote Today</h1>
            <p>Tell us about your trailer needs and we'll get back to you with pricing.</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="prequalify-form-section">
        <div className="container">
          <div className="prequalify-form-wrapper">
            {/* General Error Message */}
            {showGeneralError && (
              <div className="general-error-message">
                <i className="fa-solid fa-circle-info"></i>
                <span>
                  In order to provide you with the most accurate quote we will need additional
                  information.
                </span>
              </div>
            )}

            {/* Selected Unit from Inventory */}
            {selectedUnit && (
              <div className="selected-unit-banner">
                <div className="unit-info">
                  <div className="unit-label">Selected Trailer</div>
                  <div className="unit-title">{selectedUnit.title}</div>
                  <div className="unit-price">
                    Starting at {formatPrice(selectedUnit.startingPrice)}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="prequalify-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name <span className="required">*</span>
                  </label>
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
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name <span className="required">*</span>
                  </label>
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
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
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
                  <label htmlFor="phone">
                    Phone Number <span className="required">*</span>
                  </label>
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
                  <label htmlFor="zipcode">
                    ZIP Code <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    className={errors.zipcode ? "error" : ""}
                    placeholder="12345"
                    autoComplete="postal-code"
                    maxLength={5}
                  />
                  {errors.zipcode && <span className="error-message">{errors.zipcode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="purchaseTimeline">
                  How soon are you looking to purchase your new trailer?
                </label>
                <select
                  id="purchaseTimeline"
                  name="purchaseTimeline"
                  value={formData.purchaseTimeline}
                  onChange={handleChange}
                >
                  {PURCHASE_TIMELINE.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="trailerType">What type of trailer are you interested in?</label>
                <select
                  id="trailerType"
                  name="trailerType"
                  value={formData.trailerType}
                  onChange={handleChange}
                >
                  {TRAILER_TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="additionalInfo">
                  Additional Information <span className="optional">(Optional)</span>
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Tell us more about your trailer needs, specific features you're looking for, or any questions you have..."
                  rows={4}
                  maxLength={1000}
                />
                <span className="helper-text">
                  {formData.additionalInfo.length}/1000 characters
                </span>
              </div>

              <button type="submit" className="button button-2 submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "REQUEST QUOTE"}
              </button>

              {errors.submit && <div className="submit-error">{errors.submit}</div>}
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
                <i className="fa-solid fa-clock"></i> We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetAQuote;

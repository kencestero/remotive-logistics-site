import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";

const Apply = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    workAuth: "",
    roleInterest: "",
    bestSkills: "",
    experienceYears: "",
    availability: "",
    startTimeline: "",
    whyRemotive: "",
    agree: false,
  });

  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const isValid = useMemo(() => {
    const hasName = form.fullName.trim().length >= 2;
    const hasPhoneOrEmail = form.phone.trim().length >= 7 || form.email.trim().includes("@");
    const hasSkills = form.bestSkills.trim().length >= 10;
    const agreed = form.agree === true;
    return hasName && hasPhoneOrEmail && hasSkills && agreed;
  }, [form]);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setServerError(null);

    if (!isValid) {
      setServerError(
        "Please complete the required fields: name, contact, best skills, and agree to terms."
      );
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        fd.append(key, String(form[key]));
      });
      if (resume) fd.append("resume", resume);

      const res = await fetch("/api/applications", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed. Please try again.");
      }

      router.push("/careers/thank-you");
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-content">
                <ul className="crumbs d-flex">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/careers">
                      <i className="fa-solid fa-right-long" /> Careers
                    </Link>
                  </li>
                  <li className="two">
                    <Link href="/careers/apply">
                      <i className="fa-solid fa-right-long" /> Apply
                    </Link>
                  </li>
                </ul>
                <h1>Employee Application</h1>
                <p>Keep it short. If you're a fit, we'll call you soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="contact-form-section gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="contact-form-wrapper">
                {serverError && (
                  <div
                    style={{
                      marginBottom: "1.5rem",
                      padding: "1rem",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "8px",
                      color: "#ef4444",
                      fontSize: "0.875rem",
                    }}
                  >
                    {serverError}
                  </div>
                )}

                <form onSubmit={onSubmit} className="contact-form">
                  {/* Basic Contact */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Location (City/State)</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="e.g., Nyack, NY"
                        autoComplete="address-level2"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone (recommended)</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="(555) 555-5555"
                        autoComplete="tel"
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@email.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Role + Work Auth */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Role you want</label>
                      <select
                        value={form.roleInterest}
                        onChange={(e) => update("roleInterest", e.target.value)}
                      >
                        <option value="">Select one</option>
                        <option value="Sales Rep">Sales Rep</option>
                        <option value="Customer Support">Customer Support</option>
                        <option value="Operations/Dispatch">Operations/Dispatch</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Authorized to work in the U.S.?</label>
                      <select
                        value={form.workAuth}
                        onChange={(e) => update("workAuth", e.target.value)}
                      >
                        <option value="">Select one</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>

                  {/* REQUIRED Skills */}
                  <div className="form-group full-width">
                    <label>
                      What skills do you know best that would help Remotive Logistics? *
                    </label>
                    <textarea
                      value={form.bestSkills}
                      onChange={(e) => update("bestSkills", e.target.value)}
                      placeholder="Example: remote sales, lead follow-up, CRM, customer service, trailer knowledge, dispatching, social ads, video editing..."
                      rows={5}
                      required
                    />
                    <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--muted)" }}>
                      Be specific. This is the only required "long answer."
                    </p>
                  </div>

                  {/* Experience Questions */}
                  <div className="form-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <div className="form-group">
                      <label>Experience</label>
                      <select
                        value={form.experienceYears}
                        onChange={(e) => update("experienceYears", e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="0-1">0–1 yrs</option>
                        <option value="2-4">2–4 yrs</option>
                        <option value="5-9">5–9 yrs</option>
                        <option value="10+">10+ yrs</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Availability</label>
                      <select
                        value={form.availability}
                        onChange={(e) => update("availability", e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Start timeline</label>
                      <select
                        value={form.startTimeline}
                        onChange={(e) => update("startTimeline", e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="ASAP">ASAP</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="30 days">30 days</option>
                        <option value="60+ days">60+ days</option>
                      </select>
                    </div>
                  </div>

                  {/* Why Remotive */}
                  <div className="form-group full-width">
                    <label>Why do you want to work with Remotive? (optional)</label>
                    <textarea
                      value={form.whyRemotive}
                      onChange={(e) => update("whyRemotive", e.target.value)}
                      placeholder="Short answer is fine."
                      rows={4}
                    />
                  </div>

                  {/* Optional Resume Upload */}
                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "var(--bg-secondary)",
                      borderRadius: "12px",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <p
                          style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.25rem" }}
                        >
                          Resume (optional)
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: 0 }}>
                          PDF or DOCX recommended. Not required.
                        </p>
                      </div>

                      <label
                        className="button"
                        style={{
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          padding: "0.5rem 1rem",
                          margin: 0,
                        }}
                      >
                        <input
                          type="file"
                          style={{ display: "none" }}
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResume(e.target.files?.[0] || null)}
                        />
                        {resume ? "Change file" : "Upload file"}
                      </label>
                    </div>

                    {resume && (
                      <p
                        style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--muted)" }}
                      >
                        Selected: <strong>{resume.name}</strong>
                      </p>
                    )}
                  </div>

                  {/* REQUIRED Disclaimer */}
                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "var(--bg-secondary)",
                      borderRadius: "12px",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => update("agree", e.target.checked)}
                        style={{
                          marginTop: "0.25rem",
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
                        required
                      />
                      <span style={{ fontSize: "0.875rem", lineHeight: "1.5" }}>
                        I confirm the information provided is accurate. I understand this is an
                        application only and does not guarantee employment. I agree to be contacted
                        by Remotive Logistics regarding this application and acknowledge that
                        additional screening and verification may be required.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || submitting}
                    className="button button-2"
                    style={{
                      width: "100%",
                      opacity: !isValid || submitting ? 0.5 : 1,
                      cursor: !isValid || submitting ? "not-allowed" : "pointer",
                    }}
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      marginTop: "1rem",
                    }}
                  >
                    We typically respond within 1–2 business days.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;

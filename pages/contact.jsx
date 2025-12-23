import { useState } from "react";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success message
    // TODO: Integrate with Formspree or email API
    setSubmitted(true);
  };

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
                    <Link href="/contact">
                      <i className="fa-solid fa-right-long" /> Contact
                    </Link>
                  </li>
                </ul>
                <h1>Get in Touch</h1>
                <p>We're here to help with any questions about our trailers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="contact-card">
                <i className="fa-solid fa-phone" />
                <h4>Call Us</h4>
                <a href="tel:+18667366848" className="contact-link">
                  1-866-REMOTIV
                </a>
                <p>We speak English and Spanish</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
              <div className="contact-card">
                <i className="fa-solid fa-envelope" />
                <h4>Email Us</h4>
                <a href="mailto:info@remotivelogistics.com" className="contact-link">
                  info@remotivelogistics.com
                </a>
                <p>We'll respond within 24 hours</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="contact-card">
                <i className="fa-solid fa-clock" />
                <h4>Business Hours</h4>
                <p className="contact-link">Available 7 Days a Week</p>
                <p>Remote sales team ready to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        className="contact-form-section gap"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="contact-form-wrapper" data-aos="fade-up">
                <h2>Send Us a Message</h2>
                <p>
                  Whether you're looking for a specific trailer, have questions about financing, or
                  want to join our team — we'd love to hear from you.
                </p>

                {submitted ? (
                  <div className="success-message">
                    <i className="fa-solid fa-circle-check" />
                    <h3>Thank you for reaching out!</h3>
                    <p>We've received your message and will get back to you within 24 hours.</p>
                    <button
                      className="button button-2"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "",
                          message: "",
                        });
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
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
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a topic...</option>
                          <option value="trailer-inquiry">Trailer Inquiry</option>
                          <option value="financing">Financing Question</option>
                          <option value="careers">Join Our Team</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="message">Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        rows={5}
                        required
                      />
                    </div>

                    <button type="submit" className="button button-2">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center" data-aos="fade-up">
              <h2>Looking for Something Specific?</h2>
              <div className="quick-link-buttons">
                <Link href="/trailers" className="button button-2">
                  <i className="fa-solid fa-truck-ramp-box" /> Browse Trailers
                </Link>
                <Link href="/about" className="button button-outline">
                  <i className="fa-solid fa-building" /> About Us
                </Link>
                <Link href="/careers" className="button button-outline">
                  <i className="fa-solid fa-briefcase" /> Join Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

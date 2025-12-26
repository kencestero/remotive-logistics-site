// Contact Form API Endpoint
// Handles contact form submissions via Resend

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: "Name is required (minimum 2 characters)" });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email address is required" });
    }

    if (!subject || subject === "") {
      return res.status(400).json({ error: "Please select a subject" });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ error: "Message is required (minimum 10 characters)" });
    }

    // Map subject values to readable text
    const subjectMap = {
      "trailer-inquiry": "Trailer Inquiry",
      financing: "Financing Question",
      careers: "Join Our Team",
      other: "Other",
    };

    const subjectText = subjectMap[subject] || subject;

    // Create email HTML
    const emailHtml = `
      <h2 style="color: #e7311d; margin-bottom: 20px;">New Contact Form Submission</h2>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subjectText}</p>
      </div>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #333;">Message</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>

      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        This message was submitted through the Remotive Logistics contact form.
      </p>
    `;

    // Send email via Resend
    const emailResult = await resend.emails.send({
      from: "Remotive Contact <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL,
      replyTo: email, // Allow direct reply to the contact
      subject: `Contact Form: ${subjectText} - ${name}`,
      html: emailHtml,
    });

    console.log("✅ Contact form email sent successfully:", emailResult.id);

    // Success response
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("❌ Contact form submission error:", error);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }
}

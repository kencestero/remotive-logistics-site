// Employee Application API Endpoint
// Handles FormData submissions with optional resume file upload

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle FormData
  },
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse FormData
    const formData = await parseFormData(req);

    // Validate required fields
    const { fullName, bestSkills, agree } = formData;

    if (!fullName || fullName.trim().length < 2) {
      return res.status(400).json({ error: "Full name is required (minimum 2 characters)" });
    }

    if (!bestSkills || bestSkills.trim().length < 10) {
      return res
        .status(400)
        .json({ error: "Skills description is required (minimum 10 characters)" });
    }

    if (agree !== "true") {
      return res.status(400).json({ error: "You must agree to the terms" });
    }

    // Validate at least one contact method
    const { phone, email } = formData;
    const hasPhone = phone && phone.trim().length >= 7;
    const hasEmail = email && email.trim().includes("@");

    if (!hasPhone && !hasEmail) {
      return res
        .status(400)
        .json({ error: "Please provide either a phone number or email address" });
    }

    // Send email notification via Resend
    try {
      const emailHtml = `
        <h2 style="color: #e7311d; margin-bottom: 20px;">New Employee Application Received</h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
          <p><strong>Name:</strong> ${formData.fullName}</p>
          <p><strong>Phone:</strong> ${formData.phone || "N/A"}</p>
          <p><strong>Email:</strong> ${formData.email || "N/A"}</p>
          <p><strong>Location:</strong> ${formData.location || "N/A"}</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Position Details</h3>
          <p><strong>Role Interest:</strong> ${formData.roleInterest || "Not specified"}</p>
          <p><strong>Work Authorization:</strong> ${formData.workAuth || "N/A"}</p>
          <p><strong>Experience:</strong> ${formData.experienceYears || "Not specified"}</p>
          <p><strong>Availability:</strong> ${formData.availability || "Not specified"}</p>
          <p><strong>Start Timeline:</strong> ${formData.startTimeline || "Not specified"}</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Skills & Motivation</h3>
          <p><strong>Best Skills:</strong></p>
          <p style="white-space: pre-wrap;">${formData.bestSkills}</p>
          ${
            formData.whyRemotive
              ? `<p><strong>Why Remotive:</strong></p><p style="white-space: pre-wrap;">${formData.whyRemotive}</p>`
              : ""
          }
        </div>

        ${
          formData.resumeFileName
            ? `<div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #e7311d;">
                 <p style="margin: 0;"><strong>📎 Resume Attached:</strong> ${formData.resumeFileName}</p>
               </div>`
            : ""
        }

        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This application was submitted through the Remotive Logistics careers page.
        </p>
      `;

      const emailData = {
        from: "Remotive Careers <onboarding@resend.dev>",
        to: process.env.RESEND_TO_EMAIL,
        subject: `New Application: ${formData.fullName} - ${formData.roleInterest || "General"}`,
        html: emailHtml,
      };

      // Send email via Resend
      const emailResult = await resend.emails.send(emailData);

      console.log("✅ Application email sent successfully:", emailResult.id);
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
      // Don't fail the entire request if email fails - log and continue
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("❌ Application submission error:", error);
    return res.status(500).json({ error: "Failed to process application. Please try again." });
  }
}

// Helper function to parse FormData from the request
async function parseFormData(req) {
  return new Promise((resolve, reject) => {
    const formidable = require("formidable");
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB max file size
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      // Convert fields to plain object (formidable returns arrays)
      const data = {};
      Object.keys(fields).forEach((key) => {
        data[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
      });

      // Add resume file info if present
      if (files.resume) {
        const resume = Array.isArray(files.resume) ? files.resume[0] : files.resume;
        data.resumeFileName = resume.originalFilename;
        data.resumePath = resume.filepath;
        data.resumeSize = resume.size;
        data.resumeType = resume.mimetype;
      }

      resolve(data);
    });
  });
}

// Employee Application API Endpoint
// Handles FormData submissions with optional resume file upload

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

    // Log application data (in production, save to database or send email)
    console.log("📝 New Application Received:");
    console.log("Name:", formData.fullName);
    console.log("Phone:", formData.phone || "N/A");
    console.log("Email:", formData.email || "N/A");
    console.log("Location:", formData.location || "N/A");
    console.log("Work Auth:", formData.workAuth || "N/A");
    console.log("Role Interest:", formData.roleInterest || "N/A");
    console.log("Skills:", formData.bestSkills);
    console.log("Experience:", formData.experienceYears || "N/A");
    console.log("Availability:", formData.availability || "N/A");
    console.log("Start Timeline:", formData.startTimeline || "N/A");
    console.log("Why Remotive:", formData.whyRemotive || "N/A");
    console.log("Resume:", formData.resumeFileName || "No resume uploaded");

    // TODO: Add email notification or database storage here
    // Example: await sendEmailNotification(formData);
    // Example: await saveToDatabase(formData);

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

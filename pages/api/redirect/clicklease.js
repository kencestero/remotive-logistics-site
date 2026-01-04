export default function handler(req, res) {
  const token = process.env.CLICKLEASE_TOKEN;

  if (!token) {
    console.error("CLICKLEASE_TOKEN not configured");
    return res.redirect(302, "https://app.clicklease.com");
  }

  const redirectUrl = `https://app.clicklease.com/inlineapp?token=${token}`;
  return res.redirect(302, redirectUrl);
}

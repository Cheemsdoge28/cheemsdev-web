import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);
const senderEmail = "info@risebitfintech.com";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, enquiryType, message } = data;

    // Email to site owner
    const ownerEmail = await resend.emails.send({
      from: `Risebit Fintech <${senderEmail}>`,
      to: ["grbmax@gmail.com", "info@risebitfintech.com", "rbhat74@gmail.com"],
      subject: `New Contact Lead: ${name}`,
      html: `
        <h2>New Contact Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    // Email to user
    const userEmail = await resend.emails.send({
      from: `Risebit Fintech <${senderEmail}>`,
      to: [email],
      subject: "Thank you for contacting Risebit Fintech!",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Risebit Fintech. We have received your enquiry and will get back to you soon.</p>
        <p><strong>Your message:</strong></p>
        <blockquote>${message.replace(/\n/g, '<br/>')}</blockquote>
        <p>Best regards,<br/>Risebit Fintech Team</p>
      `,
    });

    if (ownerEmail.error || userEmail.error) {
      throw new Error(ownerEmail.error?.message || userEmail.error?.message || "Failed to send email.");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 500 });
  }
}

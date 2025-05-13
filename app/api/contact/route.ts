import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EMAIL_FROM_NAME, HEADER_NAME } from "@/lib/constants";
import { NEXT_PUBLIC_SITE_URL } from "@/lib/constants";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);
// const senderEmail = "contact.cheemsdev@gmail.com";
const senderEmail = "onboarding@resend.dev";

interface EmailHeaderStyles {
  textAlign: string;
  padding: string;
  backgroundColor: string;
  color: string;
  fontFamily: string;
}

interface LogoStyles {
  verticalAlign: string;
}

interface TitleStyles {
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  fontFamily: string;
}

const getEmailHeader = (): string => {
  const headerStyles: EmailHeaderStyles = {
    textAlign: "center",
    padding: "24px 0",
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
  };

  const logoStyles: LogoStyles = {
    verticalAlign: "middle",
  };

  const titleStyles: TitleStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "2px",
    fontFamily: "monospace",
  };

  return `
    <div style="
      text-align: ${headerStyles.textAlign};
      padding: ${headerStyles.padding};
      background-color: ${headerStyles.backgroundColor};
      color: ${headerStyles.color};
      font-family: ${headerStyles.fontFamily};
    ">
      <div style="display: inline-flex; align-items: center; gap: 12px;">
        <img src="${NEXT_PUBLIC_SITE_URL}/images/logo.png" alt="Logo" width="40" height="40" style="vertical-align: ${logoStyles.verticalAlign};" />
        <span style="
          font-size: ${titleStyles.fontSize};
          font-weight: ${titleStyles.fontWeight};
          letter-spacing: ${titleStyles.letterSpacing};
          font-family: ${titleStyles.fontFamily};
        ">
          ${HEADER_NAME}
        </span>
      </div>
    </div>
  `;
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, phone, enquiryType, message } = data;

    const emailHeader = getEmailHeader();
    const messageHtml = message.replace(/\n/g, "<br/>");

    // Email to site owner
    const ownerEmail = await resend.emails.send({
      from: `${EMAIL_FROM_NAME} <${senderEmail}>`,
      to: ["irbmax28@gmail.com"],
      subject: `New Contact Lead: ${name}`,
      html: `
        ${emailHeader}
        <div style="padding: 24px; font-family: 'Segoe UI', sans-serif; background-color: #0a0a0a; color: #ffffff;">
          <h2 style="font-size: 20px; margin-bottom: 16px;">📥 New Contact Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Enquiry Type:</strong> ${enquiryType}</p>
          <p><strong>Message:</strong><br/>${messageHtml}</p>
        </div>
      `,
    });

    // Email to user
    const userEmail = await resend.emails.send({
      from: `${EMAIL_FROM_NAME} <${senderEmail}>`,
      to: [email],
      subject: `Thank you for contacting ${EMAIL_FROM_NAME}!`,
      html: `
        ${emailHeader}
        <div style="padding: 24px; font-family: 'Segoe UI', sans-serif; background-color: #0a0a0a; color: #ffffff;">
          <h2 style="font-size: 20px; margin-bottom: 16px;">👋 Thank you for reaching out!</h2>
          <p>Hey ${name},</p>
          <p>Thank you for contacting <strong>${EMAIL_FROM_NAME}</strong>. We have received your enquiry and will get back to you shortly.</p>
          <hr style="margin: 16px 0; border-color: #333;" />
          <p><strong>Your message:</strong></p>
          <blockquote style="margin: 12px 0; padding-left: 12px; border-left: 2px solid #666;">${messageHtml}</blockquote>
          <p>Best regards,<br/>${HEADER_NAME}</p>
        </div>
      `,
    });

    if (ownerEmail.error || userEmail.error) {
      throw new Error(ownerEmail.error?.message ?? userEmail.error?.message ?? "Failed to send email.");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: error.message ?? "Failed to send email." }, { status: 500 });
  }
}

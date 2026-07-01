import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Helper function to generate an elegant email template
function generateEmailHtml(title: string, subtitle: string, booking: any, isOwnerCopy: boolean) {
  const detailRows = [
    { label: "Treatment / Service", value: booking.selectedService },
    { label: "Estimated Total", value: booking.selectedPrice, highlight: true },
    { label: "Date", value: booking.bookingDate },
    { label: "Time Slot", value: booking.bookingTime },
    { label: "Customer Name", value: booking.fullName },
    { label: "Email Address", value: booking.emailAddress },
    { label: "Phone Number", value: booking.phoneNumber },
  ];

  if (booking.specialRequests) {
    detailRows.push({ label: "Special Requests", value: booking.specialRequests, highlight: false });
  }

  const rowsHtml = detailRows
    .map(
      (row) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e8d8ce; color: #6b5a4e; font-size: 14px; font-weight: bold; width: 35%;">${row.label}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e8d8ce; color: #4a3b32; font-size: 14px; ${
        row.highlight ? "color: #8b7355; font-weight: bold; font-size: 16px;" : ""
      }">${row.value}</td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #fdfbf9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fdfbf9; padding: 40px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #d4c4b7; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 12px rgba(74, 59, 50, 0.05);">
              
              <!-- Header banner -->
              <tr>
                <td style="background-color: #4a3b32; padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; font-family: Georgia, serif; font-size: 28px; margin: 0; font-weight: normal; letter-spacing: 1px;">Pearl & Polish</h1>
                  <p style="color: #d4c4b7; font-size: 14px; margin: 5px 0 0 0; letter-spacing: 2px; text-transform: uppercase;">Manicure & Nail Spa</p>
                </td>
              </tr>

              <!-- Title & Greeting -->
              <tr>
                <td style="padding: 40px 30px 20px 30px; text-align: center;">
                  <h2 style="color: #4a3b32; font-family: Georgia, serif; font-size: 22px; margin: 0; font-weight: bold;">${title}</h2>
                  <p style="color: #6b5a4e; font-size: 15px; line-height: 1.5; margin: 10px 0 0 0;">${subtitle}</p>
                </td>
              </tr>

              <!-- Detail Table -->
              <tr>
                <td style="padding: 10px 30px 30px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; background-color: #fdfbf9; border: 1px solid #e8d8ce; border-radius: 12px; overflow: hidden;">
                    ${rowsHtml}
                  </table>
                </td>
              </tr>

              <!-- Footer/Advisory -->
              <tr>
                <td style="padding: 0 30px 40px 30px; text-align: center; border-top: 1px solid #f2ebe5;">
                  ${
                    isOwnerCopy
                      ? `<p style="color: #8b7355; font-size: 13px; line-height: 1.5; margin: 20px 0 0 0; font-weight: bold;">This is an automated operational notice sent to amirahuda0312@gmail.com.</p>`
                      : `<p style="color: #8b7355; font-size: 13px; line-height: 1.5; margin: 20px 0 0 0; font-weight: bold;">Important cancellation policy:</p>
                         <p style="color: #7a6a5e; font-size: 12px; line-height: 1.5; margin: 4px 0 0 0;">If you need to reschedule or cancel your treatment, please let us know at least 24 hours in advance. No advanced deposits are charged; payment is made after your appointment.</p>
                         <p style="color: #7a6a5e; font-size: 12px; line-height: 1.5; margin: 15px 0 0 0;">📍 Our Salon Location: Ground Floor, Luxury Arcade, Kuala Lumpur<br>📞 Contact: +60 12-345-6789</p>`
                  }
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// Booking verification & logger endpoint (notifications handled client-side)
app.post("/api/book", async (req, res) => {
  const {
    selectedService,
    selectedPrice,
    bookingDate,
    bookingTime,
    fullName,
    emailAddress,
    phoneNumber,
    specialRequests,
  } = req.body;

  if (!fullName || !emailAddress || !bookingDate || !bookingTime) {
    return res.status(400).json({ error: "Missing required booking details." });
  }

  const merchantEmail = "amirahuda0312@gmail.com";
  console.log(`[Backend Logging] Booking confirmed for ${fullName} (${emailAddress}) on ${bookingDate} at ${bookingTime}.`);

  return res.status(200).json({
    success: true,
    message: "Booking recorded successfully on backend.",
    sentToMerchant: merchantEmail,
    sentToCustomer: emailAddress,
  });
});

// Static file hosting setup
async function startServer() {
  const rootPath = process.cwd();

  // Serve static files from root directory (assets, images, scripts, style)
  app.use(express.static(rootPath));

  // Serve specific frontend files from root
  app.get("/script.js", (req, res) => {
    res.sendFile(path.join(rootPath, "script.js"));
  });
  app.get("/style.css", (req, res) => {
    res.sendFile(path.join(rootPath, "style.css"));
  });
  app.get("/index.html", (req, res) => {
    res.sendFile(path.join(rootPath, "index.html"));
  });

  // Fallback for SPA routing to serve root index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(rootPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();

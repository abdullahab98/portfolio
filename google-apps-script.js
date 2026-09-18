/**
 * GOOGLE APPS SCRIPT FOR ABDULLAH'S PORTFOLIO
 * -------------------------------------------
 * এই স্ক্রিপ্টটি ২টি কাজ একসাথে করে:
 * ১. ভিজিটরের মেসেজ Google Sheet-এ নতুন রো হিসেবে যোগ করে।
 * ২. আপনার জিমেইল থেকে ভিজিটরের ইমেইলে সাথে সাথে একটি সুন্দর Thank-You কনফার্মেশন ইমেইল পাঠিয়ে দেয়!
 *
 * সেটআপের নিয়ম:
 * ১. আপনার Google Sheet-এ যান (Extensions > Apps Script)।
 * ২. আগের সব কোড মুছে এই কোডটি পেস্ট করুন এবং Save (Ctrl+S) করুন।
 * ৩. উপরে ডানে "Deploy" বাটনে ক্লিক করে "Manage deployments" এ যান।
 * ৪. পেনসিল আইকনে (Edit) ক্লিক করুন:
 *    - Version: "New version" সিলেক্ট করুন
 *    - Who has access: অবশ্যই "Anyone" (যে কেউ) সিলেক্ট করবেন!
 * ৫. "Deploy" চাপুন।
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var name = data.name || "Visitor";
    var email = data.email || "";
    var subject = data.subject || "General Inquiry";
    var message = data.message || "";

    // Auto-create styled headers if this is a fresh sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date & Time",
        "Name",
        "Email",
        "Subject",
        "Message",
        "Status"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 6);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0b0f19");
      headerRange.setFontColor("#00f0ff");
      sheet.setFrozenRows(1);
    }

    var timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "medium",
      timeStyle: "short"
    });

    // ১. Google Sheet-এ এন্ট্রি যোগ করা
    sheet.appendRow([
      timestamp,
      name,
      email,
      subject,
      message,
      "Received"
    ]);

    // ২. ভিজিটরের ইমেইলে সরাসরি আপনার Gmail থেকে Thank-You ইমেইল পাঠানো
    if (email && email.indexOf("@") !== -1) {
      var htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0b0f19; color: #f8fafc; border-radius: 12px; border: 1px solid rgba(0, 240, 255, 0.25);">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="display: inline-block; padding: 6px 14px; background-color: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 20px; color: #00f0ff; font-size: 11px; font-family: monospace; margin-bottom: 10px;">
              // MESSAGE RECEIVED
            </div>
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Thank You for Reaching Out, ${escapeHtml(name)}! 👋</h2>
          </div>

          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            I have received your message regarding <strong>"${escapeHtml(subject)}"</strong>. Thank you for connecting with me through my portfolio!
          </p>

          <div style="background-color: rgba(255, 255, 255, 0.04); border-left: 3px solid #00f0ff; padding: 12px 16px; border-radius: 4px; margin: 16px 0;">
            <p style="color: #94a3b8; font-size: 11px; margin: 0 0 6px 0; text-transform: uppercase;">Your message summary:</p>
            <p style="color: #e2e8f0; font-size: 13px; font-style: italic; line-height: 1.5; margin: 0;">"${escapeHtml(message)}"</p>
          </div>

          <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
            I will review your message and reply as soon as possible (usually within 24 hours).
          </p>

          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 16px; margin-top: 20px;">
            <p style="color: #ffffff; font-weight: 600; font-size: 14px; margin: 0 0 2px 0;">Md. Abdullah</p>
            <p style="color: #64748b; font-size: 12px; margin: 0 0 10px 0;">Full-Stack Software Engineer | CSE, Southeast University</p>
            <div style="font-size: 12px; color: #94a3b8;">
              <span>WhatsApp: +8801780879898</span> • 
              <a href="https://github.com/abdullahab98" style="color: #38bdf8; text-decoration: none; margin-left: 4px;">GitHub</a> • 
              <a href="https://linkedin.com/in/md-abdullah-seu" style="color: #38bdf8; text-decoration: none; margin-left: 4px;">LinkedIn</a>
            </div>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: email,
        subject: "Thank you for reaching out, " + name + "! | Md. Abdullah",
        htmlBody: htmlBody
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Logged to Sheet and Thank-You email sent." })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheet Webhook is active and running.");
}

function escapeHtml(text) {
  if (!text) return "";
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

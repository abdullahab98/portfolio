/**
 * GOOGLE APPS SCRIPT FOR ABDULLAH'S PORTFOLIO
 * -------------------------------------------
 * Follow these simple steps:
 * 1. Open your Google Sheet (e.g. "Portfolio Contacts").
 * 2. Click "Extensions" menu -> "Apps Script".
 * 3. Delete any code in Code.gs and paste all the code below.
 * 4. Click "Deploy" (top right) -> "New deployment".
 * 5. Click the gear icon (Select type) -> select "Web app".
 * 6. Under "Execute as", select "Me (your email)".
 * 7. Under "Who has access", select "Anyone".
 * 8. Click "Deploy", authorize access, and copy the "Web app URL" (ends with /exec).
 * 9. Paste that URL into your .env or Vercel environment variables as:
 *    GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
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

    // Append visitor data row
    sheet.appendRow([
      timestamp,
      data.name || "Anonymous",
      data.email || "No Email",
      data.subject || "General Inquiry",
      data.message || "",
      "Received"
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Row inserted successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheet Webhook is active and listening for POST requests.");
}

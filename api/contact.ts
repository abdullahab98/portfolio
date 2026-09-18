import { Resend } from 'resend'

// Environment variables:
// RESEND_API_KEY: your Resend API key (re_...)
// RESEND_FROM_EMAIL: e.g. "Md. Abdullah <onboarding@resend.dev>" or "Md. Abdullah <contact@yourdomain.com>"
// GOOGLE_SHEET_WEBHOOK_URL: Google Apps Script Web App URL to append rows
const ABDULLAH_EMAIL = 'mdabdullah.ab898@gmail.com'

export default async function handler(req: any, res: any) {
  // Allow CORS for local dev / client requests
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    let body = req.body
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        // fallback
      }
    }

    const { name, email, subject, message } = body || {}

    // 1. Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Md. Abdullah <onboarding@resend.dev>'
    const googleSheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL

    const tasks: Promise<any>[] = []

    // 2. Google Sheet Entry (async webhook)
    if (googleSheetUrl) {
      const sheetTask = fetch(googleSheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject ? subject.trim() : 'General Inquiry',
          message: message.trim(),
          timestamp: new Date().toISOString()
        })
      }).catch((err) => {
        console.error('Failed to log entry into Google Sheet:', err)
      })
      tasks.push(sheetTask)
    } else {
      console.warn('GOOGLE_SHEET_WEBHOOK_URL is not set. Skipping sheet log.')
    }

    // 3. Resend Emails
    if (apiKey) {
      const resend = new Resend(apiKey)

      // Email 1: Notification to Abdullah
      const notificationHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0b0f19; color: #f8fafc; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
          <div style="border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="color: #00f0ff; margin: 0; font-size: 20px;">🚀 New Portfolio Message Received</h2>
            <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">Received via Abdullah's Portfolio Contact Form</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 100px; font-size: 14px;"><strong>From:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${escapeHtml(subject || 'General Inquiry')}</td>
            </tr>
          </table>

          <div style="background-color: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Message Content:</p>
            <p style="color: #f1f5f9; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
          </div>

          <div style="text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 16px;">
            <a href="mailto:${escapeHtml(email)}?subject=Re: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background: linear-gradient(135deg, #00f0ff, #0284c7); color: #020617; font-weight: bold; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px;">
              Reply to ${escapeHtml(name)}
            </a>
          </div>
        </div>
      `

      const sendNotificationTask = resend.emails.send({
        from: fromEmail,
        to: ABDULLAH_EMAIL,
        replyTo: `${name} <${email}>`,
        subject: `[Portfolio] ${subject || 'New Message'} from ${name}`,
        html: notificationHtml
      })

      // Email 2: Thank You / Auto-reply to visitor
      const thankYouHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background-color: #0b0f19; color: #f8fafc; border-radius: 12px; border: 1px solid rgba(0, 240, 255, 0.2);">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="display: inline-block; padding: 8px 16px; background-color: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 20px; color: #00f0ff; font-size: 12px; font-family: monospace; margin-bottom: 12px;">
              // MESSAGE CONFIRMATION
            </div>
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 700;">Thank You for Reaching Out, ${escapeHtml(name)}! 👋</h1>
          </div>

          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
            I have received your message regarding <strong>"${escapeHtml(subject || 'your inquiry')}"</strong>. Thank you for taking the time to connect with me!
          </p>

          <div style="background-color: rgba(255, 255, 255, 0.03); border-left: 3px solid #00f0ff; padding: 14px 18px; border-radius: 4px; margin: 20px 0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0 0 6px 0; text-transform: uppercase;">Summary of your message:</p>
            <p style="color: #e2e8f0; font-size: 14px; font-style: italic; line-height: 1.5; margin: 0;">"${escapeHtml(message)}"</p>
          </div>

          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            I review incoming messages regularly and will get back to you as soon as possible (usually within 24 hours).
          </p>

          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; margin-top: 24px; text-align: left;">
            <p style="color: #ffffff; font-weight: 600; font-size: 15px; margin: 0 0 4px 0;">Md. Abdullah</p>
            <p style="color: #64748b; font-size: 13px; margin: 0 0 12px 0;">Full-Stack Software Engineer | CSE, Southeast University</p>
            <div style="font-size: 13px; color: #94a3b8;">
              <span>🌐 WhatsApp: +8801780879898</span> • 
              <a href="https://github.com/abdullah-cse-seu" style="color: #38bdf8; text-decoration: none; margin-left: 6px;">GitHub</a> • 
              <a href="https://linkedin.com/in/md-abdullah-seu" style="color: #38bdf8; text-decoration: none; margin-left: 6px;">LinkedIn</a>
            </div>
          </div>
        </div>
      `

      const sendThankYouTask = resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Thank you for reaching out, ${name}! | Md. Abdullah`,
        html: thankYouHtml
      })

      tasks.push(sendNotificationTask, sendThankYouTask)
    } else {
      console.warn('RESEND_API_KEY is not configured. Emails were not sent.')
    }

    await Promise.allSettled(tasks)

    return res.status(200).json({
      success: true,
      message: 'Message processed successfully. Notification and thank-you emails queued.'
    })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return res.status(500).json({
      error: 'Failed to send message. Please try again or email directly.',
      details: error?.message || String(error)
    })
  }
}

function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Vercel Serverless Function: api/notify.ts
// Sends an email notification to the IData business owner when a new lead or review is submitted.
// Safe fallback: If RESEND_API_KEY or OWNER_EMAIL are not configured, it returns a 200 { sent: false, reason: "demo_mode" }
// without breaking the user experience.

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body || {};
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL || 'issacujay@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'notifications@idata.agency';

  if (!apiKey) {
    console.log('[Notify Service] Resend API key not configured. Skipping email notification (Demo Mode). Lead/Review was saved to DB.');
    return res.status(200).json({ 
      sent: false, 
      message: 'Demo mode active. Notification skipped. Data preserved in database.' 
    });
  }

  try {
    let subject = 'New Submission from IData Website';
    let htmlContent = '';

    if (type === 'lead') {
      subject = `[New Lead] ${data.name} from ${data.company || 'Direct Client'}`;
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b;">
          <h2 style="color: #0284c7; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Project Quote Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Service of Interest:</strong> ${data.service_slug}</p>
          <p><strong>Budget Range:</strong> ${data.budget_range || 'Not specified'}</p>
          <p><strong>Source Page:</strong> ${data.source_page || '/'}</p>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #0284c7; margin-top: 15px;">
            <strong>Project Overview:</strong>
            <p style="white-space: pre-wrap; margin-top: 8px;">${data.message}</p>
          </div>
          ${data.attachment_path ? `<p><strong>Attachment:</strong> ${data.attachment_path}</p>` : ''}
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 25px;" />
          <p style="font-size: 12px; color: #64748b;">This email was sent automatically by IData Platform Notification Service.</p>
        </div>
      `;
    } else if (type === 'review') {
      subject = `[New Review Submitted] ${data.rating}★ by ${data.author_name}`;
      htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1e293b;">
          <h2 style="color: #0284c7;">New Review Awaiting Approval</h2>
          <p><strong>Author:</strong> ${data.author_name} (${data.role_title} at ${data.company})</p>
          <p><strong>Service:</strong> ${data.service_slug}</p>
          <p><strong>Rating:</strong> ${data.rating} / 5 Stars</p>
          <blockquote style="background: #f1f5f9; padding: 12px; font-style: italic; border-left: 3px solid #6366f1;">
            "${data.body}"
          </blockquote>
          <p>Log in to the Admin Dashboard at <code>/admin</code> to approve or reject this testimonial.</p>
        </div>
      `;
    } else if (type === 'newsletter') {
      subject = `[Newsletter Subscriber] ${data.email}`;
      htmlContent = `<p>New subscriber joined your mailing list: <strong>${data.email}</strong></p>`;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: ownerEmail,
        subject,
        html: htmlContent
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Notify Service] Resend API error:', errText);
      return res.status(500).json({ error: 'Failed to send email via Resend' });
    }

    const result = await response.json();
    return res.status(200).json({ sent: true, id: result.id });
  } catch (err: any) {
    console.error('[Notify Service] Exception:', err);
    return res.status(500).json({ error: err.message });
  }
}

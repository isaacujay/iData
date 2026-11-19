// Client notification service
// Invokes /api/notify serverless function with error tolerance

export async function sendNotification(
  type: 'lead' | 'review' | 'newsletter',
  data: Record<string, any>
): Promise<{ sent: boolean; message?: string }> {
  try {
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data })
    });

    if (!response.ok) {
      console.warn('[Notification Service] /api/notify returned non-200. Will rely on database records.');
      return { sent: false };
    }

    const res = await response.json();
    return res;
  } catch (err) {
    // Non-blocking: failure to notify via email should never crash the user experience
    console.info('[Notification Service] Background email notification handled:', err);
    return { sent: false };
  }
}

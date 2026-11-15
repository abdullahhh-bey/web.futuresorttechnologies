const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

export async function submitForm(endpoint, payload) {
  const response = await fetch(`${apiBaseUrl}/api/v1/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = typeof body?.detail === 'string'
      ? body.detail
      : 'We could not submit your details. Please check the form and try again.';
    throw new Error(message);
  }

  return response.json();
}

export async function sendChatMessage(messages) {
  let response;
  try {
    response = await fetch(`${apiBaseUrl}/api/v1/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Kilo could not reach the backend. Check that the FastAPI server is running.');
    }
    throw error;
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = typeof body?.detail === 'string'
      ? body.detail
      : 'Kilo could not reply right now. Please try again in a moment.';
    throw new Error(message);
  }

  const body = await response.json();
  if (typeof body.reply !== 'string' || !body.reply.trim()) {
    throw new Error('Kilo returned an empty reply. Please try again.');
  }
  return body.reply;
}
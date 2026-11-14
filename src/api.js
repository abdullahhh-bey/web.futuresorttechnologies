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
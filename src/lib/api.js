const CLIENT_ID_KEY = 'resume-analyzer-client-id';

function getClientId() {
  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  return clientId;
}

async function request(url, options) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('Unable to reach the server. Check your connection and try again.');
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Something went wrong. Please try again.');
  }
  return payload;
}

export function createAnalysis(formData) {
  return request('/api/analyze', {
    method: 'POST',
    headers: { 'X-Client-ID': getClientId() },
    body: formData,
  });
}

export function getAnalysis(id) {
  return request(`/api/analyses/${encodeURIComponent(id)}`, {
    headers: { 'X-Client-ID': getClientId() },
  });
}

export function getAnalyses() {
  return request('/api/analyses', {
    headers: { 'X-Client-ID': getClientId() },
  });
}

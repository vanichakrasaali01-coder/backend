const API_BASE = '';
export async function api(path, options = {}) {
  const token = localStorage.getItem('nb_token');
  const response = await fetch(`${API_BASE}/api/${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

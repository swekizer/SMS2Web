const BASE_URL = 'https://sms2web.onrender.com/'; // Change to match backend if deployed

const getAuthHeader = () => {
  const token = localStorage.getItem('auth_token');
  return token ? { 'Authorization': `Basic ${token}` } : {};
};

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.text();
};

export const login = async (email, password) => {
  const token = btoa(`${email}:${password}`);
  const res = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${token}`,
    }
  });
  if (!res.ok) throw new Error('Login failed');
  const user = await res.json();
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

export const getSms = async () => {
  const res = await fetch(`${BASE_URL}/sms`, {
    method: 'GET',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to fetch SMS');
  return res.json();
};

export const deleteSms = async (id) => {
  const res = await fetch(`${BASE_URL}/sms/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!res.ok) throw new Error('Failed to delete SMS');
  return true;
};

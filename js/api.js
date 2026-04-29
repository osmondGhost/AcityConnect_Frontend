// API Configuration
const DEFAULT_API_BASE_URL = 'http://localhost:5000/api';
const PRODUCTION_API_BASE_URL = 'https://acityconnect.onrender.com/api';

function normalizeApiBaseUrl(url) {
  return String(url).replace(/\/$/, '');
}

function resolveApiBaseUrl() {
  if (typeof window === 'undefined') {
    return DEFAULT_API_BASE_URL;
  }

  if (window.__ACITY_API_BASE_URL__) {
    return normalizeApiBaseUrl(window.__ACITY_API_BASE_URL__);
  }

  const savedBaseUrl = localStorage.getItem('acityConnectApiBaseUrl');
  if (savedBaseUrl) {
    return normalizeApiBaseUrl(savedBaseUrl);
  }

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return DEFAULT_API_BASE_URL;
  }

  return PRODUCTION_API_BASE_URL;
}

const API_BASE_URL = resolveApiBaseUrl();

function setApiBaseUrl(url) {
  const normalizedUrl = normalizeApiBaseUrl(url);
  localStorage.setItem('acityConnectApiBaseUrl', normalizedUrl);
  return normalizedUrl;
}

if (typeof window !== 'undefined') {
  window.setAcityConnectApiBaseUrl = setApiBaseUrl;
  window.getAcityConnectApiBaseUrl = resolveApiBaseUrl;
}

// Utility function to get token from localStorage
function getToken() {
  return localStorage.getItem('token');
}

// Utility function to make API calls
async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (getToken()) {
    options.headers['Authorization'] = `Bearer ${getToken()}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API Error');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Check if user is logged in
function isLoggedIn() {
  return !!getToken();
}

// Redirect to login if not authenticated
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'auth.html';
  }
}

// Get current user ID from token
function getCurrentUserId() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch {
    return null;
  }
}

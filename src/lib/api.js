// lib/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL, // 'http://localhost:8000/api'
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Antes de cada petición, inyecta el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // O leer de cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


export async function getInvitationByUuid(uuid) {
  try {
    // Importante: cache: 'no-store' para que siempre traiga datos frescos (útil para ver cambios en RSVP)
    const res = await fetch(`${API_URL}/invitation/${uuid}/`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`Error fetching invitation: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error en getInvitationByUuid:", error);
    return null;
  }
}
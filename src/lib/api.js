// lib/api.ts
import axios from 'axios';
import cookie from 'js-cookie';

import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL, // 'http://localhost:8000/api'
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Antes de cada petición, inyecta el token si existe
api.interceptors.request.use((config) => {
  // solo inyectamos token si estamos en el navegador (cliente)
  if (typeof window !== 'undefined') {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

// Funcion Login

export const login = async (username, password) => {
  // Hacemos POST a la vista TokenObtainPairView de Django
  const { data } = await api.post('/token/', {
    username,
    password,
  });
  return data; // { access: '...', refresh: '...' }
}

// Funcion Create User

export const createUser = async (payload) => {
  // Hacemos POST a la vista TokenObtainPairView de Django
  const { data } = await api.post('/register/', payload);
  return data;
}

// Invitation(s) API CRUD
export const createInvitation = async (data) => {
  const response = await api.post('/admin/invitations/', data);
  return response.data;
};

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

export const getAllInvitations = async () => {
  // El interceptor que configuramos ya inyectará el Token aquí automáticamente
  const { data } = await api.get('/admin/invitations/');
  return data;
};

export const updateInvitationByUuid = async (uuid, data) => {
  const response = await api.patch(`/admin/invitation/${uuid}/`, data);
  return response.data;
};

export const updateGuestInvitation = async (uuid, data) => {
  const response = await api.patch(`/invitation/${uuid}/`, data);
  return response.data;
};

export const deleteAllInvitations = async (data) => {
  await api.post('/admin/invitations/bulk_delete/', { 
      invitation_uuids: data 
  });
};

// Guest API CRUD

export const createGuest = async ( data ) => {
  const response = await api.post('/admin/guests/', data);
  return response.data;
};

export const getAllGuests = async () => {
  const { data } = await api.get('/admin/guests/');
  return data;
};

export const updateGuest = async (id, data) => {
  const response = await api.patch(`/admin/guests/${id}/`, data);
  return response.data;
};

export const deleteGuest = async ( id ) => {
  await api.delete(`/admin/guests/${id}/`);
};

// Envío masivo de invitaciones por WhatsApp

export const sendWhatsappInvitation = async ( invitationUuidList ) => {
  const response = await api.post(`/admin/invitations/send_blast/`, {
    invitation_ids: invitationUuidList
  });
  return response.data;
}

// Importar invitados desde CSV

export const importGuestsCSV = async (file, weddingId = null) => {
    const formData = new FormData();
    formData.append('file', file); // 'file' debe coincidir con request.FILES.get('file') en Django
    // Si pasamos un ID (útil para pruebas de admin), lo agregamos al envío
    weddingId = '2'
    if (weddingId) {
        formData.append('wedding_id', weddingId);
    }

    const response = await api.post('/admin/invitations/import_csv/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Crucial para archivos
        },
    });
    return response.data;
};

export default api;
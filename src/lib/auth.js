import Cookies from 'js-cookie';

const TOKEN_KEY = 'access_token';

export const setToken = (token) => {
  // Guardamos el token en una cookie que expira en 1 día
  // 'SameSite: Lax' es necesario para que funcione bien con la navegación
  Cookies.set(TOKEN_KEY, token, { expires: 1, sameSite: 'Lax' });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};
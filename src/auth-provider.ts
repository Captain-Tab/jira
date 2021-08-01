import { IUser } from "./screens/project-list/search";
import { ILogin } from "./screens/login";

const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env["REACT_APP_API_URL"];

export const getToken = (): string | undefined => {
  return window.localStorage.getItem(localStorageKey) || "";
};

export const handleResponse = ({ user }: { user: IUser }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: ILogin) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const register = (data: ILogin) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);

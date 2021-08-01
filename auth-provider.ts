import { IUser } from "./src/screens/project-list/search";
import { ILogin } from "./src/screens/login";

const localStorageKey = "__auth_provider_token__";
const apiUrl = process.env["REACT_APP_API_URL"];

export const getToken = () => {
  window.localStorage.getItem(localStorageKey);
};

export const handleResponse = ({ user }: { user: IUser }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: ILogin) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    }
  });
};

export const register = (data: ILogin) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorageKey);

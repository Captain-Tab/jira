import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { ILogin } from "../screens/login";
import { IUser } from "../screens/project-list/search";

const AuthContext = React.createContext<
  | {
      user: IUser | null;
      register: (form: ILogin) => Promise<void>;
      login: (form: ILogin) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (form: ILogin) => auth.login(form).then(setUser);

  const register = (form: ILogin) => auth.login(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

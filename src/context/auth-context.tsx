import React, { ReactNode } from "react";
import * as auth from "auth-provider";
import { ILogin } from "../screens/login";
import { IUser } from "../screens/project-list/search";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/useAsync";
import { FullPageError, FullPageLoading } from "../components/lib";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

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
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<IUser | null>();

  const login = (form: ILogin) => auth.login(form).then(setUser);
  const register = (form: ILogin) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

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

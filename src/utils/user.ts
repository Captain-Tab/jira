import { useHttp } from "utils/http";
import { useAsync } from "utils/useAsync";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { IUser } from "../screens/project-list/search";

export const useUsers = (param?: Partial<IUser>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<IUser[]>();

  useEffect(() => {
    // @ts-ignore
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

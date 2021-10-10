import { useEffect } from "react";
import { cleanObject } from "./index";
import { useAsync } from "./useAsync";
import { IProject } from "../screens/project-list/list";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<IProject[]>();

  useEffect(() => {
    // @ts-ignore
    run(client("projects", { data: cleanObject(param) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<IProject>) => {
    return run(
      client(`projects/${params.id}`, {
        // @ts-ignore
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    asyncResult,
  };
};

export const useAddEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<IProject>) => {
    return run(
      client(`projects/${params.id}`, {
        // @ts-ignore
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    asyncResult,
  };
};

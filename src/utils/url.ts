/**
 * return value from url query object
 */
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const useUrlQueryParam = <k extends string>(keys: k[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in k]: string }),
      [searchParams, keys]
    ),
    setSearchParam,
  ] as const;
};

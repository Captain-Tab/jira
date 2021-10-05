/**
 * return value from url query object
 */
import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParam,
  ] as const;
};

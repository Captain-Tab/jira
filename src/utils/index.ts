// identify the falsy value
import { useEffect, useState } from "react";
export const isFalsy = (value: any) => (value === 0 ? false : !value);

// clean the useless value of object
export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// create custom mounted hook
export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
  }, []);
};

// create custom debounce hook
export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounceValue;
};

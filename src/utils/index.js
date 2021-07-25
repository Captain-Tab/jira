// identify the falsy value
import { useEffect, useState } from "react";
import { set } from "husky/lib";

export const isFalsy = (value) => (value === 0 ? false : !value);

// clean the useless value of object
export const cleanObject = (object) => {
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
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

// create custom debounce hook
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounceValue;
};

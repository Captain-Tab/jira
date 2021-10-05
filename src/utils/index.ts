// identify the falsy value
import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// clean the useless value of object
export const cleanObject = (object: { [key: string]: any }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// create custom mounted hook
export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
    // Todo
    // eslint-disable-next-line
  }, []);
};

// create custom debounce hook
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return debounceValue;
};

export const useDocumentTitle = (title: string, keepOnMount = true) => {
  // the title is 'React App' when the page is loading
  const oldTitle = useRef(document.title).current;

  // the title is new title after the pages was loaded
  useEffect(() => {
    document.title = title;
  }, [title]);

  // set title back to 'React App'
  useEffect(() => {
    return () => {
      if (!keepOnMount) {
        document.title = oldTitle;
      }
    };
    // eslint-disable-next-line
  }, [keepOnMount, oldTitle]);
};

export const restRoute = () => (window.location.href = window.location.origin);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

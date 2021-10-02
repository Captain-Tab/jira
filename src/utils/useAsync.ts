import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  state: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  state: "idle",
  data: null,
  error: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      state: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      state: "error",
      data: null,
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型的属性！");
    }
    setState({
      ...state,
      state: "loading",
    });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };
  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isError: state.state === "error",
    run,
    setData,
    setError,
    ...state,
  };
};

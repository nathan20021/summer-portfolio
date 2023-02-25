/**
 * // useLocalStorage.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from "react";

const useLocalStorage = (key: string, fallbackValue: string | undefined) => {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;

/**
 * * This hook runs a function when clicking outside a component
 */

import { useEffect, useRef } from "react";

const useClickOutside = (handler: () => void) => {
  const component = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        !component.current ||
        component.current.contains(event.target as Node)
      ) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [handler]);
  return component;
};

export default useClickOutside;

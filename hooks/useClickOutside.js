import { useEffect } from "react";

const useClickOutside = (ref, buttonRef, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (
        !ref.current ||
        // (buttonRef !== null && !buttonRef?.current) ||
        ref.current.contains(event.target) ||
        buttonRef?.current.contains(event.target)
      ) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, buttonRef, handler]);
};

export default useClickOutside;

import { useRef, useEffect } from "react";

const callOnOutsideClick = (ref, func) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current !== null && !ref.current.contains(event.target)) {
        func();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default function OutsideClickWrapper(props) {
  const wrapperRef = useRef(null);
  callOnOutsideClick(wrapperRef, props.func);

  return <div ref={wrapperRef}>{props.children}</div>;
}

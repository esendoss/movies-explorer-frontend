import { useEffect, useCallback, useState } from "react";

function useWindowSize() {
  const getWindowWidth = useCallback(() => window.innerWidth, []);
  const [windowSize, setWindowSize] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowWidth());
    }

    window.addEventListener("resize", resizeTimer, handleResize);

    let time;
    function resizeTimer() {
      if (!time) {
        time = setTimeout(() => {
          time = null;
          handleResize();
        }, 5000);
      }
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [getWindowWidth]);
  return windowSize;
}
export default useWindowSize;

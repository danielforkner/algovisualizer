import { useState, useEffect } from 'react';

const getWindowSize = () => {
  const { innerWidth: w, innerHeight: h } = window;
  return { w, h };
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

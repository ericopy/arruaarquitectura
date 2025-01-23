import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return <div ref={cursorDotRef} className="cursor-dot" />;
}
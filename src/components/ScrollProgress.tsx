import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (progressRef.current) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / windowHeight;
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return <div ref={progressRef} className="scroll-progress" />;
}
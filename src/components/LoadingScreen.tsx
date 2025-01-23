import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative">
        <div className="animate-logo-reveal flex flex-col items-center">
          <h1 className="text-arrua-gold text-5xl font-bold tracking-wider mb-2">ARRÚA</h1>
          <p className="text-gray-400 text-lg tracking-widest">ARQUITECTURA</p>
        </div>
        <div className="absolute -bottom-8 left-0 w-full h-1 bg-black/20">
          <div className="h-full bg-arrua-gold animate-loading-bar origin-left" />
        </div>
      </div>
    </div>
  );
}
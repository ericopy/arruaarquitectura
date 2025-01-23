import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingContact() {
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button 
      onClick={handleClick}
      className="floating-contact"
      aria-label="Contact us"
    >
      <MessageSquare className="w-6 h-6" />
    </button>
  );
}
import React from 'react';
import logo from '../assets/kAI.png'; // adjust path if needed

export default function Header() {
  return (
    <header className="flex items-center p-10 select-none cursor-default">
      <img src={logo} alt="kAI Logo" className="h-12 w-auto" />
    </header>
  );
}

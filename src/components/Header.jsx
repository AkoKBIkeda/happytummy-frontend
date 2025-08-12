import React from 'react';
import logo from '../assets/kAI.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center p-10 select-none cursor-default">
        <Link to="/">
            <img src={logo} alt="kAI Logo" className="h-12 w-auto" />
        </Link>
    </header>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useUIStore } from "@/store/useUIStore";

export default function Header() {
  const { isMenuOpen, isDark, toggleMenu, toggleTheme, initializeTheme } =
    useUIStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <header className="bg-bg text-text shadow-md fixed top-0 left-0 w-full z-50 px-4">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-2 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-text">
          <Link href="/" className="cursor-pointer">
            Oli-Ponto
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-text">
            {isDark ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-text">
              <Bars3Icon className="h-6 w-6 mt-1" />
            </button>
          </div>
        </div>
      </div>

    {isMenuOpen && (
      <div
        onClick={toggleMenu}
        className="fixed inset-0 bg-black/40 z-30 md:hidden"
        style={{ left: '16rem' }}
      />
    )}

    </header>
  );
}

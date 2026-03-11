"use client";
import { useUIStore } from "@/store/useUIStore";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  SunIcon,
  MoonIcon,

  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export default function Sidebar() {
  const {
    isMenuOpen,
    isDark,
    toggleMenu,
    toggleTheme,
    initializeTheme,
    collapsed,
    toggleCollapsed,
    setIsMenuOpen,
  } = useUIStore();

  const { logout } = useAuth();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  };

  handleResize();

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [setIsMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const handleLinkClick = (href: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      router.push(href);
      toggleMenu();
    } else {
      router.push(href);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    { name: "Usuário", icon: <UserIcon className="h-5 w-5" />, href: "/user" },
    { name: "Registrar Ponto", icon: <ClockIcon className="h-5 w-5" />, href: "/registerPonto" },
    { name: "Solicitações de Ajuste", icon: <PencilSquareIcon  className="h-5 w-5" />, href: "/adjustmentList" },
    { name: "Configurações", icon: <Cog6ToothIcon className="h-5 w-5" />, href: "/settings" },
  ];

  return (
    <motion.aside
      ref={sidebarRef}
      initial={false}
      animate={{
        x: isMenuOpen || window.innerWidth >= 768 ? 0 : -300,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100
        shadow-xl z-40 transition-[width] duration-300
        flex flex-col justify-between
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <span className="text-xl font-extrabold tracking-wide text-primary">
            Samoth<span className="text-indigo-500">.Tec</span>
          </span>
        )}
        <button
          onClick={toggleCollapsed}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronDoubleRightIcon className="h-5 w-5" />
          ) : (
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col flex-grow mt-6 px-3 space-y-2">
        {menuItems.map(({ name, icon, href }) => (
          <button
            key={name}
            onClick={() => handleLinkClick(href)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all
              hover:bg-indigo-100 hover:dark:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400
              ${collapsed ? "justify-center" : "justify-start"}
            `}
          >
            {icon}
            {!collapsed && <span>{name}</span>}
          </button>
        ))}
      </nav>

      {/* Rodapé */}
      <div className="flex flex-col gap-3 px-3 py-4 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
        >
          {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          {!collapsed && <span>{isDark ? "Modo Claro" : "Modo Escuro"}</span>}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </motion.aside>
  );
}

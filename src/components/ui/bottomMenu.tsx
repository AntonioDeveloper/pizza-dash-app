'use client'
// Menu para mobile
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconUsers, IconPizza, IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BottomMenu() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full h-16 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex items-center justify-around px-2 z-40 shrink-0 transition-colors">
      <Link href="/ordersPage" className={`flex flex-col items-center gap-1 p-2 ${isActive('/ordersPage') ? 'text-[#ec4913]' : 'text-gray-400'}`}>
        <IconPizza size={24} stroke={isActive('/ordersPage') ? 2 : 1.5} />
        <span className="text-[10px] font-medium">PEDIDOS</span>
      </Link>
      
      <Link href="/" className={`flex flex-col items-center gap-1 p-2 ${isActive('/') ? 'text-[#ec4913]' : 'text-gray-400'}`}>
        <IconUsers size={24} stroke={isActive('/') ? 2 : 1.5} />
        <span className="text-[10px] font-medium">CLIENTES</span>
      </Link>

      <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex flex-col items-center gap-1 p-2 text-gray-400"
      >
        {mounted ? (
           theme === "dark" ? <IconSun size={24} stroke={1.5} /> : <IconMoon size={24} stroke={1.5} />
        ) : (
           <IconMoon size={24} stroke={1.5} className="opacity-50" />
        )}
        <span className="text-[10px] font-medium">TEMA</span>
      </button>
    </div>
  );
}

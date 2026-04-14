"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function FlowerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Petals */}
      <ellipse cx="16" cy="8" rx="5" ry="7" fill="white" opacity="0.88" />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.88"
        transform="rotate(72 16 16)"
      />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.88"
        transform="rotate(144 16 16)"
      />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.88"
        transform="rotate(216 16 16)"
      />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.88"
        transform="rotate(288 16 16)"
      />
      {/* Lines between petals */}
      <line x1="18.9" y1="12" x2="22.5" y2="7.1" stroke="#8e3ab5" strokeWidth="0.5" opacity="0.6" />
      <line x1="20.8" y1="17.5" x2="26.5" y2="19.4" stroke="#8e3ab5" strokeWidth="0.5" opacity="0.6" />
      <line x1="16" y1="21" x2="16" y2="27" stroke="#8e3ab5" strokeWidth="0.5" opacity="0.6" />
      <line x1="11.2" y1="17.5" x2="5.5" y2="19.4" stroke="#8e3ab5" strokeWidth="0.5" opacity="0.6" />
      <line x1="13.1" y1="12" x2="9.5" y2="7.1" stroke="#8e3ab5" strokeWidth="0.5" opacity="0.6" />
      {/* Center */}
      <circle cx="16" cy="16" r="4" fill="#a64ac9" />
    </svg>
  );
}

export function Logo() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2.5 cursor-pointer group"
        title="Цветочный календарь"
      >
        <FlowerIcon className="w-[53px] h-[53px] shrink-0" />
        <span className="text-[24.6px] font-bold text-white leading-tight hidden min-[375px]:inline-block">
          цветочный<br />календарь
        </span>
      </button>
    );
  }

  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 group"
      title="Цветочный календарь"
    >
      <FlowerIcon className="w-[53px] h-[53px] shrink-0" />
      <span className="text-lg font-bold text-accent-hover hidden min-[375px]:inline">
        Цветочный календарь
      </span>
    </Link>
  );
}

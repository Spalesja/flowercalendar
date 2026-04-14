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
      <ellipse cx="16" cy="8" rx="5" ry="7" fill="white" opacity="0.9" />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.9"
        transform="rotate(72 16 16)"
      />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.9"
        transform="rotate(144 16 16)"
      />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.9"
        transform="rotate(216 16 16)"
      />
      <ellipse
        cx="16"
        cy="8"
        rx="5"
        ry="7"
        fill="white"
        opacity="0.9"
        transform="rotate(288 16 16)"
      />
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
        <FlowerIcon className="w-8 h-8 shrink-0" />
        <span className="text-lg font-medium text-white">
          Цветочный календарь
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
      <FlowerIcon className="w-8 h-8 shrink-0" />
      <span className="text-lg font-medium text-white">
        Цветочный календарь
      </span>
    </Link>
  );
}

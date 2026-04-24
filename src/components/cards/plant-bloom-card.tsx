"use client";

import { useState } from "react";

interface PlantBloomCardProps {
  name: string;
  endDate: string;
  imageUrl?: string;
  href?: string;
}

export function PlantBloomCard({
  name,
  endDate,
  imageUrl,
  href = "#",
}: PlantBloomCardProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = imageUrl && !imgError;

  return (
    <a href={href} className="group flex-1 min-w-0">
      <div className="aspect-square rounded-[20%] bg-surface-soft overflow-hidden mb-2">
        {showImage ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-hero/30 to-accent-strong/20">
            🌸
          </div>
        )}
      </div>
      <p className="font-semibold text-base text-text-primary pl-[25px]">{name}</p>
      <p className="text-sm text-text-tertiary pl-[25px]">до {endDate}</p>
    </a>
  );
}

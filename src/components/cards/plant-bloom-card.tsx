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
  return (
    <a href={href} className="group flex-shrink-0 w-40 sm:w-44">
      <div className="aspect-square rounded-xl bg-surface-soft overflow-hidden mb-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-hero/30 to-accent-strong/20">
            🌸
          </div>
        )}
      </div>
      <p className="font-medium text-sm text-text-primary">{name}</p>
      <p className="text-xs text-text-tertiary">до {endDate}</p>
    </a>
  );
}

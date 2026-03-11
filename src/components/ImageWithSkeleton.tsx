"use client";

import React from "react";
import Image from "next/image";

export function ImageWithSkeleton({
  src,
  alt = "",
  size = "w-16 h-16",
  width = 64,
  height = 64,
}: {
  src: string;
  alt?: string;
  size?: string;
  width?: number;
  height?: number;
}) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div
      className={`relative ${size} rounded-md border border-neutral bg-neutral/30 flex items-center justify-center overflow-hidden`}
    >
      {!loaded && (
        <span className="text-[10px] text-text/50 animate-pulse">
          Carregando...
        </span>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoaded(true)}
        className={`object-cover rounded-md border border-neutral transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0 absolute"
        }`}
      />
    </div>
  );
}

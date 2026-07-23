import type { ReactNode } from "react";
import Image from "next/image";

export function Logo(): ReactNode {
  return (
    <a
      href="#top"
      aria-label="Tattoo Heaven home"
      className="focus-ring group inline-flex"
    >
      <Image
        src="/logo-tattoo-heaven.avif"
        alt="Tattoo Heaven Haarlem"
        width={452}
        height={320}
        priority
        className="h-16 w-auto transition-transform duration-500 group-hover:scale-105 sm:h-20"
      />
    </a>
  );
}

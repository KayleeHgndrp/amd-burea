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
        alt="Tattoo Heaven"
        width={452}
        height={320}
        priority
        className="h-13 w-auto transition-transform duration-500 group-hover:scale-105"
      />
    </a>
  );
}

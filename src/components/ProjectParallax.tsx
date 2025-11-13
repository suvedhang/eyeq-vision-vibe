"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function ProjectParallax() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "Project 1",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 135402.png",
  },
  {
    title: "Project 2",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 135446.png",
  },
  {
    title: "Project 3",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 135557.png",
  },
  {
    title: "Project 4",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 135643.png",
  },
  {
    title: "Project 5",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 135712.png",
  },
  {
    title: "Project 6",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 135813.png",
  },
  {
    title: "Project 7",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 135859.png",
  },
  {
    title: "Project 8",
    link: "#",
    thumbnail: "/image/Screenshot 2025-11-13 140005.png",
  },
];
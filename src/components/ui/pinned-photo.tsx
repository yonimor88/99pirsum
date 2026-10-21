"use client";

import { motion } from "motion/react";
import Image from "next/image";

import type { Photo } from "@/content/media";
import { cn } from "@/lib/cn";

/** A photo print taped to the wall. Straightens and lifts on hover. */
export function PinnedPhoto({
  photo,
  rotate = -3,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 30vw, 80vw",
  priority = false,
  delay = 0,
  tape = "top",
  caption,
  fill = false,
}: {
  fill?: boolean;
  photo: Photo;
  rotate?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
  tape?: "top" | "corners" | "none";
  caption?: string;
}) {
  return (
    <motion.figure
      className={cn(
        "relative bg-white p-2 pb-2 shadow-[0_24px_50px_-24px_rgba(20,20,20,0.55)] sm:p-2.5",
        caption && "pb-10 sm:pb-11",
        className,
      )}
      initial={{ opacity: 0, scale: 1.12, rotate: rotate * 2.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, rotate, y: 0 }}
      whileHover={{ rotate: 0, scale: 1.03, y: -6, zIndex: 20 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
    >
      {tape === "top" && (
        <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />
      )}
      {tape === "corners" && (
        <>
          <span className="tape -top-2 -right-6 w-16 rotate-[38deg]" aria-hidden />
          <span className="tape -bottom-2 -left-6 w-16 rotate-[38deg]" aria-hidden />
        </>
      )}
      <div className={cn("relative overflow-hidden bg-paper-2", fill && "h-full")}>
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes={sizes}
          placeholder="blur"
          preload={priority}
          loading={priority ? "eager" : "lazy"}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
      {caption && (
        <figcaption className="absolute inset-x-3 bottom-2.5 truncate font-display text-sm text-muted sm:bottom-3">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

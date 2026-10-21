import { ArrowUpLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatHebrewDate, type PostMeta } from "@/content/posts";
import { cn } from "@/lib/cn";

export function PostCard({ post, featured = false, className }: { post: PostMeta; featured?: boolean; className?: string }) {
  return (
    <article className={cn("group relative", className)}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-[1.5rem] bg-paper-2",
            featured ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
          />
          <span className="absolute top-4 right-4 rounded-full bg-paper px-3 py-1 font-display text-xs font-bold">
            {post.category}
          </span>
          <span className="absolute bottom-4 left-4 grid size-11 translate-y-2 place-items-center rounded-full bg-yellow text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpLeft className="size-5" aria-hidden />
          </span>
        </div>
        <div className="mt-5">
          <p className="text-sm text-muted">
            <time dateTime={post.date}>{formatHebrewDate(post.date)}</time>
          </p>
          <h3
            className={cn(
              "mt-2 font-display leading-snug font-bold text-balance transition-colors group-hover:text-magenta-ink",
              featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
            )}
          >
            {post.title}
          </h3>
          {featured && <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{post.description}</p>}
        </div>
      </Link>
    </article>
  );
}

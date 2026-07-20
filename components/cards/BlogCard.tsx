import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: Post;
  /** Variante horizontale (visuel à gauche) pour la mise en avant. */
  horizontal?: boolean;
}

export default function BlogCard({ post, horizontal = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  if (horizontal) {
    return (
      <Link
        href={href}
        className="group grid border border-line bg-paper transition-colors hover:border-ink lg:grid-cols-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas lg:border-b-0 lg:border-r">
          {post.image ? (
            <>
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover grayscale contrast-110 transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/5" aria-hidden />
            </>
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-5xl uppercase leading-[0.85] text-ghost/40"
            >
              {post.category}
            </span>
          )}
        </div>
        <div className="flex flex-col p-8 lg:p-10">
          <div className="flex items-center gap-4 font-mono text-xs text-muted">
            <span className="font-condensed font-semibold uppercase tracking-wide2 text-ink">
              {post.category}
            </span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="mt-4 font-display text-4xl uppercase leading-[0.9] lg:text-5xl">
            {post.title}
          </h3>
          <p className="mt-4 flex-1 leading-relaxed text-muted">
            {post.excerpt}
          </p>
          <span className="group mt-6 inline-flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-wide2">
            Lire l&apos;article
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-line bg-paper transition-colors hover:border-ink"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-canvas">
        {post.image ? (
          <>
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover grayscale contrast-110 transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-ink/10 transition-colors group-hover:bg-ink/5" aria-hidden />
          </>
        ) : (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-4xl uppercase leading-[0.85] text-ghost/40 transition-colors group-hover:text-ghost/60"
          >
            {post.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="font-condensed font-semibold uppercase tracking-wide2 text-ink">
            {post.category}
          </span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-3 font-condensed text-xl font-semibold leading-tight">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="font-mono text-xs text-muted">
            {formatDate(post.date)}
          </span>
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </div>
      </div>
    </Link>
  );
}

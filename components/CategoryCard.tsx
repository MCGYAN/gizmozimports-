import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  slug: string;
  name: string;
  image?: string | null;
  index?: number;
  subtitle?: string;
}

/**
 * Category tile — 2-col friendly on mobile.
 * Image sits in a fixed square; label below so text never fights a tiny overlay.
 */
export default function CategoryCard({ slug, name, image }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${slug}`}
      prefetch
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-colors active:bg-slate-50"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#0C4A6E]" aria-hidden />
        )}
      </div>
      <div className="flex min-h-[2.75rem] items-center justify-between gap-2 px-3 py-2.5 sm:min-h-[3.25rem] sm:px-3.5 sm:py-3">
        <h3 className="font-heading line-clamp-2 text-[13px] font-bold leading-snug text-brand-primary sm:text-sm md:text-base">
          {name}
        </h3>
        <i
          className="ri-arrow-right-s-line shrink-0 text-lg text-slate-300 transition-colors group-hover:text-brand-accent"
          aria-hidden
        />
      </div>
    </Link>
  );
}

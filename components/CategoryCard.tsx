import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  slug: string;
  name: string;
  image?: string | null;
  index?: number;
  subtitle?: string;
}

export default function CategoryCard({
  slug,
  name,
  image,
}: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${slug}`}
      prefetch
      className="group relative aspect-[5/6] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)] sm:aspect-[4/5] sm:rounded-2xl"
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 bg-[#172554]" aria-hidden />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 via-black/35 to-transparent sm:h-24"
        aria-hidden
      />

      <h3 className="absolute bottom-2 left-2 right-2 font-heading text-[11px] font-bold leading-tight text-white sm:bottom-3.5 sm:left-3.5 sm:right-3.5 sm:text-sm md:text-base">
        {name}
      </h3>
    </Link>
  );
}

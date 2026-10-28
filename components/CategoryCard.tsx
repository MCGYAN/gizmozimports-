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
      className="group relative aspect-square w-[72vw] max-w-[17rem] flex-none snap-start overflow-hidden rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(15,23,42,0.12)] sm:aspect-[4/5] sm:w-[260px] md:w-[280px] lg:w-full lg:max-w-none"
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 280px, 25vw"
          className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div className="absolute inset-0 bg-[#172554]" aria-hidden />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent"
        aria-hidden
      />

      <h3 className="absolute bottom-4 left-4 right-4 font-heading text-[1.1rem] font-bold leading-tight text-white sm:bottom-5 sm:left-5 md:text-[1.25rem]">
        {name}
      </h3>
    </Link>
  );
}

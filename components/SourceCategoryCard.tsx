import Link from 'next/link';

interface SourceCategoryCardProps {
  code?: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
  highlighted?: boolean;
}

export default function SourceCategoryCard({
  code,
  title,
  description,
  icon,
  href = '/contact',
  highlighted = false,
}: SourceCategoryCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col justify-between border p-6 transition-colors ${
        highlighted
          ? 'border-brand-accent bg-orange-50'
          : 'border-slate-200 bg-white hover:border-brand-primary'
      }`}
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
            <i className={`${icon} text-xl`} aria-hidden />
          </div>
          {code ? (
            <span className="font-mono text-xs font-semibold text-slate-400 group-hover:text-brand-accent">
              {code}
            </span>
          ) : null}
        </div>
        <h3 className="font-heading text-lg font-bold text-brand-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>

      <p className="mt-5 text-xs font-semibold text-brand-primary group-hover:text-brand-accent">
        Request sourcing quote →
      </p>
    </Link>
  );
}

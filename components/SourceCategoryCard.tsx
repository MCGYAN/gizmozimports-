import Link from 'next/link';

interface SourceCategoryCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  highlighted?: boolean;
}

export default function SourceCategoryCard({
  title,
  description,
  icon,
  href = '/contact',
  highlighted = false,
}: SourceCategoryCardProps) {
  return (
    <Link
      href={href}
      className={`liquid-glass-card liquid-glass-card-interactive p-5 ${
        highlighted
          ? 'border-brand-accent bg-orange-50/50'
          : ''
      }`}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg liquid-glass-well text-brand-primary">
        <i className={`${icon} text-xl`} />
      </div>
      <h3 className="text-lg font-semibold text-brand-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
    </Link>
  );
}

import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  highlighted?: boolean;
}

export default function CategoryCard({
  title,
  description,
  icon,
  href = '/contact',
  highlighted = false,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={`rounded-card border p-5 transition hover:-translate-y-0.5 hover:shadow-md ${
        highlighted ? 'border-brand-accent bg-orange-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
        <i className={`${icon} text-xl`} />
      </div>
      <h3 className="text-lg font-semibold text-brand-black">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </Link>
  );
}

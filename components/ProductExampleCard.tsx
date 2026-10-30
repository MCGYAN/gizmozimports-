import { leadConfig } from '@/lib/leadConfig';

interface ProductExampleCardProps {
  title: string;
  moq: string;
  estimate: string;
  note: string;
}

export default function ProductExampleCard({ title, moq, estimate, note }: ProductExampleCardProps) {
  const message = `Hi, I want to import ${title} from China.`;

  return (
    <article className="rounded-card border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-black">{title}</h3>
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">MOQ:</span> {moq}
        </p>
        <p>
          <span className="font-semibold">Estimated landed cost:</span> {estimate}
        </p>
        <p className="text-gray-500">{note}</p>
      </div>
      <a
        href={leadConfig.whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center rounded-pill bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-primary transition hover:brightness-95"
      >
        Request Quote
      </a>
    </article>
  );
}

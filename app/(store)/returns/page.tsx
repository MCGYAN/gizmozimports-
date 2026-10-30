import Link from 'next/link';
import PageHero from '@/components/PageHero';
import {
  buildWhatsAppHref,
  resolveContactWhatsApp,
} from '@/lib/store-config';

export default function ReturnsPage() {
  const waHref = buildWhatsAppHref(resolveContactWhatsApp(null));

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <PageHero
        size="large"
        title="Returns and issues"
        subtitle="China-to-Ghana orders are handled case by case. Message us and we will tell you the next step."
      />

      <section className="border-b border-slate-200/80 bg-white">
        <div className="store-container py-10 sm:py-14 md:py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-xl font-bold text-brand-primary sm:text-2xl">
              How to get help
            </h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-[15px] leading-relaxed text-slate-600">
              <li>Have your order number ready if you have it.</li>
              <li>Send clear photos if something is damaged or wrong.</li>
              <li>Contact us on WhatsApp or the contact page. We review it with you.</li>
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-slate-500">
              There is no automatic 14-day self-serve returns portal. We handle each import order
              with you personally. Full rules are in our{' '}
              <Link href="/terms" className="font-semibold text-brand-primary underline-offset-2 hover:underline">
                Terms
              </Link>
              .
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {waHref ? (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-semibold text-white"
                >
                  <i className="ri-whatsapp-line text-lg" aria-hidden />
                  Message on WhatsApp
                </a>
              ) : null}
              <Link
                href="/contact"
                className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white"
              >
                Contact us
              </Link>
              <Link
                href="/account"
                className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-brand-primary"
              >
                Open my orders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

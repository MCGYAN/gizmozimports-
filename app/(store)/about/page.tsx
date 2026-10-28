'use client';

import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import PageHero from '@/components/PageHero';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppHref } from '@/lib/store-config';

const STEPS = [
  {
    title: 'We source it',
    text: 'Send a product link, photo, or description. We find reliable suppliers in China for exactly what you need.',
  },
  {
    title: 'We confirm quality',
    text: 'Specs, condition, and the full price are checked before money moves. You know what you are getting, not guessing from photos.',
  },
  {
    title: 'We pay and consolidate',
    text: 'We handle supplier payments and gather your goods at our China warehouse, so you avoid scams and failed transfers.',
  },
  {
    title: 'We bring it to Ghana',
    text: 'Shipping, clearing support, and real updates until you pick up in Accra or we arrange delivery.',
  },
];

const CATEGORIES = [
  { title: 'Gadgets & Electronic Products', text: 'Phones, accessories, computers, and smart devices.', icon: 'ri-smartphone-line' },
  { title: 'Construction Equipment', text: 'Tools, machinery, and site equipment for building projects.', icon: 'ri-building-2-line' },
  { title: 'Auto & Auto Parts', text: 'Vehicle parts, accessories, and automotive supplies.', icon: 'ri-car-line' },
  { title: 'Stationery', text: 'Office, school, and business stationery supplies.', icon: 'ri-pencil-ruler-2-line' },
  { title: 'Laboratory Experiment Equipment', text: 'Lab instruments, glassware, and experiment supplies.', icon: 'ri-flask-line' },
  { title: 'Home Appliances', text: 'Kitchen, laundry, and utility appliances.', icon: 'ri-home-gear-line' },
];

const VALUES = [
  ['Verified suppliers', 'We vet sellers before you pay a pesewa.'],
  ['Clear pricing', 'Product, shipping, and fees shown up front.'],
  ['Real updates', 'Track every step from China to your door.'],
];

export default function AboutPage() {
  usePageTitle('About Us');
  const { getSetting } = useCMS();
  const whatsApp = buildWhatsAppHref(getSetting('contact_whatsapp'));
  const address = getSetting('contact_address') || 'Accra, Ghana';

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <PageHero
        size="large"
        title="Your trusted China sourcing partner in Ghana."
        subtitle="We source, pay, and deliver quality products from China, so you can shop with confidence."
      />

      {/* Story */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              The right product, from the right source
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600 sm:text-base md:text-lg">
              <p>
                <span className="font-semibold text-brand-primary">Gizmoz Trades</span> is a
                sourcing and import company that connects shoppers and businesses in Ghana with
                quality products from China.
              </p>
              <p>
                We specialise in gadgets and electronics, and we also source construction equipment,
                auto parts, stationery, laboratory equipment, and home appliances based on what each
                customer needs.
              </p>
              <p>
                Importing should not feel risky. We give you clear prices, practical guidance, and a
                team you can reach on WhatsApp throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-slate-200/80 bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              Source, check, pay, deliver
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Not just a price. Care before the goods leave China, and updates until they reach you.
            </p>
          </div>

          <ol className="mt-8 space-y-0 md:mt-10 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-0 md:space-y-0 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="relative border-l-2 border-brand-accent/35 pl-5 pb-8 last:pb-0 md:border-l-0 md:border-t-2 md:pl-0 md:pt-5 md:pb-0"
              >
                <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent md:left-0 md:top-[-9px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <p className="text-[11px] font-semibold text-brand-accent">
                  Step {index + 1}
                </p>
                <h3 className="mt-1.5 font-heading text-lg font-bold text-brand-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we source */}
      <section className="border-b border-slate-200/80 bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              What we source for Ghana
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Send your product image or description and we will source it for you.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="border border-slate-200 bg-white p-5"
              >
                <i className={`${cat.icon} text-xl text-brand-accent`} aria-hidden />
                <h3 className="mt-3 font-heading text-base font-bold text-brand-primary">{cat.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{cat.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/shop"
              className="btn-interactive inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white sm:w-auto"
            >
              See products
              <ArrowRight className="h-4 w-4" />
            </Link>
            {whatsApp ? (
              <a
                href={whatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-interactive inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-brand-primary sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp a quote
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              Shop China with someone on your side
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base md:text-lg">
              We are based in {address} and serve customers across Ghana. Our team handles the
              supplier, the payment, and the shipping, and keeps you informed at every step.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
            {VALUES.map(([title, text]) => (
              <div key={title} className="border border-slate-200 bg-white p-5 text-center">
                <p className="text-sm font-bold text-brand-primary">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-xl font-bold text-brand-primary sm:text-2xl">
              Ready to import without the stress?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Tell us what you need. We will help you source it with care, clear communication,
              and practical support.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/shop"
                className="btn-premium inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-[15px] font-semibold text-white hover:bg-brand-dark sm:w-auto"
              >
                Start shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
              {whatsApp ? (
                <a
                  href={whatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-brand-primary sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 text-brand-accent" />
                  Talk to us
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="btn-premium inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-brand-primary sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 text-brand-accent" />
                  Talk to us
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

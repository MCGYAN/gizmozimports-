'use client';

import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import PageHero from '@/components/PageHero';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppHref } from '@/lib/store-config';

const STEPS = [
  {
    code: '01',
    title: 'We source it',
    text: 'Send a product link, photo, or description. We find reliable suppliers in China for exactly what you need.',
  },
  {
    code: '02',
    title: 'We confirm quality',
    text: 'Specs, condition, and the full price are checked before money moves. You know what you are getting, not guessing from photos.',
  },
  {
    code: '03',
    title: 'We pay and consolidate',
    text: 'We handle supplier payments and gather your goods at our China warehouse, so you avoid scams and failed transfers.',
  },
  {
    code: '04',
    title: 'We bring it to Ghana',
    text: 'Shipping, clearing support, and real updates until you pick up in Accra or we arrange delivery.',
  },
];

const CATEGORIES = [
  { code: '01', title: 'Gadgets & Electronic Products', text: 'Phones, accessories, computers, and smart devices.', icon: 'ri-smartphone-line' },
  { code: '02', title: 'Construction Equipment', text: 'Tools, machinery, and site equipment for building projects.', icon: 'ri-building-2-line' },
  { code: '03', title: 'Auto & Auto Parts', text: 'Vehicle parts, accessories, and automotive supplies.', icon: 'ri-car-line' },
  { code: '04', title: 'Stationery', text: 'Office, school, and business stationery supplies.', icon: 'ri-pencil-ruler-2-line' },
  { code: '05', title: 'Laboratory Experiment Equipment', text: 'Lab instruments, glassware, and experiment supplies.', icon: 'ri-flask-line' },
  { code: '06', title: 'Home Appliances', text: 'Kitchen, laundry, and utility appliances.', icon: 'ri-home-gear-line' },
];

const VALUES = [
  {
    title: 'Verified suppliers',
    text: 'We vet sellers and confirm factory specifications before you pay a pesewa.',
  },
  {
    title: 'Clear landed pricing',
    text: 'Product cost, China transport, freight, and clearing fees are shown up front.',
  },
  {
    title: 'Recorded updates',
    text: 'Follow every checkpoint from supplier floor to Tema port and Accra pickup.',
  },
];

export default function AboutPage() {
  usePageTitle('About Us');
  const { getSetting } = useCMS();
  const whatsApp = buildWhatsAppHref(getSetting('contact_whatsapp'));
  const address = getSetting('contact_address') || 'Accra, Ghana';

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        size="large"
        kicker="Company Profile · Accra & China"
        title="Your trusted China sourcing partner in Ghana."
        subtitle="We source, pay, and deliver quality products from China, so individuals and businesses in Ghana can import with confidence."
      />

      {/* Editorial story + operating principles */}
      <section className="border-b border-slate-200 bg-white">
        <div className="store-container py-12 sm:py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-brand-accent">Who we are</p>
              <h2 className="mt-1 font-heading text-2xl font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
                The right product, from the right source
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                <p>
                  <span className="font-semibold text-brand-primary">Gizmoz Trades</span> is a
                  sourcing and freight company that connects shoppers, contractors, schools, and
                  retailers in Ghana with vetted manufacturers and wholesale suppliers in China.
                </p>
                <p>
                  We specialise in gadgets and electronics, and we actively source construction
                  equipment, auto parts, stationery, laboratory equipment, and home appliances based
                  on what each customer needs.
                </p>
                <p>
                  Importing should not feel like a gamble. We give you itemised Cedi quotes,
                  practical guidance on air versus sea freight, and a team in {address} you can reach
                  directly on WhatsApp throughout the shipment.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-slate-200 bg-[#f8fafc] p-6 sm:p-7">
                <p className="font-mono text-xs font-semibold text-brand-accent">
                  OPERATING STANDARDS
                </p>
                <dl className="mt-4 divide-y divide-slate-200">
                  {VALUES.map((v) => (
                    <div key={v.title} className="py-4 first:pt-0 last:pb-0">
                      <dt className="font-heading text-sm font-bold text-brand-primary">
                        {v.title}
                      </dt>
                      <dd className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {v.text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-slate-200 bg-[#f8fafc]">
        <div className="store-container py-12 sm:py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-brand-accent">How we work</p>
            <h2 className="mt-1 font-heading text-2xl font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl">
              Source, check, pay, deliver
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Care before the goods leave China, and recorded updates until they reach you in Ghana.
            </p>
          </div>

          <ol className="mt-8 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.code} className="flex flex-col justify-between bg-white p-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-brand-accent">
                    STAGE {step.code}
                  </span>
                  <h3 className="mt-3 font-heading text-base font-bold text-brand-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we source */}
      <section className="border-b border-slate-900/20 bg-[#172554] text-white">
        <div className="store-container py-12 sm:py-16 md:py-20">
          <div className="flex flex-col justify-between gap-4 border-b border-white/15 pb-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-brand-accent">Sourcing lines</p>
              <h2 className="mt-1 font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                What we source for Ghana
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-100/80 sm:text-base">
                Send your product image or specification sheet and we will quote it for you.
              </p>
            </div>
            <Link
              href="/what-we-source"
              className="text-sm font-semibold text-white hover:text-brand-accent"
            >
              View sourcing details →
            </Link>
          </div>

          <div className="mt-8 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="bg-[#172554] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-brand-accent">
                    <i className={`${cat.icon} text-lg`} aria-hidden />
                  </div>
                  <span className="font-mono text-xs font-semibold text-blue-200/60">
                    {cat.code}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-white">{cat.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-blue-100/80">{cat.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/shop"
              className="btn-premium inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 sm:w-auto"
            >
              Browse the shop
              <ArrowRight className="h-4 w-4" />
            </Link>
            {whatsApp ? (
              <a
                href={whatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp a quote
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

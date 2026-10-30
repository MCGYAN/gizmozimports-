'use client';

import Link from 'next/link';
import { useCMS } from '@/context/CMSContext';
import PageHero from '@/components/PageHero';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { buildWhatsAppHref } from '@/lib/store-config';

const STEPS = [
  {
    title: 'You shop',
    text: 'Look at products on the site and pick what you want.',
  },
  {
    title: 'You get a bill',
    text: 'Checkout and get a clear invoice for your order.',
  },
  {
    title: 'You pay',
    text: 'Pay by MoMo or bank using the details on your bill, then tap that you paid.',
  },
  {
    title: 'You track',
    text: 'Follow the order from China until it is ready for you in Ghana.',
  },
];

const CATEGORIES = [
  { title: 'Gadgets & phones', text: 'Phones, accessories, computers, and smart devices.', icon: 'ri-smartphone-line' },
  { title: 'Building tools', text: 'Tools and gear for building and site work.', icon: 'ri-building-2-line' },
  { title: 'Cars & parts', text: 'Car parts and car supplies.', icon: 'ri-car-line' },
  { title: 'Stationery', text: 'Office, school, and business supplies.', icon: 'ri-pencil-ruler-2-line' },
  { title: 'Lab gear', text: 'Lab tools and experiment supplies.', icon: 'ri-flask-line' },
  { title: 'Home appliances', text: 'Kitchen, laundry, and home machines.', icon: 'ri-home-gear-line' },
];

const VALUES = [
  ['Clear bill', 'You see what to pay before money moves.'],
  ['Easy pay', 'MoMo or bank. The details are on your bill.'],
  ['Real tracking', 'Follow every step from China to Ghana.'],
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
        title="We help Ghana buy from China."
        subtitle="Shop the list. Get a clear bill. Pay. Track your order until it reaches Ghana."
      />

      <section className="border-b border-slate-200/80 bg-white">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              Made for people who want a clear path
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600 sm:text-base md:text-lg">
              <p>
                <span className="font-semibold text-brand-primary">Gizmoz Trades</span> helps
                people and shops in Ghana buy goods from China without getting lost in long chat
                threads.
              </p>
              <p>
                You shop what is listed: phones, home items, tools, car parts, and more. You get a
                bill. You pay. Then you track the trip to Ghana.
              </p>
              <p>
                Need a quick answer? Message us on WhatsApp. Ready to buy what you see? Order on
                the site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              Shop, bill, pay, track
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Four easy steps. You always know what to do next.
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

      <section className="border-b border-slate-200/80 bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              What you can buy with us
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Start in the shop. If you cannot find it, ask us and we will help.
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
              className="btn-interactive inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-primary sm:w-auto"
            >
              Open the shop
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
                Ask us on WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-[1.625rem] font-bold leading-tight tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              You stay in charge
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base md:text-lg">
              We are based in {address} and serve people across Ghana. You order on the site. We
              handle China. You see the status as your goods move.
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

      <section className="bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-heading text-xl font-bold text-brand-primary sm:text-2xl">
              Ready to order?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Open the shop. Get your bill. Pay. Track it to Ghana.
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
                  Ask us on WhatsApp
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="btn-premium inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-brand-primary sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 text-brand-accent" />
                  Contact us
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

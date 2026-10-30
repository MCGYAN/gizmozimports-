import Link from 'next/link';
import PageHero from '@/components/PageHero';

const STEPS = [
  {
    title: 'You pay and we confirm',
    text: 'Pay by MoMo or bank using your bill. When we see the payment, we start your order.',
  },
  {
    title: 'We buy and ship',
    text: 'We buy from trusted sellers in China and move your goods toward Ghana.',
  },
  {
    title: 'You stay updated',
    text: 'Sign in with the same email you used at checkout to see your order, or use Track my order.',
  },
  {
    title: 'It arrives in Ghana',
    text: 'Your goods clear and become ready for pickup or delivery. We handle the hard part.',
  },
] as const;

const NOTES = [
  {
    title: 'Timelines vary',
    text: 'Timing depends on the product and how it ships. We update your order as it moves. Ask us if you want a clearer time before you pay.',
  },
  {
    title: 'Clearing in Ghana',
    text: 'Goods coming into Ghana are cleared before pickup or delivery. We keep you posted when that stage starts.',
  },
  {
    title: 'Pickup or delivery',
    text: 'When your package is ready in Ghana, open Deliveries in your account and choose pickup or delivery. We call to confirm the arrangement and any delivery cost.',
  },
  {
    title: 'We contact you',
    text: 'Before final handoff we reach out. Keep your phone number up to date.',
  },
] as const;

const STATUS = [
  'Payment confirmed',
  'Buying in China',
  'On the way to Ghana',
  'Ready or delivered',
] as const;

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <PageHero
        size="large"
        title="Your order gets to Ghana safely"
        subtitle="We move your goods from China to Ghana. You always know where they are."
      />

      {/* Warehouse path */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="store-container py-10 sm:py-14 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-accent">Already buying in China?</p>
              <h2 className="mt-2 font-heading text-[1.5rem] font-bold tracking-tight text-brand-primary sm:text-3xl">
                Send supplier packages through us
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Make an account to get your shipping mark and our China warehouse address. Add the
                supplier tracking number, then follow the shipment to Ghana.
              </p>
            </div>
            <Link
              href="/account?tab=warehouse"
              className="btn-interactive inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent px-6 text-sm font-semibold text-brand-primary"
            >
              Get my shipping mark
            </Link>
          </div>
        </div>
      </section>

      {/* After you order */}
      <section className="border-b border-slate-200/80 bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[1.5rem] font-bold tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              What happens after you order
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Four clear steps from payment to Ghana.
            </p>
          </div>

          <ol className="mt-8 space-y-0 md:mt-10 md:grid md:grid-cols-2 md:gap-x-12 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="relative border-l-2 border-brand-accent/35 pb-8 pl-5 last:pb-0 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-5"
              >
                <span className="absolute -left-[9px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent md:left-0 md:top-[-9px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <p className="text-[11px] font-semibold text-brand-accent">Step {index + 1}</p>
                <h3 className="mt-1.5 font-heading text-lg font-bold text-brand-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Good to know */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[1.5rem] font-bold tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              Good to know
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              A few things that help before and after your goods leave China.
            </p>
          </div>

          <dl className="mt-8 max-w-3xl divide-y divide-slate-200 border-t border-slate-200">
            {NOTES.map((note) => (
              <div key={note.title} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <dt className="font-heading text-sm font-bold text-brand-primary sm:text-base">
                  {note.title}
                </dt>
                <dd className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">{note.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Status path */}
      <section className="border-b border-slate-200/80 bg-[#eef2f7]">
        <div className="store-container py-10 sm:py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-heading text-[1.5rem] font-bold tracking-tight text-brand-primary sm:text-3xl md:text-4xl">
              Always know where your order is
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Your account shows real status. Typical steps look like this:
            </p>
          </div>

          <ol className="mt-8 flex flex-col gap-0 border-l border-brand-accent/40 sm:mt-10 sm:flex-row sm:border-l-0 sm:border-t">
            {STATUS.map((label, index) => (
              <li
                key={label}
                className="relative flex-1 py-3 pl-5 sm:px-4 sm:pb-0 sm:pl-0 sm:pt-5"
              >
                <span className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full bg-brand-accent sm:left-0 sm:top-[-5px]" />
                <p className="text-[11px] font-semibold text-brand-accent">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-1 font-heading text-base font-bold text-brand-primary">{label}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Link
              href="/account"
              className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white"
            >
              Open my orders
            </Link>
            <Link
              href="/order-tracking"
              className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-brand-primary"
            >
              Track my order
            </Link>
          </div>
        </div>
      </section>

      {/* Help */}
      <section className="bg-white">
        <div className="store-container py-10 sm:py-14 md:py-16">
          <div className="max-w-xl">
            <h2 className="font-heading text-xl font-bold text-brand-primary sm:text-2xl">
              Questions about delivery?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Ask about timing, pickup, or where your order is.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-accent px-6 text-sm font-semibold text-brand-primary"
              >
                Contact us
              </Link>
              <Link
                href="/faqs"
                className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-brand-primary"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

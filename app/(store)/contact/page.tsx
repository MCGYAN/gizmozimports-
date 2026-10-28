"use client";

import { useState, useEffect } from 'react';
import { useCMS } from '@/context/CMSContext';
import { supabase } from '@/lib/supabase';
import PageHero from '@/components/PageHero';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import {
  buildWhatsAppHref,
  resolveContactEmail,
  resolveContactWhatsApp,
} from '@/lib/store-config';
import { STORE_INVOICE_ISSUER } from '@/lib/bank-details';

export default function ContactPage() {
  usePageTitle('Contact Us');
  const { getSetting } = useCMS();
  const [pageContent, setPageContent] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const { getToken, verifying } = useRecaptcha();

  useEffect(() => {
    async function fetchContactContent() {
      const { data } = await supabase
        .from('cms_content')
        .select('*')
        .eq('section', 'contact')
        .eq('block_key', 'main')
        .single();

      if (data) {
        setPageContent(data);
      }
    }
    fetchContactContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError('');

    // reCAPTCHA verification
    const isHuman = await getToken('contact');
    if (!isHuman) {
      setSubmitStatus('error');
      setSubmitError('Security verification failed. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Store in Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) {
        // Table might not exist, still show success
        console.log('Note: contact_submissions table may not exist');
      }

      // Send Contact Notification (await so we can show email errors)
      const notifRes = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          payload: formData
        })
      });
      const notifData = await notifRes.json().catch(() => ({}));
      if (!notifRes.ok) {
        setSubmitError(notifData.error || `Request failed (${notifRes.status})`);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact details: CMS when set, otherwise invoice issuer defaults
  const contactEmail = resolveContactEmail(getSetting('contact_email'));
  const contactWhatsapp = resolveContactWhatsApp(getSetting('contact_whatsapp'));
  const primaryAddressLine =
    getSetting('contact_address') || STORE_INVOICE_ISSUER.addressLines.slice(0, 2).join(', ');
  const secondaryAddressLine = getSetting('contact_address_secondary') || '';
  const socialFacebook = getSetting('social_facebook') || '';
  const socialInstagram = getSetting('social_instagram') || '';
  const socialTikTok = getSetting('social_tiktok') || '';

  const heroTitle = pageContent?.title || 'Get In Touch';
  const heroSubtitle = pageContent?.subtitle || 'Have a question or need assistance?';
  const heroContent = pageContent?.content || 'Our friendly team is here to help. Reach out through any of our contact channels.';

  const waLink = buildWhatsAppHref(contactWhatsapp);

  const addressParts = [primaryAddressLine, secondaryAddressLine].filter(Boolean);
  const locationDescription = addressParts.length ? addressParts.join(' • ') : '';

  const contactMethods = [
    ...(contactWhatsapp
      ? [
          {
            icon: 'ri-whatsapp-line',
            title: 'WhatsApp',
            value: contactWhatsapp,
            link: waLink,
            description: 'Chat with us instantly',
          },
        ]
      : []),
    {
      icon: 'ri-mail-line',
      title: 'Email Us',
      value: contactEmail,
      link: `mailto:${contactEmail}`,
      description: 'We respond within 24 hours',
    },
    ...(socialFacebook
      ? [
          {
            icon: 'ri-facebook-circle-line',
            title: 'Facebook',
            value: 'Facebook',
            link: socialFacebook,
            description: 'Follow us for updates',
          },
        ]
      : []),
    ...(socialInstagram
      ? [
          {
            icon: 'ri-instagram-line',
            title: 'Instagram',
            value: 'Instagram',
            link: socialInstagram,
            description: 'Photos and updates',
          },
        ]
      : []),
    ...(socialTikTok
      ? [
          {
            icon: 'ri-tiktok-line',
            title: 'TikTok',
            value: 'TikTok',
            link: socialTikTok,
            description: 'Short videos',
          },
        ]
      : []),
  ];

  const faqs = [
    {
      question: 'How long does an import take?',
      answer: 'It depends on air or sea and what you are buying. We give you a real date up front. We update you if anything changes. No vague "soon" answers.'
    },
    {
      question: 'Do you only ship to Ghana?',
      answer: 'Yes. China to Ghana is what we do best. Ask us if you need something different. We will tell you honestly.'
    },
    {
      question: 'How do I pay?',
      answer: 'MOMO, bank transfer, cash in store, or card. Big orders may need staged payments. We explain everything before you commit.'
    }
  ];

  return (
    <div className="store-page">
      <PageHero
        size="large"
        kicker="Accra Desk · Mon–Fri 8am–6pm"
        title="We are here to help"
        subtitle="Quotes, timelines, or a quick question. Talk to real people who move imports from China to Ghana."
      />

      <div className="store-container store-section">
        <div className="mb-14 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : '_self'}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
              className="group flex flex-col justify-between bg-white p-6 transition-colors hover:bg-[#f8fafc]"
            >
              <div>
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-brand-primary group-hover:bg-brand-primary group-hover:text-white">
                  <i className={`${method.icon} text-lg`}></i>
                </div>
                <h3 className="font-heading text-sm font-bold text-brand-primary">{method.title}</h3>
                <p className="mt-1 break-all font-medium text-slate-900">{method.value}</p>
              </div>
              <p className="mt-3 text-xs text-slate-500">{method.description}</p>
            </a>
          ))}
        </div>


        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Send a message</h2>
            <p className="text-gray-600 mb-8">
              Tell us what you need. We reply within 24 hours.
            </p>

            <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent text-sm"
                  placeholder="+1 555 000 0000"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent text-sm"
                  placeholder="Order inquiry, product question, etc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  maxLength={500}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none text-sm"
                  placeholder="Tell us how we can help you..."
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-blue-50 border border-blue-200 text-brand-primary px-4 py-3 rounded-xl">
                  <i className="ri-check-line mr-2"></i>
                  Message sent successfully! We'll respond within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <i className="ri-error-warning-line mr-2"></i>
                  {submitError || 'Failed to send message. Please try again or contact us directly.'}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || verifying}
                className="w-full bg-brand-primary text-white py-4 rounded-xl font-medium hover:bg-[#172554] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting || verifying ? (verifying ? 'Verifying...' : 'Sending...') : 'Send Message'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Quick answers</h2>
            <p className="text-gray-600 mb-8">
              Common questions before you reach out
            </p>

            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                  <summary className="px-6 py-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors">
                    {faq.question}
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="bg-[#172554] p-8 text-white">
              <h3 className="mb-3 text-2xl font-bold">Need help now?</h3>
              <p className="mb-6 leading-relaxed text-blue-100">
                We are here Monday to Friday, 8am to 6pm. For urgent questions, message us on WhatsApp.
              </p>
              {waLink ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-6 py-3 font-medium text-brand-primary transition-colors hover:bg-blue-50"
                >
                  <i className="ri-whatsapp-line text-xl"></i>
                  Chat on WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

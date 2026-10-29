'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getAuthCookies } from '@/lib/auth-remember';
import { isValidGhPhone, maskPhoneDisplay } from '@/lib/auth-copy';

type Step = 'phone' | 'code';

export default function VerifyPhonePage() {
  const router = useRouter();
  const [loadingSession, setLoadingSession] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [sentPhone, setSentPhone] = useState('');
  const [phoneMasked, setPhoneMasked] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        const cookies = getAuthCookies();
        if (cookies) {
          const restored = await supabase.auth.setSession(cookies);
          session = restored.data.session;
        }
      }
      if (!session) {
        router.replace('/auth/login?next=/account/verify-phone');
        return;
      }
      if (cancelled) return;
      setAccessToken(session.access_token);
      const existing =
        session.user.phone ||
        String(session.user.user_metadata?.phone || '').trim() ||
        '';
      if (existing) setPhone(existing.replace(/^\+233/, '0'));
      setLoadingSession(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((n) => n - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  });

  const sendCode = async () => {
    setError('');
    if (!isValidGhPhone(phone)) {
      setError('Enter a valid Ghana number, e.g. 0551234567.');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/account/verify-phone/send', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not send code.');
      setSentPhone(data.phone);
      setPhoneMasked(data.phoneMasked || maskPhoneDisplay(data.phone));
      setStep('code');
      setCode(['', '', '', '', '', '']);
      setResendCooldown(60);
      setTimeout(() => document.getElementById('phone-code-0')?.focus(), 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send code.');
    } finally {
      setBusy(false);
    }
  };

  const confirmCode = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) return;
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/account/verify-phone/confirm', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ phone: sentPhone || phone, code: verificationCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not verify code.');
      await supabase.auth.refreshSession();
      setDone(true);
      setTimeout(() => router.push('/account?tab=security'), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not verify code.');
    } finally {
      setBusy(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 5) {
      document.getElementById(`phone-code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`phone-code-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const next = pasted.split('');
    while (next.length < 6) next.push('');
    setCode(next);
  };

  if (loadingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <i className="ri-loader-4-line animate-spin text-3xl text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white">
              <i className="ri-smartphone-line text-2xl" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-brand-primary">
              {done ? 'Phone verified' : 'Verify phone number'}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {done
                ? 'Your number is saved on this account.'
                : step === 'phone'
                  ? 'Add a Ghana number. We will text you a 6-digit code.'
                  : `Enter the code we sent to ${phoneMasked || 'your phone'}.`}
            </p>
          </div>

          {done ? (
            <p className="text-center text-sm font-medium text-emerald-700">
              Taking you back to Security…
            </p>
          ) : step === 'phone' ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="verify-phone-input" className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Phone number
                </label>
                <input
                  id="verify-phone-input"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0551234567"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-brand-primary focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                />
                <p className="mt-1.5 text-xs text-slate-400">Use 0XXXXXXXXX or +233…</p>
              </div>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              <button
                type="button"
                onClick={sendCode}
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-accent disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <i className="ri-message-3-line" />
                    Send SMS code
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="mb-3 block text-center text-sm font-semibold text-slate-800">
                  Enter verification code
                </label>
                <div className="flex justify-center gap-2" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`phone-code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-12 w-10 rounded-lg border-2 border-slate-200 text-center text-xl font-bold text-brand-primary focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 sm:h-14 sm:w-12"
                    />
                  ))}
                </div>
              </div>

              {error ? <p className="text-center text-sm font-medium text-red-600">{error}</p> : null}

              <button
                type="button"
                onClick={confirmCode}
                disabled={busy || code.join('').length !== 6}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-accent disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    Verifying…
                  </>
                ) : (
                  'Verify phone'
                )}
              </button>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={busy || resendCooldown > 0}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend SMS'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone');
                    setError('');
                    setCode(['', '', '', '', '', '']);
                  }}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Change number
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 rounded-xl bg-brand-primary/5 px-3 py-2.5 text-xs text-slate-600">
            <i className="ri-information-line mr-1 text-brand-primary" />
            Code expires in 10 minutes. Standard SMS rates may apply.
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/account?tab=security"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-brand-primary"
            >
              ← Back to Security
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

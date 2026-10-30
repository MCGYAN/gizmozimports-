'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import OrderHistory from './OrderHistory';
import AddressBook from './AddressBook';
import MyShipments from './MyShipments';
import FinancialDocuments from './FinancialDocuments';
import DeliveryRequests from './DeliveryRequests';
import OrderStatus from './OrderStatus';
import ChinaWarehouse from './ChinaWarehouse';
import { supabase } from '@/lib/supabase';
import { getAuthCookies } from '@/lib/auth-remember';

const ACCOUNT_TABS = [
  'profile',
  'status',
  'orders',
  'warehouse',
  'shipments',
  'documents',
  'deliveries',
  'addresses',
  'security',
] as const;

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'status';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState('');
  const [portalData, setPortalData] = useState<{
    packages: any[];
    board: any | null;
    documents: any[];
    orderStatus: any[];
    rmbStatus: any[];
  }>({ packages: [], board: null, documents: [], orderStatus: [], rmbStatus: [] });
  const [portalLoading, setPortalLoading] = useState({
    shipments: false,
    documents: false,
    status: false,
  });
  const [portalLoaded, setPortalLoaded] = useState({
    shipments: false,
    documents: false,
    status: false,
  });

  // Update active tab when URL param changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (ACCOUNT_TABS as readonly string[]).includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const goToTab = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    if (tab !== 'status') params.delete('order');
    if (tab !== 'documents') params.delete('document');
    router.replace(`/account?${params.toString()}`, { scroll: false });
  };

  const mobileTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const el = mobileTabRefs.current[activeTab];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeTab]);

  // Profile Form States
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [profileLoading, setProfileLoading] = useState(false);

  // Password Form States
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    async function checkUser() {
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
        const query = searchParams.toString();
        const nextPath = `/account${query ? `?${query}` : ''}`;
        router.push(`/auth/login?next=${encodeURIComponent(nextPath)}`);
        return;
      }

      setUser(session.user);
      setAccessToken(session.access_token);
      setProfileData({
        firstName: session.user.user_metadata?.first_name || '',
        lastName: session.user.user_metadata?.last_name || '',
        email: session.user.email || '',
        phone: session.user.phone || ''
      });
      setLoading(false);

      // Guest records are normally claimed during sign-in. Recheck quietly here
      // without making the account screen wait for database updates.
      void fetch('/api/orders/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: '{}',
      }).catch(() => null);
    }
    checkUser();
  }, [router, searchParams]);

  useEffect(() => {
    const section =
      activeTab === 'shipments'
        ? 'shipments'
        : activeTab === 'documents'
          ? 'documents'
          : activeTab === 'status'
            ? 'status'
            : null;
    if (!section || !accessToken || portalLoaded[section] || portalLoading[section]) return;

    const loadPortalSection = async () => {
      setPortalLoading((current) => ({ ...current, [section]: true }));
      try {
        const include =
          section === 'shipments'
            ? 'packages,board'
            : section === 'documents'
              ? 'documents'
              : 'order-status';
        const response = await fetch(`/api/account/portal?include=${include}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Could not load account records.');
        setPortalData((current) => ({ ...current, ...result }));
      } catch (error) {
        console.error(`[account ${section}]`, error);
      } finally {
        setPortalLoaded((current) => ({ ...current, [section]: true }));
        setPortalLoading((current) => ({ ...current, [section]: false }));
      }
    };

    void loadPortalSection();
  }, [accessToken, activeTab, portalLoaded, portalLoading]);

  const reloadDocuments = async () => {
    if (!accessToken) return;
    setPortalLoading((current) => ({ ...current, documents: true }));
    try {
      const response = await fetch('/api/account/portal?include=documents', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not load account records.');
      setPortalData((current) => ({ ...current, documents: result.documents || [] }));
    } catch (error) {
      console.error('[account documents refresh]', error);
    } finally {
      setPortalLoading((current) => ({ ...current, documents: false }));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          full_name: `${profileData.firstName} ${profileData.lastName}`.trim(),
          phone: profileData.phone,
        }
      });

      if (error) throw error;
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: `${profileData.firstName} ${profileData.lastName}`.trim(),
          phone: profileData.phone.trim() || null,
        })
        .eq('id', user.id);
      if (profileError) throw profileError;
      setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setProfileMessage({ type: 'error', text: err.message });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    if (passwordData.password.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.password
      });
      if (error) throw error;
      setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({ password: '', confirmPassword: '' });
    } catch (err: any) {
      setPasswordMessage({ type: 'error', text: err.message });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { clearAuthCookies } = await import('@/lib/auth-remember');
    clearAuthCookies();
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <i className="ri-loader-4-line animate-spin text-4xl text-brand-primary"></i>
      </div>
    );
  }

  const securityOptions = [
    {
      icon: 'ri-mail-check-line',
      title: 'Email',
      description: user?.email,
      status: user?.email_confirmed_at ? 'verified' : 'unverified',
      link: null as string | null,
    },
  ];

  const desktopTabs = [
    { id: 'status', label: 'Order status' },
    { id: 'orders', label: 'Past orders' },
    { id: 'shipments', label: 'My Shipments' },
    { id: 'documents', label: 'Invoices & Receipts' },
    { id: 'deliveries', label: 'Deliveries' },
    { id: 'warehouse', label: 'China Warehouse' },
    { id: 'profile', label: 'Profile Settings' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'security', label: 'Security' },
  ];

  // Order-first on mobile so tracking/pay/docs are one swipe away
  const mobileTabs = [
    { id: 'status', icon: 'ri-map-pin-line', label: 'Status' },
    { id: 'shipments', icon: 'ri-ship-2-line', label: 'Shipments' },
    { id: 'documents', icon: 'ri-file-list-3-line', label: 'Invoices' },
    { id: 'deliveries', icon: 'ri-calendar-check-line', label: 'Deliveries' },
    { id: 'orders', icon: 'ri-archive-line', label: 'Orders' },
    { id: 'warehouse', icon: 'ri-building-2-line', label: 'Warehouse' },
    { id: 'profile', icon: 'ri-user-settings-line', label: 'Profile' },
    { id: 'addresses', icon: 'ri-map-pin-2-line', label: 'Addresses' },
    { id: 'security', icon: 'ri-shield-keyhole-line', label: 'Security' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-24 pt-5 lg:pb-12 lg:pt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-4 flex items-center justify-between gap-3 md:mb-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white md:h-14 md:w-14 md:text-xl">
                {(profileData.firstName?.[0] || user?.email?.[0] || '?').toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-gray-900 md:text-2xl">
                  {profileData.firstName ? `Hi, ${profileData.firstName}` : 'My account'}
                </h1>
                <p className="truncate text-xs text-gray-500 md:text-sm">{user?.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="shrink-0 text-sm font-semibold text-gray-500 underline-offset-2 hover:text-red-600 hover:underline md:rounded-xl md:border md:border-gray-200 md:bg-white md:px-5 md:py-2.5 md:no-underline md:shadow-sm md:hover:border-red-200 md:hover:bg-red-50"
            >
              Sign out
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:col-span-1 lg:block">
              <div className="sticky top-24 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <nav className="space-y-1 p-2">
                  {desktopTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => goToTab(tab.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                        activeTab === tab.id
                          ? 'bg-brand-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-brand-primary'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile: simple sticky chips — no grids, no section labels */}
            <div className="sticky top-[4.25rem] z-20 -mx-4 border-b border-gray-200 bg-gray-50/95 px-4 py-2.5 backdrop-blur lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide [-webkit-overflow-scrolling:touch]">
                {mobileTabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      ref={(node) => {
                        mobileTabRefs.current[tab.id] = node;
                      }}
                      type="button"
                      onClick={() => goToTab(tab.id)}
                      className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                        active
                          ? 'bg-brand-primary text-white'
                          : 'bg-white text-gray-600 ring-1 ring-gray-200'
                      }`}
                    >
                      <i className={`${tab.icon} text-[15px]`} aria-hidden />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-8">
                {activeTab === 'profile' && (
                  <div className="max-w-2xl">
                    <h2 className="mb-1 text-xl font-bold text-gray-900 md:text-2xl">Profile</h2>
                    <p className="mb-6 text-sm text-gray-500 md:mb-8">Your name and contact details.</p>

                    {profileMessage.text && (
                      <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${profileMessage.type === 'success' ? 'bg-blue-50 text-brand-primary border border-blue-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        <i className={`text-xl mt-0.5 ${profileMessage.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}`}></i>
                        <div>{profileMessage.text}</div>
                      </div>
                    )}

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-900">First Name</label>
                          <input
                            type="text"
                            value={profileData.firstName}
                            onChange={e => setProfileData({ ...profileData, firstName: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-900">Last Name</label>
                          <input
                            type="text"
                            value={profileData.lastName}
                            onChange={e => setProfileData({ ...profileData, lastName: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Email Address</label>
                        <div className="relative">
                          <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                          <input
                            type="email"
                            value={profileData.email}
                            disabled
                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-100 bg-gray-50/50 rounded-xl text-gray-500 cursor-not-allowed"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">Read Only</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Phone Number</label>
                        <div className="relative">
                          <i className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                            placeholder="+1 555 000 0000"
                            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={profileLoading}
                          className="px-8 py-3 bg-brand-primary hover:bg-brand-accent hover:text-white text-white rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:shadow-none"
                        >
                          {profileLoading ? 'Saving Info...' : 'Save Profile Information'}
                        </button>
                      </div>
                    </form>

                    <div className="mt-10 border-t border-gray-100 pt-8 md:mt-12 md:pt-12">
                      <h3 className="mb-1 text-lg font-bold text-gray-900 md:text-xl">Change password</h3>
                      <p className="mb-5 text-sm text-gray-500 md:mb-6">Use a strong password you do not reuse elsewhere.</p>

                      {passwordMessage.text && (
                        <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${passwordMessage.type === 'success' ? 'bg-blue-50 text-brand-primary border border-blue-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                          <i className={`text-xl mt-0.5 ${passwordMessage.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}`}></i>
                          <div>{passwordMessage.text}</div>
                        </div>
                      )}

                      <form onSubmit={handleChangePassword} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-900">New Password</label>
                            <div className="relative">
                              <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                              <input
                                type="password"
                                value={passwordData.password}
                                onChange={e => setPasswordData({ ...passwordData, password: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-900">Confirm Password</label>
                            <div className="relative">
                              <i className="ri-lock-check-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                              <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          disabled={passwordLoading}
                          className="px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold transition-all shadow-lg shadow-gray-900/10 active:scale-95 disabled:opacity-50 disabled:shadow-none"
                        >
                          {passwordLoading ? 'Updating...' : 'Update Password'}
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'status' && (
                  <OrderStatus
                    orders={portalData.orderStatus || []}
                    rmbOrders={portalData.rmbStatus || []}
                    loading={portalLoading.status || !portalLoaded.status}
                    focusOrderNumber={searchParams.get('order')}
                  />
                )}

                {activeTab === 'orders' && <OrderHistory />}

                {activeTab === 'warehouse' && <ChinaWarehouse accessToken={accessToken} />}

                {activeTab === 'shipments' && (
                  <MyShipments
                    data={{ packages: portalData.packages, board: portalData.board }}
                    loading={portalLoading.shipments || !portalLoaded.shipments}
                  />
                )}

                {activeTab === 'documents' && (
                  <FinancialDocuments
                    documents={portalData.documents}
                    loading={portalLoading.documents || !portalLoaded.documents}
                    accessToken={accessToken}
                    onRefresh={reloadDocuments}
                  />
                )}

                {activeTab === 'deliveries' && <DeliveryRequests />}

                {activeTab === 'addresses' && <AddressBook />}

                {activeTab === 'security' && (
                  <div>
                    <h2 className="mb-4 text-xl font-bold text-gray-900 md:mb-6 md:text-2xl">Security</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {securityOptions.map((option, index) => {
                        const inner = (
                          <>
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-50">
                                <i className={`${option.icon} text-xl`}></i>
                              </div>
                              <div className="min-w-0">
                                <h3 className="truncate font-bold text-gray-900">{option.title}</h3>
                                <p className="truncate text-sm text-gray-500">{option.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-shrink-0 items-center gap-3">
                              {option.status === 'verified' && (
                                <span className="flex items-center gap-1 rounded-full bg-brand-light px-2 py-1 text-[10px] font-bold text-brand-primary sm:px-3 sm:text-xs">
                                  <i className="ri-verified-badge-fill"></i>{' '}
                                  <span className="hidden sm:inline">Verified</span>
                                </span>
                              )}
                              {option.status === 'unverified' && (
                                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700 sm:px-3 sm:text-xs">
                                  <i className="ri-error-warning-fill"></i>{' '}
                                  <span className="hidden sm:inline">Unverified</span>
                                </span>
                              )}
                            </div>
                          </>
                        );

                        if (option.link) {
                          return (
                            <Link
                              key={index}
                              href={option.link}
                              className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-brand-accent hover:shadow-md"
                            >
                              {inner}
                            </Link>
                          );
                        }

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5"
                          >
                            {inner}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <i className="ri-loader-4-line animate-spin text-4xl text-brand-primary"></i>
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}

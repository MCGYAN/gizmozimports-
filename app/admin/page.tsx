'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartContainer from '@/components/admin/ChartContainer';
import { BRAND_ACCENT, type AdminStatTone } from '@/lib/brand';

type StatItem = {
  title: string;
  value: string;
  change: string;
  trend: string;
  icon: string;
  tone: AdminStatTone;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  // Real Stats
  const [stats, setStats] = useState<StatItem[]>([
    {
      title: 'Shop revenue',
      value: 'GH¢0.00',
      change: 'Paid product orders',
      trend: 'up',
      icon: 'ri-money-dollar-circle-line',
      tone: 'accent',
    },
    {
      title: 'Product orders',
      value: '0',
      change: '0 paid',
      trend: 'up',
      icon: 'ri-shopping-bag-line',
      tone: 'primary',
    },
    {
      title: 'Customers (Active)',
      value: '0',
      change: 'Unique buyers',
      trend: 'up',
      icon: 'ri-group-line',
      tone: 'accent',
    },
    {
      title: 'Avg order value',
      value: 'GH¢0.00',
      change: 'Paid orders only',
      trend: 'up',
      icon: 'ri-line-chart-line',
      tone: 'primary',
    },
  ]);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [rmbDesk, setRmbDesk] = useState({
    openDeals: 0,
    completedDeals: 0,
    volumeGhs: 0,
    volumeRmb: 0,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      setDashboardError(null);
      try {
        // 1. Fetch ALL Orders for count & customers
        const { data: allOrdersData, error: ordersError } = await supabase
          .from('orders')
          .select('total, status, payment_status, created_at, email');

        if (ordersError) {
          const errMsg = ordersError.message || ordersError.code || 'Failed to load orders';
          setDashboardError(errMsg);
          return;
        }

        // Only count PAID product orders for shop revenue (Buy RMB is separate)
        const paidOrders = allOrdersData?.filter(o => o.payment_status === 'paid') || [];
        const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalOrders = allOrdersData?.length || 0;
        const paidOrderCount = paidOrders.length;
        const avgOrderValue = paidOrderCount > 0 ? totalRevenue / paidOrderCount : 0;

        // 2. Fetch Customers Count (approximation using orders unique emails if we don't have user metrics access)
        // Since we can't query auth.users directly from client, we'll estimate active customers via orders or just keep it 0 if we can't.
        // Actually, best to just show "Orders" or "Recent Signups" if we had a public profiles table.
        // We'll use unique emails from orders as a proxy for "Customers"
        const uniqueCustomers = new Set(allOrdersData?.map(o => o.email)).size;


        // Process Chart Data (Last 7 Days) - only count PAID orders as revenue
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return d.toISOString().split('T')[0];
        });

        const chartMap = last7Days.reduce((acc: any, date) => {
          acc[date] = 0;
          return acc;
        }, {});

        paidOrders.forEach(order => {
          try {
            const date = new Date(order.created_at).toISOString().split('T')[0];
            if (chartMap[date] !== undefined) {
              chartMap[date] += (order.total || 0);
            }
          } catch {
            // skip bad dates
          }
        });

        const processedChartData = Object.keys(chartMap).map(date => ({
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: chartMap[date]
        }));
        setChartData(processedChartData);

        setStats([
          {
            title: 'Shop revenue',
            value: `GH¢${totalRevenue.toFixed(2)}`,
            change: 'Paid product orders',
            trend: 'up',
            icon: 'ri-money-dollar-circle-line',
            tone: 'accent',
          },
          {
            title: 'Product orders',
            value: totalOrders.toString(),
            change: `${paidOrderCount} paid`,
            trend: 'up',
            icon: 'ri-shopping-bag-line',
            tone: 'primary',
          },
          {
            title: 'Customers (Active)',
            value: uniqueCustomers.toString(),
            change: 'Unique buyers',
            trend: 'up',
            icon: 'ri-group-line',
            tone: 'accent',
          },
          {
            title: 'Avg order value',
            value: `GH¢${avgOrderValue.toFixed(2)}`,
            change: 'Paid orders only',
            trend: 'up',
            icon: 'ri-line-chart-line',
            tone: 'primary',
          },
        ]);

        // Buy RMB desk metrics (not included in shop revenue)
        const { data: exchangeRows } = await supabase
          .from('exchange_orders')
          .select('status, payment_status, amount_from, amount_to, currency_from, currency_to');

        if (exchangeRows) {
          const completed = exchangeRows.filter(
            (ex) => ex.status === 'completed' || ex.payment_status === 'paid' || ex.status === 'confirmed',
          );
          const open = exchangeRows.filter(
            (ex) => !['completed', 'cancelled', 'expired'].includes(ex.status),
          );
          const settled = exchangeRows.filter(
            (ex) => ex.status === 'completed' || ex.status === 'confirmed' || ex.payment_status === 'paid',
          );
          setRmbDesk({
            openDeals: open.length,
            completedDeals: completed.filter((ex) => ex.status === 'completed').length,
            volumeGhs: settled.reduce((sum, ex) => sum + (Number(ex.amount_from) || 0), 0),
            volumeRmb: settled.reduce((sum, ex) => sum + (Number(ex.amount_to) || 0), 0),
          });
        }

        // 3. Fetch Recent Orders (only paid orders)
        const { data: recentOrdersData } = await supabase
          .from('orders')
          .select('id, order_number, user_id, email, created_at, total, status, shipping_address')
          .eq('payment_status', 'paid')
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentOrdersData) {
          const formattedRecent = recentOrdersData.map((o: any) => {
            const addr = o.shipping_address || {};
            const customerName = (addr.firstName && addr.lastName)
              ? `${addr.firstName.trim()} ${addr.lastName.trim()}`
              : addr.full_name || addr.firstName || (o.email && o.email.split('@')[0]) || 'Customer';
            return {
              id: o.id,
              displayId: o.order_number,
              customer: customerName,
              email: o.email,
              date: new Date(o.created_at).toLocaleDateString(),
              total: o.total,
              status: o.status,
              items: 1
            };
          });
          setRecentOrders(formattedRecent);
        }

        // 4. Fetch Low Stock Products
        const { data: lowStockData } = await supabase
          .from('products')
          .select('name, quantity')
          .lt('quantity', 10)
          .limit(5);

        if (lowStockData) {
          setLowStockProducts(lowStockData.map((p: any) => ({
            name: p.name,
            stock: p.quantity,
            status: p.quantity === 0 ? 'critical' : 'low'
          })));
        }

        // 5. Fetch Top Products (Approximation: High Price or just Random for now, 
        // real top selling requires aggregation on order_items which is complex for client-side)
        // real top selling requires aggregation on order_items which is complex for client-side)
        const { data: productData } = await supabase.from('products').select('*, product_images(url)').limit(4);
        if (productData) {
          setTopProducts(productData.map((p: any) => ({
            id: p.slug, // Use slug for link
            name: p.name,
            image: p.product_images?.[0]?.url || 'https://via.placeholder.com/200',
            sales: 0, // Mocked for now
            revenue: 0, // Mocked for now
            stock: p.quantity
          })));
        }

      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : typeof error === 'object' && error !== null && 'message' in error
              ? String((error as { message?: unknown }).message)
              : 'Failed to load dashboard data.';
        setDashboardError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const statusColors: Record<string, string> = {
    pending: 'bg-brand-accent/15 text-brand-accent',
    processing: 'bg-brand-primary/10 text-brand-primary',
    shipped: 'bg-brand-primary/15 text-brand-primary',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const quickActions = [
    {
      title: 'Manage orders',
      icon: 'ri-file-list-line',
      tone: 'primary' as AdminStatTone,
      link: '/admin/orders',
    },
    {
      title: 'Invoices',
      icon: 'ri-bill-line',
      tone: 'accent' as AdminStatTone,
      link: '/admin/invoices',
    },
    {
      title: 'Buy RMB desk',
      icon: 'ri-exchange-dollar-line',
      tone: 'primary' as AdminStatTone,
      link: '/admin/exchange',
    },
    {
      title: 'Delivery requests',
      icon: 'ri-truck-line',
      tone: 'accent' as AdminStatTone,
      link: '/admin/deliveries',
    },
  ];

  if (loading) {
    return <div className="p-8 text-center text-brand-primary/60">Loading Dashboard...</div>;
  }

  if (dashboardError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="admin-card w-full max-w-md p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <i className="ri-error-warning-line text-2xl" />
          </div>
          <h2 className="mb-2 font-heading text-lg font-semibold text-brand-primary">Error loading dashboard</h2>
          <p className="mb-4 text-sm text-slate-600">{dashboardError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary rounded-xl bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-accent"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const chartHasRevenue = chartData.some((d) => Number(d.revenue) > 0);

  return (
    <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-brand-primary md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Shop sales overview. Buy RMB stays separate below.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/products/new" className="admin-btn-primary text-xs md:text-sm">
            <i className="ri-add-line mr-1.5" />
            Add product
          </Link>
          <Link href="/admin/pos" className="admin-btn-secondary text-xs md:text-sm">
            Open POS
          </Link>
        </div>
      </header>

      {/* Shop KPIs */}
      <section>
        <p className="admin-section-label">Shop</p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => (
            <div key={stat.title} className="admin-kpi">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-slate-500 md:text-sm">{stat.title}</p>
                <div className={stat.tone === 'accent' ? 'admin-stat-icon-accent' : 'admin-stat-icon-primary'}>
                  <i className={`${stat.icon} text-lg`} />
                </div>
              </div>
              <div>
                <p className="font-heading text-xl font-bold leading-none text-brand-primary md:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[11px] text-slate-400 md:text-xs">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Buy RMB — secondary strip */}
      <section className="overflow-hidden rounded-2xl border border-brand-primary/10 bg-brand-primary/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-primary/10 px-4 py-3 md:px-5">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                <i className="ri-exchange-dollar-line text-sm" />
              </span>
              <h2 className="font-heading text-sm font-bold text-brand-primary md:text-base">Buy RMB desk</h2>
            </div>
            <p className="mt-0.5 pl-9 text-[11px] text-slate-500 md:text-xs">
              Exchange only · not in shop revenue
            </p>
          </div>
          <Link
            href="/admin/exchange"
            className="inline-flex items-center gap-1 rounded-lg bg-white/70 px-3 py-1.5 text-xs font-semibold text-brand-primary shadow-sm transition-colors hover:text-brand-accent"
          >
            Open desk
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
        <div className="grid grid-cols-2 divide-x divide-y divide-brand-primary/10 lg:grid-cols-4 lg:divide-y-0">
          {[
            { label: 'Open deals', value: String(rmbDesk.openDeals) },
            { label: 'Completed', value: String(rmbDesk.completedDeals) },
            { label: 'Cedis volume', value: `GH¢${rmbDesk.volumeGhs.toFixed(2)}` },
            { label: 'RMB sent / locked', value: `${rmbDesk.volumeRmb.toFixed(2)} RMB` },
          ].map((cell) => (
            <div key={cell.label} className="px-4 py-3.5 md:px-5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{cell.label}</p>
              <p className="mt-1 font-heading text-base font-bold text-brand-primary md:text-lg">{cell.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chart + Actions */}
      <section className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="admin-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="font-heading text-base font-bold text-brand-primary md:text-lg">Shop revenue</h2>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              Last 7 days
            </span>
          </div>
          {chartHasRevenue ? (
            <ChartContainer className="h-48 w-full min-w-0 md:h-64">
              <AreaChart data={chartData} margin={{ top: 8, right: 4, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_ACCENT} stopOpacity={0.22} />
                    <stop offset="95%" stopColor={BRAND_ACCENT} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(30,58,138,0.06)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  dy={8}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(value) => `GH¢${value}`}
                  width={48}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.96)',
                    borderRadius: '10px',
                    border: '1px solid rgba(30,58,138,0.08)',
                    boxShadow: '0 8px 24px rgba(30,58,138,0.08)',
                  }}
                  formatter={(value) => [`GH¢${(value as number)?.toFixed(2) ?? '0.00'}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={BRAND_ACCENT}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ChartContainer>
          ) : (
            <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 md:h-64">
              <i className="ri-line-chart-line mb-2 text-2xl text-slate-300" />
              <p className="text-sm font-medium text-slate-500">No paid shop sales yet</p>
              <p className="mt-0.5 text-xs text-slate-400">Trend appears once orders are marked paid</p>
            </div>
          )}
        </div>

        <div className="admin-card">
          <h2 className="mb-3 font-heading text-base font-bold text-brand-primary md:text-lg">Quick actions</h2>
          <div className="divide-y divide-slate-100">
            {quickActions.map((action) => (
              <Link key={action.link} href={action.link} className="admin-quick-action group">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    action.tone === 'accent'
                      ? 'bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-white'
                      : 'bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white'
                  }`}
                >
                  <i className={action.icon} />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{action.title}</span>
                <i className="ri-arrow-right-s-line text-slate-300 transition-colors group-hover:text-brand-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Orders + stock */}
      <section className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        <div className="admin-card overflow-hidden lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-brand-primary md:text-lg">Recent orders</h2>
            <Link href="/admin/orders" className="admin-link text-xs md:text-sm">
              View all <i className="ri-arrow-right-line ml-0.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-10 text-center">
              <p className="text-sm text-slate-500">No paid orders yet</p>
            </div>
          ) : (
            <>
              <div className="space-y-2 md:hidden">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/admin/orders/${order.id}`}
                    className="block rounded-xl border border-slate-100 bg-white/60 p-3 active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-brand-primary">{order.displayId}</p>
                        <p className="mt-0.5 truncate text-xs font-medium text-slate-700">{order.customer}</p>
                        <p className="text-[11px] text-slate-400">{order.date}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-brand-primary">GH¢{order.total.toFixed(2)}</p>
                        <span
                          className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}
                        >
                          {order.status === 'shipped'
                            ? 'Packaged'
                            : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <th className="pb-3 pr-4 font-semibold">Order</th>
                      <th className="pb-3 pr-4 font-semibold">Customer</th>
                      <th className="pb-3 pr-4 font-semibold">Date</th>
                      <th className="pb-3 pr-4 font-semibold">Total</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-slate-50 transition-colors last:border-0 hover:bg-brand-primary/[0.02]"
                      >
                        <td className="py-3.5 pr-4">
                          <Link href={`/admin/orders/${order.id}`} className="admin-link whitespace-nowrap text-sm font-medium">
                            {order.displayId}
                          </Link>
                        </td>
                        <td className="py-3.5 pr-4">
                          <p className="whitespace-nowrap text-sm font-medium text-brand-primary">{order.customer}</p>
                          <p className="text-xs text-slate-400">{order.email}</p>
                        </td>
                        <td className="whitespace-nowrap py-3.5 pr-4 text-sm text-slate-600">{order.date}</td>
                        <td className="whitespace-nowrap py-3.5 pr-4 text-sm font-semibold text-brand-primary">
                          GH¢{order.total.toFixed(2)}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}
                          >
                            {order.status === 'shipped'
                              ? 'Packaged'
                              : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <div className="admin-card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-base font-bold text-brand-primary md:text-lg">Low stock</h2>
            <Link href="/admin/products?filter=low-stock" className="admin-link text-xs">
              All products
            </Link>
          </div>
          {lowStockProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-emerald-200/80 bg-emerald-50/40 px-3 py-8 text-center">
              <i className="ri-checkbox-circle-line mb-1 text-xl text-emerald-500" />
              <p className="text-sm text-emerald-800/80">Inventory looks good</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStockProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 bg-white/50 px-3 py-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-brand-primary">{product.name}</p>
                    <p className="text-[11px] text-slate-400">Stock: {product.stock}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      product.status === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-brand-accent/15 text-brand-accent'
                    }`}
                  >
                    {product.status === 'critical' ? 'Critical' : 'Low'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product snapshot */}
      <section className="admin-card overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-brand-primary md:text-lg">Products</h2>
          <Link href="/admin/products" className="admin-link text-xs md:text-sm">
            View all <i className="ri-arrow-right-line ml-0.5" />
          </Link>
        </div>

        {topProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-10 text-center">
            <p className="text-sm text-slate-500">No products yet</p>
            <Link href="/admin/products/new" className="admin-link mt-2 inline-block text-sm">
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="admin-product-tile overflow-hidden rounded-xl border border-slate-100 bg-white/50 p-2.5 transition-shadow hover:shadow-[0_8px_24px_rgba(30,58,138,0.06)] md:p-3"
              >
                <div className="mb-2 aspect-square overflow-hidden rounded-lg bg-slate-100">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-brand-primary md:text-sm">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between gap-1 border-t border-slate-100 pt-2">
                  <span className="text-[10px] text-slate-500 md:text-xs">Stock: {product.stock}</span>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="admin-link text-[10px] font-semibold md:text-xs"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

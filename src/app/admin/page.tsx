'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: string;
  created_at: string;
  customer_email: string;
  payment_id: string;
  order_id: string;
  ritual_names: string[];
  status: 'pending' | 'in_progress' | 'delivered';
};

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  delivered: 'Delivered',
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(async r => {
        if (r.status === 401) {
          window.location.href = '/admin/login';
          return [];
        }
        return r.json();
      })
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    await fetch('/api/admin/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as Order['status'] } : o));
    setUpdatingId(null);
  };

  const totalRevenue = orders.length * 501; // base price — will vary once we track amounts

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: orders.length, icon: '📋' },
          { label: 'Revenue (est.)', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: '₹' },
          { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, icon: '✅' },
          { label: 'In Progress', value: orders.filter(o => o.status === 'in_progress').length, icon: '⏳' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl p-5">
            <p className="text-[#5C564F] text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-white text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-[#2A1208] border border-[#5E2E14] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#5E2E14] flex items-center justify-between">
          <h2 className="text-white font-semibold">Orders</h2>
          <span className="text-[#5C564F] text-xs">{orders.length} total</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-6 h-6 border-2 border-[#BD5319] border-t-transparent rounded-full" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5C564F] text-sm">No orders yet. They will appear here after a customer completes payment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#5E2E14]">
                  {['Date', 'Email', 'Rituals', 'Payment ID', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-[#5C564F] text-xs uppercase tracking-wider px-6 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-[#5E2E14]/40 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-[#5C564F] whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-white">{order.customer_email}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(order.ritual_names || []).map(r => (
                          <span key={r} className="text-xs bg-[#BD5319]/10 border border-[#BD5319]/20 text-[#C9A84C] px-2 py-0.5 rounded-full">
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-[#5C564F] text-xs font-mono">{order.payment_id}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-3 py-1 rounded-full border ${STATUS_STYLES[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        className="bg-[#3E1A0C] border border-[#5E2E14] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#C9A84C]/50 cursor-pointer disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Note about analytics */}
      <div className="mt-6 bg-[#2A1208]/60 border border-[#5E2E14]/40 rounded-2xl p-5">
        <p className="text-[#5C564F] text-xs">
          <span className="text-[#C9A84C] font-medium">💡 Website analytics</span> — To see page views and visitor counts, add Google Analytics or Plausible after the domain is live. This takes about 5 minutes and will show data directly in this dashboard.
        </p>
      </div>
    </div>
  );
}

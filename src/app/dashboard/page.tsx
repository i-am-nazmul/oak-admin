import { logoutAction } from "../actions";
import { LogOut, Users, Building2, Activity, CreditCard, DollarSign } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import DashboardTabs, { Brand, Creator } from "./DashboardTabs";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  let creators: Creator[] = [];
  let brands: Brand[] = [];
  let stats: any = null;

  if (token) {
    try {
      const [creatorsRes, brandsRes, statsRes] = await Promise.allSettled([
        fetch(`${API_URL}/api/creators`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        }),
        fetch(`${API_URL}/api/brands`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        }),
        fetch(`${API_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        })
      ]);

      if (creatorsRes.status === "fulfilled" && creatorsRes.value.ok) {
        const data = await creatorsRes.value.json();
        creators = data.creators || (Array.isArray(data) ? data : []);
      }

      if (brandsRes.status === "fulfilled" && brandsRes.value.ok) {
        const data = await brandsRes.value.json();
        brands = data.brands || (Array.isArray(data) ? data : []);
      }

      if (statsRes.status === "fulfilled" && statsRes.value.ok) {
        stats = await statsRes.value.json();
      }
    } catch (e) {
      console.error("Error fetching dashboard data:", e);
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px' }}>
      <header className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', marginBottom: '32px', borderRadius: '16px' }}>
        <div>
          <h1 className="text-gradient" style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Dashboard Overview</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Manage creators, brand partners, and application metrics</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link href="/dashboard/add-creator" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)' }} className="hover:scale-[1.02] transition-transform">
            Add Creator
          </Link>
          <form action={logoutAction}>
            <button type="submit" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '8px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }} className="hover:bg-white/10">
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Overview Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Total Creators</h3>
            <Users size={20} color="#60a5fa" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.totalCreators ?? creators.length}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4ade80' }}>Active in database</p>
        </div>

        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.15s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Registered Brands</h3>
            <Building2 size={20} color="#38bdf8" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{brands.length}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#38bdf8' }}>Partnership records</p>
        </div>

        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Active Sessions</h3>
            <Activity size={20} color="#c084fc" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.activeSessions?.toLocaleString() ?? '1,204'}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4ade80' }}>+5% from last hour</p>
        </div>

        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.25s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Monthly Revenue</h3>
            <DollarSign size={20} color="#f472b6" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.monthlyRevenue ? `$${stats.monthlyRevenue.toLocaleString()}` : '$48,294'}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#f87171' }}>-2% from last month</p>
        </div>

        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Subscriptions</h3>
            <CreditCard size={20} color="#34d399" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.activeSubscriptions?.toLocaleString() ?? '3,892'}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4ade80' }}>+8% from last month</p>
        </div>
      </div>

      {/* Main Content: Interactive Tabs with Brands and Creators */}
      <DashboardTabs creators={creators} brands={brands} />

    </div>
  );
}

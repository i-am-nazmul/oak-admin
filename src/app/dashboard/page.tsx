import { logoutAction } from "../actions";
import { LogOut, Users, Activity, CreditCard, DollarSign, Video, Briefcase, Camera, UserCircle } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  let creators: any[] = [];
  let stats: any = null;
  if (token) {
    try {
      const [creatorsRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/creators`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        }),
        fetch(`${API_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        })
      ]);

      if (creatorsRes.ok) {
        const data = await creatorsRes.json();
        creators = data.creators || data || [];
      }

      if (statsRes.ok) {
        stats = await statsRes.json();
      }
    } catch (e) {
      console.error("Error fetching dashboard data:", e);
    }
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px' }}>
      <header className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', marginBottom: '32px', borderRadius: '16px' }}>
        <h1 className="text-gradient" style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Dashboard Overview</h1>
        
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Total Creators</h3>
            <Users size={20} color="#60a5fa" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.totalCreators ?? (creators.length > 0 ? creators.length : 10482)}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4ade80' }}>+12% from last month</p>
        </div>

        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Active Sessions</h3>
            <Activity size={20} color="#c084fc" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.activeSessions?.toLocaleString() ?? '1,204'}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4ade80' }}>+5% from last hour</p>
        </div>

        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Monthly Revenue</h3>
            <DollarSign size={20} color="#f472b6" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.monthlyRevenue ? `$${stats.monthlyRevenue.toLocaleString()}` : '$48,294'}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#f87171' }}>-2% from last month</p>
        </div>

        <div className="glass-panel animate-fade-in" style={{ padding: '24px', animationDelay: '0.4s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>Active Subscriptions</h3>
            <CreditCard size={20} color="#34d399" />
          </div>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{stats?.activeSubscriptions?.toLocaleString() ?? '3,892'}</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4ade80' }}>+8% from last month</p>
        </div>
      </div>

      <div className="glass-panel animate-fade-in" style={{ padding: '32px', animationDelay: '0.5s', minHeight: '400px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <UserCircle size={24} color="#60a5fa" />
          Registered Creators
        </h2>
        
        {creators.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px' }}>
            <p>No creators registered yet.</p>
            <Link href="/dashboard/add-creator" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 500, marginTop: '8px', display: 'inline-block' }}>Add your first creator</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {creators.map((creator) => (
              <div key={creator._id} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ height: '160px', width: '100%', position: 'relative', background: '#1e293b' }}>
                  {creator.images && creator.images.length > 0 ? (
                    <img src={creator.images[0]} alt={creator.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                      <UserCircle size={48} />
                    </div>
                  )}
                  {creator.images && creator.images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      +{creator.images.length - 1} more
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>{creator.name}</h3>
                  
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {creator.following?.youtube ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                        <Video size={14} color="#ef4444" /> {creator.following.youtube.toLocaleString()}
                      </div>
                    ) : null}
                    
                    {creator.following?.linkedin ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                        <Briefcase size={14} color="#3b82f6" /> {creator.following.linkedin.toLocaleString()}
                      </div>
                    ) : null}
                    
                    {creator.following?.instagram ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#cbd5e1' }}>
                        <Camera size={14} color="#ec4899" /> {creator.following.instagram.toLocaleString()}
                      </div>
                    ) : null}
                  </div>
                  <div style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
                    Added on {new Date(creator.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

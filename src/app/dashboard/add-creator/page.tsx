import { addCreatorAction } from "../../actions";
import { UserPlus, ArrowLeft, Image as ImageIcon, Video, Briefcase, Camera } from "lucide-react";
import Link from "next/link";

export default function AddCreatorPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '32px' }}>
      <header style={{ marginBottom: '32px' }}>
        <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', marginBottom: '16px', transition: 'color 0.2s' }} className="hover:text-white">
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="text-gradient" style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>Add Content Creator</h1>
        <p style={{ color: '#94a3b8', margin: '8px 0 0 0' }}>Register a new creator in the system</p>
      </header>

      <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', padding: '32px', borderRadius: '16px' }}>
        <form action={addCreatorAction} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 500 }}>Full Name *</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <UserPlus size={18} />
              </div>
              <input 
                type="text" 
                id="name"
                name="name"
                required
                placeholder="Jane Doe"
                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '16px', outline: 'none' }}
                className="focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="images" style={{ display: 'block', marginBottom: '8px', color: '#e2e8f0', fontWeight: 500 }}>Images *</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                <ImageIcon size={18} />
              </div>
              <input 
                type="file" 
                accept="image/*"
                id="images"
                name="images"
                required
                multiple
                style={{ width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
                className="focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>Upload one or more profile pictures for the creator.</p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', marginTop: '8px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Follower Counts (Optional)</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              
              <div>
                <label htmlFor="youtube" style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px' }}>YouTube</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ef4444' }}>
                    <Video size={16} />
                  </div>
                  <input 
                    type="number" 
                    id="youtube"
                    name="youtube"
                    min="0"
                    placeholder="150000"
                    style={{ width: '100%', padding: '10px 10px 10px 36px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    className="focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedin" style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px' }}>LinkedIn</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }}>
                    <Briefcase size={16} />
                  </div>
                  <input 
                    type="number" 
                    id="linkedin"
                    name="linkedin"
                    min="0"
                    placeholder="45000"
                    style={{ width: '100%', padding: '10px 10px 10px 36px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    className="focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="instagram" style={{ display: 'block', marginBottom: '8px', color: '#cbd5e1', fontSize: '14px' }}>Instagram</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ec4899' }}>
                    <Camera size={16} />
                  </div>
                  <input 
                    type="number" 
                    id="instagram"
                    name="instagram"
                    min="0"
                    placeholder="120000"
                    style={{ width: '100%', padding: '10px 10px 10px 36px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    className="focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all"
                  />
                </div>
              </div>

            </div>
          </div>

          <button 
            type="submit" 
            style={{ 
              marginTop: '16px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
              color: 'white', 
              border: 'none', 
              padding: '16px', 
              borderRadius: '8px', 
              fontSize: '16px', 
              fontWeight: 600, 
              cursor: 'pointer',
              boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            className="hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30"
          >
            Add Content Creator
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { signupAction } from "../actions";
import { Lock, Mail, ShieldAlert, ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      await signupAction(formData);
    } catch (err: any) {
      setError(err.message || "Failed to create account");
      setLoading(false);
    }
  }

  return (
    <div className="flex" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '40px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', marginBottom: '16px' }}>
            <UserPlus size={32} color="#60a5fa" />
          </div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }} className="text-gradient">
            Create Admin Account
          </h1>
          <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>
            Register to access the admin portal
          </p>
        </div>

        {error && (
          <div className="error-message animate-fade-in">
            <ShieldAlert size={18} />
            {error}
          </div>
        )}

        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }}>
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                required
                className="input-field"
                style={{ paddingLeft: '40px' }}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }}>
                <Lock size={18} />
              </div>
              <input
                name="password"
                type="password"
                required
                className="input-field"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#cbd5e1' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }}>
                <Lock size={18} />
              </div>
              <input
                name="confirmPassword"
                type="password"
                required
                className="input-field"
                style={{ paddingLeft: '40px' }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary btn-icon"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, marginTop: '8px' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
            {!loading && <ArrowRight size={18} />}
          </button>

          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#94a3b8' }}>
            Already have an account?{' '}
            <Link href="/" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '500' }}>
              Sign In
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, LogOut, ArrowLeft, Layers, Shield, Clock, Settings, Edit2, Check, X
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(localStorage.getItem('userName') || 'Research Scholar');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || 'scholar@example.com');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const userInitial = name.charAt(0).toUpperCase();

  const handleSave = () => {
    if (!name || !email) return;
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setSaveSuccess(true);
    setTimeout(() => {
      setIsEditing(false);
      setSaveSuccess(false);
      window.location.reload(); 
    }, 1000);
  };

  const handleCancel = () => {
    setName(localStorage.getItem('userName') || 'Research Scholar');
    setEmail(localStorage.getItem('userEmail') || 'scholar@example.com');
    setIsEditing(false);
  };

  return (
    <>
      {saveSuccess && (
        <div className="animate-slide-up" style={{ 
          position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1000,
          background: 'rgba(34, 197, 94, 0.9)', color: 'white', padding: '1rem 2.5rem',
          borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
          boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)', backdropFilter: 'blur(8px)'
        }}>
          <Check size={20} /> Profile updated successfully!
        </div>
      )}

      <main className="dashboard-container">
        <div className="profile-wrapper animate-slide-up" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Account <span className="gradient-text-primary">Profile</span></h1>
              <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Manage your professional identity and workspace preferences.</p>
            </div>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="glass-button secondary">
                <Edit2 size={16} /> Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={handleSave} className="glass-button">
                  <Check size={16} /> Save Changes
                </button>
                <button onClick={handleCancel} className="glass-button secondary" style={{ color: '#fca5a5' }}>
                  <X size={16} /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            {/* Background Accent */}
            <div style={{ 
              position: 'absolute', 
              top: '-50px', 
              right: '-50px', 
              width: '200px', 
              height: '200px', 
              background: 'radial-gradient(circle, var(--primary-low) 0%, transparent 70%)',
              zIndex: 0
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '3rem' }}>
                <div className="user-avatar" style={{ width: '100px', height: '100px', fontSize: '2.5rem', boxShadow: 'var(--shadow-glow)', background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: 'white' }}>
                  {userInitial}
                </div>
                <div>
                  {isEditing ? (
                    <input 
                      className="glass-input" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      style={{ fontSize: '1.5rem', fontWeight: 700, padding: '0.5rem', width: '300px' }}
                    />
                  ) : (
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-main)' }}>{name}</h2>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1rem', marginTop: isEditing ? '0.5rem' : 0 }}>
                    <Shield size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 500 }}>Academic Researcher</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="info-card glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={14} /> Full Name
                  </div>
                  {isEditing ? (
                    <input className="glass-input" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
                  ) : (
                    <div style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-main)' }}>{name}</div>
                  )}
                </div>

                <div className="info-card glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={14} /> Email Address
                  </div>
                  {isEditing ? (
                    <input className="glass-input" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} />
                  ) : (
                    <div style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-main)' }}>{email}</div>
                  )}
                </div>

                <div className="info-card glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} /> Member Since
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-main)' }}>March 2024</div>
                </div>

                <div className="info-card glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Settings size={14} /> Account Type
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text-main)' }}>Professional Scholar</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                {!isEditing && (
                  <button className="glass-button secondary" style={{ fontWeight: 600 }}>
                    Change Account Password
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

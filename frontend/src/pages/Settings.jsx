import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, Shield, Bell, Key, Moon, Monitor, Globe, ChevronRight, User, Mail, Zap, Check, Save
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [glassIntensity, setGlassIntensity] = useState(localStorage.getItem('glassIntensity') || '60');
  const [accentColor, setAccentColor] = useState(localStorage.getItem('accentColor') || '#6366f1');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'User');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || 'user@example.com');
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    projects: false
  });
  const [apiKey, setApiKey] = useState(localStorage.getItem('groq_api_key') || '');
  const [showKey, setShowKey] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply visual settings globally
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--glass-opacity', glassIntensity / 100);
    root.style.setProperty('--glass-blur', `${(glassIntensity / 100) * 40}px`);
    root.style.setProperty('--primary', accentColor);
    
    // Calculate RGB for glow shadows
    const r = parseInt(accentColor.slice(1, 3), 16);
    const g = parseInt(accentColor.slice(3, 5), 16);
    const b = parseInt(accentColor.slice(5, 7), 16);
    root.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);
    
    localStorage.setItem('glassIntensity', glassIntensity);
    localStorage.setItem('accentColor', accentColor);
  }, [glassIntensity, accentColor]);

  const showSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveGeneral = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    showSuccess();
    // No full reload needed if we just want to see it, but sidebar uses localStorage
    // In a real app we'd use a context/state for the user
    setTimeout(() => window.location.reload(), 1000); 
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('groq_api_key', apiKey);
    showSuccess();
  };

  const tabs = [
    { title: 'General', icon: <Monitor size={20} /> },
    { title: 'Security', icon: <Shield size={20} /> },
    { title: 'Notifications', icon: <Bell size={20} /> },
    { title: 'API Keys', icon: <Key size={20} /> },
    { title: 'Appearance', icon: <Moon size={20} /> },
  ];

  const presets = ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  return (
    <div className="dashboard-container">
      {saveSuccess && (
        <div className="animate-slide-up" style={{ 
          position: 'fixed', top: '2rem', right: '2rem', zIndex: 1000,
          background: 'rgba(34, 197, 94, 0.9)', color: 'white', padding: '1rem 2rem',
          borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
          boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)', backdropFilter: 'blur(8px)'
        }}>
          <Check size={20} /> Settings saved successfully!
        </div>
      )}

      <div className="animate-slide-up" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Platform <span className="gradient-text-primary">Settings</span></h1>
        <p className="hero-subtitle">Configure your workspace and account preferences.</p>
      </div>

      <div className="animate-slide-up delay-100" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
        {/* Sidebar Mini */}
        <div className="glass-panel" style={{ padding: '1rem', height: 'fit-content' }}>
          {tabs.map((tab) => (
            <button 
              key={tab.title}
              onClick={() => setActiveTab(tab.title)}
              className={`sidebar-btn ${activeTab === tab.title ? 'active' : ''}`}
              style={{ width: '100%', marginBottom: '0.25rem' }}
            >
              {tab.icon} {tab.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-panel" style={{ padding: '2.5rem', minHeight: '500px' }}>
          
          {/* General Tab */}
          {activeTab === 'General' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>General Settings</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your basic account identity and localization.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Display Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    <input 
                      className="glass-input" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                      style={{ paddingLeft: '3rem', width: '100%' }}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    <input 
                      className="glass-input" 
                      value={userEmail} 
                      onChange={(e) => setUserEmail(e.target.value)}
                      style={{ paddingLeft: '3rem', width: '100%' }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <button onClick={handleSaveGeneral} className="glass-button">
                    <Save size={18} /> Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'Security' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Security & Privacy</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure your account and manage session preferences.</p>
              </div>
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Two-Factor Authentication</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add an extra layer of security to your account.</span>
                  <div style={{ width: '40px', height: '22px', background: 'var(--border-light)', borderRadius: '11px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                  </div>
                </div>
              </div>
              <button className="glass-button secondary">Change Account Password</button>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'Notifications' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Notification Preferences</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Choose how and when you want to be notified.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { id: 'email', title: 'Email Notifications', desc: 'Receive weekly summaries and project updates.' },
                  { id: 'desktop', title: 'Desktop Alerts', desc: 'Get real-time browser notifications for analysis completion.' },
                  { id: 'projects', title: 'Project Collaborations', desc: 'Notify when someone invites you to a project.' }
                ].map(item => (
                  <div key={item.id} className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                    <div 
                      onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                      style={{ 
                        width: '40px', height: '22px', 
                        background: notifications[item.id] ? 'var(--primary)' : 'var(--border-light)', 
                        borderRadius: '11px', position: 'relative', cursor: 'pointer',
                        transition: '0.3s'
                      }}
                    >
                      <div style={{ 
                        width: '18px', height: '18px', background: 'white', borderRadius: '50%', 
                        position: 'absolute', top: '2px', 
                        left: notifications[item.id] ? '20px' : '2px',
                        transition: '0.3s'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'API Keys' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Configuration</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your API keys for research analysis models.</p>
              </div>
              <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Groq Cloud API Key</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    type={showKey ? "text" : "password"} 
                    className="glass-input" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="gsk_..."
                    style={{ flex: 1 }}
                  />
                  <button onClick={() => setShowKey(!showKey)} className="glass-button secondary">
                    {showKey ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button onClick={handleSaveApiKey} className="glass-button">
                <Check size={18} /> Save Model Key
              </button>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'Appearance' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Visual Preferences</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Customize the look and feel of your research dashboard.</p>
              </div>
              
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {theme === 'dark' ? <Moon size={24} color="var(--primary)" /> : <Zap size={24} color="var(--primary)" />}
                    <div>
                      <div style={{ fontWeight: 600 }}>Active Theme</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{theme === 'dark' ? 'Dark' : 'Light'} Mode</div>
                    </div>
                  </div>
                  <div className="glass-panel" style={{ padding: '0.35rem', borderRadius: '2rem', display: 'flex', gap: '0.25rem', background: 'rgba(0,0,0,0.3)' }}>
                    <button onClick={() => setTheme('dark')} className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}>Dark</button>
                    <button onClick={() => setTheme('light')} className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}>Light</button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>Glass Intensity</div>
                      <div style={{ color: 'var(--primary)', fontWeight: 700 }}>{glassIntensity}%</div>
                    </div>
                    <input 
                      type="range" 
                      min="10" max="100" 
                      value={glassIntensity} 
                      onChange={(e) => setGlassIntensity(e.target.value)}
                      style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-disabled)', marginTop: '0.5rem' }}>
                      <span>Subtle</span>
                      <span>Frosted</span>
                    </div>
                 </div>

                 <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '1.25rem' }}>Accent Color</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                       {presets.map(c => (
                         <div 
                           key={c} 
                           onClick={() => setAccentColor(c)}
                           style={{ 
                             width: '32px', height: '32px', borderRadius: '50%', background: c, 
                             cursor: 'pointer', border: accentColor === c ? '3px solid white' : '2px solid transparent',
                             boxShadow: accentColor === c ? `0 0 15px ${c}` : 'none',
                             transition: '0.2s transform'
                           }}
                           onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                           onMouseLeave={(e) => e.target.style.transform = accentColor === c ? 'scale(1.1)' : 'scale(1)'}
                         ></div>
                       ))}
                       <input 
                         type="color" 
                         value={accentColor} 
                         onChange={(e) => setAccentColor(e.target.value)}
                         style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                       />
                    </div>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <style>{`
        .theme-toggle-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 1.5rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .theme-toggle-btn.active {
          background: var(--primary);
          color: white;
        }
      `}</style>
    </div>
  );
}

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, BookOpen, Key, Target, FileText, CheckCircle, Lightbulb, Search, 
  History, Sparkles, Briefcase, Microscope, ShieldAlert, FlaskConical, ClipboardCheck,
  User, Settings as SettingsIcon, LogOut
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const userName = localStorage.getItem('userName') || 'Research Guest';
  const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';

  const scrollToSection = (sectionId) => {
    // If not on dashboard, navigate there first
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
      // Timeout to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const NavItem = ({ icon: Icon, label, sectionId, active }) => (
    <button 
      onClick={() => scrollToSection(sectionId)} 
      className={`sidebar-btn ${active ? 'active' : ''}`}
      style={{ 
        padding: '0.4rem 1rem', 
        fontSize: '0.85rem', 
        border: 'none', 
        background: 'transparent',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: active ? 'var(--primary)' : 'var(--text-muted)' }}>
        <Icon size={16} />
        <span>{label}</span>
      </div>
    </button>
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-brand" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>R</div>
          <span style={{ color: 'var(--text-scholarcy)', fontWeight: 800, fontSize: '1.25rem' }}>Research Paper</span>
        </Link>
      </div>

      <nav className="sidebar-nav" style={{ padding: '0.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', paddingLeft: '1rem', textTransform: 'uppercase' }}>Jump to a section</p>
          <button 
            onClick={() => scrollToSection('important-points')}
            className="sidebar-btn" 
            style={{ background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '0.5rem', width: '90%', margin: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem' }}
          >
            <span style={{ fontSize: '0.85rem' }}>Important points</span>
            <PlusCircle size={14} color="var(--text-muted)" />
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', paddingLeft: '1rem', textTransform: 'uppercase' }}>Summary</p>
          <NavItem icon={BookOpen} label="Executive Briefing" sectionId="executive-briefing" active={location.hash === '#executive-briefing'} />
          <NavItem icon={Search} label="Key findings" sectionId="key-findings" />
          <NavItem icon={Target} label="Objectives" sectionId="objectives" />
          <NavItem icon={FlaskConical} label="Methods" sectionId="methods" />
          <NavItem icon={ClipboardCheck} label="Results" sectionId="results" />
          <NavItem icon={Lightbulb} label="Key Concepts" sectionId="key-concepts" />
          <NavItem icon={Microscope} label="Dig deeper" sectionId="dig-deeper" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', paddingLeft: '1rem', textTransform: 'uppercase' }}>Extended Analysis</p>
          <NavItem icon={Target} label="Subjects and statistics" sectionId="subjects-statistics" />
          <NavItem icon={ClipboardCheck} label="Study compliance" sectionId="study-compliance" />
          <NavItem icon={FileText} label="Abstract" sectionId="abstract-detailed" />
          <NavItem icon={FileText} label="Figures summary" sectionId="figures-summary" />
          <NavItem icon={FileText} label="Introduction" sectionId="introduction" />
          <NavItem icon={FileText} label="Discussion" sectionId="discussion" />
          <NavItem icon={ShieldAlert} label="Ethical approval" sectionId="ethical-approval" />
          <NavItem icon={History} label="Acknowledgements" sectionId="acknowledgements" />
          <NavItem icon={ShieldAlert} label="Competing interests" sectionId="competing-interests" />
          <NavItem icon={PlusCircle} label="Supplementary..." sectionId="supplementary-info" />
          <NavItem icon={BookOpen} label="References" sectionId="references" />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', paddingLeft: '1rem', textTransform: 'uppercase' }}>Analysis</p>
          <NavItem icon={History} label="Research comparison" sectionId="research-comparison" />
          <NavItem icon={ShieldAlert} label="Limitations" sectionId="limitations" />
          <NavItem icon={Sparkles} label="Future work" sectionId="future-work" />
          <NavItem icon={Briefcase} label="Practical applications" sectionId="practical-applications" />
        </div>
        
        <div style={{ marginTop: 'auto', paddingBottom: '2rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', paddingLeft: '1rem', textTransform: 'uppercase' }}>Final Conclusions</p>
          <NavItem icon={CheckCircle} label="Conclusions" sectionId="conclusions" />
        </div>
      </nav>

      <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-light)', padding: '1rem' }}>
        <div 
          onClick={() => navigate('/profile')}
          className="sidebar-profile" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '0.75rem', cursor: 'pointer', marginBottom: '0.5rem' }}
        >
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <User size={18} />
          </div>
          <div className="sidebar-user-info" style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-user-name" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-scholarcy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
            <div className="sidebar-user-email" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userEmail}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button 
            onClick={() => navigate('/settings')}
            className="sidebar-btn" 
            style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'var(--bg-input)' }}
            title="Settings"
          >
            <SettingsIcon size={16} color="var(--text-muted)" />
          </button>
          <button 
            onClick={handleLogout}
            className="sidebar-btn" 
            style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', background: 'rgba(239, 68, 68, 0.05)' }}
            title="Logout"
          >
            <LogOut size={16} color="#ef4444" />
          </button>
        </div>
      </div>
    </aside>
  );
}

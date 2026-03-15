import { 
  Folder, Plus, MoreVertical, Calendar, Eye, Trash2, Search
} from 'lucide-react';

export default function Projects() {
  const mockProjects = [
    { id: 1, name: 'Deep Learning Papers', documents: 12, lastModified: '2024-03-10' },
    { id: 2, name: 'NLP Research 2024', documents: 8, lastModified: '2024-03-08' },
    { id: 3, name: 'Computer Vision Basics', documents: 5, lastModified: '2024-03-01' },
  ];

  return (
    <div className="dashboard-container">
      <div className="animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>My <span className="gradient-text-primary">Projects</span></h1>
          <p className="hero-subtitle">Organize and manage your paper analysis collections.</p>
        </div>
        <button className="glass-button">
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Search Bar */}
      <div className="animate-slide-up delay-100" style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '0.25rem', borderRadius: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: '400px' }}>
          <div style={{ marginLeft: '1rem', color: 'var(--text-disabled)' }}>
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="glass-input" 
            style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
          />
        </div>
      </div>

      <div className="animate-slide-up delay-200" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {mockProjects.map((project) => (
          <div key={project.id} className="glass-panel" style={{ padding: '1.5rem', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
                <Folder size={24} color="var(--primary)" />
              </div>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--text-disabled)', cursor: 'pointer' }}>
                <MoreVertical size={18} />
              </button>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.name}</h3>
            
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} /> {project.lastModified}
              </span>
              <span>{project.documents} Documents</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="glass-button secondary" style={{ flex: 1, padding: '0.5rem' }}>
                <Eye size={16} /> View
              </button>
              <button className="glass-button secondary" style={{ padding: '0.5rem', color: '#fca5a5' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Create Card */}
        <div className="glass-panel" style={{ padding: '1.5rem', border: '2px dashed var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', color: 'var(--text-disabled)', cursor: 'pointer' }}>
          <Plus size={32} />
          <span style={{ fontWeight: 500 }}>Create New Project</span>
        </div>
      </div>
    </div>
  );
}

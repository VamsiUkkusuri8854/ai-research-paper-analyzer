import React from 'react';
import { FileText, Zap, Workflow, Search } from 'lucide-react';

export default function LandingFeatures() {
  const features = [
    {
      title: "Summarize Complex Papers",
      desc: "Get crystal clear summaries of dense academic research in seconds.",
      icon: <FileText size={24} />
    },
    {
      title: "Extract Key Insights",
      desc: "Identify methodologies, results, and contributions automatically.",
      icon: <Zap size={24} />
    },
    {
      title: "Visualize Workflows",
      desc: "See the research process mapped out in an interactive diagram.",
      icon: <Workflow size={24} />
    },
    {
      title: "Ask Research AI",
      desc: "Deep-dive into specific sections with our context-aware assistant.",
      icon: <Search size={24} />
    }
  ];

  return (
    <section style={{ marginTop: '6rem', width: '100%', maxWidth: '1000px', margin: '6rem auto 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-main)', letterSpacing: '0.1em' }}>
          What This AI Can Do
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--primary)', margin: '1rem auto', borderRadius: '2px' }} />
      </div>

      <div className="feature-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="feature-icon-box">
              {f.icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{f.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

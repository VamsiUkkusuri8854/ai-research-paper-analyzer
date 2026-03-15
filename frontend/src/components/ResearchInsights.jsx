import { useState } from 'react';
import {
  BookOpen, Layers, BarChart2, Tag, AlertTriangle,
  Activity, Database, Cpu, Check, ChevronRight, ChevronDown,
  Award, Hash, Clock, TrendingUp, Zap, FileBarChart2,
  Brain, Microscope, FlaskConical, Globe, Sparkles, ListChecks
} from 'lucide-react';

const TOPIC_ICONS = {
  'Machine Learning': <Brain size={14}/>,
  'Deep Learning': <Layers size={14}/>,
  'Computer Vision': <Microscope size={14}/>,
  'Natural Language Processing': <Globe size={14}/>,
  'Optimization': <TrendingUp size={14}/>,
  'Neural Networks': <Cpu size={14}/>,
  'Data Science': <Database size={14}/>,
  'Reinforcement Learning': <Zap size={14}/>,
  'Transformer': <Activity size={14}/>,
  'Attention Mechanism': <Sparkles size={14}/>,
};

const DIFFICULTY_COLORS = {
  Beginner:     { bar: '#10b981', text: '#10b981', fill: 3 },
  Intermediate: { bar: '#f59e0b', text: '#f59e0b', fill: 7 },
  Advanced:     { bar: '#ef4444', text: '#ef4444', fill: 10 },
  Expert:       { bar: '#8b5cf6', text: '#8b5cf6', fill: 12 },
};

// --- Sub-components ---

export function ResearchMetricsRow({ insights }) {
  if (!insights) return null;
  const metrics = [
    { label: 'Complexity', value: insights.difficulty_level, icon: <Activity size={16}/>, color: DIFFICULTY_COLORS[insights.difficulty_level]?.text },
    { label: 'Figures', value: insights.num_figures, icon: <BarChart2 size={16}/>, color: '#6366f1' },
    { label: 'References', value: insights.num_references, icon: <BookOpen size={16}/>, color: '#10b981' },
    { label: 'Experiments', value: insights.num_experiments || 3, icon: <FlaskConical size={16}/>, color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
      {metrics.map((m, i) => (
        <div key={i} className="glass-panel" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ color: m.color || 'var(--primary)', opacity: 0.8 }}>{m.icon}</div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{m.label}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{m.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResearchOverviewPanel({ title, insights }) {
  if (!insights) return null;
  const items = [
    { label: 'Field of Study', value: insights.field_of_study, icon: <Globe size={16}/> },
    { label: 'Key Contribution', value: insights.key_contribution, icon: <Award size={16}/> },
    { label: 'Method Used', value: insights.model_type, icon: <Cpu size={16}/> },
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>{title}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {items.map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>
              {item.icon}
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>{item.label}</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DifficultyMeter({ level }) {
  const config = DIFFICULTY_COLORS[level] || DIFFICULTY_COLORS['Intermediate'];
  const total = 12;
  const filled = config.fill;
  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Complexity Meter</span>
        <span style={{ color: config.text, fontWeight: 700, fontSize: '0.8rem' }}>{level}</span>
      </div>
      <div style={{ display: 'flex', gap: '3px' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ height: '6px', flex: 1, borderRadius: '1px', background: i < filled ? config.bar : 'var(--border-light)' }} />
        ))}
      </div>
    </div>
  );
}

export default function ResearchInsights({ insights, importantPoints = [] }) {
  if (!insights) return null;

  return (
    <div className="animate-slide-up" style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Key Insights Section */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
            <Sparkles size={18} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>Key Intelligence Insights</h3>
          </div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {importantPoints.slice(0, 3).map((point, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <div style={{ marginTop: '6px' }}><div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--primary)' }} /></div>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DifficultyMeter level={insights.difficulty_level} />
          
          {insights.topics && (
            <div className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Research Topics</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {insights.topics.slice(0, 5).map((t, i) => (
                  <div key={i} className="topic-tag" style={{ padding: '3px 8px', fontSize: '0.7rem', background: 'var(--bg-input)', borderRadius: '4px', border: '1px solid var(--border-light)', color: 'var(--text-main)' }}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

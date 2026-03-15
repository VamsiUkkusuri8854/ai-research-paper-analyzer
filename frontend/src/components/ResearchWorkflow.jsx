import React from 'react';
import { 
  ArrowRight, Search, Database, Layers, FlaskConical, 
  BarChart, CheckCircle2, ChevronRight 
} from 'lucide-react';

const workflowSteps = [
  {
    id: 'problem',
    title: 'Problem Definition',
    icon: <Search size={22} />,
    color: '#6366f1',
    description: 'Identifying the core research gap and formalizing objectives.'
  },
  {
    id: 'data',
    title: 'Data Collection',
    icon: <Database size={22} />,
    color: '#10b981',
    description: 'Gathering benchmarks, datasets, or experimental samples.'
  },
  {
    id: 'model',
    title: 'Architecture Design',
    icon: <Layers size={22} />,
    color: '#8b5cf6',
    description: 'Designing the proposed model, system, or theoretical framework.'
  },
  {
    id: 'experiment',
    title: 'Execution',
    icon: <FlaskConical size={22} />,
    color: '#f59e0b',
    description: 'Running experiments, training models, and collecting results.'
  },
  {
    id: 'analysis',
    title: 'Analysis',
    icon: <BarChart size={22} />,
    color: '#ec4899',
    description: 'Evaluating performance against metrics and baselines.'
  },
  {
    id: 'conclusion',
    title: 'Conclusion',
    icon: <CheckCircle2 size={22} />,
    color: '#06b6d4',
    description: 'Drawing final insights and documenting contributions.'
  }
];

export default function ResearchWorkflow({ currentStep = null }) {
  return (
    <div className="glass-panel animate-slide-up" style={{ padding: '2.5rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ width: '3px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Research Workflow Visualization</h2>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        position: 'relative',
        padding: '1rem 0',
        overflowX: 'auto',
        gap: '1rem'
      }}>
        {/* Connecting Line Background */}
        <div style={{ 
          position: 'absolute', 
          top: '40px', 
          left: '40px', 
          right: '40px', 
          height: '2px', 
          background: 'rgba(255,255,255,0.05)', 
          zIndex: 0 
        }} />

        {workflowSteps.map((step, index) => (
          <div key={step.id} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            minWidth: '150px',
            flex: 1,
            zIndex: 1
          }}>
            {/* Step Icon Container */}
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '18px', 
              background: 'var(--bg-darker)', 
              border: `2px solid ${step.color}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: step.color,
              marginBottom: '1rem',
              boxShadow: `0 0 15px ${step.color}22`,
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              {step.icon}
              {index < workflowSteps.length - 1 && (
                <div style={{ 
                  position: 'absolute', 
                  right: '-40%', 
                  color: 'var(--text-disabled)',
                  opacity: 0.3
                }}>
                  <ChevronRight size={16} />
                </div>
              )}
            </div>

            {/* Step Text */}
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', marginBottom: '0.4rem' }}>{step.title}</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '120px', lineHeight: 1.4 }}>
              {step.description}
            </p>

            {/* Active Indicator */}
            {currentStep === step.id && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '2px 8px', 
                borderRadius: '10px', 
                background: step.color, 
                color: 'white', 
                fontSize: '0.65rem', 
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                Analyzing
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

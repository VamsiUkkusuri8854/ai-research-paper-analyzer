import React from 'react';
import { Upload, Cpu, Search, MessageSquare, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { label: "Upload Paper", icon: <Upload size={18} /> },
    { label: "AI Analysis", icon: <Cpu size={18} /> },
    { label: "Extract Insights", icon: <Search size={18} /> },
    { label: "Ask Questions", icon: <MessageSquare size={18} /> }
  ];

  return (
    <div className="how-it-works-flow animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flow-step">
            <div className="flow-step-circle">
              {step.icon}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight size={16} className="flow-arrow" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

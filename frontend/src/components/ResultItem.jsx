import React, { useState, useRef, useEffect } from 'react';
import {
  FileText, Target, Zap, List, Search, Layers, ShieldCheck,
  Lightbulb, HelpCircle, BookOpen, AlertCircle, TrendingUp,
  Settings, Cpu, CheckCircle, ChevronDown, ChevronUp, PlusCircle,
  Image as ImageIcon, Info, ExternalLink, MessageSquare, Loader2,
  Bot, Download, Copy, History
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import WorkflowDiagram from './WorkflowDiagram';

const DeepInsightView = ({ data, sectionName }) => {
  if (!data) return null;

  const isFigure = sectionName.toLowerCase().includes('figure');

  if (isFigure && data.deep_insights) {
    return (
      <div className="deep-insights-container" style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon size={18} /> Deep Figure Analysis
        </h4>

        {data.deep_insights.map((fig, idx) => (
          <div key={idx} className="figure-insight-card" style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1rem',
            border: '1px solid var(--border-light)'
          }}>
            <h5 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>{fig.title}</h5>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>{fig.explanation}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase' }}>Key Components</span>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                  {fig.components?.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase' }}>What it Demonstrates</span>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{fig.demonstrates}</p>
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>Simplified Explanation</span>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>{fig.simplified_explanation}</p>
            </div>
          </div>
        ))}

        {data.related_concepts && (
          <div style={{ marginTop: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Related Concepts: </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {data.related_concepts.map((concept, i) => (
                <span key={i} style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem' }}>
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="deep-insights-container" style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
       <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} /> Detailed Insights
        </h4>
        {data.deep_insights?.map((item, i) => (
          <div key={i} style={{ marginBottom: '1.25rem' }}>
            <h5 style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>{item.title}</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.explanation}</p>
            {item.importance && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}><strong>Importance:</strong> {item.importance}</p>}
          </div>
        ))}
        {data.educational_analogy && (
          <div style={{ padding: '0.75rem', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '8px', borderLeft: '3px solid #22c55e' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#22c55e' }}>Analogy for Better Understanding</span>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>{data.educational_analogy}</p>
          </div>
        )}
    </div>
  );
};

const CollapsibleSection = ({ id, title, icon: Icon, children, fullWidth = false, isHighlighted = false, paper, sectionKey }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const { fetchDeepAnalysis, deepAnalysisData, deepAnalyzing, activePaper } = useChat();

  const paperId = paper?._id || paper?.original_filename;
  const deepData = deepAnalysisData[paperId]?.[sectionKey];

  useEffect(() => {
    if (contentRef.current) {
      setHasOverflow(contentRef.current.scrollHeight > contentRef.current.offsetHeight + 10);
    }
  }, [children]);

  const handleToggle = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState && !deepData && paper) {
      fetchDeepAnalysis(paper, sectionKey, "");
    }
  };

  return (
    <div
      id={id}
      className={`premium-card ${fullWidth ? 'full-span' : ''} glass-panel animate-slide-up ${isHighlighted ? 'highlight-section' : ''}`}
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: isHighlighted ? 'rgba(99, 102, 241, 0.12)' : undefined,
        border: isHighlighted ? '2px solid var(--primary)' : undefined,
        padding: '0'
      }}
      onClick={handleToggle}
    >
      <div className="card-header" style={{ padding: '1.25rem 1.25rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Icon size={20} color={isHighlighted ? 'var(--primary)' : undefined} />
          <span style={{ fontWeight: 600 }}>{title}</span>
        </div>
        {(hasOverflow || isExpanded) && (isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
      </div>

      <div
        ref={contentRef}
        className="card-content"
        style={{
          padding: '0 1.25rem 1.25rem',
          display: isExpanded ? 'block' : '-webkit-box',
          WebkitLineClamp: isExpanded ? 'unset' : '4',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontSize: '0.95rem',
          lineHeight: '1.7',
          color: 'var(--text-secondary)'
        }}
      >
        {children}
        {isExpanded && deepAnalyzing && !deepData && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--primary)', fontSize: '0.85rem' }}>
            <Loader2 className="animate-spin" size={16} />
            <span>Analyzing deeper insights...</span>
          </div>
        )}
        {isExpanded && deepData && <DeepInsightView data={deepData} sectionName={title} />}
      </div>

      {hasOverflow && (
        <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {isExpanded ? 'See less' : 'See more'} {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </div>
      )}
    </div>
  );
};

export default function ResultItem({ result }) {
  const [copied, setCopied] = useState(false);
  const [localQuestion, setLocalQuestion] = useState("");
  const { chatHistories, sendMessage, setActivePaper, asking, clearChat } = useChat();

  const history = chatHistories[result.title] || [];

  const copyResults = () => {
    const textToCopy = `
Title: ${result.title}
Summary: ${result.summary}
Problem Statement: ${result.problem_statement}
Methodology: ${result.methodology}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAnalysis = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `analysis_${result.original_filename || 'document'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleAskSuggestion = (q) => {
    setActivePaper(result);
    // Fixed: Pass result directly to ensure immediate response
    sendMessage(q, result);
  };

  const handleCustomAsk = (e) => {
    e.preventDefault();
    if (!localQuestion.trim()) return;
    setActivePaper(result);
    sendMessage(localQuestion, result);
    setLocalQuestion("");
  };

  const renderBulletList = (items) => {
    if (!items) return null;
    const listItems = Array.isArray(items) ? items : [items];
    return (
      <ul className="list-disc" style={{ paddingLeft: '1.2rem' }}>
        {listItems.map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>
    );
  };

  if (result.error) {
    return (
      <div className="error-toast animate-slide-up">
        <AlertCircle size={18} />
        {result.error}
      </div>
    );
  }

  return (
    <div className="result-document-block animate-slide-up" style={{ marginBottom: '4rem', width: '100%' }}>
      <div className="results-header">
        <div className="document-title-bar">
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
            <FileText size={24} color="var(--primary)" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Analyzed Document</div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{result.original_filename}</h3>
          </div>
        </div>
        <div className="results-actions">
          <button className="glass-button secondary" onClick={copyResults} title="Copy to clipboard">
            {copied ? <CheckCircle size={18} color="#34d399" /> : <Copy size={18} />}
            <span style={{ fontSize: '0.9rem' }}>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button className="glass-button secondary" onClick={downloadAnalysis} title="Download JSON">
            <Download size={18} />
            <span style={{ fontSize: '0.9rem' }}>Export</span>
          </button>
        </div>
      </div>

      <div className="cards-grid">
        <div id="executive-briefing" className="premium-card full-span glass-panel animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="card-header" style={{ marginBottom: '0.5rem' }}><BookOpen size={20} /> Executive Briefing</div>
          <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.3 }}>{result.title}</p>
          <div className="card-content" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{result.executive_briefing}</div>
        </div>

        <CollapsibleSection id="important-points" title="Important Points" icon={Zap} fullWidth={true} paper={result} sectionKey="important_points">
          <div style={{ columns: 2, columnGap: '2rem' }}>
            {renderBulletList(result.important_points)}
          </div>
        </CollapsibleSection>

        {/* AI Research Assistant Section */}
        <div className="ai-research-assistant-section full-span animate-slide-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            <div>
              <h2 className="ai-assistant-title" style={{ margin: 0 }}>AI Research Assistant</h2>
              <p className="ai-assistant-subtitle" style={{ margin: 0 }}>Ask questions about this research paper</p>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearChat}
                className="glass-button secondary"
                style={{ padding: '0.5rem 1rem', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171' }}
              >
                <History size={16} /> Clear Chat
              </button>
            )}
          </div>

          <div className="chat-interaction-box">
            <form onSubmit={handleCustomAsk} className="large-chat-input-wrapper">
              <Search size={20} color="var(--primary)" />
              <input
                type="text"
                className="large-chat-input"
                placeholder="Ask anything about this research paper..."
                value={localQuestion}
                onChange={(e) => setLocalQuestion(e.target.value)}
                disabled={asking}
              />
              <button type="submit" className="ai-generate-btn" disabled={!localQuestion.trim() || asking} style={{ padding: '0.5rem 1rem' }}>
                {asking ? <div className="loader-spinner-small" /> : <Zap size={18} />}
              </button>
            </form>

            <div className="suggestion-chips">
              <button className="suggestion-chip" onClick={() => handleAskSuggestion("Explain the methodology used in this paper")}>
                Explain methodology
              </button>
              <button className="suggestion-chip" onClick={() => handleAskSuggestion("What problem does this research solve?")}>
                What problem is solved?
              </button>
              <button className="suggestion-chip" onClick={() => handleAskSuggestion("Summarize the key findings")}>
                Summarize findings
              </button>
              <button className="suggestion-chip" onClick={() => handleAskSuggestion("Simplify the abstract")}>
                Simplify abstract
              </button>
            </div>

            <div className="ai-responses-container">
              {history.map((chat, idx) => (
                <div key={idx} className={`ai-response-card ${chat.role}`}>
                  <div className="response-header">
                    {chat.role === 'user' ? <FileText size={18} /> : <Bot size={18} />}
                    {chat.role === 'user' ? 'Your Question' : 'Assistant Analysis'}
                  </div>
                  <div className="response-body">
                    {chat.content}
                  </div>
                  {chat.role === 'assistant' && (
                    <div className="response-footer">
                      <div className="section-reference">
                        Reference: <span className="reference-tag">Paper Context</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted-scholarcy)' }}>Generated by Research AI</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CollapsibleSection id="key-findings" title="Key Findings" icon={Search} paper={result} sectionKey="key_findings">
          {renderBulletList(result.key_findings)}
        </CollapsibleSection>

        <CollapsibleSection id="objectives" title="Objectives" icon={Target} paper={result} sectionKey="objectives">
          {result.objectives}
        </CollapsibleSection>

        <CollapsibleSection id="abstract-detailed" title="Abstract" icon={FileText} paper={result} sectionKey="abstract_detailed">
          {result.abstract_detailed}
        </CollapsibleSection>

        <CollapsibleSection id="introduction" title="Introduction" icon={FileText} paper={result} sectionKey="introduction">
          {result.introduction}
        </CollapsibleSection>

        <CollapsibleSection id="methods" title="Methods" icon={Cpu} paper={result} sectionKey="methods">
          {renderBulletList(result.methods)}
        </CollapsibleSection>

        <CollapsibleSection id="results" title="Results" icon={CheckCircle} paper={result} sectionKey="results_detailed">
          {result.results_detailed || result.results}
        </CollapsibleSection>

        <CollapsibleSection id="figures-summary" title="Figures Summary" icon={Layers} paper={result} sectionKey="figures_summary">
          {result.figures_summary}
        </CollapsibleSection>

        <CollapsibleSection id="discussion" title="Discussion" icon={MessageSquare} paper={result} sectionKey="discussion">
          {result.discussion}
        </CollapsibleSection>

        <CollapsibleSection id="subjects-statistics" title="Subjects and Statistics" icon={Target} paper={result} sectionKey="subjects_and_statistics">
          {result.subjects_and_statistics}
        </CollapsibleSection>

        <CollapsibleSection id="study-compliance" title="Study Compliance" icon={ShieldCheck} paper={result} sectionKey="study_compliance">
          {result.study_compliance}
        </CollapsibleSection>

        <CollapsibleSection id="ethical-approval" title="Ethical Approval" icon={ShieldCheck} paper={result} sectionKey="ethical_approval">
          {result.ethical_approval}
        </CollapsibleSection>

        <CollapsibleSection id="acknowledgements" title="Acknowledgements" icon={Info} paper={result} sectionKey="acknowledgements">
          {result.acknowledgements}
        </CollapsibleSection>

        <CollapsibleSection id="competing-interests" title="Competing Interests" icon={ShieldCheck} paper={result} sectionKey="competing_interests">
          {result.competing_interests}
        </CollapsibleSection>

        <CollapsibleSection id="supplementary-info" title="Supplementary Info" icon={ExternalLink} paper={result} sectionKey="supplementary_info">
          {result.supplementary_info}
        </CollapsibleSection>

        <CollapsibleSection id="key-concepts" title="Key Concepts" icon={Lightbulb} paper={result} sectionKey="key_concepts">
          <div className="tags-list">
            {Array.isArray(result.key_concepts)
              ? result.key_concepts.map((tech, i) => <span key={i} className="tag">{tech}</span>)
              : <span className="tag">{result.key_concepts}</span>}
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="research-comparison" title="Research Comparison" icon={TrendingUp} paper={result} sectionKey="research_comparison">
          {result.research_comparison}
        </CollapsibleSection>

        <CollapsibleSection id="limitations" title="Limitations" icon={AlertCircle} paper={result} sectionKey="limitations">
          {renderBulletList(result.limitations)}
        </CollapsibleSection>

        <CollapsibleSection id="future-work" title="Future Work" icon={Zap} paper={result} sectionKey="future_work">
          {renderBulletList(result.future_work)}
        </CollapsibleSection>

        <CollapsibleSection id="practical-applications" title="Practical Applications" icon={Settings} paper={result} sectionKey="practical_applications">
          {result.practical_applications}
        </CollapsibleSection>

        <CollapsibleSection id="dig-deeper" title="Dig Deeper" icon={HelpCircle} fullWidth={true} paper={result} sectionKey="dig_deeper">
          {result.dig_deeper}
        </CollapsibleSection>

        {result.workflow && (
          <div id="workflow-visualization" className="full-span" style={{ marginTop: '2rem' }}>
            <WorkflowDiagram workflow={result.workflow} />
          </div>
        )}

        <CollapsibleSection id="references" title="References" icon={BookOpen} fullWidth={true} paper={result} sectionKey="references">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {Array.isArray(result.references) && result.references.map((ref, i) => (
              <a
                key={i}
                href={`https://scholar.google.com/scholar?q=${encodeURIComponent(ref.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="reference-item-link"
                style={{
                  textDecoration: 'none',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-light)',
                  display: 'block',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.25rem' }}>{ref.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{ref.publisher}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ref.info}</div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  View Paper <PlusCircle size={12} />
                </div>
              </a>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="conclusions" title="Final Conclusions" icon={CheckCircle} fullWidth={true} isHighlighted={true} paper={result} sectionKey="conclusions">
          <div style={{ fontSize: '1.3rem', fontWeight: 600, lineHeight: '1.7', color: 'var(--text-main)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {result.conclusions}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Bot, Zap, Plus, Mic, MessageSquare, 
  Send, RotateCcw, HelpCircle, FileSearch, Lightbulb,
  Target, FlaskConical, ClipboardCheck, ShieldAlert
} from 'lucide-react';
import { useChat } from '../context/ChatContext';

export default function AIAssistantPanel() {
  const { chatHistory, sendMessage, asking, clearChat, activePaper } = useChat();
  const [question, setQuestion] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!question.trim() || asking) return;
    sendMessage(question, activePaper?.document_text);
    setQuestion("");
  };

  return (
    <div className="ai-assistant-column glass-panel" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh',
      background: 'rgba(0,0,0,0.2)',
      borderLeft: '1px solid var(--border-light)'
    }}>
      {/* Panel Header */}
      <div style={{ 
        padding: '1.25rem 1.5rem', 
        borderBottom: '1px solid var(--border-light)',
        background: 'rgba(255,255,255,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '8px', 
              background: 'var(--primary)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', color: 'white'
            }}>
              <Bot size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>AI Research Assistant</h3>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Workspace Intelligence</p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="icon-btn ghost-btn" 
            title="Reset Chat"
            style={{ padding: '6px' }}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Suggested Research Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore Paper</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <button onClick={() => sendMessage("Explain the methodology in simple terms", activePaper)} className="suggestion-chip" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Methodology</button>
            <button onClick={() => sendMessage("What problem does this paper solve?", activePaper)} className="suggestion-chip" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Problem</button>
            <button onClick={() => sendMessage("Summarize the key findings", activePaper)} className="suggestion-chip" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Findings</button>
            <button onClick={() => sendMessage("Identify the limitations of this study", activePaper)} className="suggestion-chip" style={{ fontSize: '0.7rem', padding: '4px 8px' }}>Limitations</button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div style={{ 
        flex: 1, 
        padding: '1.25rem', 
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {!activePaper ? (
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            opacity: 0.4,
            padding: '2rem'
          }}>
            <FileSearch size={32} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Open a research paper to start a conversation with the AI Assistant.
            </p>
          </div>
        ) : chatHistory.length === 0 ? (
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            opacity: 0.5,
            padding: '2rem'
          }}>
            <Sparkles size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Ask specific technical questions about <strong>{activePaper.title || 'this paper'}</strong>.
            </p>
          </div>
        ) : (
          chatHistory.map((msg, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap: '0.4rem'
            }}>
              <div style={{ 
                maxWidth: '90%',
                padding: '0.75rem 1rem',
                borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                border: msg.role === 'user' ? 'none' : '1px solid var(--border-light)'
              }}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ 
        padding: '1.25rem', 
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(255,255,255,0.02)'
      }}>
        <form onSubmit={handleAsk} style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-light)',
            borderRadius: '12px',
            padding: '0.75rem',
            position: 'relative',
            opacity: activePaper ? 1 : 0.5,
            pointerEvents: activePaper ? 'auto' : 'none'
          }}>
            <textarea 
              placeholder={activePaper ? "Ask research question..." : "Select a paper first..."}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk(e);
                }
              }}
              disabled={asking || !activePaper}
              style={{ 
                width: '100%', 
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none',
                minHeight: '60px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className="icon-btn ghost-btn" style={{ padding: '4px' }}>
                  <Plus size={16} />
                </button>
                <button type="button" className="icon-btn ghost-btn" style={{ padding: '4px' }}>
                  <Mic size={16} />
                </button>
              </div>
              <button 
                type="submit" 
                disabled={!question.trim() || asking || !activePaper}
                style={{ 
                  padding: '6px 12px', borderRadius: '8px',
                  background: (question.trim() && activePaper) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                  color: 'white', cursor: 'pointer', transition: 'all 0.2s',
                  fontSize: '0.8rem', fontWeight: 600
                }}
              >
                {asking ? <div className="loader-spinner-small" /> : <><Send size={14} /> Send</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

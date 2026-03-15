import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, LogOut, Trash2, FileText, ChevronLeft, Calendar, BookOpen } from 'lucide-react';
import ResultItem from '../components/ResultItem';

export default function History() {
  const [history, setHistory] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:8000/history');
      const data = await response.json();
      if (response.ok) {
        setHistory(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  const clearHistory = () => {
    // For now, this just clears the local view. 
    // A proper DELETE /history endpoint could be added to the backend.
    if (confirm("Are you sure you want to clear your local view? Database records will remain.")) {
      setHistory([]);
      setSelectedDoc(null);
    }
  };

  return (
    <>
      {/* Main Content Area */}
      <main className="dashboard-container">
        {!selectedDoc ? (
            <>
                <div className="animate-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Analysis History</h1>
                        <p className="hero-subtitle" style={{ margin: 0 }}>Review your previously processed research papers.</p>
                    </div>
                    {history.length > 0 && (
                        <button className="glass-button secondary" onClick={clearHistory}>
                        <Trash2 size={18} /> Clear Data
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                <div className="glass-panel animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <Layers size={64} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>No history found</h3>
                    <p style={{ color: 'var(--text-disabled)', marginBottom: '2rem' }}>You haven't analyzed any papers yet.</p>
                    <Link to="/dashboard">
                        <button className="glass-button" style={{ margin: '0 auto' }}>Go to Dashboard</button>
                    </Link>
                </div>
                ) : (
                <div className="history-list animate-slide-up delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {history.map((result, idx) => (
                        <div 
                            key={`${result.original_filename}-${idx}`} 
                            className="glass-panel"
                            style={{ 
                                padding: '1.5rem 2rem', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '1.5rem', 
                                cursor: 'pointer',
                                transition: 'transform 0.2s, border-color 0.2s'
                            }}
                            onClick={() => setSelectedDoc(result)}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateX(8px)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'none'; }}
                        >
                            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '1rem', borderRadius: '50%' }}>
                                <FileText size={24} color="var(--primary)" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-main)', fontWeight: 600 }}>{result.original_filename}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    <BookOpen size={14} /> {result.title}
                                </p>
                            </div>
                            <div style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.95rem' }}>View Analysis →</div>
                        </div>
                    ))}
                </div>
                )}
            </>
        ) : (
            <div className="animate-fade-in">
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="glass-button secondary"
                  style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}
                >
                    <ChevronLeft size={18} /> Back to History List
                </button>
                <ResultItem result={selectedDoc} />
            </div>
        )}
      </main>
    </>
  );
}

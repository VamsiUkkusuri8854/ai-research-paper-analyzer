import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UploadCloud, FileText, Zap, Layers, AlertCircle, LogOut, ChevronRight,
  Plus, Link as LinkIcon, Sparkles, Search, MessageSquare, Workflow
} from 'lucide-react';
import ResultItem from '../components/ResultItem';
import ResearchInsights, { ResearchOverviewPanel, ResearchMetricsRow } from '../components/ResearchInsights';
import ResearchWorkflow from '../components/ResearchWorkflow';
import { useChat } from '../context/ChatContext';
import ParticleBackground from '../components/Landing/ParticleBackground';
import LandingFeatures from '../components/Landing/LandingFeatures';
import HowItWorks from '../components/Landing/HowItWorks';


export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const { setActivePaper, sendMessage } = useChat();
  
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName')?.split(' ')[0] || 'vamsi';

  // Sync active paper with chat context whenever results change
  useEffect(() => {
    if (results && results.length > 0) {
      setActivePaper(results[0]);
    }
  }, [results, setActivePaper]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (selectedFilesList) => {
      const selectedFiles = Array.from(selectedFilesList);
      const validFiles = selectedFiles.filter(f => f.type === "application/pdf");
      
      if (validFiles.length > 0) {
        setFiles(validFiles);
        setError(null);
        analyzePapers(validFiles);
      } else {
        setError("Please upload at least one valid PDF file.");
      }
  }

  const analyzePapers = async (filesToProcess = files) => {
    if (filesToProcess.length === 0) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    filesToProcess.forEach(file => {
        formData.append('files', file);
    });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to analyze the papers.");
      }

      setResults(data.data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred while analyzing the papers.");
    } finally {
      setLoading(false);
    }
  };

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Effect to listen for search events from RightPanel
  useEffect(() => {
    const handleSearch = (e) => setSearchQuery(e.detail);
    window.addEventListener('app-search', handleSearch);
    return () => window.removeEventListener('app-search', handleSearch);
  }, []);

  const filteredResults = useMemo(() => {
    if (!results) return null;
    if (!searchQuery) return results;
    return results.filter(r => 
      (r.title && r.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (r.original_filename && r.original_filename.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [results, searchQuery]);

  const handleViewExample = () => {
    const mockData = [{
      title: "Attention Is All You Need",
      executive_briefing: "The seminal paper that introduced the Transformer architecture, replacing recurrent and convolutional layers with self-attention mechanisms.",
      summary: "This paper proposes a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
      important_points: [
          "Transformers use self-attention to process data in parallel, unlike RNNs.",
          "Achieves state-of-art results on translation tasks with less training time.",
          "Introduces Multi-Head Attention for capturing different representation subspaces.",
          "Eliminates the need for recurrent or convolutional layers in sequence transduction."
      ],
      key_findings: [
        "Transformer architecture achieves state-of-the-art results on machine translation.",
        "Self-attention allows for much more parallelization than RNNs."
      ],
      objectives: "To develop a neural network architecture for sequence transduction that avoids recurrence and relies entirely on attention mechanisms.",
      problem_statement: "Recurrent neural networks (RNNs) are inherently sequential, which limits parallelization.",
      methodology: "Introduction of the Transformer architecture, utilizing Scaled Dot-Product Attention.",
      methods: ["Encoder-Decoder structure", "Multi-Head Self-Attention", "Positional Encoding"],
      subjects_and_statistics: "Evaluated on WMT 2014 English-to-German and English-to-French translation datasets.",
      study_compliance: "Standard academic research protocol with open-source benchmark datasets.",
      abstract_detailed: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms...",
      figures_summary: "Figure 1: The Transformer model architecture. Figure 2: (left) Scaled Dot-Product Attention. (right) Multi-head Attention.",
      introduction: "The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S...",
      results_detailed: "On the WMT 2014 English-to-German translation task, the big model establishes a new state-of-the-art BLEU score of 28.4.",
      discussion: "The Transformer is the first transduction model relying entirely on self-attention...",
      ethical_approval: "Not applicable as the study used public anonymized datasets.",
      acknowledgements: "We thank Nal Kalchbrenner and Stephan Gouws for their fruitful comments and inspiration.",
      competing_interests: "The authors declare no competing interests.",
      supplementary_info: "Full code and trained models are available on GitHub.",
      references: [
        {title: "Effective Approaches to Attention-based Neural Machine Translation", publisher: "EMNLP 2015", info: "Luong et al. (2015)"},
        {title: "Neural Machine Translation by Jointly Learning to Align and Translate", publisher: "ICLR 2015", info: "Bahdanau et al. (2015)"},
        {title: "Google's Neural Machine Translation System", publisher: "arXiv 2016", info: "Wu et al. (2016)"}
      ],
      key_concepts: ["Self-Attention", "Transformer", "Multi-Head Attention"],
      dig_deeper: "The paper details the mathematical implementation: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V...",
      research_comparison: "Unlike RNNs or CNNs, the Transformer uses constant time for relating any two positions.",
      limitations: ["High memory usage for long sequences"],
      future_work: ["Applying Transformers to image and audio tasks"],
      practical_applications: "Basis for GPT models, BERT, and modern translation systems.",
      conclusions: "The Transformer architecture represents a major shift in NLP, proving that attention is indeed 'all you need' for high-performance sequence transduction, paving the way for the large language models we use today.",
      document_text: "The seminal paper that introduced the Transformer architecture, replacing recurrent and convolutional layers with self-attention mechanisms. Introduction: The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU, ByteNet and ConvS2S. The Transformer is the first transduction model relying entirely on self-attention...",
      workflow: [
        { step: "Input Embedding", description: "Convert input tokens into fixed-size vectors.", reference: "Section 3.1: The Transformer uses learned embeddings..." },
        { step: "Positional Encoding", description: "Add information about the position of tokens in the sequence.", reference: "Section 3.5: Since our model contains no recurrence..." },
        { step: "Multi-Head Attention", description: "Capture different types of relationships between tokens.", reference: "Section 3.2.2: Multi-head attention allows the model to jointly attend..." },
        { step: "Feed Forward Network", description: "Apply non-linear transformations to each position independently.", reference: "Section 3.3: In addition to attention sub-layers..." },
        { step: "Layer Normalization", description: "Stabilize training and improve performance.", reference: "Section 3.1: We employ a residual connection around each..." }
      ],
      original_filename: "attention_is_all_you_need.pdf",
      _id: "example-id-123",
      insights: {
        field_of_study: "Natural Language Processing",
        difficulty_level: "Advanced",
        dataset_used: "WMT 2014 English-German, WMT 2014 English-French",
        model_type: "Transformer (Encoder-Decoder with Multi-Head Self-Attention)",
        key_contribution: "First sequence transduction model based entirely on attention, eliminating recurrence and convolutions.",
        num_pages: 15,
        num_figures: 7,
        num_tables: 4,
        num_references: 42,
        num_algorithms: 2,
        num_experiments: 3,
        topics: ["Natural Language Processing", "Deep Learning", "Transformer", "Attention Mechanism", "Optimization"]
      }
    }];
    setResults(mockData);
  };

  const handleSuggestionClick = (question) => {
    handleViewExample();
    // Suggested logic to automatically ask the question after example loads
    setTimeout(() => {
        // Find example paper in results (setResults is async so we use the mock data)
        const mockPaper = {
            document_text: "The seminal paper that introduced the Transformer architecture..."
        };
        sendMessage(question, mockPaper);
    }, 500);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Landing Visual Layers */}
      {!results && (
        <>
          <div className="animated-mesh-bg" />
          <ParticleBackground />
        </>
      )}

      {/* Scrollable Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem', position: 'relative', zIndex: 1 }}>
        
        {/* Upload State */}
        {!results && (
          <div className="animate-slide-up" style={{ textAlign: 'center', margin: '4rem 0' }}>
            <div style={{ marginBottom: '3rem' }}>
              <h1 className="hero-title gradient-text">Research Paper Explainer</h1>
              <p className="welcome-subtitle">
                  Upload a research paper to generate insights and explanations.
              </p>
            </div>

            <div
              className="glass-panel"
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-active'); }}
              onDragLeave={(e) => e.currentTarget.classList.remove('drag-active')}
              onDrop={(e) => { e.currentTarget.classList.remove('drag-active'); handleDrop(e); }}
              onClick={onUploadClick}
              style={{ 
                maxWidth: '700px',
                margin: '0 auto',
                padding: '5rem 2.5rem',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div className="loader-spinner" style={{ width: '48px', height: '48px' }}></div>
                    <p style={{ color: 'var(--text-muted)' }}>Analyzing research paper with Llama 3.3 AI...</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ 
                    width: '72px', height: '72px', borderRadius: '20px', 
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', boxShadow: '0 10px 30px rgba(99,102,241,0.4)'
                  }}>
                    <UploadCloud size={36} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Analyze Your Research</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Drag and drop your PDF here or <span className="browse-text">browse files</span>
                    </p>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-disabled)', opacity: 0.7 }}>Supported format: PDF (Max 10MB)</p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                accept="application/pdf"
                multiple
                onChange={handleChange}
              />
            </div>

            {/* Example AI Questions / Suggestion Chips */}
            <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', maxWidth: '800px', margin: '2.5rem auto 0' }}>
              <button 
                className="suggestion-chip" 
                onClick={() => handleSuggestionClick("Explain the methodology in simple terms")}
              >
                Explain methodology
              </button>
              <button 
                className="suggestion-chip" 
                onClick={() => handleSuggestionClick("What are the key findings?")}
              >
                What are the key findings?
              </button>
              <button 
                className="suggestion-chip" 
                onClick={() => handleSuggestionClick("Identify potential limitations")}
              >
                Identify limitations
              </button>
              <button 
                className="suggestion-chip" 
                onClick={() => handleSuggestionClick("Summarize the conclusion")}
              >
                Summarize conclusion
              </button>
              <button 
                onClick={handleViewExample}
                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, padding: '6px 14px' }}
              >
                View Full Example
              </button>
            </div>

            {/* Landing Features & How It Works */}
            <LandingFeatures />
            <HowItWorks />

            {error && (
              <div className="error-toast" style={{ marginTop: '2rem', display: 'inline-flex' }}>
                <AlertCircle size={18} />
                {error}
              </div>
            )}
          </div>
        )}

        {/* Analysis State (Workspace View) */}
        {filteredResults && (
          <div className="workspace-view animate-fade-in" style={{ width: '100%' }}>
            {filteredResults.length > 0 ? (
              filteredResults.map((result, idx) => (
                <div key={idx}>
                  
                  {/* Research Overview Panel (Full Width of column 2) */}
                  <ResearchOverviewPanel title={result.title} insights={result.insights} />

                  {/* Metrics Row */}
                  <ResearchMetricsRow insights={result.insights} />
                  
                  {/* Analysis Cards Grid */}
                  <ResearchInsights insights={result.insights} importantPoints={result.important_points} />
                  
                  {/* Workflow Visualization */}
                  <div style={{ margin: '2rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      <Workflow size={18} color="var(--primary)" />
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Research Workflow</h3>
                    </div>
                    <ResearchWorkflow currentStep={loading ? 'data' : 'analysis'} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', marginTop: '3rem' }}>
                    <div style={{ width: '3px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Sectionized Summaries</h2>
                  </div>
                  <ResultItem result={result} />
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No results found for "{searchQuery}"
              </div>
            )}
            
            {results && (
              <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
                <button
                  onClick={() => { setResults(null); setFiles([]); setSearchQuery(''); }}
                  className="glass-button secondary"
                  style={{ borderRadius: '0.5rem', opacity: 0.6 }}
                >
                  Reset Workspace
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

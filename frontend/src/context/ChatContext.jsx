import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePaper, setActivePaper] = useState(null);
  const [chatHistories, setChatHistories] = useState({}); // Mapping paper title to history array
  const [asking, setAsking] = useState(false);
  const [deepAnalysisData, setDeepAnalysisData] = useState({}); // Mapping paperId -> sectionName -> analysisResult
  const [deepAnalyzing, setDeepAnalyzing] = useState(false);

  const openChat = useCallback((paper) => {
    setActivePaper(paper);
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const currentHistory = activePaper ? (chatHistories[activePaper.title] || []) : [];

  useEffect(() => {
    if (activePaper && activePaper._id) {
      fetchChatHistory(activePaper._id);
    }
  }, [activePaper]);

  const fetchChatHistory = async (paperId) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/chat/${paperId}`);
      const data = await response.json();
      if (response.ok) {
        setChatHistories(prev => ({
          ...prev,
          [activePaper.title]: data.data
        }));
      }
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    }
  };

  const sendMessage = useCallback(async (question, directPaper = null) => {
    if (!question.trim() || asking) return;
    
    const paperToUse = directPaper || activePaper;
    if (!paperToUse) return;

    const userQ = question.trim();
    const paperTitle = paperToUse.title;
    const historyForPaper = chatHistories[paperTitle] || [];
    
    // Optimistically update UI
    setChatHistories(prev => ({
      ...prev,
      [paperTitle]: [...historyForPaper, { role: 'user', content: userQ }]
    }));
    setAsking(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: paperToUse.document_text,
          question: userQ,
          history: historyForPaper,
          paper_id: paperToUse._id
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Failed to get an answer.");
      }
      
      setChatHistories(prev => ({
        ...prev,
        [paperTitle]: [...(prev[paperTitle] || []), { role: 'assistant', content: data.answer }]
      }));
    } catch (err) {
      setChatHistories(prev => ({
        ...prev,
        [paperTitle]: [...(prev[paperTitle] || []), { role: 'assistant', content: `Error: ${err.message}` }]
      }));
    } finally {
      setAsking(false);
    }
  }, [activePaper, chatHistories, asking]);

  const fetchDeepAnalysis = useCallback(async (paper, sectionName, sectionContent) => {
    const paperId = paper._id || paper.original_filename;
    
    // Check if we already have it
    if (deepAnalysisData[paperId]?.[sectionName]) return;

    setDeepAnalyzing(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/deep-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: paper.document_text,
          section_name: sectionName,
          section_content: sectionContent || ""
        })
      });
      
      const res = await response.json();
      if (response.ok && res.status === 'success') {
        setDeepAnalysisData(prev => ({
          ...prev,
          [paperId]: {
            ...(prev[paperId] || {}),
            [sectionName]: res.data
          }
        }));
      }
    } catch (err) {
      console.error("Deep analysis failed:", err);
    } finally {
      setDeepAnalyzing(false);
    }
  }, [deepAnalysisData]);

  const clearChat = useCallback(() => {
    if (!activePaper) return;
    setChatHistories(prev => ({
      ...prev,
      [activePaper.title]: []
    }));
  }, [activePaper]);

  const value = {
    isOpen,
    activePaper,
    chatHistory: currentHistory,
    chatHistories,
    asking,
    deepAnalysisData,
    deepAnalyzing,
    openChat,
    closeChat,
    sendMessage,
    fetchDeepAnalysis,
    clearChat,
    setActivePaper
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

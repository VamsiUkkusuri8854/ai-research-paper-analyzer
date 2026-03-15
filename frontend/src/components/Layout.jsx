import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { ChatProvider } from '../context/ChatContext';

export default function Layout({ children }) {
  useEffect(() => {
    // Retrieve user preferences or use defaults
    const currentTheme = localStorage.getItem('theme') || 'light';
    const currentPrimary = localStorage.getItem('accentColor') || '#6d5dfc';
    const currentGlass = localStorage.getItem('glassIntensity') || '60';

    document.documentElement.setAttribute('data-theme', currentTheme);
    const root = document.documentElement;
    root.style.setProperty('--primary', currentPrimary);
    root.style.setProperty('--glass-opacity', currentGlass / 100);
    root.style.setProperty('--glass-blur', `${(currentGlass / 100) * 40}px`);

    const handleMouseMove = (e) => {
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ChatProvider>
      <div className="app-container" style={{ background: 'transparent' }}>
        <div className="mouse-spotlight"></div>
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </ChatProvider>
  );
}

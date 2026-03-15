import { Search, Plus } from 'lucide-react';

export default function RightPanel() {
  return (
    <aside className="right-panel">
      <div className="search-notes-container">
        <Search className="search-icon" size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search notes" 
          className="search-notes-input"
          onChange={(e) => {
            const event = new CustomEvent('app-search', { detail: e.target.value });
            window.dispatchEvent(event);
          }}
        />
      </div>

      <button className="add-note-btn">
        <Plus size={20} /> Add note +
      </button>

      <div className="info-card">
        <p className="info-card-text">
          Here's a few notes to get you started
        </p>
      </div>

      <div className="info-card">
        <p className="info-card-text">
          To add your first paper, click the 'Add paper' button
        </p>
      </div>

      <div className="info-card">
        <p className="info-card-text">
          Want the paper explained differently? Click the enhance button
        </p>
      </div>
    </aside>
  );
}

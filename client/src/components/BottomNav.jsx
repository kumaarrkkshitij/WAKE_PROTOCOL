// Render bottom navigation bar
export default function BottomNav({ page, onNavigate }) {
    return (
      <nav className="bottom-nav">
        <button
          className={`nav-item ${page === 'home' ? 'active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <span className="nav-icon">⌂</span>
          <span>Home</span>
        </button>
  
        <button
          className={`nav-item ${page === 'manage' ? 'active' : ''}`}
          onClick={() => onNavigate('manage')}
        >
          <span className="nav-icon">⚙</span>
          <span>Manage</span>
        </button>
      </nav>
    )
  }
import './Header.css';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { email, logout } = useAuth();
  return (
    <header className="top-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 className="header-title">Doktorská škola - burza pomoci</h1>
      {email && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem' }}>
          <span>{email}</span>
          <button
            onClick={logout}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '0.4rem 0.8rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Odhlásit se
          </button>
        </div>
      )}
    </header>
  );
}

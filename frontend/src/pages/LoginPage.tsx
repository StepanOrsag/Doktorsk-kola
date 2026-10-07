import { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try { 
            const response = await loginUser({ email: email.trim(), password});
            login(response.token, response.email, response.userId);
            navigate('/');
        } catch (err:any) {
            setError(err.message || "Přihlášení se nezdařilo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Přihlášení</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Doktorská škola - burza pomoci
      </p>
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem' }}>E-mail</label>
          <input
            id="email"
            type="email"
            required
            placeholder="jmeno@uhk.cz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="password" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Heslo</label>
          <input
            id="password"
            type="password"
            required
            placeholder="Vaše heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: '0.5rem',
            padding: '0.75rem',
            backgroundColor: isSubmitting ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Přihlašuji...' : 'Přihlásit se'}
        </button>
      </form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
        Nemáte ještě účet?{' '}
        <Link to="/registrace" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
          Zaregistrujte se
        </Link>
      </div>
    </div>
  );
}
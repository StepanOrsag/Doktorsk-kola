import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi';

export function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<String | null>(null);
    const [success, setSuccess] = useState<String | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const trimmed = email.trim();
        if(!trimmed.endsWith('@uhk.cz') && !trimmed.endsWith('@upce.cz')) {
            setError('Registrace je povolena pouze pro univerzitní emaily');
            return;
        }
        if(password != confirmPassword) {
            setError('Hesla se neshodují');
            return;
        }
        if(password.length < 8) {
            setError('Heslo musí mít 8 nebo více znaků');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await registerUser({ email: email.trim(), password });
            setSuccess(response || 'Registrace proběhla úspěšně! Nyní se můžete přihlásit.');
            setTimeout(() => {
                navigate('/prihlaseni');
            }, 1500);
        } catch (err:any) {
            setError(err.message || "Registrace se nezdařila.");
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
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Registrace</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Vyžadován e-mail @uhk.cz nebo @upce.cz
      </p>
      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.875rem' }}>
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="reg-email" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Univerzitní e-mail</label>
          <input
            id="reg-email"
            type="email"
            required
            placeholder="jmeno@uhk.cz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="reg-pass" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Heslo</label>
          <input
            id="reg-pass"
            type="password"
            required
            placeholder="Alespoň 8 znaků"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="reg-confirm" style={{ fontWeight: 600, fontSize: '0.9rem' }}>Potvrzení hesla</label>
          <input
            id="reg-confirm"
            type="password"
            required
            placeholder="Zopakujte heslo"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: '0.5rem',
            padding: '0.75rem',
            backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Registruji...' : 'Zaregistrovat se'}
        </button>
      </form>
      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
        Už máte účet?{' '}
        <Link to="/prihlaseni" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
          Přihlaste se
        </Link>
      </div>
    </div>
  );
}
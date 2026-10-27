import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUser, updateUser } from '../api/userApi';
import { usePosts } from '../hooks/usePosts';
import { PostList } from '../features/posts/PostList';

export function ProfilePage() {
  const { userId, email } = useAuth();
  const { posts } = usePosts();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    fetchUser(userId)
      .then((data: any) => {
        setFirstName(data.firstName || '');
        setLastName(data.lastName || '');
        setPhone(data.phone || '');
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      await updateUser(userId, { firstName, lastName, phone, email: email || '' });
      setMessage('Profil byl úspěšně aktualizován.');
    } catch (err: any) {
      setError(err.message || 'Nepodařilo se uložit profil.');
    } finally {
      setSaving(false);
    }
  };

  const myPosts = posts.filter(
    (post) => post.email && email && post.email.toLowerCase() === email.toLowerCase()
  );

  if (loading) return <p style={{ padding: '1rem' }}>Načítám profil...</p>;

  return (
  <div style={{ width: '100%', padding: '0 1rem 3rem 1rem' }}>
    
    {/* 1. ČÁST ZAROVNANÁ VLEVO: FORMULÁŘ PROFILU */}
    <div style={{ maxWidth: '650px', marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Můj profil</h2>

      {message && (
        <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        style={{ 
          backgroundColor: '#ffffff', 
          padding: '2rem', 
          borderRadius: '8px', 
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '1.25rem', fontSize: '1.1rem' }}>Osobní údaje</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Jméno</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Jan"
              style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Příjmení</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Novák"
              style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>E-mail (nelze měnit)</label>
            <input
              type="email"
              disabled
              value={email || ''}
              style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#6b7280' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Telefon</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+420 123 456 789"
              style={{ padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: saving ? '#9ca3af' : '#2563eb',
            color: 'white',
            padding: '0.65rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          {saving ? 'Ukládám...' : 'Uložit změny'}
        </button>
      </form>
    </div>

    {/* 2. ČÁST PŘES CELOU ŠÍŘKU: MOJE PŘÍSPĚVKY */}
    <div style={{ width: '100%', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Moje příspěvky ({myPosts.length})</h3>
      <PostList posts={myPosts} emptyMessage="Zatím jste nevytvořili žádné příspěvky." />
    </div>

  </div>
);
}
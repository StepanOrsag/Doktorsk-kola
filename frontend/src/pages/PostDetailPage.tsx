import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { formatPaymentType } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';
import { deletePost } from '../api/postApi';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id);
  const { email: currentUserEmail } = useAuth();

  if (loading) return <p style={{ textAlign: 'center' }}>Načítám detail příspěvku...</p>;
  if (error || !post) return <p style={{ color: 'red', textAlign: 'center' }}>Chyba: nepodařilo se načíst příspěvek.</p>;

  const isAuthor = !!(currentUserEmail && post.email && currentUserEmail.toLowerCase() === post.email.toLowerCase());

  const handleDelete = async () => {
    if (!window.confirm('Opravdu si přejete tento příspěvek smazat?')) {
      return;
    }

    try {
      await deletePost(post.postId);
      navigate(-1);
    } catch (err: any) {
      alert(err.message || 'Nepodařilo se smazat příspěvek.')
    }
  };

 return (
  <div style={{ maxWidth: '800px', margin: '1rem auto 3rem auto', padding: '0 1rem' }}>
    <button 
      onClick={() => navigate(-1)} 
      style={{ marginBottom: '1.5rem', background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', fontWeight: 500 }}
    >
      &larr; Zpět na seznam
    </button>
 
    <div style={{ 
      backgroundColor: '#ffffff', 
      padding: '2rem', 
      borderRadius: '8px', 
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      {/* Hlavička s názvem a tlačítkem smazat */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>{post.name}</h2>
        {isAuthor && (
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Smazat příspěvek
          </button>
        )}
      </div>

      {/* Štítky kategorie a platby */}
      <div style={{ margin: '1.25rem 0', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
          {post.category?.name}
        </span>
        <span style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
          {formatPaymentType(post.paymentType)}
        </span>
      </div>

      {/* Popis */}
      <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem', color: '#374151' }}>Podrobnosti</h3>
        <p style={{ lineHeight: 1.6, color: '#4b5563', whiteSpace: 'pre-wrap', margin: 0 }}>
          {post.description}
        </p>
      </div>

      {/* Kontakt */}
      <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem', color: '#374151' }}>Kontakt na autora</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {post.email && (
            <p style={{ margin: 0 }}>
              <strong>E-mail:</strong> <a href={`mailto:${post.email}`}>{post.email}</a>
            </p>
          )}
          {post.phone && (
            <p style={{ margin: 0 }}>
              <strong>Telefon:</strong> <a href={`tel:${post.phone}`}>{post.phone}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}
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
    <div style={{ maxWidth: '800px', padding: '0 1rem' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '2rem', background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer' }}
      >
        &larr; Zpět
      </button>
   
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <h2>{post.name}</h2>
              
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
      
      <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <span style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
          {post.category?.name}
        </span>
        <span style={{ backgroundColor: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
          {formatPaymentType(post.paymentType)}
        </span>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem' }}>Podrobnosti</h3>
        <p style={{ lineHeight: 1.6, color: '#4b5563', whiteSpace: 'pre-wrap' }}>
          {post.description}
        </p>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem' }}>Kontakt</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
          {!post.email && !post.phone && (
            <p style={{ color: '#6b7280', margin: 0 }}>Žádné kontaktní údaje nebyly poskytnuty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

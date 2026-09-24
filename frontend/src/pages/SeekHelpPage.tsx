import { usePosts } from '../hooks/usePosts';
import { PostList } from '../features/posts/PostList';
import { useNavigate } from 'react-router-dom';

export function SeekHelpPage() {
  const { posts: allPosts, loading, error } = usePosts();
  const navigate = useNavigate();

  const seekHelpPosts = allPosts.filter((post) => post.postType === 'SEEKHELP');

  if (loading) return <p style={{ textAlign: 'center' }}>Načítám poptávky pomoci...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Chyba: {error}</p>;

  return (
    <div style={{ padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Poptávka pomoci</h2>
        <button 
          onClick={() => navigate('/pridat-prispevek')}
          style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
        >
          + Přidat příspěvek
        </button>
      </div>
      <PostList posts={seekHelpPosts} emptyMessage="Zatím zde nejsou žádné poptávky pomoci." />
    </div>
  );
}

import { usePosts } from '../hooks/usePosts';
import { PostList } from '../features/posts/PostList';
import { useNavigate } from 'react-router-dom';

export function CollaborationPage() {
  const { posts: allPosts, loading, error } = usePosts();
  const navigate = useNavigate();

  const collaborationPosts = allPosts.filter((post) => post.postType === 'OFFERCOLLABORATION');

  if (loading) return <p style={{ textAlign: 'center' }}>Načítám nabídky spolupráce...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Chyba: {error}</p>;

  return (
    <div style={{ padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Nabídka spolupráce</h2>
        <button 
          onClick={() => navigate('/pridat-prispevek')}
          style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
        >
          + Přidat příspěvek
        </button>
      </div>
      <PostList posts={collaborationPosts} emptyMessage="Zatím zde nejsou žádné nabídky spolupráce." />
    </div>
  );
}

import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../features/posts/PostCard';

export function CollaborationPage() {
  const { posts: allPosts, loading, error } = usePosts();

  const collaborationPosts = allPosts.filter((post) => post.postType === 'OFFERCOLLABORATION');

  if (loading) return <p style={{ textAlign: 'center' }}>Načítám nabídky spolupráce...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Chyba: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', padding: '0 1rem' }}>
      <h2>Nabídka spolupráce</h2>
      {collaborationPosts.length === 0 ? (
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
          Zatím zde nejsou žádné nabídky spolupráce.
        </p>
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          {collaborationPosts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

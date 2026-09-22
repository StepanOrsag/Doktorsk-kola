import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../features/posts/PostCard';

export function OfferHelpPage() {
  const { posts: allPosts, loading, error } = usePosts();

  const offerHelpPosts = allPosts.filter((post) => post.postType === 'OFFERHELP');

  if (loading) return <p style={{ textAlign: 'center' }}>Načítám nabídky pomoci...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Chyba: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', padding: '0 1rem' }}>
      <h2>Nabídka pomoci</h2>
      {offerHelpPosts.length === 0 ? (
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
          Zatím zde nejsou žádné nabídky pomoci.
        </p>
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          {offerHelpPosts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

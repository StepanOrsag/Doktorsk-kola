import { usePosts } from '../hooks/usePosts';
import { PostCard } from '../features/posts/PostCard';

export function SeekHelpPage() {
  const { posts: allPosts, loading, error } = usePosts();

  const seekHelpPosts = allPosts.filter((post) => post.postType === 'SEEKHELP');

  if (loading) return <p style={{ textAlign: 'center' }}>Načítám poptávky pomoci...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Chyba: {error}</p>;

  return (
    <div style={{ maxWidth: '800px', padding: '0 1rem' }}>
      <h2>Poptávka pomoci</h2>
      {seekHelpPosts.length === 0 ? (
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
          Zatím zde nejsou žádné poptávky pomoci.
        </p>
      ) : (
        <div style={{ marginTop: '1.5rem' }}>
          {seekHelpPosts.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

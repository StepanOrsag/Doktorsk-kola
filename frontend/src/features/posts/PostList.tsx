import type { Post } from '../../types/post';
import { PostRow } from './PostRow';
import './PostList.css';

interface PostListProps {
  posts: Post[];
  emptyMessage: string;
}

export function PostList({ posts, emptyMessage }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p style={{ color: '#6b7280', marginTop: '1rem' }}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="post-table-container">
      <div className="post-table-header">
        <div className="col-name">název</div>
        <div className="col-category">kategorie</div>
        <div className="col-payment">typ platby</div>
      </div>
      <div className="post-table-body">
        {posts.map((post, index) => (
          <PostRow key={post.postId} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}

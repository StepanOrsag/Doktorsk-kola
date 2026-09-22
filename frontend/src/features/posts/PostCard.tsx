import { useState } from 'react';
import type { Post } from '../../types/post';
import { formatPaymentType } from '../../utils/formatters';
import './PostCard.css';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="post-card" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="post-header">
        <h3 className="post-title">{post.name}</h3>
        <span className="post-category">{post.category?.name}</span>
      </div>
      
      {isExpanded && (
        <div className="post-details">
          <p className="post-description">{post.description}</p>
        </div>
      )}

      <div className="post-footer">
        <span className="post-payment">
          Typ platby: <strong>{formatPaymentType(post.paymentType)}</strong>
        </span>
        
        {isExpanded && (
          <div className="post-contact">
            {post.email && <span>📧 {post.email}</span>}
            {post.phone && <span>📞 {post.phone}</span>}
          </div>
        )}
      </div>

      <div className="post-toggle-text">
        {isExpanded ? '▲ Skrýt detaily' : '▼ Zobrazit více'}
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import type { Post } from '../../types/post';
import { formatPaymentType } from '../../utils/formatters';
import './PostRow.css';

interface PostRowProps {
  post: Post;
  index: number;
}

export function PostRow({ post, index }: PostRowProps) {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`post-row-wrapper ${isEven ? 'row-even' : 'row-odd'}`}
      onClick={() => navigate(`/prispevek/${post.postId}`)}
    >
      <div className="post-row-main">
        <div className="col-name row-title">
          {post.name}
        </div>
        <div className="col-category">{post.category?.name}</div>
        <div className="col-payment">{formatPaymentType(post.paymentType)}</div>
      </div>
    </div>
  );
}

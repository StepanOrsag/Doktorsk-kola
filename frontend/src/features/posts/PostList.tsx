import type { Post } from '../../types/post';
import { PostRow } from './PostRow';
import { useCategories } from '../../hooks/useCategories';
import { useState } from 'react';
import './PostList.css';

interface PostListProps {
  posts: Post[];
  emptyMessage: string;
}

export function PostList({ posts, emptyMessage }: PostListProps) {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPosts = posts.filter((post) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !normalizedSearch ||
      post.name.toLowerCase().includes(normalizedSearch) ||
      post.description.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      !selectedCategory || post.category?.postCategoryId === Number(selectedCategory);
    const matchesPayment =
      !selectedPayment || post.paymentType === selectedPayment;

    return matchesSearch && matchesCategory && matchesPayment;
  });
  return (
    <div style={{ marginTop: '1.5rem' }}>
  
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          backgroundColor: '#f9fafb',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}
      >
        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>Filtrovat:</span>

        <input
          type="text"
          placeholder="Hledat v příspěvcích..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            fontSize: '0.9rem',
            minWidth: '220px',
            backgroundColor: 'white',
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            fontSize: '0.9rem',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="">Všechny kategorie</option>
          {categories.map((cat) => (
            <option key={cat.postCategoryId} value={cat.postCategoryId}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            fontSize: '0.9rem',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="">Všechny typy platby</option>
          <option value="FREE">Zdarma</option>
          <option value="PAID">Placené</option>
          <option value="AGREEMENT">Dohodou</option>
        </select>
      
        {(selectedCategory || selectedPayment || searchTerm) && (
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedPayment('');
              setSearchTerm('');
            }}
            style={{
              padding: '0.4rem 0.75rem',
              backgroundColor: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            Zrušit filtry
          </button>
        )}
      </div>

      {filteredPosts.length === 0 ? (
        <p style={{ color: '#6b7280', marginTop: '1rem' }}>
          {posts.length === 0
            ? emptyMessage
            : 'Žádné příspěvky neodpovídají zvoleným filtrům.'}
        </p>
      ) : (
        <div className="post-table-container">
          <div className="post-table-header">
            <div className="col-name">název</div>
            <div className="col-category">kategorie</div>
            <div className="col-payment">typ platby</div>
          </div>
          <div className="post-table-body">
            {filteredPosts.map((post, index) => (
              <PostRow key={post.postId} post={post} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
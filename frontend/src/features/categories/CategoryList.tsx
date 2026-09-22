import { useEffect, useState } from 'react';
import { fetchCategories } from '../../api/categoryApi';
import type { PostCategory } from '../../types/category';

export function CategoryList() {
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Načítám kategorie...</p>;
  if (error) return <p style={{ color: 'red' }}>Chyba: {error}</p>;

  return (
    <div>
      <h2>Seznam kategorií:</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.postCategoryId}>
            {category.name} {category.isDefault ? '(Výchozí)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { fetchCategories } from '../api/categoryApi';
import type { PostCategory } from '../types/category';

export function useCategories() {
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

  return { categories, loading, error };
}

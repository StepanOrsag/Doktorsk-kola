import type { Post } from '../types/post';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/Posts');

  if (!response.ok) {
    throw new Error('Chyba při načítání příspěvků.');
  }

  return response.json();
}

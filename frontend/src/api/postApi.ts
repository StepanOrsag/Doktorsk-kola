import type { Post } from '../types/post';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/Posts');

  if (!response.ok) {
    throw new Error('Chyba při načítání příspěvků.');
  }

  return response.json();
}

export async function fetchPost(id: string | number): Promise<Post> {
  const response = await fetch(`/Posts/${id}`);

  if (!response.ok) {
    throw new Error('Chyba při načítání detailu příspěvku.');
  }

  return response.json();
}

export async function createPost(postData: Omit<Post, 'postId'>): Promise<Post> {
  const response = await fetch('/Posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Chyba při vytváření příspěvku.');
  }

  return response.json();
}

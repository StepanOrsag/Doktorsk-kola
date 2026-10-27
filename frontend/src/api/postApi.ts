import type { Post } from '../types/post';

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/posts');

  if (!response.ok) {
    throw new Error('Chyba při načítání příspěvků.');
  }

  return response.json();
}

export async function fetchPost(id: string | number): Promise<Post> {
  const response = await fetch(`/posts/${id}`);

  if (!response.ok) {
    throw new Error('Chyba při načítání detailu příspěvku.');
  }

  return response.json();
}

export async function createPost(postData: Omit<Post, 'postId'>): Promise<Post> {
  const token = localStorage.getItem('jwt_token');

  const response = await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Chyba při vytváření příspěvku.');
  }

  return response.json();
}

export async function deletePost(id: string | number): Promise<void> {
  const token = localStorage.getItem('jwt_token');

  const response = await fetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}`} : {}),
    },
  });

  if(!response.ok){
    const errorText = await response.text();
    throw new Error(errorText || 'Chyba při mazání příspěvku.')
  }
}
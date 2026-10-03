import type { User } from '../types/user';

export async function fetchUser(userId: string | number): Promise<User> {
    const response = await fetch(`/Posts/${userId}`);

  if (!response.ok) {
    throw new Error('Chyba při načítání uživatele.');
  }

  return response.json();
}

import type { User } from '../types/user';
import type { UserRegistrationPayload } from '../types/user';
import type { LoginPayLoad } from '../types/user';
import type { AuthResponse } from '../types/user';

export async function fetchUser(userId: string | number): Promise<User> {
    const response = await fetch(`/users/${userId}`);

  if (!response.ok) {
    throw new Error('Chyba při načítání uživatele.');
  }

  return response.json();
}

export async function registerUser(payload: UserRegistrationPayload): Promise<string> {
    const response = await fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Registrace se nezdařila.");
    }

    return response.text();
}

export async function loginUser(payload: LoginPayLoad): Promise<AuthResponse> {
  const response = await fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if(!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Nesprávný e-mail nebo heslo.");
  }

  return response.json();
}
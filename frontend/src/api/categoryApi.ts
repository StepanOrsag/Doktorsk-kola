import type { PostCategory } from '../types/category';

export async function fetchCategories(): Promise<PostCategory[]> {
    const response = await fetch('/categories');

    if(!response.ok){
        throw new Error('Chyba při načítání kategorií.')
    }

    return response.json();
}
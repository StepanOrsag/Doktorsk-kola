import type { PostCategory } from './category'

export type PostType = 'SEEKHELP' | 'OFFERHELP' | 'OFFERCOLLABORATION';
export type PaymentType = 'FREE' | 'PAID' | 'AGREEMENT'

export interface Post {
    postId: number;
    name: string;
    postType: PostType;
    description: string;
    paymentType: PaymentType;
    category: PostCategory;
    email?: string;
    phone?: string;
}
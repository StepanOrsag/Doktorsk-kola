export interface User {
    userId: number;
    name?: string;
    email: string;
    phone?: string;
}

export interface UserRegistrationPayload {
    email: string;
    password: string;
}

export interface LoginPayLoad {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    userId: number;
    email: string;
}
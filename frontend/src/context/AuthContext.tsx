import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    email: string | null;
    userId: number | null;
    isAuthenticated: boolean;
    login: (token: string, email: string, userId: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('jwt_token'));
    const [email, setEmail] = useState<string | null>(() => localStorage.getItem('user_email'));
    const [userId, setUserId] = useState<number | null>(() => {
        const id = localStorage.getItem('user_id');
        return id ? Number(id) : null;
    });

    const login = (newToken: string, newEmail: string, newUserId: number) => {
        localStorage.setItem('jwt_token', newToken);
        localStorage.setItem('user_email', newEmail);
        localStorage.setItem('user_id', newUserId.toString());
        setToken(newToken);
        setEmail(newEmail);
        setUserId(newUserId);
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_id');
        setToken(null);
        setEmail(null);
        setUserId(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, email, userId, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
        const context = useContext(AuthContext);
        if (!context) {
            throw new Error('useAuth must be used within a AuthProvider');
        }
        return context;
}
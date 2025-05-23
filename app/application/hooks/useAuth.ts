"use client";
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import userService from '../services/user.service';
import { User, AuthUser, AdminVerification } from '../models/user';

interface AuthContext {
    user: User | null;
    loading: boolean;
    login: (credentials: AuthUser) => Promise<User>;
    register: (user: Omit<User, 'id'>) => Promise<User>;
    verifyAdminEmail: (verification: AdminVerification) => Promise<void>;
    requestPasswordReset: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuth = (): AuthContext => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            try {
                if (firebaseUser) {
                    const userData = await userService.getUser(firebaseUser.uid);
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (credentials: AuthUser): Promise<User> => {
        const userData = await userService.login(credentials);
        setUser(userData);
        return userData;
    };

    const register = async (userData: Omit<User, 'id'>): Promise<User> => {
        const newUser = await userService.register(userData);
        setUser(newUser);
        return newUser;
    };

    const verifyAdminEmail = async (verification: AdminVerification): Promise<void> => {
        await userService.verifyAdminEmail(verification);
        if (user) {
            setUser({ ...user, emailVerified: true });
        }
    };

    const requestPasswordReset = async (email: string): Promise<void> => {
        await userService.requestPasswordReset(email);
    };

    const logout = async (): Promise<void> => {
        await userService.logout();
        setUser(null);
    };

    return {
        user,
        loading,
        login,
        register,
        verifyAdminEmail,
        requestPasswordReset,
        logout
    };
};
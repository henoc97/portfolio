"use client";
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import userService from '../services/user.service';
import User from '../models/user';

interface AuthContext {
    user: User | null;
    loading: boolean;
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

    return { user, loading };
};
"use client";
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import userService from '../services/user.service';
import User from '../models/user';

interface AuthContext {
    user: User | null;
}

export const useAuth = (): AuthContext => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                const userData = await userService.getUser(firebaseUser.uid);
                setUser(userData);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return { user };
};
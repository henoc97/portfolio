// services/userService.ts
import { db } from './firebase.config';
import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import User from '../models/user';

const userService = {
    async getUser(id: string): Promise<User> {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data() as Omit<User, 'id'>;
            return { id: docSnap.id, ...data };
        } else {
            throw new Error('User not found');
        }
    },

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const auth = getAuth();
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, user.email, user.password!);
        const userId = userCredential.user.uid;
        await setDoc(doc(db, 'users', userId), {
            name: user.name,
            email: user.email,
            bio: user.bio,
            role: user.role
        });
        return { id: userId, ...user };
    },

    async updateUser(user: User): Promise<void> {
        await setDoc(doc(db, 'users', user.id!), {
            name: user.name,
            email: user.email,
            bio: user.bio,
            role: user.role
        });
    },

    async deleteUser(id: string): Promise<void> {
        await deleteDoc(doc(db, 'users', id));
    }
};

export default userService;
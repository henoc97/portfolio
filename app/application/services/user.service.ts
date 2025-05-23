// services/userService.ts
import { db } from './firebase.config';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    UserCredential,
    signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { User, AuthUser, AdminVerification } from '../models/user';

const userService = {
    async login(credentials: AuthUser): Promise<User> {
        const auth = getAuth();
        console.log("Tentative de connexion avec:", credentials.email);

        const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        console.log("Connexion Firebase réussie, uid:", userCredential.user.uid);
        console.log("Email vérifié dans Firebase:", userCredential.user.emailVerified);

        const userData = await this.getUser(userCredential.user.uid);
        console.log("Données utilisateur récupérées:", userData);

        // Forcer la synchronisation du statut de vérification
        if (userCredential.user.emailVerified) {
            console.log("Mise à jour forcée du statut de vérification dans Firestore");
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                emailVerified: true
            }, { merge: true });
            userData.emailVerified = true;
        }

        // Vérifier si l'email est vérifié dans Firebase Auth
        if (userData.role === 'admin' && !userCredential.user.emailVerified) {
            console.log("Email non vérifié pour admin, déconnexion...");
            await signOut(auth);
            throw new Error('Veuillez vérifier votre email pour accéder au mode admin');
        }

        console.log("Connexion réussie, retour des données utilisateur");
        return userData;
    },

    async register(user: Omit<User, 'id'>): Promise<User> {
        const auth = getAuth();
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, user.email, user.password!);
        const userId = userCredential.user.uid;

        // Envoyer l'email de vérification
        await sendEmailVerification(userCredential.user);

        // Séparer les métadonnées des données utilisateur de base
        const { ...userData } = user;

        await setDoc(doc(db, 'users', userId), {
            ...userData,
            emailVerified: false,
        });

        return { id: userId, ...user, emailVerified: false };
    },

    async verifyAdminEmail(verification: AdminVerification): Promise<void> {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('Utilisateur non connecté');
        }

        const verificationRef = collection(db, 'adminVerifications');
        const q = query(verificationRef,
            where('email', '==', verification.email),
            where('code', '==', verification.code)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error('Code de vérification invalide');
        }

        await setDoc(doc(db, 'users', user.uid), {
            emailVerified: true
        }, { merge: true });
    },

    async requestPasswordReset(email: string): Promise<void> {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
    },

    async getUser(id: string): Promise<User> {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                email: data.email,
                role: data.role,
                emailVerified: data.emailVerified,
            };
        } else {
            throw new Error('Utilisateur non trouvé');
        }
    },

    async updateUser(user: User): Promise<void> {
        const { ...userData } = user;
        await setDoc(doc(db, 'users', user.id), {
            ...userData,
        }, { merge: true });
    },


    async deleteUser(id: string): Promise<void> {
        await deleteDoc(doc(db, 'users', id));
    },

    async logout(): Promise<void> {
        const auth = getAuth();
        await signOut(auth);
    }
};

export default userService;
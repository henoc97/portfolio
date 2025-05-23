import { throws } from "assert";

// models/User.ts
export interface User {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    bio: string;
    role: 'admin' | 'user';
    emailVerified: boolean;
    password?: string;
}

export interface AuthUser {
    email: string;
    password: string;
}

export interface AdminVerification {
    code: string;
    email: string;
}

export default User;

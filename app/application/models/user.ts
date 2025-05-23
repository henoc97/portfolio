import { throws } from "assert";

export interface User {
    id: string;
    email: string;
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

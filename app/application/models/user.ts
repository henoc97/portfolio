// models/User.ts
class User {
    id: string;
    name: string;
    email: string;
    bio: string;
    role: string; // 'admin' | 'client';
    password?: string;

    constructor(id: string, name: string, email: string, bio: string, role: string, password?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.role = role;
        this.password = password;
    }
}

export default User;

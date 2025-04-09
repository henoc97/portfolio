// services/blogService.ts
import Blog from '../models/blog';
import { db } from './firebase.config';
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';

const blogService = {
    async getBlogs(): Promise<Blog[]> {
        const snapshot = await getDocs(collection(db, 'blogs'));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date.toDate() // Convertir Timestamp en Date
        }));
    },

    async createBlog(blog: Blog): Promise<Blog> {
        const docRef = await addDoc(collection(db, 'blogs'), {
            title: blog.title,
            content: blog.content,
            date: blog.date
        });
        blog.id = docRef.id;
        return blog;
    },

    async updateBlog(blog: Blog): Promise<void> {
        await setDoc(doc(db, 'blogs', blog.id!), {
            title: blog.title,
            content: blog.content,
            date: blog.date
        });
    },

    async deleteBlog(id: string): Promise<void> {
        await deleteDoc(doc(db, 'blogs', id));
    }
};

export default blogService;
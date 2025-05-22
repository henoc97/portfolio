import Project from '../models/project';
import { db } from './firebase.config';
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';

const projectService = {
    async getProjects(): Promise<Project[]> {
        const snapshot = await getDocs(collection(db, 'projects'));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            image: doc.data().image,
            github: doc.data().github,
            demo: doc.data().demo,
            category: doc.data().category
        }));
    },

    async createProject(project: Project): Promise<Project> {
        const docRef = await addDoc(collection(db, 'projects'), {
            title: project.title,
            description: project.description,
            image: project.image,
            github: project.github,
            demo: project.demo,
            category: project.category
        });
        project.id = docRef.id;
        return project;
    },

    async updateProject(project: Project): Promise<void> {
        await setDoc(doc(db, 'projects', project.id!), {
            title: project.title,
            description: project.description,
            image: project.image,
            github: project.github,
            demo: project.demo,
            category: project.category
        });
    },

    async deleteProject(id: string): Promise<void> {
        await deleteDoc(doc(db, 'projects', id));
    }
};

export default projectService;
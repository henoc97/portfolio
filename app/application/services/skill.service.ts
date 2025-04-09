// services/skillService.ts
import { db } from './firebase.config';
import Skill from '../models/skill';
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';

const skillService = {
    async getSkills(): Promise<Skill[]> {
        const snapshot = await getDocs(collection(db, 'skills'));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            level: doc.data().level
        }));
    },

    async createSkill(skill: Skill): Promise<Skill> {
        const docRef = await addDoc(collection(db, 'skills'), {
            name: skill.name,
            level: skill.level
        });
        skill.id = docRef.id;
        return skill;
    },

    async updateSkill(skill: Skill): Promise<void> {
        await setDoc(doc(db, 'skills', skill.id!), {
            name: skill.name,
            level: skill.level
        });
    },

    async deleteSkill(id: string): Promise<void> {
        await deleteDoc(doc(db, 'skills', id));
    }
};

export default skillService;
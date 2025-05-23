import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Skill } from '../models/skill';
import { db } from './firebase.config';

const SkillService = {
    COLLECTION_NAME: 'skills',
    async getSkills(): Promise<Skill[]> {
        const skillsCollection = collection(db, this.COLLECTION_NAME);
        const skillsSnapshot = await getDocs(skillsCollection);
        return skillsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Skill));
    },

    async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
        const docRef = await addDoc(collection(db, this.COLLECTION_NAME), skill);
        return {
            id: docRef.id,
            ...skill
        };
    },

    async updateSkill(skill: Skill): Promise<void> {
        const skillRef = doc(db, this.COLLECTION_NAME, skill.id);
        await updateDoc(skillRef, {
            name: skill.name,
            category: skill.category,
            elements: skill.elements
        });
    },

    async deleteSkill(id: string): Promise<void> {
        const skillRef = doc(db, this.COLLECTION_NAME, id);
        await deleteDoc(skillRef);
    }
}

export default SkillService; 
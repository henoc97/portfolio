// services/certificateService.ts
import Certificate from '../models/certificate';
import { db } from './firebase.config';
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';


const certificateService = {
    async getCertificates(): Promise<Certificate[]> {
        const snapshot = await getDocs(collection(db, 'certificates'));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            issuer: doc.data().issuer,
            date: doc.data().date.toDate() // Convertir Timestamp en Date
        }));
    },

    async createCertificate(certificate: Certificate): Promise<Certificate> {
        const docRef = await addDoc(collection(db, 'certificates'), {
            name: certificate.name,
            issuer: certificate.issuer,
            date: certificate.date
        });
        certificate.id = docRef.id;
        return certificate;
    },

    async updateCertificate(certificate: Certificate): Promise<void> {
        await setDoc(doc(db, 'certificates', certificate.id!), {
            name: certificate.name,
            issuer: certificate.issuer,
            date: certificate.date
        });
    },

    async deleteCertificate(id: string): Promise<void> {
        await deleteDoc(doc(db, 'certificates', id));
    }
};

export default certificateService;
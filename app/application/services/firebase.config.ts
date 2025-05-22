// services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBUCEz_oRmeI67BGCGJbJRydwKCJBxQbZU",
    authDomain: "portfolio-4d838.firebaseapp.com",
    projectId: "portfolio-4d838",
    storageBucket: "portfolio-4d838.appspot.com",
    messagingSenderId: "659642816801",
    appId: "1:659642816801:web:6d17977103c14b5dd60660",
    measurementId: "G-ZWEJZY05QF"
};



// Initialisez Firebase
export const app = initializeApp(firebaseConfig);

// Exportez Firestore
export const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((yes) => {
        if (yes) {
            analytics = getAnalytics(app);
        }
    });
}

export { analytics };

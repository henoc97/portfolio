import { db } from './firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { PortfolioInfo } from '../models/portfolio';

const PORTFOLIO_ID = 'main';

// Valeurs par défaut pour le portfolio
const DEFAULT_PORTFOLIO: Omit<PortfolioInfo, 'id'> = {
    name: "Mon Portfolio",
    bio: "Bienvenue sur mon portfolio",
    socialLinks: {
        whatsapp: "",
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: ""
    }
};

class PortfolioServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PortfolioServiceError';
    }
}

const portfolioService = {
    /**
     * Crée un nouveau portfolio avec les valeurs par défaut
     * @throws {PortfolioServiceError} Si la création échoue
     */
    async createPortfolioInfo(): Promise<void> {
        try {
            const docRef = doc(db, 'portfolio', PORTFOLIO_ID);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, DEFAULT_PORTFOLIO);
            }
        } catch (error) {
            throw new PortfolioServiceError(
                `Erreur lors de la création du portfolio: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
            );
        }
    },

    /**
     * Récupère les informations du portfolio
     * @returns {Promise<PortfolioInfo>} Les informations du portfolio
     * @throws {PortfolioServiceError} Si la récupération échoue
     */
    async getPortfolioInfo(): Promise<PortfolioInfo> {
        try {
            const docRef = doc(db, 'portfolio', PORTFOLIO_ID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    name: data.name || DEFAULT_PORTFOLIO.name,
                    bio: data.bio || DEFAULT_PORTFOLIO.bio,
                    socialLinks: {
                        ...DEFAULT_PORTFOLIO.socialLinks,
                        ...data.socialLinks
                    }
                };
            }

            // Créer le portfolio s'il n'existe pas
            await this.createPortfolioInfo();
            return {
                id: PORTFOLIO_ID,
                ...DEFAULT_PORTFOLIO
            };
        } catch (error) {
            throw new PortfolioServiceError(
                `Erreur lors de la récupération du portfolio: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
            );
        }
    },

    /**
     * Met à jour les informations du portfolio
     * @param {Omit<PortfolioInfo, 'id'>} info - Les nouvelles informations du portfolio
     * @throws {PortfolioServiceError} Si la mise à jour échoue
     */
    async updatePortfolioInfo(info: Omit<PortfolioInfo, 'id'>): Promise<void> {
        try {
            // Validation des données
            if (!info.name?.trim()) {
                throw new PortfolioServiceError('Le nom ne peut pas être vide');
            }

            // Nettoyage des liens sociaux
            const cleanedSocialLinks = Object.entries(info.socialLinks || {}).reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    [key]: value?.trim() || ""
                }),
                {}
            );

            await setDoc(doc(db, 'portfolio', PORTFOLIO_ID), {
                ...info,
                socialLinks: cleanedSocialLinks
            });
        } catch (error) {
            if (error instanceof PortfolioServiceError) {
                throw error;
            }
            throw new PortfolioServiceError(
                `Erreur lors de la mise à jour du portfolio: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
            );
        }
    }
};

export default portfolioService; 
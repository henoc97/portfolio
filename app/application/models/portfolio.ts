// models/portfolio.ts
export interface PortfolioInfo {
    id: string;
    name: string;
    bio: string;
    socialLinks: {
        whatsapp?: string;
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        facebook?: string;
    };
    // Vous pouvez ajouter d'autres informations publiques ici
    // comme les compétences, projets, etc.
}

export default PortfolioInfo; 
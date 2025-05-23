"use client";
import { PortfolioInfo } from "@/app/application/models/portfolio";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import portfolioService from "@/app/application/services/portfolio.service";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminPortfolio: React.FC = () => {
  const [portfolioInfo, setPortfolioInfo] = useState<PortfolioInfo>({
    id: "main",
    name: "",
    bio: "",
    socialLinks: {
      whatsapp: "",
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializePortfolio = async () => {
      try {
        setLoading(true);
        setError(null);

        // Créer le portfolio s'il n'existe pas
        await portfolioService.createPortfolioInfo();

        // Récupérer les informations
        const data = await portfolioService.getPortfolioInfo();
        setPortfolioInfo(data);
        setIsInitialized(true);
      } catch (err) {
        setError("Erreur lors de l'initialisation du portfolio");
        console.error("Erreur d'initialisation:", err);
      } finally {
        setLoading(false);
      }
    };

    initializePortfolio();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await portfolioService.updatePortfolioInfo({
        name: portfolioInfo.name,
        bio: portfolioInfo.bio,
        socialLinks: portfolioInfo.socialLinks,
      });

      setSuccess("Informations du portfolio mises à jour avec succès");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour des informations"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLinkChange = (
    platform: keyof PortfolioInfo["socialLinks"],
    value: string
  ) => {
    setPortfolioInfo((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Chargement...</h2>
          <p className="text-gray-500">
            {isInitialized
              ? "Mise à jour en cours..."
              : "Initialisation du portfolio..."}
          </p>
        </div>
      </div>
    );
  }

  if (error && !isInitialized) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administration du Portfolio</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>
            Modifiez les informations de base de votre portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Nom</label>
            <Input
              value={portfolioInfo.name}
              onChange={(e) =>
                setPortfolioInfo({ ...portfolioInfo, name: e.target.value })
              }
              placeholder="Votre nom"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={portfolioInfo.bio}
              onChange={(e) =>
                setPortfolioInfo({ ...portfolioInfo, bio: e.target.value })
              }
              placeholder="Votre biographie"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liens sociaux</CardTitle>
          <CardDescription>
            Ajoutez ou modifiez vos liens sociaux
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn</label>
            <Input
              value={portfolioInfo.socialLinks.linkedin || ""}
              onChange={(e) =>
                handleSocialLinkChange("linkedin", e.target.value)
              }
              placeholder="URL LinkedIn"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub</label>
            <Input
              value={portfolioInfo.socialLinks.github || ""}
              onChange={(e) => handleSocialLinkChange("github", e.target.value)}
              placeholder="URL GitHub"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">WhatsApp</label>
            <Input
              value={portfolioInfo.socialLinks.whatsapp || ""}
              onChange={(e) =>
                handleSocialLinkChange("whatsapp", e.target.value)
              }
              placeholder="Numéro WhatsApp (ex: 22897045559)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Twitter</label>
            <Input
              value={portfolioInfo.socialLinks.twitter || ""}
              onChange={(e) =>
                handleSocialLinkChange("twitter", e.target.value)
              }
              placeholder="URL Twitter"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Instagram</label>
            <Input
              value={portfolioInfo.socialLinks.instagram || ""}
              onChange={(e) =>
                handleSocialLinkChange("instagram", e.target.value)
              }
              placeholder="URL Instagram"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook</label>
            <Input
              value={portfolioInfo.socialLinks.facebook || ""}
              onChange={(e) =>
                handleSocialLinkChange("facebook", e.target.value)
              }
              placeholder="URL Facebook"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpdate} disabled={loading} className="w-full">
            {loading ? "Mise à jour..." : "Mettre à jour le portfolio"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminPortfolio;

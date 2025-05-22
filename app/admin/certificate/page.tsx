"use client";
import React, { useState, useEffect } from "react";
import Certificate from "@/app/application/models/certificate";
import certificateService from "@/app/application/services/certificate.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { handleUpload } from "@/app/application/services/upload-image.service";
import { uploadPDF } from "@/app/application/services/upload-pdf.service";

const AdminCertificate: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [newCertificate, setNewCertificate] = useState<Partial<Certificate>>({
    name: "",
    description: "",
    image: "",
    link: "",
  });

  const [editingCertificate, setEditingCertificate] =
    useState<Partial<Certificate> | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificates = await certificateService.getCertificates();
      setCertificates(certificates);
    };
    fetchCertificates();
  }, []);

  const handleCreateCertificate = async () => {
    if (newCertificate.name && newCertificate.description) {
      const createdCertificate = await certificateService.createCertificate(
        newCertificate as Certificate
      );
      setCertificates([...certificates, createdCertificate]);
      setNewCertificate({ name: "", description: "", image: "", link: "" });
    }
  };

  const _handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = await handleUpload(event.target.files[0]);
      setNewCertificate({ ...newCertificate, image: imageUrl });
    }
  };

  const _handlePDFUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const pdfUrl = await uploadPDF(event.target.files[0]);
      setNewCertificate({ ...newCertificate, link: pdfUrl });
    }
  };

  const handleUpdateCertificate = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setNewCertificate({
      name: certificate.name,
      description: certificate.description,
      image: certificate.image,
      link: certificate.link,
    });
  };

  const handleUpdate = async () => {
    if (editingCertificate && editingCertificate.id) {
      await certificateService.updateCertificate({
        id: editingCertificate.id,
        name: editingCertificate.name || "",
        description: editingCertificate.description || "",
        image: editingCertificate.image || "",
        link: editingCertificate.link || "",
      });
      setCertificates(
        certificates.map((c) =>
          c.id === editingCertificate.id
            ? ({
                ...editingCertificate,
                id: editingCertificate.id,
              } as Certificate)
            : c
        )
      );
      setNewCertificate({
        name: "",
        description: "",
        image: "",
        link: "",
      });
      setEditingCertificate(null);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    await certificateService.deleteCertificate(id);
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Certificate</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Certificate</h2>
        <div className="space-y-4">
          <Input
            placeholder="Certificate Name"
            value={newCertificate.name}
            onChange={(e) =>
              setNewCertificate({ ...newCertificate, name: e.target.value })
            }
          />
          <Input
            placeholder="Certificate Description"
            value={newCertificate.description}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                description: e.target.value,
              })
            }
          />
          <Input
            type="file"
            accept="image/*"
            placeholder="Certificate Image"
            onChange={_handleImageUpload}
          />
          <Input
            placeholder="Certificate File"
            value={newCertificate.link}
            onChange={(e) =>
              setNewCertificate({ ...newCertificate, link: e.target.value })
            }
          />
          {/* <Input
            type="file"
            accept="application/pdf"
            placeholder="Certificate Link"
            onChange={_handlePDFUpload}
          /> */}
          <Button
            onClick={
              editingCertificate ? handleUpdate : handleCreateCertificate
            }
          >
            {editingCertificate ? "Update Certificate" : "Create Certificate"}
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-xl font-semibold mb-4">Existing Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate) => (
            <Card key={certificate.id}>
              <img
                src={certificate.image}
                alt={certificate.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#11101D]">
                  {certificate.name}
                </h3>
                <p className="text-gray-600 mb-4">{certificate.description}</p>
                <div className="flex justify-between">
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFAA00] hover:text-[#11101D] transition-colors duration-200"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>
              </div>
              <CardFooter className="flex space-x-4">
                <Button onClick={() => handleUpdateCertificate(certificate)}>
                  Update
                </Button>
                <Button
                  onClick={() => handleDeleteCertificate(certificate.id!)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCertificate;

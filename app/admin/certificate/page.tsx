"use client";
import React, { useState, useEffect } from "react";
import Certificate from "@/app/application/models/certificate";
import certificateService from "@/app/application/services/certificate.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminCertificate: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [newCertificate, setNewCertificate] = useState<Partial<Certificate>>({
    name: "",
    issuer: "",
    date: new Date(),
  });

  useEffect(() => {
    const fetchCertificates = async () => {
      const certificates = await certificateService.getCertificates();
      setCertificates(certificates);
    };
    fetchCertificates();
  }, []);

  const handleCreateCertificate = async () => {
    if (newCertificate.name && newCertificate.issuer) {
      const createdCertificate = await certificateService.createCertificate(
        newCertificate as Certificate
      );
      setCertificates([...certificates, createdCertificate]);
      setNewCertificate({ name: "", issuer: "", date: new Date() });
    }
  };

  const handleUpdateCertificate = async (certificate: Certificate) => {
    await certificateService.updateCertificate(certificate);
    setCertificates(
      certificates.map((c) => (c.id === certificate.id ? certificate : c))
    );
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
            placeholder="Name"
            value={newCertificate.name}
            onChange={(e) =>
              setNewCertificate({ ...newCertificate, name: e.target.value })
            }
          />
          <Input
            placeholder="Issuer"
            value={newCertificate.issuer}
            onChange={(e) =>
              setNewCertificate({ ...newCertificate, issuer: e.target.value })
            }
          />
          <Input
            type="date"
            value={newCertificate.date?.toISOString().split("T")[0]}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                date: new Date(e.target.value),
              })
            }
          />
          <Button onClick={handleCreateCertificate}>Create Certificate</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Certificates</h2>
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id}>
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {certificate.name}
                </CardTitle>
                <CardDescription>Issuer: {certificate.issuer}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Date: {certificate.date.toDateString()}</p>
              </CardContent>
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

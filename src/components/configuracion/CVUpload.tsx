"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface CVUploadProps {
    currentCV?: string | null;
    onCVChange: (file: File | null) => void;
}

export function CVUpload({ currentCV, onCVChange }: CVUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
            onCVChange(droppedFile);
            toast.success("CV cargado exitosamente");
        } else {
            toast.error("Por favor, sube un archivo PDF");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            onCVChange(selectedFile);
            toast.success("CV cargado exitosamente");
        } else {
            toast.error("Por favor, sube un archivo PDF");
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        onCVChange(null);
        toast.success("CV removido");
    };

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Hoja de Vida (CV)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Sube tu CV en formato PDF para que los empleadores puedan revisar tu perfil
                    </p>
                </div>

                {!file && !currentCV ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                    >
                        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-700 font-medium mb-1">
                            Arrastra tu CV aquí o haz clic para seleccionar
                        </p>
                        <p className="text-sm text-gray-500 mb-4">Solo se aceptan archivos PDF</p>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="cv-input"
                        />
                        <Button
                            variant="outline"
                            className="cursor-pointer"
                            onClick={() => document.getElementById("cv-input")?.click()}
                        >
                            <Upload size={16} className="mr-2" />
                            Seleccionar archivo
                        </Button>
                    </div>
                ) : (
                    <div className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileText size={24} className="text-red-500" />
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {file?.name || "CV actual"}
                                    </p>
                                    {file && (
                                        <p className="text-sm text-gray-500">
                                            {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRemoveFile}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <X size={20} />
                            </Button>
                        </div>
                        {!file && currentCV && (
                            <p className="text-xs text-gray-500 mt-2">
                                CV guardado en el sistema
                            </p>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}

"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Lightbulb } from "lucide-react";

interface ComingSoonDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

export function ComingSoonDialog({
    isOpen,
    onClose,
    title = "Próximamente",
    description = "Esta función se creará próximamente. Estamos trabajando para traerte nuevas características."
}: ComingSoonDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-3">
                        <Lightbulb className="w-6 h-6 text-yellow-500" />
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="pt-2">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end gap-2">
                    <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    <AlertDialogAction onClick={onClose}>
                        Entendido
                    </AlertDialogAction>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}

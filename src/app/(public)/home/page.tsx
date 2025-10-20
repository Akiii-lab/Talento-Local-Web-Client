import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BriefcaseBusinessIcon, SearchIcon } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <div className="relative w-full h-screen flex items-start justify-center">
            <div className="absolute top-0 left-0 w-full -z-10 overflow-hidden">
                <Image
                    src="/Homeimage.jpg"
                    width={1800}
                    height={1800}
                    alt="logo"
                    className="w-full h-full object-cover [clip-path:ellipse(80%_30%_at_50%_0%)]"
                />
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-row items-center w-max justify-center rounded-md gap-2 p-4 mt-30 bg-accent z-10">
                        <div className="flex flex-row items-center justify-center">
                            <BriefcaseBusinessIcon size={18} className="text-foreground" />
                            <input placeholder="Buscar empleo" className="ml-2 border-none focus:outline-none" />
                        </div>
                        <Button className="bg-(--per-fourth)">
                            <Label>
                                Buscar empleo
                            </Label>
                            <SearchIcon size={18} className="text-secondary" />
                        </Button>
                    </div>
                </div>

                {/* Sección de estadísticas */}
                <div className="flex flex-col md:flex-row gap-6 mt-10 w-full max-w-4xl justify-center items-center">
                    <div className="bg-white/80 rounded-lg shadow-md p-6 flex flex-col items-center w-60">
                        <span className="text-3xl font-bold text-blue-600">+2,500</span>
                        <span className="text-gray-700 mt-2">Empleos publicados</span>
                    </div>
                    <div className="bg-white/80 rounded-lg shadow-md p-6 flex flex-col items-center w-60">
                        <span className="text-3xl font-bold text-green-600">+1,200</span>
                        <span className="text-gray-700 mt-2">Empresas activas</span>
                    </div>
                    <div className="bg-white/80 rounded-lg shadow-md p-6 flex flex-col items-center w-60">
                        <span className="text-3xl font-bold text-purple-600">+8,000</span>
                        <span className="text-gray-700 mt-2">Usuarios registrados</span>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col md:flex-row gap-4 mt-10 w-full max-w-2xl justify-center items-center">
                    <Button className="w-full md:w-auto bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                        Crear cuenta gratis
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto border-blue-500 text-blue-500 font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-50 transition">
                        Publicar empleo
                    </Button>
                </div>

                {/* Mensaje motivacional */}
                <div className="mt-12 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Encuentra tu próximo desafío profesional</h2>
                    <p className="text-lg text-gray-600">Explora miles de oportunidades laborales, conecta con empresas líderes y haz crecer tu carrera. ¡Tu futuro comienza aquí!</p>
                </div>
            </div>
        </div>
    );
}
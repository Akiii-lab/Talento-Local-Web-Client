"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AboutPage() {
    const router = useRouter();
    const [data, setData] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/metrics/eframe');
            const data = await response.json();
            setData(data.url);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
                        <Image
                            src="/talentologo.png"
                            alt="Talento Local"
                            width={40}
                            height={40}
                        />
                        <span className="text-xl font-bold text-slate-900">Talento Local</span>
                    </div>
                    <Button variant="outline" className="hover:cursor-pointer" onClick={() => router.push("/")}>
                        Volver
                    </Button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <section className="mb-20">
                    <h1 className="text-5xl font-bold text-slate-900 mb-6">Acerca de Talento Local</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Talento Local es una plataforma de empleo innovadora diseñada para conectar candidatos talentosos con empresas que buscan el mejor personal. Nuestra misión es facilitar conexiones significativas entre profesionales y organizaciones en tu comunidad.
                    </p>
                </section>

                <section className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Misión</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Crear oportunidades de empleo accesibles y de calidad, reduciendo la brecha entre candidatos calificados y empresas que necesitan talento. Creemos que el empleo correcto puede transformar vidas y comunidades.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Visión</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Ser la plataforma de empleo más confiable y utilizada en la región, conocida por conectar talento con oportunidades de manera eficiente y transparente. Aspiramos a ser el puente entre lo que las personas pueden lograr y lo que las empresas necesitan.
                        </p>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Nuestros Valores</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Transparencia</h3>
                            <p className="text-slate-600">
                                Creemos en la comunicación clara y honesta entre candidatos y empleadores. Toda la información es precisa y verificada.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Accesibilidad</h3>
                            <p className="text-slate-600">
                                Nuestros servicios están diseñados para ser accesibles para todos, independientemente de su experiencia o trasfondo.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Excelencia</h3>
                            <p className="text-slate-600">
                                Nos comprometemos a proporcionar la mejor experiencia posible a través de tecnología y servicio al cliente de calidad.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Comunidad</h3>
                            <p className="text-slate-600">
                                Valoramos el crecimiento conjunto y el impacto positivo que generamos en nuestras comunidades locales.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Innovación</h3>
                            <p className="text-slate-600">
                                Continuamente buscamos mejorar nuestras herramientas y procesos para servir mejor a nuestros usuarios.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Confianza</h3>
                            <p className="text-slate-600">
                                La confianza es el fundamento de nuestra plataforma. Protegemos los datos y respetamos la privacidad de todos.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Nuestras Métricas</h2>
                    {data ? (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <iframe
                                src={data}
                                width="100%"
                                height="600"
                                frameBorder="0"
                                allowFullScreen={true}
                                className="rounded-lg"
                            />
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-slate-600">Cargando métricas...</p>
                        </div>
                    )}
                </section>


                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Por Qué Elegirnos</h2>
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <ul className="space-y-4 text-slate-600">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                                <span><strong>Búsqueda Inteligente:</strong> Algoritmos avanzados que conectan candidatos con las ofertas más relevantes</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                                <span><strong>Verificación Confiable:</strong> Validación de perfiles y empresas para garantizar seguridad</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                                <span><strong>Soporte Local:</strong> Equipo dedicado que entiende el mercado y necesidades locales</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                                <span><strong>Herramientas Gratuitas:</strong> Acceso a recursos para candidatos y empresas sin costo</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-600 font-bold text-lg mt-1">✓</span>
                                <span><strong>Comunidad Activa:</strong> Red de profesionales para networking y desarrollo</span>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="bg-white rounded-lg shadow-md p-12 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Únete a Nuestra Comunidad</h2>
                    <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                        Ya sea que busques trabajo o estés reclutando talento, Talento Local es tu mejor aliado. Comienza hoy mismo y descubre nuevas oportunidades.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Button onClick={() => router.push("/signup")} className="bg-blue-600 hover:bg-blue-700">
                            Registrarse Ahora
                        </Button>
                        <Button variant="outline" onClick={() => router.push("/")}>
                            Explorar Empleos
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}

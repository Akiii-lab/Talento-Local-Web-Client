"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { BellIcon } from "lucide-react";
import { useUserStore } from "@/app/store/userStore";

export default function Header() {

    const router = useRouter();
    const actualPath = usePathname();
    const {user} = useUserStore();

    return (
        <div className={`border-b flex flex-row items-center justify-between`} >
            <Image src="/talentologo.png" width={100} height={100} alt="logo"
                className="ml-2 hover:cursor-pointer"
                onClick={() => router.push("/")}
            />
            <div className="flex flex-row justify-around">
                <Button
                    variant="link"
                    className={`hover:cursor-pointer decoration-(--per-primary) ${actualPath === '/home' ? 'underline underline-offset-8' : ''}`}
                    onClick={() => router.push("/")}
                >
                    Buscar Empleo
                </Button>
                <Button
                    variant="link"
                    className={`hover:cursor-pointer decoration-(--per-primary) ${actualPath === '/ofrecer-empleo' ? 'underline underline-offset-8' : ''}`}
                    //onClick={() => router.push("/ofrecer-empleo")}
                >
                    Ofrecer Empleo
                </Button>
                <Button
                    variant="link"
                    className={`hover:cursor-pointer decoration-(--per-primary) ${actualPath === '/acerca-de' ? 'underline underline-offset-8' : ''}`}
                    //onClick={() => router.push("/acerca-de")}
                >
                    Acerca de
                </Button>
            </div>
            <div className="flex mr-2">
                {user ? (
                    <div className="flex flex-row border rounded-4xl p-3 items-center gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <BellIcon className="hover:cursor-pointer text-muted-foreground" />
                            <span className="font-light">
                                Notificaciones |
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <span className="font-semibold">
                                Cristian Garcia
                            </span>
                            <Avatar>
                                <AvatarFallback className="p-3 bg-blue-200">
                                    CG
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                ) : (
                    <Button
                        onClick={() => router.push("/login")}
                    >
                        Iniciar Sesión
                    </Button>
                )}
            </div>
        </div>
    );
}
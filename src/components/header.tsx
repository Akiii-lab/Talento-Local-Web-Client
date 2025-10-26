"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { BellIcon, Search, Settings, Briefcase, Heart, LogOut } from "lucide-react";
import { useUserStore } from "@/app/store/userStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {

    const router = useRouter();
    const actualPath = usePathname();
    const headerPaths = ['/home', '/ofrecer-empleo', '/acerca-de'];
    const { user } = useUserStore();


    const UserCircle = () => {
        return (
            <>
                {user ? (
                    <div className="flex flex-row border rounded-4xl p-3 items-center gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <BellIcon size={18} className="hover:cursor-pointer text-muted-foreground" />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex flex-row items-center gap-2 text-sm hover:cursor-pointer">
                                    <span className="font-semibold">
                                        Cristian Garcia
                                    </span>
                                    <Avatar>
                                        <AvatarFallback className="p-3 bg-blue-200">
                                            CG
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/config")} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    <span>Mis Postulaciones</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Heart className="mr-2 h-4 w-4" />
                                    <span>Favoritos</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar Sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Button
                        onClick={() => router.push("/login")}
                    >
                        Iniciar Sesión
                    </Button>
                )}
            </>
        );
    }


    return (
        <div className={`border-b flex flex-row items-center justify-center gap-4`} >
            {headerPaths.includes(actualPath) ? (
                <div className="flex flex-row items-center justify-around w-full">
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
                    <UserCircle />
                </div>
            ) :
                <div className="flex flex-row items-center gap-2 justify-around w-full">
                    <Image src="/talentologo.png" width={100} height={100} alt="logo"
                        className="ml-2 hover:cursor-pointer"
                        onClick={() => router.push("/")} />
                    <div className="flex flex-row border rounded-2xl p-2 gap-2 items-center">
                        <input className="border-none focus:outline-none w-sm" />
                        <Button className="bg-(--per-fourth) hover:cursor-pointer rounded-2xl">
                            <Search size={18} className="text-secondary" />
                        </Button>
                    </div>
                    <UserCircle />
                </div>
            }
        </div>
    );
}
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { BellIcon, Search } from "lucide-react";
import { useUserStore } from "@/app/store/userStore";
import { Input } from "./ui/input";

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
                        <div className="flex flex-row items-center gap-2 text-sm">
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
"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { BellIcon, Search, Settings, Briefcase, Heart, LogOut } from "lucide-react";
import { useCompanyStore, useUserStore } from "@/app/store/userStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CompanyData, UserData } from "@/types/user/user.types";
import { useState, useEffect } from "react";
import { Notification } from "@/types/notifications/notification.types";

export default function Header() {
    const router = useRouter();
    const actualPath = usePathname();
    const headerPaths = ['/home', '/ofrecer-empleo', '/acerca-de'];
    const { user, clearUser } = useUserStore();
    const { company, clearCompany } = useCompanyStore();
    const loggedUser: UserData | CompanyData | null = user || company || null;
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/notify");
                const data = await response.json();
                setNotifications(data);
                const unread = data.filter((n: Notification) => !n.read).length;
                setUnreadCount(unread);
            } catch (error) {
                console.error("Error cargando notificaciones:", error);
            }
        };
        fetchNotifications();
    }, []);

    const logOut = () => {
        clearCompany();
        clearUser();
        router.push("/");
    }

    const handleFallbackAvatar = (user: UserData | CompanyData) => {
        if (user && user.nombre) {
            const names = user.nombre.split(" ");
            const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
            return initials;
        }
        return "";
    }

    const handleReadNotifications = (id: number) => {
        const updatedNotifications = notifications.map((notification) => {
            if (notification.id === id) {
                return { ...notification, read: true };
            }
            return notification;
        });
        setNotifications(updatedNotifications);
        setUnreadCount(updatedNotifications.filter((n: Notification) => !n.read).length);
    }

    const UserCircle = () => {
        return (
            <>
                {loggedUser ? (
                    <div className="flex flex-row border rounded-4xl p-3 items-center gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="relative hover:cursor-pointer">
                                        <BellIcon size={18} className="text-muted-foreground" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80">
                                    <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <DropdownMenuItem
                                                key={notification.id}
                                                className={`flex flex-col gap-1 p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                                onClick={() => { handleReadNotifications(notification.id) }}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className="font-semibold text-sm">{notification.title}</span>
                                                    {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                                                </div>
                                                <p className="text-xs text-gray-600">{notification.description}</p>
                                                <p className="text-xs text-gray-400">{notification.date}</p>
                                            </DropdownMenuItem>
                                        ))
                                    ) : (
                                        <DropdownMenuItem disabled>
                                            <span className="text-sm text-gray-500">No hay notificaciones</span>
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex flex-row items-center gap-2 text-sm hover:cursor-pointer">
                                    <span className="font-semibold">
                                        {loggedUser?.nombre}
                                    </span>
                                    <Avatar>
                                        <AvatarFallback className="p-3 bg-blue-200">
                                            {loggedUser && handleFallbackAvatar(loggedUser)}
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
                                {company ? (
                                    <DropdownMenuItem onClick={() => router.push("/jobs/my-jobs")} className="cursor-pointer">
                                        <Briefcase className="mr-2 h-4 w-4" />
                                        <span>Mis Convocatorias</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <>
                                        <DropdownMenuItem onClick={() => router.push("/postulations/postuled")} className="cursor-pointer">
                                            <Briefcase className="mr-2 h-4 w-4" />
                                            <span>Mis Postulaciones</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => router.push("/favorites")} className="cursor-pointer">
                                            <Heart className="mr-2 h-4 w-4" />
                                            <span>Favoritos</span>
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => logOut()}
                                    className="text-red-600 cursor-pointer">
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
                        {company &&
                            (<Button
                                variant="link"
                                className={`hover:cursor-pointer decoration-(--per-primary) ${actualPath === '/ofrecer-empleo' ? 'underline underline-offset-8' : ''}`}
                                onClick={() => router.push("/jobs/create")}
                            >
                                Ofrecer Empleo
                            </Button>)
                        }
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
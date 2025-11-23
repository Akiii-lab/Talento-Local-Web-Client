"use client";

import { BellIcon, CheckCheck, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types/notifications/notification.types";
import { useState, useEffect } from "react";
import { useCompanyStore, useUserStore } from "@/app/store/userStore";
import { toast } from "sonner";

function parseAdditionalData(datos: string | null): { key: string; value: string }[] {
    if (!datos || datos.trim() === "") return [];
    return datos.split('&').map(item => {
        const [key, value] = item.split(':').map(s => s.trim());
        return { key, value };
    });
}

function parseMessageData(mensaje: string): { main: string; details: string[] } {
    const parts = mensaje.split('&');
    const main = parts[0].trim();
    const details = parts.slice(1).map(p => p.trim()).filter(p => p.length > 0);
    return { main, details };
}

export function NotificationDropdown() {
    const { user } = useUserStore();
    const { company } = useCompanyStore();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const userType = user ? "user" : company ? "company" : null;
            const userId = user ? user.id : company ? company.id : null;
            const response = await fetch("/api/notify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: userId,
                    userType: userType
                }),
            });
            const data = await response.json();
            setNotifications(data.notifications);
            const unread = data.notifications.filter((n: Notification) => n.leida === "0").length;
            setUnreadCount(unread);
        } catch (error) {
            console.error("Error cargando notificaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleReadNotifications = async (id: string) => {
        try {
            const res = await fetch('/api/notify', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notificationid: id }),
            });
            if (res.status !== 200) {
                toast.error('Error al marcar la notificación como leída');
                throw new Error('Error al marcar la notificación como leída');
            }
            const updatedNotifications = notifications.map((notification) => {
                if (notification.id_notificacion === id) {
                    return { ...notification, leida: "1" };
                }
                return notification;
            });
            setNotifications(updatedNotifications);
            setUnreadCount(updatedNotifications.filter((n: Notification) => n.leida === "0").length);
        } catch (error) {
            console.error("Error al marcar la notificación como leída:", error);
        }
    }

    const handleReadAll = async () => {
        try {
            const res = await fetch('/api/notify', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: user ? user.id : company ? company.id : null }),
            });
            if (res.status !== 200) {
                toast.error('Error al marcar todas las notificaciones como leídas');
                throw new Error('Error al marcar todas las notificaciones como leídas');
            }
            const updatedNotifications = notifications.map((notification) => {
                return { ...notification, leida: "1" };
            });
            setNotifications(updatedNotifications);
            setUnreadCount(0);
        } catch (error) {
            console.error("Error al marcar todas las notificaciones como leídas:", error);
            toast.error('Error al marcar todas las notificaciones como leídas');
        }
    }

    const handleDeleteNotification = async (id: string) => {
        try {
            const res = await fetch('/api/notify', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notificationid: id }),
            });
            if (res.status !== 200) {
                toast.error('Error al eliminar la notificación');
                throw new Error('Error al eliminar la notificación');
            }
            const updatedNotifications = notifications.filter((notification) => notification.id_notificacion !== id);
            setNotifications(updatedNotifications);
            setUnreadCount(updatedNotifications.filter((n: Notification) => n.leida === "0").length);
        } catch (error) {
            console.error("Error al eliminar la notificación:", error);
            toast.error('Error al eliminar la notificación');
        }
    }

    return (
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
            <DropdownMenuContent align="end" className="w-96">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {unreadCount > 0 && (
                    <div className="px-2 py-1 mb-2">
                        <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-xs"
                            onClick={handleReadAll}
                        >
                            <CheckCheck size={14} className="mr-1" />
                            Marcar todas como leídas
                        </Button>
                    </div>
                )}
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                    notifications.map((notification) => {
                        const additionalData = parseAdditionalData(notification.datos_adicionales ? notification.datos_adicionales : null);
                        const messageData = parseMessageData(notification.mensaje);
                        return (
                            <DropdownMenuItem
                                key={notification.id_notificacion}
                                className={`flex flex-col gap-2 p-3 cursor-pointer ${notification.leida === "0" ? 'bg-blue-50' : ''}`}
                                onClick={() => { handleReadNotifications(notification.id_notificacion) }}
                            >
                                <div className="flex justify-between items-start">
                                    <span className="font-semibold text-sm">{notification.asunto}</span>
                                </div>
                                <p className="text-xs text-gray-600">{messageData.main}</p>

                                {messageData.details.length > 0 && (
                                    <div className="text-xs text-gray-500 space-y-1 mt-1">
                                        {messageData.details.map((detail, idx) => (
                                            <p key={idx} className="text-gray-500">• {detail}</p>
                                        ))}
                                    </div>
                                )}

                                {additionalData.length > 0 && (
                                    <div className="text-xs text-gray-500 bg-gray-100 rounded p-2 mt-1">
                                        {additionalData.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <span className="font-semibold capitalize">{item.key}:</span>
                                                <span>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className="text-xs text-gray-400">{new Date(notification.fecha_creacion).toISOString().split('T')[0]}</p>
                                <div className="flex items-center gap-2">
                                    {notification.leida === "0" && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteNotification(notification.id_notificacion);
                                        }}
                                        className="hover:text-red-600 hover:cursor-pointer transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </DropdownMenuItem>
                        );
                    })
                ) : (
                    <DropdownMenuItem disabled>
                        <span className="text-sm text-gray-500">No hay notificaciones</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

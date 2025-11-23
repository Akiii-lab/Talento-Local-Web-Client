import { GetNotificationsClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en ms
let cachedNotifications: { [key: string]: { data: any; timestamp: number } } = {};

export async function POST(req: NextRequest) {
    const { userid, userType } = await req.json();

    if(!userid || !userType){
        return new NextResponse("Faltan datos para procesar la solicitud", { status: 400 });
    }

    const cacheKey = `${userid}-${userType}`;
    const now = Date.now();

    // Validar si existe en cache y no ha expirado
    if (cachedNotifications[cacheKey] && (now - cachedNotifications[cacheKey].timestamp) < CACHE_DURATION) {
        return new NextResponse(JSON.stringify(cachedNotifications[cacheKey].data), {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=300',
                'X-Cache': 'HIT'
            }
        });
    }

    const api = GetNotificationsClient();
    /* ${api}/notificaciones/${userid}/${userType}/all */
    try {
        const response = await fetch(`${api}/notificaciones`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.status === 404){
            const data = {notifications:[], ok: true};
            cachedNotifications[cacheKey] = {
                data: data,
                timestamp: now
            };
            return new NextResponse(JSON.stringify(data), { 
                status: 200,
                headers: {
                    'X-Cache': 'MISS'
                }
            });
        }
        const userNotifys = await response.json();
        const data = { notifications: userNotifys, ok: true };
        
        cachedNotifications[cacheKey] = {
            data: data,
            timestamp: now
        };

        return new NextResponse(JSON.stringify(data), { 
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=300',
                'X-Cache': 'MISS'
            }
        });
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        return new NextResponse("Error al obtener las notificaciones", { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const { notificationid, userid } = await req.json();
    const api = GetNotificationsClient();
    try {
        if(userid){
            const response = await fetch(`${api}/notificaciones/usuario/${userid}/marcar-todas-leidas`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status !== 200) {
                throw new Error("Error al marcar todas las notificaciones como leídas");
            }
            return new NextResponse(JSON.stringify({ ok: true }), { status: 200 });
        } else if (notificationid) {
            const response = await fetch(`${api}/notificaciones/${notificationid}/marcar-leida`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status !== 200) {
                throw new Error("Error al marcar la notificación como leída");
            }
            return new NextResponse(JSON.stringify({ ok: true }), { status: 200 });
        }
        return new NextResponse("Faltan datos para procesar la solicitud", { status: 400 });
    } catch (error) {
        console.error("Error al actualizar la notificación:", error);
        return new NextResponse("Error al actualizar la notificación", { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { notificationid } = await req.json();
    const api = GetNotificationsClient();
    try {
        const response = await fetch(`${api}/notificaciones/${notificationid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            throw new Error("Error al eliminar la notificación");
        }
        return new NextResponse(JSON.stringify({ ok: true }), { status: 200 });
    } catch (error) {
        console.error("Error al eliminar la notificación:", error);
        return new NextResponse("Error al eliminar la notificación", { status: 500 });
    }
}
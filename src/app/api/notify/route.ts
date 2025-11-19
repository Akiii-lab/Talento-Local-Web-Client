//TODO: corresponde al grupo de eddie
export async function GET() {
    const userNotifys = [
        {
            id: 1,
            title: "Notificacion 1",
            description: "Descripcion de la notificacion 1",
            date: "2023-06-01",
            read: false,
        },
        {
            id: 2,
            title: "Notificacion 2",
            description: "Descripcion de la notificacion 2",
            date: "2023-06-02",
            read: true,
        },
    ];

    try {
        return new Response(JSON.stringify(userNotifys), { status: 200 });
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        return new Response("Error al obtener las notificaciones", { status: 500 });
    }
}
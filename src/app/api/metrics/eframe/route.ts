import { GetNotificationsClient } from "@/utils/clients";

export async function GET() {
    const api = GetNotificationsClient();

    const res = await fetch(`${api}/analytics/dashboard-url`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        return new Response(JSON.stringify({ error: "Error fetching dashboard URL" }), { status: res.status });
    }
    const data = await res.json();
    return new Response(JSON.stringify({ url: data.url }), { status: 200 });
}

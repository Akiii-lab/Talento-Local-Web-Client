import { GetGestionClient } from "@/utils/clients";
import { NextResponse } from "next/server";

export async function GET() {

    const api = GetGestionClient();

    const offers = await fetch(`${api}/offers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (offers.status !== 200) {
        return new NextResponse(JSON.stringify({ error: "Error fetching offers" }), { status: offers.status });
    }
    const response = await offers.json();
    return new NextResponse(JSON.stringify({ offers:response, ok: true }), { status: 200 });
}
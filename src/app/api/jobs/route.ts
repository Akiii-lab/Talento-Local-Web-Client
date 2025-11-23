import { GetGestionClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { offer } = await req.json();
    const api = GetGestionClient();
    if(!offer) {
        return new Response(JSON.stringify({ error: "No offer data provided", ok: false }), { status: 400 });
    }
    try {
        const response = await fetch(`${api}/offers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(offer),
        });

        if(response.status === 200 || response.status === 201) {
            const data = await response.json();
            return new NextResponse(JSON.stringify({ data:data, ok: true }), { status: 200 });
        }
        throw new Error();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error creating offer", error, ok: false }), { status: 500 });
    }
}
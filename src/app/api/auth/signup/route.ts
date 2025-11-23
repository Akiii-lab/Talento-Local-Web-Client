import { GetProfilesClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, email, password, address, type } = await req.json();
    const api = GetProfilesClient();
    const response = await fetch(`${api}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, address, type}),
    });

    if(response.status === 200) {
        const data = await response.json();
        return new NextResponse(JSON.stringify({ ...data, ok: true }), { status: 200 });
    }

    return new NextResponse(JSON.stringify({ error: "Error al registrar usuario", ok: false }), { status: response.status });
}
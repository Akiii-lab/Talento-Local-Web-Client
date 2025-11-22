import { GetProfilesClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    const api = GetProfilesClient();
    const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
        const data = await response.json();
        return new NextResponse(JSON.stringify({ ...data, ok: true }), { status: 200 });
    }
    if (response.status === 401) {
        return new NextResponse(JSON.stringify({ error: "Credenciales incorrectas", ok: false }), { status: 401 });
    }
    console.error("Error during login:", await response.text());
    return new NextResponse(JSON.stringify({ error: "Error al iniciar sesión", ok: false }), { status: 500 });
}
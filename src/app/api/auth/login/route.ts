import { GetProfilesClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    const api = GetProfilesClient();
    // Mocked response for testing purposes
    const mockedUser = {
        id: "ffd275b4-3c8e-4e2b-9c6d-1a2b3c4d5e6f",
        name: "Mocked User",
        email: "V0CwI@example.com",
        type: "user"
    }
    return new NextResponse(JSON.stringify({ user: mockedUser, type: "user", ok: true }), { status: 200 });

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
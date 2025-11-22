import { GetProfilesClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name, email, password, address, type } = await req.json();
    const api = GetProfilesClient();
    const response = await fetch(`${api}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, address, type}),
    });
    if(response.status === 200) {
        return new NextResponse(JSON.stringify({ message: "User created successfully", ok: true }), { status: 200 });
    }
    console.error("Error creating user:", await response.text());
    return new NextResponse(JSON.stringify({ message: "Error creating user", ok: false }), { status: 500 });
}
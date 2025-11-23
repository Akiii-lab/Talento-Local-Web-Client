import { GetProfilesClient } from "@/utils/clients";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const { id, name, email, address, type } = await req.json();
    const api = GetProfilesClient();
    const cookieStore = await cookies();
    try {
        const token = cookieStore.get("token")?.value;
        const response = await fetch(`${api}/api/v1/users/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, email, address, type }),
        });
        if(response.status === 200) {
            const data = await response.json();
            return new NextResponse(JSON.stringify({ user: data, ok: true }), { status: 200 });
        }
        return new NextResponse(JSON.stringify({ error: "Error updating user", ok: false }), { status: response.status });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error updating user", ok: false }), { status: 500 });
    }
}

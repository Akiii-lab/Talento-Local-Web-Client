import { GetGestionClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    if (!userId) {
        return new Response(JSON.stringify({ message: "User ID is required" }), { status: 400 });
    }

    try {
        const api = GetGestionClient();
        
        const response = await fetch(`${api}/postulations/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.status === 404) {
            return new NextResponse(JSON.stringify({ postulations: [], ok: true }), { status: 200 });
        }

        const postuledJobs = await response.json();
        if (response.status === 200) {
            return new NextResponse(JSON.stringify({ postulations: postuledJobs, ok: true }), { status: 200 });
        }
        else {
            throw new Error();
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error fetching postulations", error, ok: false }), { status: 500 });
    }
}
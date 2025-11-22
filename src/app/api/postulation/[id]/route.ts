import { GetGestionClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    if (!userId) {
        return new Response (JSON.stringify({message: "User ID is required"}), {status: 400});
    }

    try {
        const api = GetGestionClient();
        const response = await fetch(`${api}/postulations/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 400) {
            return new NextResponse(JSON.stringify({ postulations: [], message: "No postulations found for this user", ok: false }), { status: 200 });
        }

        console.log("Fetching postulations for user ID:", userId);
        if (response.status !== 200) {
            return new NextResponse(JSON.stringify({ postulations: [], error: "Error fetching postulations", ok: false }), { status: response.status });
        }
        const postuledJobs = await response.json();
        return new NextResponse(JSON.stringify({ postulations: postuledJobs, ok: true }), {status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error fetching postulations", error, ok: false }), { status: 500 });
    }
}
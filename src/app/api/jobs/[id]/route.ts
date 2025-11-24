import { GetGestionClient } from "@/utils/clients";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const api = GetGestionClient();
    try {
        const res = await fetch(`${api}/offers/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(res.status === 404) {
            return new Response(JSON.stringify({ jobs: [], ok: true }), { status: 200 });
        }
        if(res.status !== 200) {
            throw new Error();
        }
        const jobs = await res.json();
        return new Response(JSON.stringify({ jobs: jobs, ok: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error fetching jobs", error, ok: false }), { status: 500 });
    }
}
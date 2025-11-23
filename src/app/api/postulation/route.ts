import { GetGestionClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { UserId, OfferId } = await req.json();
    const api = GetGestionClient();
    try {
        const response = await fetch(`${api}/postulations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ UserId, OfferId }),
        });

        if(response.status === 200) {
            const data = await response.json();
            return new NextResponse(JSON.stringify({ data:data, ok: true }), { status: 200 });
        }
        console.log(response)
        throw new Error();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error creating postulation", error, ok: false }), { status: 500 });
    }
}
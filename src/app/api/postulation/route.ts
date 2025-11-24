import { GetGestionClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const api = GetGestionClient();
    try {
        const response = await fetch(`${api}/postulations`, {
            method: "POST",
            body: formData,
        });

        if(response.status === 200 || response.status === 201) {
            const data = await response.json();
            return new NextResponse(JSON.stringify({ data: data, ok: true }), { status: 200 });
        }
        throw new Error();
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Error creating postulation", error, ok: false }), { status: 500 });
    }
}
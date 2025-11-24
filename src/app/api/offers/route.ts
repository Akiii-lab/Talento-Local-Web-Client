import { GetGestionClient } from "@/utils/clients";
import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { data: any; timestamp: number }>();

export async function POST(req: NextRequest) {
    const { userid } = await req.json();
    const api = GetGestionClient();
    if(!userid){
        return new NextResponse("Faltan datos para procesar la solicitud", { status: 400 });
    }

    const offers = await fetch(`${api}/offers/user/${userid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log("Response status fetching offers:", offers.status);
    if (offers.status !== 200) {
        return new NextResponse(JSON.stringify({ error: "Error fetching offers" }), { status: offers.status });
    }
    const response = await offers.json();
    return new NextResponse(JSON.stringify({ offers:response, ok: true }), { status: 200 });
}

export async function GET() {

    const api = GetGestionClient();
    
    const cacheKey = 'all_offers';
    const cacheDuration = 5 * 60 * 1000; // 5 minutos
    
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheDuration) {
        return new NextResponse(JSON.stringify({ offers: cached.data, ok: true }), { 
            status: 200,
            headers: { 'X-Cache': 'HIT' }
        });
    }

    const offers = await fetch(`${api}/offers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (offers.status !== 200) {
        return new NextResponse(JSON.stringify({ error: "Error fetching offers" }), { status: offers.status });
    }
    const response = await offers.json();
    
    cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
    });
    
    return new NextResponse(JSON.stringify({ offers: response, ok: true }), { 
        status: 200,
        headers: { 'X-Cache': 'MISS' }
    });
}
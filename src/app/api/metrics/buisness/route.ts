import { GetNotificationsClient } from "@/utils/clients";
import { NextResponse } from "next/server";

const CACHE_DURATION = 5 * 60 * 60 * 1000; // 5 horas en ms
const CACHE_KEY = "metrics-business";
let cachedMetrics: { data: any; timestamp: number } | null = null;

export async function GET() {
    const now = Date.now();

    // Validar si existe en cache y no ha expirado
    if (cachedMetrics && (now - cachedMetrics.timestamp) < CACHE_DURATION) {
        return new NextResponse(JSON.stringify(cachedMetrics.data), {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=18000, stale-while-revalidate=3600',
                'X-Cache': 'HIT'
            }
        });
    }

    const api = GetNotificationsClient();

    const metrics = {
        jobsPosted: 0,
        activeCompanies: 0,
        registeredUsers: 0,
    };

    try {
        const jobsPostedResponse = await fetch(`${api}/analytics/empleos-publicados`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const jobsPostedData = await jobsPostedResponse.json();
        metrics.jobsPosted = jobsPostedData.cantidad;

        const activeCompaniesResponse = await fetch(`${api}/analytics/cant-empresas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const activeCompaniesData = await activeCompaniesResponse.json();
        metrics.activeCompanies = activeCompaniesData.cantidad;

        const registeredUsersResponse = await fetch(`${api}/analytics/cant-usuarios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const registeredUsersData = await registeredUsersResponse.json();
        metrics.registeredUsers = registeredUsersData.cantidad;

        cachedMetrics = {
            data: metrics,
            timestamp: now
        };

        return new NextResponse(JSON.stringify(metrics), {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=18000, stale-while-revalidate=3600',
                'X-Cache': 'MISS'
            }
        });
    } catch (error) {
        console.error('Error fetching metrics:', error);
        
        if (cachedMetrics) {
            return new NextResponse(JSON.stringify(cachedMetrics.data), {
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=300',
                    'X-Cache': 'STALE'
                }
            });
        }

        return new NextResponse(JSON.stringify({ error: 'Error fetching metrics' }), {
            status: 500
        });
    }
}
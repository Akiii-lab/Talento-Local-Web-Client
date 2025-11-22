import { GetNotificationsClient } from "@/utils/clients";
import { NextResponse } from "next/server";

export async function GET() {

    const api = GetNotificationsClient();

    const metrics = {
        jobsPosted: 0,
        activeCompanies: 0,
        registeredUsers: 0,
    };

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

    return new NextResponse(JSON.stringify(metrics), {status: 200});
}
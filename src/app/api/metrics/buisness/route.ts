
//TODO: corresponde al equipo de eddie.
export async function GET() {
    const metrics = {
        jobsPosted: 2500,
        activeCompanies: 1200,
        registeredUsers: 8000,
    };

    return new Response(JSON.stringify(metrics), {status: 200});
}
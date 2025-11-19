import { NextRequest } from "next/server";

//TODO: toca al grupo de carlos romero, etc.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    if (!userId) {
        return new Response (JSON.stringify({message: "User ID is required"}), {status: 400});
    }

    const postuledJobs = [
        {
            id: "1",
            offerId: 1,
            userId: "user123",
            applyed: true,
            statusId: "En revisión"
        },
        {
            id: "2",
            offerId: 2,
            userId: "user123",
            applyed: true,
            statusId: "En revisión"
        },
        {
            id: "3",
            offerId: 3,
            userId: "user123",
            applyed: false,
            statusId: "Pendiente"
        }
    ]
    
    return new Response (JSON.stringify(postuledJobs), {status: 200});
}
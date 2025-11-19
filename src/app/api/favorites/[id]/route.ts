import { NextRequest } from "next/server";

//TODO: toca al grupo de carlos romero, etc.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: userId } = await params;

    if (!userId) {
        return new Response(JSON.stringify({ message: "User ID is required" }), { status: 400 });
    }

    // Mock data: lista de IDs de ofertas que el usuario tiene en favoritos
    const favoriteOfferIds = [1, 2, 4];

    return new Response(JSON.stringify(favoriteOfferIds), { status: 200 });
}

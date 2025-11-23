import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const res = new NextResponse(JSON.stringify({ message: "Logged out successfully", ok: true }), { status: 200 });
    res.cookies.set("token", "", { httpOnly: true, path: '/', maxAge: 0 });
    return res;
}
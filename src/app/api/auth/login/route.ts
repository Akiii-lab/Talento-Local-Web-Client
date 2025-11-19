import { CompanyData, UserData } from "@/types/user/user.types";
import { NextRequest } from "next/server";

//TODO: corresponde al grupo de benavides
export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    const mockUser: UserData = {
        id: 1,
        nombre: "Juan Perez",
        email: "example@gmail.com",
        telefono: "1234567890",
        ubicacion: "Ciudad Ejemplo",
        bio: "Desarrollador apasionado por la tecnología.",
        habilidades: "JavaScript, React, Node.js",
    };

    const mockCompany: CompanyData = {
        id: 1,
        nombre: "Tech Solutions",
        nit: "900123456-7",
        email: "example@gmail.com",
        telefono: "1234567890",
        ubicacion: "Ciudad Ejemplo",
        descripcion: "Empresa de desarrollo de software especializada en soluciones web y móviles.",
        sector: "Tecnología",
        sitioWeb: "https://www.techsolutions.com",
    };

    if (email === mockUser.email && password === "password123") {
        return new Response(JSON.stringify({ user: mockUser , type: "user"}), { status: 200 });
    }

    if (email === mockCompany.email && password === "password321") {
        return new Response(JSON.stringify({ user: mockCompany , type: "company"}), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Credenciales incorrectas" }), { status: 401 });
}
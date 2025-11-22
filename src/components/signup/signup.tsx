"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader, Eye, EyeOff } from "lucide-react";


export const SignupComponent = () => {
    const singupform = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState<"user" | "company">("user");

    const validateForm = (): boolean => {
        const { username, email, password, confirmPassword, address } = singupform.getValues();

        const validations = [
            { condition: !username, message: "Nombre de usuario es requerido" },
            { condition: !email, message: "Email es requerido" },
            { condition: !password, message: "Contraseña es requerida" },
            { condition: !address, message: "Dirección es requerida" },
            { condition: password !== confirmPassword, message: "Las contraseñas no coinciden" },
            { condition: !userType, message: "Debes seleccionar un tipo de cuenta" },
        ];

        for (const { condition, message } of validations) {
            if (condition) {
                toast.error(message);
                return false;
            }
        }
        return true;
    };

    const handleSignup = async () => {
        try {
            setLoading(true);
            if (!validateForm()) return;
            const { username, email, password, address } = singupform.getValues();
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    address,
                    type: userType
                }),
            });

            const data = await res.json();
            if (data.ok) {
                toast.success("Usuario registrado exitosamente");
                router.push('/login');
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Error al registrar el usuario. Por favor, intenta de nuevo.");
            console.error("Signup error:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex p-8 gap-4 w-sm items-center justify-center">
                <Loader className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col border shadow-2xl rounded-lg p-8 gap-4 w-sm">
            <div className='items-center justify-center flex'>
                <Image
                    src="/talentologo.png"
                    alt="Logo"
                    width={150}
                    height={150}
                    className='hover:cursor-pointer'
                    onClick={() => router.push("/")}
                />
            </div>
            <Form {...singupform}>
                <FormField
                    control={singupform.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu email" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={singupform.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu nombre" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={singupform.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ingresa tu contraseña"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={singupform.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Contraseña</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirma tu contraseña"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={singupform.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu dirección" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={singupform.control}
                    name="userType"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex flex-col gap-1">
                                    <FormLabel>Tipo de Cuenta</FormLabel>
                                    <span className="text-sm text-gray-500">
                                        {userType === "user" ? "Candidato" : "Empresa"}
                                    </span>
                                </div>
                                <Switch
                                    checked={userType === "company"}
                                    onCheckedChange={(checked) => setUserType(checked ? "company" : "user")}
                                />
                            </div>
                        </FormItem>
                    )}
                />
            </Form>
            <Button onClick={handleSignup}>
                Registrarse
            </Button>
            <div className='text-sm flex items-center justify-start gap-1 hover:cursor-pointer'>
                <span>
                    ya tienes cuenta?
                </span>
                <span className='font-medium text-(--per-primary) underline hover:text-(--per-secondary)'
                    onClick={() => router.push('/login')}>
                    Ingresa
                </span>
            </div>
        </div>
    );
}
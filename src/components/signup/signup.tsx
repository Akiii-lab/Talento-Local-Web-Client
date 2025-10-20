"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


export const SignupComponent = () => {
    const singupform = useForm();
    const router = useRouter();

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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingresa tu contraseña" {...field} />
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
                                <Input placeholder="Confirma tu contraseña" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </Form>
            <Button disabled>
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
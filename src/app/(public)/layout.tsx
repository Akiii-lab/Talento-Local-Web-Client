import Header from "@/components/header";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen">
            <Header />
            {children}
        </div>
    );
}
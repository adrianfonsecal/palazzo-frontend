import Navbar from "@/components/sections/nav-bar";
import Footer from "@/components/sections/footer";
import { cookies } from 'next/headers';

export default async function DashboardLayout({ children }) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('access_token');
    const user = sessionCookie ? { name: 'Admin' } : null;

    return (
        <>
            <Navbar user={user} />
            <div className="min-h-screen w-full">
                {children}
            </div>
            <Footer />
        </>
    );
}
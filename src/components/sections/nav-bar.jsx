'use client'
import Image from 'next/image'
import logo from '../../../public/WebsiteLogoDark.png';
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';

export default function Navbar({ user }) {
    const router = useRouter();
    const handleLogout = () => {
        removeToken();
        router.push('/login');
        router.refresh();
    };
    const isLoggedIn = !!user; // Convierte a booleano
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="bg-carbonblack text-white w-full z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">

                        <Link href="/" className="shrink-0 flex items-center gap-2 cursor-pointer">
                            <Image src={logo} alt="Palazzo Invites Logo" className='website-logo w-auto h-auto' />
                        </Link>


                        <div className="hidden md:flex space-x-8 items-center">
                            <Link href="#beneficios" className="hover:text-coolsteel transition-colors uppercase text-xs tracking-widest">Home</Link>
                            <Link href="#paquetes" className="hover:text-coolsteel transition-colors uppercase text-xs tracking-widest">Contacto</Link>
                            {/* Lógica condicional basada en la prop */}
                            {
                                isLoggedIn ? (
                                    <button onClick={handleLogout} className="btn-primary px-5 py-2 rounded-full uppercase text-xs tracking-widest font-bold">
                                        Cerrar Sesión
                                    </button>

                                ) : (
                                    <>

                                        <Link href="/login" className="btn-primary px-5 py-2 rounded-full uppercase text-xs tracking-widest font-bold">
                                            Iniciar Sesión
                                        </Link>
                                    </>

                                )}
                        </div>


                        <div className="md:hidden flex items-center">
                            <button id="mobile-menu-btn" className="text-white hover:text-coolsteel focus:outline-none">
                                <i className="fa-solid fa-bars text-2xl"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="mobile-menu" className={`md:hidden bg-sand ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        <Link href="#beneficios" className="block px-3 py-2 text-base font-medium text-white hover:bg-carbonblack">Home</Link>
                        <Link href="#paquetes" className="block px-3 py-2 text-base font-medium text-white hover:bg-carbonblack">Contacto</Link>
                        {
                            isLoggedIn ? (
                                <button onClick={handleLogout} className="btn-primary px-5 py-2 rounded-full uppercase text-xs tracking-widest font-bold">
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <Link href="/login" className="block px-3 py-2 text-base font-medium text-white hover:bg-carbonblack">Iniciar Sesión</Link>
                            )
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

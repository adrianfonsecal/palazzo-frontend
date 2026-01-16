'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';
import { setToken } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import loginDecor from '@/assets/images/photo-decor-1.png';


export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await login(username, password);
            setToken(data.access);
            router.push('/dashboard');
            router.refresh(); // Actualiza los componentes de servidor (El Layout vuelve a checar la cookie)
        } catch (err) {
            console.log('Login error:', err.response.data);
            setError('Credenciales inválidas. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Image src={loginDecor} alt="Login Decoration" fill className="object-cover" />

                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 w-full">
                    <div className="max-w-xl">
                        <h2 className="text-5xl font-bold mb-6">
                            Palazzo Invites
                        </h2>
                        <div className={`px-8 py-4 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000`}>   
                        
                            <p className="text-xl text-gray-200 leading-relaxed">
                                Gestiona tus eventos de manera profesional. Crea invitaciones elegantes, 
                                administra tus invitados y haz de cada celebración un momento inolvidable.
                            </p>
                        </div>
                        <div className="mt-12 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-lg">Diseños elegantes y personalizables</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-lg">Gestión completa de invitados</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-lg">RSVP en tiempo real</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative pattern */}
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Iniciar Sesión
                        </h1>
                        <p className="text-gray-600">
                            Ingresa tus credenciales para acceder al CRM
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Usuario
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 transition"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'Entrando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link 
                                href="/register"
                                className="text-slate-900 font-semibold hover:text-slate-700 transition"
                            >
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            Al iniciar sesión, aceptas nuestros Términos de Servicio y Política de Privacidad
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
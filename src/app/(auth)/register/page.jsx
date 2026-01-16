'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';
import { createUser, login } from '@/lib/api'; 
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import registerDecor from '@/assets/images/register-decor.png';


export default function RegisterPage() {
    const router = useRouter();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [slug, setSlug] = useState(''); // Necesario para encontrar la boda
    const [claimCode, setClaimCode] = useState('');
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            setLoading(false);
            return;
        }

        try {
            await createUser({
                username,
                email,
                password,
                slug,       // El identificador de la boda (ej: juan-y-maria)
                claim_code: claimCode
            });

            // Si el registro es exitoso, hacemos login automático para obtener el token
            const data = await login(username, password);
            setToken(data.access); // O data.token según tu backend
            
            router.push('/dashboard');
            router.refresh(); 

        } catch (err) {
            console.log('Register error:', err);
            // Intentamos mostrar el error específico del backend si existe
            const errorMsg = err.response?.data?.error || err.response?.data?.detail || 'Error al registrarse. Verifica el código o el slug.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image/Brand Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Image src={registerDecor} alt="Register Decoration" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 w-full">
                    <div className="max-w-xl">
                        <h2 className="text-5xl font-bold mb-6">
                            Comienza tu Historia
                        </h2>
                        <div className={`px-8 py-4 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000 mb-12`}>
                        
                            <p className="text-xl text-gray-200 leading-relaxed ">
                                Registra tu boda y comienza a gestionar cada detalle de tu evento especial. 
                                Obtén acceso completo a todas las herramientas que necesitas.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <span className="text-lg">Gestión completa de invitados</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <span className="text-lg">Invitaciones digitales personalizadas</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-all duration-1000">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span className="text-lg">Seguimiento de confirmaciones en tiempo real</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative pattern */}
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            Reclamar mi Boda
                        </h1>
                        <p className="text-gray-600">
                            Crea tu cuenta y comienza a gestionar tu evento
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* USUARIO */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 transition"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Tu nombre de usuario"
                                required
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>

                        {/* CONTRASEÑA */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 pr-12 transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* CONFIRMAR CONTRASEÑA */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar contraseña</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 pr-12 transition ${
                                        confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden</p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-4 font-medium">
                                Datos proporcionados por tu Wedding Planner
                            </p>
                            
                            {/* SLUG (IDENTIFICADOR) */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">ID de la Boda (Slug)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 transition"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="Ej: juan-y-maria"
                                    required
                                />
                            </div>

                            {/* CLAIM CODE */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Código de Reclamación</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-slate-900 tracking-widest font-mono transition"
                                    value={claimCode}
                                    onChange={(e) => setClaimCode(e.target.value)}
                                    placeholder="CÓDIGO"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg hover:bg-slate-800 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                        >
                            {loading ? 'Validando...' : 'Reclamar Boda y Registrarse'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            ¿Ya tienes cuenta?{' '}
                            <a href="/login" className="text-slate-900 font-semibold hover:text-slate-700 transition">
                                Iniciar Sesión
                            </a>
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
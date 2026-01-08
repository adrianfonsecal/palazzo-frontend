'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth';
import { createUser, login } from '@/lib/api'; 
import { Eye, EyeOff } from 'lucide-react';


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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">
                    Reclamar mi Boda
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* USUARIO */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Tu nombre de usuario"
                            required
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // CORREGIDO (antes setUsername)
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>

                    {/* CONTRASEÑA */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Cambio dinámico
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* CONFIRMAR CONTRASEÑA */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700 pr-10 ${
                                    confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} // CORREGIDO (antes setPassword)
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                         {confirmPassword && password !== confirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Las contraseñas no coinciden</p>
                        )}
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-3 text-center">
                            Datos proporcionados por tu Wedding Planner
                        </p>
                        
                        {/* SLUG (IDENTIFICADOR) */}
                        <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">ID de la Boda (Slug)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="Ej: juan-y-maria"
                                required
                            />
                        </div>

                        {/* CLAIM CODE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Código de Reclamación</label>
                            <input
                                type="text" // Cambiado a text por si usas letras y números
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700 tracking-widest font-mono"
                                value={claimCode}
                                onChange={(e) => setClaimCode(e.target.value)} // CORREGIDO
                                placeholder="CÓDIGO"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition disabled:opacity-50 mt-4"
                    >
                        {loading ? 'Validando...' : 'Reclamar Boda y Registrarse'}
                    </button>
                    
                    <div className="text-center text-sm mt-4">
                        <span className="text-gray-500">¿Ya tienes cuenta? </span>
                        <a href="/login" className="text-slate-900 font-semibold hover:underline">
                            Iniciar Sesión
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyInvitations } from '@/lib/api';
import { removeToken } from '@/lib/auth';
import GuestsPage from '../guests/page';

export default function DashboardPage() {
    const router = useRouter();
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para cerrar sesión
    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMyInvitations();
                setInvitations(data);
            } catch (error) {
                console.error("Error cargando invitaciones", error);
                // Si falla (ej. token expirado), podrías redirigir al login
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Cargando tu boda...</div>;
    }

    // Cálculos simples para las estadísticas
    const totalInvitations = invitations.length;
    const confirmed = invitations.filter(i => i.status === 'COMPLETED' || i.status === 'confirmed').length; // Ajusta según tus status

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar Simple */}
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-slate-800">Palazzo Invites</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                    Cerrar Sesión
                </button>
            </nav>

            <main className="max-w-7xl mx-auto p-6">

                {/* Tarjetas de Resumen */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Total Familias</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-2">{totalInvitations}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Confirmados</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">{confirmed}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium uppercase">Pendientes</h3>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">{totalInvitations - confirmed}</p>
                    </div>
                </div>

                {/* Tabla de Invitados (Versión simple) */}
                <GuestsPage />
            </main>
        </div>
    );
}
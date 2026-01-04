'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyInvitations } from '@/lib/api';
import { removeToken } from '@/lib/auth';

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
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">Lista de Invitados</h2>
                        <button className="bg-slate-900 text-white px-4 py-2 rounded text-sm hover:bg-slate-800">
                            + Nueva Invitación
                        </button>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Familia</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                            invitations.map((inv) => (
                                <tr key={inv.uuid}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                        {inv.family_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {/* Asumiendo que el serializer retorna phone_number, si no, hay que agregarlo al InvitationAdminSerializer */}
                                        {inv.phone_number || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${
                                                    inv.status === 'SENT' ? 'bg-blue-100 text-blue-800' :
                                                    inv.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline">
                                        <a href={`/invitacion/${inv.uuid}`} target="_blank" rel="noreferrer">
                                            Ver Invitación
                                        </a>
                                    </td>
                                </tr>
                            )
                        )
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
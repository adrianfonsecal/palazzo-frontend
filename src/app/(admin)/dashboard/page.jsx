'use client';

import { useEffect, useState } from 'react';
import { getAllInvitations, getAllGuests } from '@/lib/api';
import GuestsPage from '../guests/page';
import { useRouter } from 'next/navigation';



export default function DashboardPage() {
    const [families, setFamilies] = useState([]);
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
        
    useEffect(() => {
        const fetchData = async () => {
            try {
                const familiesData = await getAllInvitations();
                setFamilies(familiesData);
                const guestsData = await getAllGuests();
                setGuests(guestsData);
            } catch (error) {
                console.error("Error cargando invitaciones", error);
                router.push('/login');
                router.refresh();
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Cargando tu boda...</div>;
    }

    const totalFamilies = families.length;
    const totalGuests = guests.length;
    const totalInvitations = totalGuests + totalFamilies;
    const confirmed = guests.filter(i => i.attendance === 'ACCEPTED').length;

    return (
        <>
            <div className="min-h-screen bg-gray-50">

                <main className="max-w-7xl mx-auto p-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Familias</h3>
                            <p className="text-3xl font-bold text-slate-900 mt-2">{totalFamilies}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Invitados</h3>
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

                    <GuestsPage />
                </main>
            </div>
        </>
    );
}
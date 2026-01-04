'use client';

import { useState } from 'react';
import { createInvitation } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function CreateInvitationForm({ onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Estado del formulario
    const [formData, setFormData] = useState({
        family_name: '',
        phone_number: '',
        email: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createInvitation(formData);
            // Limpiamos el form
            setFormData({ family_name: '', phone_number: '', email: '' });
            onSuccess(); // Avisamos al padre que terminamos
        } catch (err) {
            console.error(err);
            setError('Error al crear la invitación. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre de la Familia <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    required
                    placeholder="Ej: Familia Pérez López"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    value={formData.family_name}
                    onChange={(e) => setFormData({ ...formData, family_name: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Teléfono (WhatsApp)
                </label>
                <input
                    type="tel"
                    placeholder="Ej: +52 55 1234 5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Necesario para enviar la invitación por WhatsApp.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email (Opcional)
                </label>
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white py-2 rounded font-medium hover:bg-slate-800 transition disabled:opacity-50"
                >
                    {loading ? 'Creando...' : 'Crear Invitación'}
                </button>
            </div>
        </form>
    );
}
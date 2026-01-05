'use client';

import { useEffect, useState } from 'react';
import { getAllInvitations } from '@/lib/api';
import { getColumns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Plus, Download } from 'lucide-react';
import Modal from '@/components/ui/modal';
import ManageGuestsModal from '@/components/modals/manage-guests-modal';
import CreateInvitationForm from '@/components/forms/create-invitation-form';

export default function GuestsPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedInvitation, setSelectedInvitation] = useState(null);
    const [isManageOpen, setIsManageOpen] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const result = await getAllInvitations();
            setData(result);
        } catch (error) {
            console.error("Error fetching guests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSuccessCreate = () => {
        setIsModalOpen(false);
        loadData();
    };

    const handleEdit = (invitation) => {
        setSelectedInvitation(invitation);
        setIsManageOpen(true);
    };

    const columns = getColumns(handleEdit);

    const handleCloseManage = () => {
        setIsManageOpen(false);
        setSelectedInvitation(null);
        loadData();
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-100">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Invitados</h1>
                    <p className="text-slate-500 mt-1">
                        Gestiona tu lista de invitados y monitorea sus confirmaciones.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 font-medium text-sm transition shadow-sm">
                        <Download size={16} />
                        Exportar CSV
                    </button>

                    {/* CONECTAMOS EL BOTÓN DE APERTURA */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 font-medium text-sm transition shadow-sm"
                    >
                        <Plus size={16} />
                        Nueva Invitación
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64 bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-slate-400 animate-pulse">Cargando lista...</p>
                </div>
            ) : (
                <DataTable columns={columns} data={data} />
            )}

            {/* RENDERIZAMOS EL MODAL */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Agregar Nueva Familia"
            >
                <CreateInvitationForm onSuccess={handleSuccessCreate} />
            </Modal>
            {
                selectedInvitation && (
                    <ManageGuestsModal
                        isOpen={isManageOpen}
                        onClose={handleCloseManage}
                        invitation={selectedInvitation}
                        onUpdate={loadData} // Recargar data si agregaron guests
                    />
                )
            }

        </div>
    );
}
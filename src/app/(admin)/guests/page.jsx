'use client';

import { useEffect, useState } from 'react';
import { deleteAllInvitations, getAllInvitations, sendWhatsappInvitation } from '@/lib/api';
import { getColumns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Plus, Upload, MessageCircle, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/modal';
import ManageGuestsModal from '@/components/modals/manage-guests-modal';
import CreateInvitationForm from '@/components/forms/create-invitation-form';
import { importGuestsCSV } from '@/lib/api'; // <--- Importamos la función nueva
import UpdateInvitationForm from '@/components/forms/update-invitation-form';

export default function GuestsPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isManageOpen, setIsManageOpen] = useState(false);

    const [selectedInvitationAdd, setSelectedInvitationAdd] = useState(null);
    const [selectedInvitationEdit, setSelectedInvitationEdit] = useState(null);

    const [isImporting, setIsImporting] = useState(false);

    const [rowSelection, setRowSelection] = useState({});
    const [isSending, setIsSending] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

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
        setIsCreateOpen(false); // Cerramos el de crear
        loadData();
    };

    const handleSuccessUpdate = () => {
        setIsEditOpen(false);   // Cerramos el de editar
        setSelectedInvitationEdit(null); // Limpiamos la selección
        loadData();
    };

    const handleEdit = (invitation) => {
        setSelectedInvitationEdit(invitation);
        setIsEditOpen(true); // <--- CORREGIDO: Usamos el setter correcto
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setSelectedInvitationEdit(null);
    };


    const handleAdd = (invitation) => {
        setSelectedInvitationAdd(invitation);
        setIsManageOpen(true);
    };

    const columns = getColumns(handleAdd, handleEdit);

    const handleCloseManage = () => {
        setIsManageOpen(false);
        setSelectedInvitationAdd(null);
        loadData();
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validaciones básicas de frontend
        const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.csv')) {
            alert("Por favor sube un archivo CSV o Excel válido.");
            return;
        }

        setIsImporting(true);
        try {
            await importGuestsCSV(file);

            // Éxito
            alert("Importación iniciada. Los invitados aparecerán en breve.");
            // Opcional: toast.success("Importación en proceso...");

            // Limpiamos el input para permitir subir el mismo archivo si es necesario corregirlo
            e.target.value = null;

            // Recargamos los datos (aunque como es asíncrono, puede que tarden unos segundos en aparecer)
            setTimeout(() => loadData(), 2000);

        } catch (error) {
            console.error("Error importando:", error);
            alert("Hubo un error al subir el archivo.");
        } finally {
            setIsImporting(false);
        }
    };

    const handleSendBlast = async () => {
        const selectedUuids = Object.keys(rowSelection);

        if (selectedUuids.length === 0) return;

        const confirm = window.confirm(`¿Estás seguro de enviar WhatsApps a ${selectedUuids.length} familias?`);
        if (!confirm) return;

        setIsSending(true);
        try {
            await sendWhatsappInvitation(selectedUuids);
            alert("Mensajes enviados a la cola de procesamiento.");

            setRowSelection({});
            loadData();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al enviar los mensajes.");
        } finally {
            setIsSending(false);
        }
    };

    const handleBulkDelete = async () => {
        const selectedUuids = Object.keys(rowSelection);
        if (selectedUuids.length === 0) return;

        const confirmMessage = selectedCount === 1
            ? "¿Estás seguro de eliminar esta invitación? Se borrarán también sus invitados."
            : `¿Estás seguro de eliminar las ${selectedCount} invitaciones seleccionadas? Esta acción no se puede deshacer.`;

        if (!window.confirm(confirmMessage)) return;

        setIsDeleting(true);
        try {
            await deleteAllInvitations(selectedUuids);

            // Éxito
            alert(`Se eliminaron ${selectedCount} registros correctamente.`);
            setRowSelection({}); // Limpiamos la selección
            loadData(); // Recargamos la tabla
        } catch (error) {
            console.error(error);
            alert("Hubo un error al intentar eliminar los registros.");
        } finally {
            setIsDeleting(false);
        }
    };

    const selectedCount = Object.keys(rowSelection).length;
    const isSelectionActive = selectedCount > 0;
    const clearSelection = () => setRowSelection({});

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-100">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 h-16">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Invitados</h1>
                    <p className="text-slate-500 mt-1">
                        {isSelectionActive
                            ? `${selectedCount} seleccionados`
                            : "Gestiona tu lista de invitados y monitorea sus confirmaciones."}
                    </p>
                </div>

                {isSelectionActive ? (
                    <>
                        <button
                            onClick={clearSelection}
                            className="text-slate-500 hover:text-slate-700 text-sm font-medium mr-2"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleBulkDelete}
                            disabled={isDeleting}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-md hover:bg-red-200 font-medium text-sm transition shadow-sm disabled:opacity-50"
                        >
                            {isDeleting ? <span className="animate-spin">⏳</span> : <Trash2 size={16} />}
                            Borrar ({selectedCount})
                        </button>

                        <button
                            onClick={handleSendBlast}
                            disabled={isSending}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium text-sm transition shadow-sm disabled:opacity-50"
                        >
                            {isSending ? <span className="animate-spin">⏳</span> : <MessageCircle size={16} />}
                            Enviar WhatsApp
                        </button>
                    </>
                ) : (
                    <>
                        <label
                            htmlFor="fileUpload"
                            className={`flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 font-medium text-sm transition shadow-sm cursor-pointer hover:bg-slate-50 ${isImporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isImporting ? <span className="animate-spin">⏳</span> : <Upload size={16} />}
                            {isImporting ? 'Procesando...' : 'Importar CSV'}
                        </label>

                        <input
                            type="file"
                            id="fileUpload"
                            accept=".csv, .xls, .xlsx"
                            onChange={handleFileUpload}
                            disabled={isImporting}
                            className="hidden"
                        />

                        <button
                            onClick={() => setIsCreateOpen(true)} // <--- CORREGIDO
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 font-medium text-sm transition shadow-sm"
                        >
                            <Plus size={16} /> Nueva Invitación
                        </button>
                    </>
                )}


            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64 bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-slate-400 animate-pulse">Cargando lista...</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={data}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            )}

            {/* RENDERIZAMOS EL MODAL */}
            <Modal
                isOpen={isCreateOpen} // <--- Variable dedicada
                onClose={() => setIsCreateOpen(false)}
                title="Agregar Nueva Familia"
            >
                <CreateInvitationForm onSuccess={handleSuccessCreate} />
            </Modal>

            {selectedInvitationEdit && (
                <Modal
                    isOpen={isEditOpen} 
                    onClose={handleCloseEdit}
                    title="Actualizar Invitación"
                >
                    <UpdateInvitationForm 
                        onSuccess={handleSuccessUpdate} 
                        data={selectedInvitationEdit} 
                    />
                </Modal>
            )}
            {
                selectedInvitationAdd && (
                    <ManageGuestsModal
                        isOpen={isManageOpen}
                        onClose={handleCloseManage}
                        invitation={selectedInvitationAdd}
                        onUpdate={loadData} // Recargar data si agregaron guests
                    />
                )
            }

        </div>
    );
}
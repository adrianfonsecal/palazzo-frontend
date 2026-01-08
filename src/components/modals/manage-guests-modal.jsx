'use client';

import { useState } from 'react';
import { X, Trash2, Baby, User, Edit, Check } from 'lucide-react';
import { createGuest, deleteGuest, updateGuest } from '@/lib/api';
import Modal from '@/components/ui/modal';

export default function ManageGuestsModal({ isOpen, onClose, invitation, onUpdate }) {
  const [newName, setNewName] = useState('');
  const [isChild, setIsChild] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null); // ID del guest que se está editando
  const [tempName, setTempName] = useState('');     // Valor temporal del input
  // Si no hay invitación seleccionada, no renderizamos nada útil
  if (!invitation) return null;

  // Usamos el estado local de guests para que la UI sea instantánea
  // (Iniciamos con los guests que vienen de la prop, pero los actualizaremos localmente)
  const [localGuests, setLocalGuests] = useState(invitation.guests);

  // Sincronizar estado local cuando cambia la invitación seleccionada
  // (Esto es un patrón común cuando un modal recibe props nuevas)
  const handleAddGuest = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setLoading(true);

    try {
      // 1. Llamada a la API
      const newGuest = await createGuest({
        invitation: Number(invitation.id),
        full_name: newName,
        is_child: isChild
      });

      // 2. Actualizamos la lista visualmente
      setLocalGuests([...localGuests, newGuest]);

      // 3. Limpiamos form
      setNewName('');
      setIsChild(false);

      // 4. Avisamos al padre que hubo cambios (opcional, para recargar data global)
      onUpdate();
    } catch (error) {
      console.error(error);
      alert('Error al agregar invitado');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGuest = async (guestId) => {

    if (!confirm('¿Seguro que quieres eliminar a este invitado?')) return;

    try {
      await deleteGuest(guestId);
      // Filtramos la lista local
      setLocalGuests(localGuests.filter(g => g.id !== guestId));
      onUpdate();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  // --- INICIAR EDICIÓN ---
  const startEditing = (guest) => {
    setEditingId(guest.id);
    setTempName(guest.full_name); // Prellenamos con el nombre actual
  };

  // --- CANCELAR EDICIÓN ---
  const cancelEditing = () => {
    setEditingId(null);
    setTempName('');
  };

  // --- GUARDAR EDICIÓN ---
  const saveEditing = async (guestId) => {
    if (!tempName.trim()) return; // No guardar vacíos

    const originalGuest = localGuests.find(g => g.id === guestId);
    if (originalGuest.full_name === tempName) {
        cancelEditing();
        return;
    }

    try {

        await updateGuest(guestId, { full_name: tempName });

        setLocalGuests(localGuests.map(g => 
            g.id === guestId ? { ...g, full_name: tempName } : g
        ));
        
        cancelEditing();
        onUpdate();
    } catch (error) {
        console.error(error);
        alert("Error al actualizar el nombre");
    }
  };

  const handleKeyDown = (e, guestId) => {
      if (e.key === 'Enter') saveEditing(guestId);
      if (e.key === 'Escape') cancelEditing();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Gestionar: ${invitation.family_name}`}
    >
      <div className="space-y-6">

        {/* FORMULARIO DE AGREGAR (Sin cambios) */}
        <form onSubmit={handleAddGuest} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase">Agregar Integrante</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nombre completo"
              className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              // Quitamos autoFocus de aquí para que no pelee con el edit
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? '...' : 'Agregar'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_child"
              checked={isChild}
              onChange={(e) => setIsChild(e.target.checked)}
              className="rounded border-gray-300 text-slate-900 focus:ring-slate-900"
            />
            <label htmlFor="is_child" className="text-sm text-slate-600 flex items-center gap-1 cursor-pointer">
              <Baby size={14} /> Es niño (No cuenta alcohol)
            </label>
          </div>
        </form>

        {/* LISTA DE INVITADOS */}
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase mb-2">Lista Actual ({localGuests.length})</p>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {localGuests.length === 0 ? (
              <p className="text-sm text-slate-400 italic text-center py-4">El sobre está vacío.</p>
            ) : (
              localGuests.map((guest) => (
                <div key={guest.id} className="flex justify-between items-center p-2 bg-white border border-slate-100 rounded shadow-sm hover:border-slate-300 transition-colors">
                  
                  {/* LÓGICA CONDICIONAL: ¿SE ESTÁ EDITANDO ESTE GUEST? */}
                  {editingId === guest.id ? (
                    // --- MODO EDICIÓN ---
                    <div className="flex flex-1 items-center gap-2 animate-in fade-in duration-200">
                        <input 
                            type="text" 
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, guest.id)}
                            autoFocus
                            className="flex-1 px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <button 
                            onClick={() => saveEditing(guest.id)}
                            className="text-green-600 hover:bg-green-50 p-1 rounded transition"
                            title="Guardar (Enter)"
                        >
                            <Check size={18} />
                        </button>
                        <button 
                            onClick={cancelEditing}
                            className="text-red-500 hover:bg-red-50 p-1 rounded transition"
                            title="Cancelar (Esc)"
                        >
                            <X size={18} />
                        </button>
                    </div>
                  ) : (
                    // --- MODO VISUALIZACIÓN ---
                    <>
                      <div className="flex items-center gap-3">
                        {guest.is_child ? (
                          <div className="bg-pink-100 p-1.5 rounded-full text-pink-600" title="Niño">
                            <Baby size={16} />
                          </div>
                        ) : (
                          <div className="bg-slate-100 p-1.5 rounded-full text-slate-600" title="Adulto">
                            <User size={16} />
                          </div>
                        )}
                        <span className="text-sm font-medium text-slate-800">{guest.full_name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Botón Editar */}
                        <button
                          onClick={() => startEditing(guest)} // <--- Inicia la edición
                          className="text-slate-300 hover:text-blue-500 transition-colors p-1"
                          title="Editar nombre"
                        >
                          <Edit size={16} />
                        </button>
                        
                        {/* Botón Eliminar */}
                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
}
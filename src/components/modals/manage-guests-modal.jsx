'use client';

import { useState } from 'react';
import { X, Trash2, Baby, User } from 'lucide-react';
import { createGuest, deleteGuest } from '@/lib/api';
import Modal from '@/components/ui/modal';

export default function ManageGuestsModal({ isOpen, onClose, invitation, onUpdate }) {
  const [newName, setNewName] = useState('');
  const [isChild, setIsChild] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Gestionar: ${invitation.family_name}`}
    >
      <div className="space-y-6">

        {/* FORMULARIO DE AGREGAR */}
        <form onSubmit={handleAddGuest} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase">Agregar Integrante</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nombre completo"
              className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              autoFocus
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

                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
}
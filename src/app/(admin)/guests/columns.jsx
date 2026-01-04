'use client';
import { MoreHorizontal, Copy, Edit, Trash } from 'lucide-react';

// Esta función ayuda a asignar colores según el estado
const getStatusColor = (status) => {
  switch (status) {
    case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200';
    case 'SENT': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'OPENED': return 'bg-purple-100 text-purple-700 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getColumns = (onEdit) => {

  return [
  {
    accessorKey: 'family_name',
    header: 'Familia',
    cell: ({ row }) => (
      <div className="font-medium text-slate-900">{row.getValue('family_name')}</div>
    ),
  },
  {
    accessorKey: 'phone_number',
    header: 'Teléfono',
    cell: ({ row }) => <div className="text-slate-500">{row.getValue('phone_number') || '-'}</div>,
  },
  {
    // Columna calculada: Cuenta cuántos guests hay en el array
    id: 'guests_count',
    header: 'Invitados',
    cell: ({ row }) => {
      const guests = row.original.guests || [];
      const confirmed = guests.filter(g => g.attendance === 'ACCEPTED').length;
      return (
        <div className="text-sm">
          <span className="font-bold">{confirmed}</span> / {guests.length}
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
          {status}
        </span>
      );
    },
  },
  {
    // Columna de Acciones (Botones)
    id: 'actions',
    cell: ({ row }) => {
      const invitation = row.original;

      const copyLink = () => {
        const link = `${window.location.origin}/invitacion/${invitation.uuid}`;
        navigator.clipboard.writeText(link);
        alert('Enlace copiado al portapapeles'); // Podrías usar un Toast aquí
      };

      return (
        <div className="flex items-center gap-2">
          <button onClick={() => {/*...*/ }} className="p-2 hover:bg-slate-100 rounded text-slate-500">
            <Copy size={16} />
          </button>

          {/* BOTÓN EDITAR CONECTADO */}
          <button
            onClick={() => onEdit(invitation)}
            className="p-2 hover:bg-slate-100 rounded text-blue-600"
            title="Gestionar Invitados"
          >
            <Edit size={16} />
          </button>
        </div>

      );
    },
  },
  {
    accessorKey: 'uuid',
    header: 'Link',
    cell: ({ row }) => {
      const uuid = row.getValue('uuid');
      return (
        <a
          href={`/invitacion/${uuid}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Ver Invitación
        </a>
      );
    },
  }
]};
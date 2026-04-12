'use client';

import {
    ColumnDef,
    getPaginationRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Download
} from 'lucide-react';
import { useState } from 'react';

export function DataTable({
    columns,
    data,
    rowSelection = {},
    setRowSelection = () => { }
}) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            pagination,
            sorting,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getRowId: (originalRow) => originalRow.uuid,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
    });

    const exportToCSV = () => {
        const rows = table.getFilteredRowModel().rows;

        const headers = ['Nombre Completo', 'Teléfono', 'Número de Invitados por Familia', 'Estatus', 'Nombres de Acompañantes'];

        const csvData = rows.map(row => {
            const familyName = row.getValue('family_name') || '';
            const phone = row.getValue('phone_number') || '';
            const status = row.getValue('status') || '';
            const guests = row.original.guests || [];

            // Total familia: invitado principal (1) + acompañantes (guests.length)
            const totalFamilySize = guests.length + 1;

            // Extraer nombres de acompañantes
            const guestNames = guests.map(g => g.full_name).join(', ');

            // Clean up any quotes in data
            const cleanName = familyName.replace(/"/g, '""');
            const cleanGuestNames = guestNames.replace(/"/g, '""');

            return `"${cleanName}","${phone}","${totalFamilySize}","${status}","${cleanGuestNames}"`;
        });

        const csvContent = [headers.join(','), ...csvData].join('\n');
        const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); // BOM for Excel UTF-8

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'lista_invitados.csv');
        if (typeof document !== 'undefined') {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
                <div className="flex items-center gap-4">
                    <input
                        placeholder="Buscar por Familia..."
                        value={(table.getColumn("family_name")?.getFilterValue()) ?? ""}
                        onChange={(event) =>
                            table.getColumn("family_name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-xs h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-slate-500"
                    />
                    <select
                        value={(table.getColumn("status")?.getFilterValue()) ?? ""}
                        onChange={(event) =>
                            table.getColumn("status")?.setFilterValue(event.target.value)
                        }
                        className="max-w-xs h-10 px-3 rounded-md border border-gray-300 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-slate-500"
                    >
                        <option value="">Todos los Estados</option>
                        <option value="COMPLETED">Confirmación Completada</option>
                        <option value="DECLINED">Rechazado</option>
                        <option value="PENDING">Pendiente</option>
                        <option value="SENT">Enviado</option>
                        <option value="OPENED">Visto</option>
                    </select>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 font-medium text-sm transition shadow-sm whitespace-nowrap"
                >
                    <Download size={16} /> Exportar CSV
                </button>
            </div>

            <div className="rounded-md border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-medium">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id} className="px-6 py-3 font-semibold tracking-wider">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={row.getIsSelected() ? 'hover:bg-slate-50 transition-colors selected' : 'hover:bg-slate-50 transition-colors'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="h-24 text-center text-gray-500">
                                    No hay invitados registrados aún.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="h-2" />
                <div className="flex items-center justify-between px-2 py-4 border-t border-gray-200 bg-white">

                    {/* Sección izquierda: Información de filas y conteo */}
                    <div className="flex-1 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span>Mostrar</span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                                className="h-8 w-[70px] rounded-md border border-gray-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-500"
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                            <span>filas por página</span>
                        </div>
                    </div>

                    {/* Sección derecha: Navegación y Go To */}
                    <div className="flex items-center space-x-6 lg:space-x-8">

                        {/* Texto: Página X de Y */}
                        <div className="flex w-25 items-center justify-center text-sm font-medium text-gray-700">
                            Página {table.getState().pagination.pageIndex + 1} de{' '}
                            {table.getPageCount().toLocaleString()}
                        </div>

                        {/* Input: Ir a página */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 hidden sm:block">Ir a:</span>
                            <input
                                type="number"
                                min="1"
                                max={table.getPageCount()}
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    table.setPageIndex(page)
                                }}
                                className="h-8 w-16 rounded-md border border-gray-300 bg-white px-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-500"
                            />
                        </div>

                        {/* Botones de control */}
                        <div className="flex items-center space-x-2">
                            <button
                                className="h-8 w-8 p-0 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                                title="Primera página"
                            >
                                <ChevronsLeft className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                                className="h-8 w-8 p-0 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                title="Anterior"
                            >
                                <ChevronLeft className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                                className="h-8 w-8 p-0 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                title="Siguiente"
                            >
                                <ChevronRight className="h-4 w-4 text-gray-600" />
                            </button>
                            <button
                                className="h-8 w-8 p-0 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                                title="Última página"
                            >
                                <ChevronsRight className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

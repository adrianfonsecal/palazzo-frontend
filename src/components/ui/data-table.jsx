'use client';

import {
    ColumnDef,
    getPaginationRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight
} from 'lucide-react';
import { useState } from 'react';

export function DataTable({ columns, data }) {
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            pagination,
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getRowId: (originalRow, index) => {
            return originalRow.uuid; // use 'id' property as row ID
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });
    // Para obtener los objetos completos de la data seleccionada:
    const selectedGuests = table.getSelectedRowModel().flatRows.map(row => row.original);

    console.log("Enviar WhatsApp a:", selectedGuests);


    return (
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
    );
}


/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTableFilterMeta, DataTableFilterMetaData } from "primereact/datatable";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';

interface ColumnConfig {
  field: string;
  header: string;
}

interface FessListProps {
  scrollHeight?: string;
  pageData: any[];
  totalRecords: number;
  loading: boolean;
  columns: ColumnConfig[];
  globalFilter: string[];
  baseURL: string;
  first: number;
  sortField?: string;
  sortOrder?: 0 | 1 | -1 | null;
  onLazyLoad: (event: PaginatorPageChangeEvent) => void;
  onSort?: (event: any) => void;
  onGlobalSearch:(value: string) => void;
}

const FessList: React.FC<FessListProps> = ({
  scrollHeight = "67vh",
  pageData,
  totalRecords,
  loading,
  columns,
  globalFilter,
  first,
  sortField,
  sortOrder,
  baseURL,
  onLazyLoad,
  onSort,
  onGlobalSearch,
}) => {
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);
 const router = useRouter();
  const [filters, setFilters] = useState<DataTableFilterMeta>({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // ✅ Initialize Filters
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue("");
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

   if (!_filters["global"]) {
    _filters["global"] = { value: null, matchMode: FilterMatchMode.CONTAINS };
  }

  (_filters["global"] as DataTableFilterMetaData).value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
    onGlobalSearch(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-2">
         {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 m-0">All Students List</h2>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
            <span className="p-input-icon-left w-full md:w-64">
                <i className="pi pi-search text-gray-400" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search by Name or ID"
                    className="w-full rounded-full border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:bg-white transition-all"
                />
            </span>
            <Button icon="pi pi-filter" rounded text aria-label="Filter" className="w-10 h-10 bg-yellow-100 text-yellow-600 hover:bg-yellow-200" />
            <Button icon="pi pi-sort-alt" rounded text aria-label="Sort" className="w-10 h-10 bg-yellow-100 text-yellow-600 hover:bg-yellow-200" />
            <Button icon="pi pi-plus" rounded aria-label="Add" className="w-10 h-10 bg-yellow-400 border-none hover:bg-yellow-500 text-white shadow-md" />
        </div>
      </div>
    );
  };

  const header = renderHeader();
   const handlePay = (id: string) => {
    console.log("Pay clicked for ID:", id);
  };
 
  const payButtonTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
          <Button
            icon="pi pi-file-edit"
            rounded
            // text // Removed text variant for better visibility if needed, or keeping it with better colors
            className="w-9 h-9 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border border-blue-100 shadow-sm transition-all"
            tooltip="Pay / Edit"
            onClick={() => router.push(`${baseURL}/${rowData.user_id}`)}
          />
      </div>
    );
  };

  // Name Template with Avatar
  const nameTemplate = (rowData: any) => {
      return (
          <div className="flex items-center gap-3">
              <Avatar 
                image={`https://api.dicebear.com/7.x/initials/svg?seed=${rowData.name}`} 
                shape="circle" 
                size="large"
                className="bg-indigo-50 text-indigo-500"
              />
              <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{rowData.name}</span>
                  <span className="text-xs text-gray-500">{rowData.email || 'No Email'}</span>
              </div>
          </div>
      );
  };

  // Currency Template
  const currencyTemplate = (rowData: any, field: string) => {
      const amount = rowData[field] || 0;
      return (
          <span className={`font-medium ${field === 'total_due' ? 'text-gray-900' : 'text-gray-500'}`}>
              ₹ {amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
      );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="card bg-white shadow-sm rounded-3xl overflow-hidden p-4 border border-gray-100">
          <DataTable
            ref={dt}
            value={pageData}
            paginator={false} 
            // scrollable // Removed scrollable
            // scrollHeight={scrollHeight} // Removed scrollHeight
            totalRecords={totalRecords}
            lazy
            loading={loading}
            rows={20}
            first={first}
            className="p-datatable-sm"
            rowHover
            // selectionMode="checkbox" // Removed selection mode
            globalFilterFields={globalFilter}
            filters={filters}
            header={header}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
            removableSort
            emptyMessage={
                <div className="text-center p-8 text-gray-400">
                    <p>No records found.</p>
                </div>
            }
            onFilter={(e) => setFilters(e.filters)}
            rowClassName={() => 'hover:bg-blue-50 transition-colors border-b border-gray-50'}
            pt={{
                header: { className: 'bg-transparent border-b-0 mb-4' },
                thead: { className: 'bg-gray-50 text-gray-400 text-xs font-semibold uppercase tracking-wider' },
                tbody: { className: 'text-sm text-gray-700' },
            }}
          >
            {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> Removed checkbox column */}
            
            {columns.map((col) => (
             <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable
                body={(rowData) => {
                    if (col.field === 'name') {
                        return nameTemplate(rowData);
                    }
                    if (['tuition_fee', 'exam_fee', 'other_fee', 'total_due'].includes(col.field)) {
                        return currencyTemplate(rowData, col.field);
                    }
                    return <span className="text-gray-600">{rowData[col.field]}</span>;
                }}
                style={{ minWidth: col.field === 'name' ? '250px' : '120px' }}
                headerClassName="bg-transparent text-gray-400 font-medium py-4 border-b border-gray-100 pl-4"
                bodyClassName="py-4 pl-4"
              />
            ))}
         
             <Column 
                header="Action" 
                body={payButtonTemplate} 
                headerClassName="bg-transparent text-gray-400 font-medium py-4 border-b border-gray-100"
                bodyClassName="py-4"
                alignFrozen="right"
                frozen={true}
             />
          </DataTable>

          <Paginator
            first={first}
            rows={20}
            totalRecords={totalRecords}
            onPageChange={onLazyLoad}
            template="PrevPageLink PageLinks NextPageLink"
            className="border-t border-gray-50 mt-4"
             leftContent={<span className="text-xs text-gray-400 pl-4">Showing {first + 1} to {Math.min(first + 20, totalRecords)} of {totalRecords} entries</span>}
          />
      </div>
    </div>
  );
};

export default FessList;

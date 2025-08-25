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

interface ColumnConfig {
  field: string;
  header: string;
}

interface FessEntryProps {
  scrollHeight?: string;
  pageData: any[];
  totalRecords: number;
  loading: boolean;
  columns: ColumnConfig[];
  globalFilter: string[];
  first: number;
  onLazyLoad: (event: PaginatorPageChangeEvent) => void;
  onGlobalSearch:(value: string) => void;
}

const FessEntry: React.FC<FessEntryProps> = ({
  scrollHeight = "67vh",
  pageData,
  totalRecords,
  loading,
  columns,
  globalFilter,
  first,
  onLazyLoad,
  onGlobalSearch,
}) => {
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<any>>(null);

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
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <div className="left">
          <span>
            <i className="pi pi-search" />
          </span>
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <DataTable
            ref={dt}
            value={pageData}
            paginator={false}
            scrollable
            scrollHeight={scrollHeight}
            totalRecords={totalRecords}
            lazy
            loading={loading}
            rows={20}
            first={first}
            className="mt-3"
            globalFilterFields={globalFilter}
            filters={filters}
            header={header}
            emptyMessage="No records found."
            onFilter={(e) => setFilters(e.filters)}
          >
            {columns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                style={{ flexGrow: 1, flexBasis: "150px" }}
              />
            ))}
          </DataTable>

          <Paginator
            first={first}
            rows={20}
            totalRecords={totalRecords}
            onPageChange={onLazyLoad}
            template="PrevPageLink PageLinks NextPageLink"
          />
        </div>
      </div>
    </div>
  );
};

export default FessEntry;

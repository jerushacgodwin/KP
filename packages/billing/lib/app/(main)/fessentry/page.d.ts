import { PaginatorPageChangeEvent } from "primereact/paginator";
import React from "react";
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
    onGlobalSearch: (value: string) => void;
}
declare const FessEntry: React.FC<FessEntryProps>;
export default FessEntry;

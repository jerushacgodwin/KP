"use strict";
/* eslint-disable @next/next/no-img-element */
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const button_1 = require("primereact/button");
const column_1 = require("primereact/column");
const datatable_1 = require("primereact/datatable");
const inputtext_1 = require("primereact/inputtext");
const api_1 = require("primereact/api");
const paginator_1 = require("primereact/paginator");
const react_1 = __importStar(require("react"));
const FessEntry = ({ scrollHeight = "67vh", pageData, totalRecords, loading, columns, globalFilter, first, onLazyLoad, onGlobalSearch, }) => {
    const toast = (0, react_1.useRef)(null);
    const dt = (0, react_1.useRef)(null);
    const [filters, setFilters] = (0, react_1.useState)({});
    const [globalFilterValue, setGlobalFilterValue] = (0, react_1.useState)("");
    // ✅ Initialize Filters
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: api_1.FilterMatchMode.CONTAINS },
        });
        setGlobalFilterValue("");
    };
    const clearFilter = () => {
        initFilters();
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        if (!_filters["global"]) {
            _filters["global"] = { value: null, matchMode: api_1.FilterMatchMode.CONTAINS };
        }
        _filters["global"].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
        onGlobalSearch(value);
    };
    const renderHeader = () => {
        return (<div className="flex justify-content-between">
        <button_1.Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter}/>
        <div className="left">
          <span>
            <i className="pi pi-search"/>
          </span>
          <inputtext_1.InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search"/>
        </div>
      </div>);
    };
    const header = renderHeader();
    return (<div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <datatable_1.DataTable ref={dt} value={pageData} paginator={false} scrollable scrollHeight={scrollHeight} totalRecords={totalRecords} lazy loading={loading} rows={20} first={first} className="mt-3" globalFilterFields={globalFilter} filters={filters} header={header} emptyMessage="No records found." onFilter={(e) => setFilters(e.filters)}>
            {columns.map((col) => (<column_1.Column key={col.field} field={col.field} header={col.header} style={{ flexGrow: 1, flexBasis: "150px" }}/>))}
          </datatable_1.DataTable>

          <paginator_1.Paginator first={first} rows={20} totalRecords={totalRecords} onPageChange={onLazyLoad} template="PrevPageLink PageLinks NextPageLink"/>
        </div>
      </div>
    </div>);
};
exports.default = FessEntry;

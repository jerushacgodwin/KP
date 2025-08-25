"use strict";
'use client';
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
const react_1 = __importStar(require("react"));
const dataview_1 = require("primereact/dataview");
const button_1 = require("primereact/button");
const dropdown_1 = require("primereact/dropdown");
const rating_1 = require("primereact/rating");
const picklist_1 = require("primereact/picklist");
const orderlist_1 = require("primereact/orderlist");
const ProductService_1 = require("../../../../demo/service/ProductService");
const inputtext_1 = require("primereact/inputtext");
const ListDemo = () => {
    const listValue = [
        { name: 'San Francisco', code: 'SF' },
        { name: 'London', code: 'LDN' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Berlin', code: 'BRL' },
        { name: 'Barcelona', code: 'BRC' },
        { name: 'Rome', code: 'RM' }
    ];
    const [picklistSourceValue, setPicklistSourceValue] = (0, react_1.useState)(listValue);
    const [picklistTargetValue, setPicklistTargetValue] = (0, react_1.useState)([]);
    const [orderlistValue, setOrderlistValue] = (0, react_1.useState)(listValue);
    const [dataViewValue, setDataViewValue] = (0, react_1.useState)([]);
    const [globalFilterValue, setGlobalFilterValue] = (0, react_1.useState)('');
    const [filteredValue, setFilteredValue] = (0, react_1.useState)(null);
    const [layout, setLayout] = (0, react_1.useState)('grid');
    const [sortKey, setSortKey] = (0, react_1.useState)(null);
    const [sortOrder, setSortOrder] = (0, react_1.useState)(null);
    const [sortField, setSortField] = (0, react_1.useState)('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];
    (0, react_1.useEffect)(() => {
        ProductService_1.ProductService.getProducts().then((data) => setDataViewValue(data));
        setGlobalFilterValue('');
    }, []);
    (0, react_1.useEffect)(() => {
        ProductService_1.ProductService.getProducts().then((data) => setDataViewValue(data));
        setGlobalFilterValue('');
    }, []);
    const onFilter = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        if (value.length === 0) {
            setFilteredValue(null);
        }
        else {
            const filtered = dataViewValue?.filter((product) => {
                const productNameLowercase = product.name.toLowerCase();
                const searchValueLowercase = value.toLowerCase();
                return productNameLowercase.includes(searchValueLowercase);
            });
            setFilteredValue(filtered);
        }
    };
    const onSortChange = (event) => {
        const value = event.value;
        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };
    const dataViewHeader = (<div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <dropdown_1.Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
            <span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <inputtext_1.InputText value={globalFilterValue} onChange={onFilter} placeholder="Search by Name"/>
            </span>
            <dataview_1.DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)}/>
        </div>);
    const dataviewListItem = (data) => {
        return (<div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img src={`/demo/images/product/${data.image}`} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"/>
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="font-bold text-2xl">{data.name}</div>
                        <div className="mb-2">{data.description}</div>
                        <rating_1.Rating value={data.rating} readOnly cancel={false} className="mb-2"></rating_1.Rating>
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2"></i>
                            <span className="font-semibold">{data.category}</span>
                        </div>
                    </div>
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <span className="text-2xl font-semibold mb-2 align-self-center md:align-self-end">${data.price}</span>
                        <button_1.Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'} size="small" className="mb-2"></button_1.Button>
                        <span className={`product-badge status-${data.inventoryStatus?.toLowerCase()}`}>{data.inventoryStatus}</span>
                    </div>
                </div>
            </div>);
    };
    const dataviewGridItem = (data) => {
        return (<div className="col-12 lg:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-2">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2"/>
                            <span className="font-semibold">{data.category}</span>
                        </div>
                        <span className={`product-badge status-${data.inventoryStatus?.toLowerCase()}`}>{data.inventoryStatus}</span>
                    </div>
                    <div className="flex flex-column align-items-center text-center mb-3">
                        <img src={`/demo/images/product/${data.image}`} alt={data.name} className="w-9 shadow-2 my-3 mx-0"/>
                        <div className="text-2xl font-bold">{data.name}</div>
                        <div className="mb-3">{data.description}</div>
                        <rating_1.Rating value={data.rating} readOnly cancel={false}/>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${data.price}</span>
                        <button_1.Button icon="pi pi-shopping-cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}/>
                    </div>
                </div>
            </div>);
    };
    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }
        if (layout === 'list') {
            return dataviewListItem(data);
        }
        else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };
    return (<div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>DataView</h5>
                    <dataview_1.DataView value={filteredValue || dataViewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataViewHeader}></dataview_1.DataView>
                </div>
            </div>

            <div className="col-12 xl:col-8">
                <div className="card">
                    <h5>PickList</h5>
                    <picklist_1.PickList source={picklistSourceValue} target={picklistTargetValue} sourceHeader="From" targetHeader="To" itemTemplate={(item) => <div>{item.name}</div>} onChange={(e) => {
            setPicklistSourceValue(e.source);
            setPicklistTargetValue(e.target);
        }} sourceStyle={{ height: '200px' }} targetStyle={{ height: '200px' }}></picklist_1.PickList>
                </div>
            </div>

            <div className="col-12 xl:col-4">
                <div className="card">
                    <h5>OrderList</h5>
                    <orderlist_1.OrderList value={orderlistValue} listStyle={{ height: '200px' }} className="p-orderlist-responsive" header="Cities" itemTemplate={(item) => <div>{item.name}</div>} onChange={(e) => setOrderlistValue(e.value)}></orderlist_1.OrderList>
                </div>
            </div>
        </div>);
};
exports.default = ListDemo;

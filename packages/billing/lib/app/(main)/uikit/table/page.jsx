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
const CustomerService_1 = require("../../../../demo/service/CustomerService");
const ProductService_1 = require("../../../../demo/service/ProductService");
const api_1 = require("primereact/api");
const button_1 = require("primereact/button");
const calendar_1 = require("primereact/calendar");
const column_1 = require("primereact/column");
const datatable_1 = require("primereact/datatable");
const dropdown_1 = require("primereact/dropdown");
const inputnumber_1 = require("primereact/inputnumber");
const inputtext_1 = require("primereact/inputtext");
const multiselect_1 = require("primereact/multiselect");
const progressbar_1 = require("primereact/progressbar");
const rating_1 = require("primereact/rating");
const slider_1 = require("primereact/slider");
const togglebutton_1 = require("primereact/togglebutton");
const tristatecheckbox_1 = require("primereact/tristatecheckbox");
const utils_1 = require("primereact/utils");
const react_1 = __importStar(require("react"));
const TableDemo = () => {
    const [customers1, setCustomers1] = (0, react_1.useState)([]);
    const [customers2, setCustomers2] = (0, react_1.useState)([]);
    const [customers3, setCustomers3] = (0, react_1.useState)([]);
    const [filters1, setFilters1] = (0, react_1.useState)({});
    const [loading1, setLoading1] = (0, react_1.useState)(true);
    const [loading2, setLoading2] = (0, react_1.useState)(true);
    const [idFrozen, setIdFrozen] = (0, react_1.useState)(false);
    const [products, setProducts] = (0, react_1.useState)([]);
    const [globalFilterValue1, setGlobalFilterValue1] = (0, react_1.useState)('');
    const [expandedRows, setExpandedRows] = (0, react_1.useState)([]);
    const [allExpanded, setAllExpanded] = (0, react_1.useState)(false);
    const representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];
    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'];
    const clearFilter1 = () => {
        initFilters1();
    };
    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;
        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };
    const renderHeader1 = () => {
        return (<div className="flex justify-content-between">
                <button_1.Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter1}/>
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <inputtext_1.InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search"/>
                </span>
            </div>);
    };
    (0, react_1.useEffect)(() => {
        setLoading2(true);
        CustomerService_1.CustomerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
        });
        CustomerService_1.CustomerService.getCustomersLarge().then((data) => {
            setCustomers2(getCustomers(data));
            setLoading2(false);
        });
        CustomerService_1.CustomerService.getCustomersMedium().then((data) => setCustomers3(data));
        ProductService_1.ProductService.getProductsWithOrdersSmall().then((data) => setProducts(data));
        initFilters1();
    }, []);
    const balanceTemplate = (rowData) => {
        return (<div>
                <span className="text-bold">{formatCurrency(rowData.balance)}</span>
            </div>);
    };
    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };
    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };
    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: api_1.FilterMatchMode.CONTAINS },
            name: {
                operator: api_1.FilterOperator.AND,
                constraints: [{ value: null, matchMode: api_1.FilterMatchMode.STARTS_WITH }]
            },
            'country.name': {
                operator: api_1.FilterOperator.AND,
                constraints: [{ value: null, matchMode: api_1.FilterMatchMode.STARTS_WITH }]
            },
            representative: { value: null, matchMode: api_1.FilterMatchMode.IN },
            date: {
                operator: api_1.FilterOperator.AND,
                constraints: [{ value: null, matchMode: api_1.FilterMatchMode.DATE_IS }]
            },
            balance: {
                operator: api_1.FilterOperator.AND,
                constraints: [{ value: null, matchMode: api_1.FilterMatchMode.EQUALS }]
            },
            status: {
                operator: api_1.FilterOperator.OR,
                constraints: [{ value: null, matchMode: api_1.FilterMatchMode.EQUALS }]
            },
            activity: { value: null, matchMode: api_1.FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: api_1.FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };
    const countryBodyTemplate = (rowData) => {
        return (<react_1.default.Fragment>
                <img alt="flag" src={`/demo/images/flag/flag_placeholder.png`} className={`flag flag-${rowData.country.code}`} width={30}/>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.country.name}</span>
            </react_1.default.Fragment>);
    };
    const filterClearTemplate = (options) => {
        return <button_1.Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></button_1.Button>;
    };
    const filterApplyTemplate = (options) => {
        return <button_1.Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></button_1.Button>;
    };
    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        return (<react_1.default.Fragment>
                <img alt={representative.name} src={`/demo/images/avatar/${representative.image}`} onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')} width={32} style={{ verticalAlign: 'middle' }}/>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{representative.name}</span>
            </react_1.default.Fragment>);
    };
    const representativeFilterTemplate = (options) => {
        return (<>
                <div className="mb-3 text-bold">Agent Picker</div>
                <multiselect_1.MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter"/>
            </>);
    };
    const representativesItemTemplate = (option) => {
        return (<div className="p-multiselect-representative-option">
                <img alt={option.name} src={`/demo/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }}/>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{option.name}</span>
            </div>);
    };
    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };
    const dateFilterTemplate = (options) => {
        return <calendar_1.Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999"/>;
    };
    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    };
    const balanceFilterTemplate = (options) => {
        return <inputnumber_1.InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US"/>;
    };
    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    };
    const statusFilterTemplate = (options) => {
        return <dropdown_1.Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear/>;
    };
    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    };
    const activityBodyTemplate = (rowData) => {
        return <progressbar_1.ProgressBar value={rowData.activity} showValue={false} style={{ height: '.5rem' }}></progressbar_1.ProgressBar>;
    };
    const activityFilterTemplate = (options) => {
        return (<react_1.default.Fragment>
                <slider_1.Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></slider_1.Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </react_1.default.Fragment>);
    };
    const verifiedBodyTemplate = (rowData) => {
        return (<i className={(0, utils_1.classNames)('pi', {
                'text-green-500 pi-check-circle': rowData.verified,
                'text-pink-500 pi-times-circle': !rowData.verified
            })}></i>);
    };
    const verifiedFilterTemplate = (options) => {
        return <tristatecheckbox_1.TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)}/>;
    };
    const toggleAll = () => {
        if (allExpanded)
            collapseAll();
        else
            expandAll();
    };
    const expandAll = () => {
        let _expandedRows = {};
        products.forEach((p) => (_expandedRows[`${p.id}`] = true));
        setExpandedRows(_expandedRows);
        setAllExpanded(true);
    };
    const collapseAll = () => {
        setExpandedRows([]);
        setAllExpanded(false);
    };
    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };
    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order-${rowData.status?.toLowerCase()}`}>{rowData.status}</span>;
    };
    const searchBodyTemplate = () => {
        return <button_1.Button icon="pi pi-search"/>;
    };
    const imageBodyTemplate = (rowData) => {
        return <img src={`/demo/images/product/${rowData.image}`} onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')} alt={rowData.image} className="shadow-2" width={100}/>;
    };
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };
    const ratingBodyTemplate = (rowData) => {
        return <rating_1.Rating value={rowData.rating} readOnly cancel={false}/>;
    };
    const statusBodyTemplate2 = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    };
    const rowExpansionTemplate = (data) => {
        return (<div className="orders-subtable">
                <h5>Orders for {data.name}</h5>
                <datatable_1.DataTable value={data.orders} responsiveLayout="scroll">
                    <column_1.Column field="id" header="Id" sortable></column_1.Column>
                    <column_1.Column field="customer" header="Customer" sortable></column_1.Column>
                    <column_1.Column field="date" header="Date" sortable></column_1.Column>
                    <column_1.Column field="amount" header="Amount" body={amountBodyTemplate} sortable></column_1.Column>
                    <column_1.Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></column_1.Column>
                    <column_1.Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></column_1.Column>
                </datatable_1.DataTable>
            </div>);
    };
    const header = <button_1.Button icon={allExpanded ? 'pi pi-minus' : 'pi pi-plus'} label={allExpanded ? 'Collapse All' : 'Expand All'} onClick={toggleAll} className="w-11rem"/>;
    const headerTemplate = (data) => {
        return (<react_1.default.Fragment>
                <img alt={data.representative.name} src={`/demo/images/avatar/${data.representative.image}`} width="32" style={{ verticalAlign: 'middle' }}/>
                <span className="font-bold ml-2">{data.representative.name}</span>
            </react_1.default.Fragment>);
    };
    const footerTemplate = (data) => {
        return (<react_1.default.Fragment>
                <td colSpan={4} style={{ textAlign: 'right' }} className="text-bold pr-6">
                    Total Customers
                </td>
                <td>{calculateCustomerTotal(data.representative.name)}</td>
            </react_1.default.Fragment>);
    };
    const calculateCustomerTotal = (name) => {
        let total = 0;
        if (customers3) {
            for (let customer of customers3) {
                if (customer.representative.name === name) {
                    total++;
                }
            }
        }
        return total;
    };
    const header1 = renderHeader1();
    return (<div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Filter Menu</h5>
                    <datatable_1.DataTable value={customers1} paginator className="p-datatable-gridlines" showGridlines rows={10} dataKey="id" filters={filters1} filterDisplay="menu" loading={loading1} responsiveLayout="scroll" emptyMessage="No customers found." header={header1}>
                        <column_1.Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }}/>
                        <column_1.Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterClear={filterClearTemplate} filterApply={filterApplyTemplate}/>
                        <column_1.Column header="Agent" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterElement={representativeFilterTemplate}/>
                        <column_1.Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate}/>
                        <column_1.Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate}/>
                        <column_1.Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate}/>
                        <column_1.Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate}/>
                        <column_1.Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate}/>
                    </datatable_1.DataTable>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Frozen Columns</h5>
                    <togglebutton_1.ToggleButton checked={idFrozen} onChange={(e) => setIdFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style={{ width: '10rem' }}/>

                    <datatable_1.DataTable value={customers2} scrollable scrollHeight="400px" loading={loading2} className="mt-3">
                        <column_1.Column field="name" header="Name" style={{ flexGrow: 1, flexBasis: '160px' }} frozen className="font-bold"></column_1.Column>
                        <column_1.Column field="id" header="Id" style={{ flexGrow: 1, flexBasis: '100px' }} frozen={idFrozen} alignFrozen="left" bodyClassName={(0, utils_1.classNames)({ 'font-bold': idFrozen })}></column_1.Column>
                        <column_1.Column field="country.name" header="Country" style={{ flexGrow: 1, flexBasis: '200px' }} body={countryBodyTemplate}></column_1.Column>
                        <column_1.Column field="date" header="Date" style={{ flexGrow: 1, flexBasis: '200px' }} body={dateBodyTemplate}></column_1.Column>
                        <column_1.Column field="company" header="Company" style={{ flexGrow: 1, flexBasis: '200px' }}></column_1.Column>
                        <column_1.Column field="status" header="Status" style={{ flexGrow: 1, flexBasis: '200px' }} body={statusBodyTemplate}></column_1.Column>
                        <column_1.Column field="activity" header="Activity" style={{ flexGrow: 1, flexBasis: '200px' }}></column_1.Column>
                        <column_1.Column field="representative.name" header="Representative" style={{ flexGrow: 1, flexBasis: '200px' }} body={representativeBodyTemplate}></column_1.Column>
                        <column_1.Column field="balance" header="Balance" body={balanceTemplate} frozen style={{ flexGrow: 1, flexBasis: '120px' }} className="font-bold" alignFrozen="right"></column_1.Column>
                    </datatable_1.DataTable>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Row Expand</h5>
                    <datatable_1.DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} responsiveLayout="scroll" rowExpansionTemplate={rowExpansionTemplate} dataKey="id" header={header}>
                        <column_1.Column expander style={{ width: '3em' }}/>
                        <column_1.Column field="name" header="Name" sortable/>
                        <column_1.Column header="Image" body={imageBodyTemplate}/>
                        <column_1.Column field="price" header="Price" sortable body={priceBodyTemplate}/>
                        <column_1.Column field="category" header="Category" sortable/>
                        <column_1.Column field="rating" header="Reviews" sortable body={ratingBodyTemplate}/>
                        <column_1.Column field="inventoryStatus" header="Status" sortable body={statusBodyTemplate2}/>
                    </datatable_1.DataTable>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Subheader Grouping</h5>
                    <datatable_1.DataTable value={customers3} rowGroupMode="subheader" groupRowsBy="representative.name" sortMode="single" sortField="representative.name" sortOrder={1} scrollable scrollHeight="400px" rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate} responsiveLayout="scroll">
                        <column_1.Column field="name" header="Name" style={{ minWidth: '200px' }}></column_1.Column>
                        <column_1.Column field="country" header="Country" body={countryBodyTemplate} style={{ minWidth: '200px' }}></column_1.Column>
                        <column_1.Column field="company" header="Company" style={{ minWidth: '200px' }}></column_1.Column>
                        <column_1.Column field="status" header="Status" body={statusBodyTemplate} style={{ minWidth: '200px' }}></column_1.Column>
                        <column_1.Column field="date" header="Date" style={{ minWidth: '200px' }}></column_1.Column>
                    </datatable_1.DataTable>
                </div>
            </div>
        </div>);
};
exports.default = TableDemo;

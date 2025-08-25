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
const button_1 = require("primereact/button");
const column_1 = require("primereact/column");
const confirmpopup_1 = require("primereact/confirmpopup");
const datatable_1 = require("primereact/datatable");
const dialog_1 = require("primereact/dialog");
const inputtext_1 = require("primereact/inputtext");
const overlaypanel_1 = require("primereact/overlaypanel");
const sidebar_1 = require("primereact/sidebar");
const toast_1 = require("primereact/toast");
const react_1 = __importStar(require("react"));
const ProductService_1 = require("../../../../demo/service/ProductService");
const OverlayDemo = () => {
    const [displayBasic, setDisplayBasic] = (0, react_1.useState)(false);
    const [displayConfirmation, setDisplayConfirmation] = (0, react_1.useState)(false);
    const [visibleLeft, setVisibleLeft] = (0, react_1.useState)(false);
    const [visibleRight, setVisibleRight] = (0, react_1.useState)(false);
    const [visibleTop, setVisibleTop] = (0, react_1.useState)(false);
    const [visibleBottom, setVisibleBottom] = (0, react_1.useState)(false);
    const [visibleFullScreen, setVisibleFullScreen] = (0, react_1.useState)(false);
    const [products, setProducts] = (0, react_1.useState)([]);
    const [selectedProduct, setSelectedProduct] = (0, react_1.useState)(null);
    const op = (0, react_1.useRef)(null);
    const op2 = (0, react_1.useRef)(null);
    const toast = (0, react_1.useRef)(null);
    const accept = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000
        });
    };
    const reject = () => {
        toast.current?.show({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000
        });
    };
    const confirm = (event) => {
        (0, confirmpopup_1.confirmPopup)({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };
    (0, react_1.useEffect)(() => {
        ProductService_1.ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);
    const toggle = (event) => {
        op.current?.toggle(event);
    };
    const toggleDataTable = (event) => {
        op2.current?.toggle(event);
    };
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };
    const onProductSelect = (event) => {
        op2.current?.hide();
        toast.current?.show({
            severity: 'info',
            summary: 'Product Selected',
            detail: event.data.name,
            life: 3000
        });
    };
    const onSelectionChange = (e) => {
        setSelectedProduct(e.value);
    };
    const basicDialogFooter = <button_1.Button type="button" label="OK" onClick={() => setDisplayBasic(false)} icon="pi pi-check" outlined/>;
    const imageBodyTemplate = (data) => (<img src={`/demo/images/product/${data.image}`} alt={data.image} className="product-image" width="60" style={{
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
        }}/>);
    const priceBodyTemplate = (data) => formatCurrency(data.price ?? 0);
    const confirmationDialogFooter = (<>
            <button_1.Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text/>
            <button_1.Button type="button" label="Yes" icon="pi pi-check" onClick={() => setDisplayConfirmation(false)} text autoFocus/>
        </>);
    return (<>
            <toast_1.Toast ref={toast}/>
            <div className="grid">
                <div className="col-12 lg:col-6">
                    <div className="card">
                        <h5>Dialog</h5>
                        <dialog_1.Dialog header="Dialog" visible={displayBasic} style={{ width: '30vw' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                            </p>
                        </dialog_1.Dialog>
                        <div className="grid">
                            <div className="col-12">
                                <button_1.Button outlined type="button" label="Show" icon="pi pi-external-link" onClick={() => setDisplayBasic(true)}/>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <h5>Overlay Panel</h5>
                        <div className="flex flex-wrap gap-2">
                            <div>
                                <button_1.Button type="button" label="Image" onClick={toggle} outlined/>
                                <overlaypanel_1.OverlayPanel ref={op} appendTo={typeof window !== 'undefined' ? document.body : null} showCloseIcon>
                                    <img src="/demo/images/nature/nature9.jpg" alt="nature1"/>
                                </overlaypanel_1.OverlayPanel>
                            </div>
                            <div>
                                <button_1.Button type="button" label="DataTable" onClick={toggleDataTable} outlined/>
                                <overlaypanel_1.OverlayPanel ref={op2} appendTo={typeof window !== 'undefined' ? document.body : null} showCloseIcon id="overlay_panel" style={{ width: '450px' }}>
                                    <datatable_1.DataTable value={products} selection={selectedProduct || undefined} onSelectionChange={onSelectionChange} selectionMode="single" responsiveLayout="scroll" paginator rows={5} onRowSelect={onProductSelect}>
                                        <column_1.Column field="name" header="Name" sortable headerStyle={{ minWidth: '10rem' }}/>
                                        <column_1.Column header="Image" body={imageBodyTemplate} headerStyle={{ minWidth: '10rem' }}/>
                                        <column_1.Column field="price" header="Price" body={priceBodyTemplate} sortable headerStyle={{ minWidth: '8rem' }}/>
                                    </datatable_1.DataTable>
                                </overlaypanel_1.OverlayPanel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 lg:col-6">
                    <div className="card">
                        <h5>Confirmation</h5>
                        <button_1.Button label="Delete" icon="pi pi-trash" severity="danger" onClick={() => setDisplayConfirmation(true)}/>
                        <dialog_1.Dialog header="Confirmation" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
                                <span>Are you sure you want to proceed?</span>
                            </div>
                        </dialog_1.Dialog>
                    </div>
                    <div className="card">
                        <h5>Sidebar</h5>
                        <sidebar_1.Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)} baseZIndex={1000}>
                            <h1 style={{ fontWeight: 'normal' }}>Left Sidebar</h1>
                        </sidebar_1.Sidebar>

                        <sidebar_1.Sidebar visible={visibleRight} onHide={() => setVisibleRight(false)} baseZIndex={1000} position="right">
                            <h1 style={{ fontWeight: 'normal' }}>Right Sidebar</h1>
                        </sidebar_1.Sidebar>

                        <sidebar_1.Sidebar visible={visibleTop} onHide={() => setVisibleTop(false)} baseZIndex={1000} position="top">
                            <h1 style={{ fontWeight: 'normal' }}>Top Sidebar</h1>
                        </sidebar_1.Sidebar>

                        <sidebar_1.Sidebar visible={visibleBottom} onHide={() => setVisibleBottom(false)} baseZIndex={1000} position="bottom">
                            <h1 style={{ fontWeight: 'normal' }}>Bottom Sidebar</h1>
                        </sidebar_1.Sidebar>

                        <sidebar_1.Sidebar visible={visibleFullScreen} onHide={() => setVisibleFullScreen(false)} baseZIndex={1000} fullScreen>
                            <h1 style={{ fontWeight: 'normal' }}>Full Screen</h1>
                        </sidebar_1.Sidebar>

                        <button_1.Button type="button" icon="pi pi-arrow-right" severity="warning" onClick={() => setVisibleLeft(true)} style={{ marginRight: '.25em' }}/>
                        <button_1.Button type="button" icon="pi pi-arrow-left" severity="warning" onClick={() => setVisibleRight(true)} style={{ marginRight: '.25em' }}/>
                        <button_1.Button type="button" icon="pi pi-arrow-down" severity="warning" onClick={() => setVisibleTop(true)} style={{ marginRight: '.25em' }}/>
                        <button_1.Button type="button" icon="pi pi-arrow-up" severity="warning" onClick={() => setVisibleBottom(true)} style={{ marginRight: '.25em' }}/>
                        <button_1.Button type="button" icon="pi pi-external-link" severity="warning" onClick={() => setVisibleFullScreen(true)}/>
                    </div>
                </div>

                <div className="col-12 lg:col-6">
                    <div className="card">
                        <h5>Tooltip</h5>
                        <div className="flex align-items-center gap-2">
                            <span>
                                <inputtext_1.InputText type="text" placeholder="Username" tooltip="Your username"/>
                            </span>

                            <button_1.Button type="button" label="Save" icon="pi pi-check" tooltip="Click to proceed"/>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6">
                    <toast_1.Toast ref={toast}/>

                    <div className="card">
                        <h5>ConfirmPopup</h5>
                        <confirmpopup_1.ConfirmPopup />
                        <button_1.Button onClick={confirm} icon="pi pi-check" label="Confirm"></button_1.Button>
                    </div>
                </div>
            </div>
        </>);
};
exports.default = OverlayDemo;

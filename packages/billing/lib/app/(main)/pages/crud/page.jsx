"use strict";
/* eslint-disable @next/next/no-img-element */
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
const datatable_1 = require("primereact/datatable");
const dialog_1 = require("primereact/dialog");
const fileupload_1 = require("primereact/fileupload");
const inputnumber_1 = require("primereact/inputnumber");
const inputtext_1 = require("primereact/inputtext");
const inputtextarea_1 = require("primereact/inputtextarea");
const radiobutton_1 = require("primereact/radiobutton");
const rating_1 = require("primereact/rating");
const toast_1 = require("primereact/toast");
const toolbar_1 = require("primereact/toolbar");
const utils_1 = require("primereact/utils");
const react_1 = __importStar(require("react"));
const ProductService_1 = require("../../../../demo/service/ProductService");
/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Crud = () => {
    let emptyProduct = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const [products, setProducts] = (0, react_1.useState)(null);
    const [productDialog, setProductDialog] = (0, react_1.useState)(false);
    const [deleteProductDialog, setDeleteProductDialog] = (0, react_1.useState)(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = (0, react_1.useState)(false);
    const [product, setProduct] = (0, react_1.useState)(emptyProduct);
    const [selectedProducts, setSelectedProducts] = (0, react_1.useState)(null);
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const [globalFilter, setGlobalFilter] = (0, react_1.useState)('');
    const toast = (0, react_1.useRef)(null);
    const dt = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        ProductService_1.ProductService.getProducts().then((data) => setProducts(data));
    }, []);
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };
    const saveProduct = () => {
        setSubmitted(true);
        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);
                _products[index] = _product;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            }
            else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }
            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };
    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };
    const deleteProduct = () => {
        let _products = products?.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000
        });
    };
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products?.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };
    const exportCSV = () => {
        dt.current?.exportCSV();
    };
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };
    const deleteSelectedProducts = () => {
        let _products = products?.filter((val) => !selectedProducts?.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000
        });
    };
    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };
    const leftToolbarTemplate = () => {
        return (<react_1.default.Fragment>
                <div className="my-2">
                    <button_1.Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew}/>
                    <button_1.Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length}/>
                </div>
            </react_1.default.Fragment>);
    };
    const rightToolbarTemplate = () => {
        return (<react_1.default.Fragment>
                <fileupload_1.FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block"/>
                <button_1.Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV}/>
            </react_1.default.Fragment>);
    };
    const codeBodyTemplate = (rowData) => {
        return (<>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>);
    };
    const nameBodyTemplate = (rowData) => {
        return (<>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>);
    };
    const imageBodyTemplate = (rowData) => {
        return (<>
                <span className="p-column-title">Image</span>
                <img src={`/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100"/>
            </>);
    };
    const priceBodyTemplate = (rowData) => {
        return (<>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>);
    };
    const categoryBodyTemplate = (rowData) => {
        return (<>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>);
    };
    const ratingBodyTemplate = (rowData) => {
        return (<>
                <span className="p-column-title">Reviews</span>
                <rating_1.Rating value={rowData.rating} readOnly cancel={false}/>
            </>);
    };
    const statusBodyTemplate = (rowData) => {
        return (<>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>);
    };
    const actionBodyTemplate = (rowData) => {
        return (<>
                <button_1.Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduct(rowData)}/>
                <button_1.Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)}/>
            </>);
    };
    const header = (<div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search"/>
                <inputtext_1.InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..."/>
            </span>
        </div>);
    const productDialogFooter = (<>
            <button_1.Button label="Cancel" icon="pi pi-times" text onClick={hideDialog}/>
            <button_1.Button label="Save" icon="pi pi-check" text onClick={saveProduct}/>
        </>);
    const deleteProductDialogFooter = (<>
            <button_1.Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog}/>
            <button_1.Button label="Yes" icon="pi pi-check" text onClick={deleteProduct}/>
        </>);
    const deleteProductsDialogFooter = (<>
            <button_1.Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog}/>
            <button_1.Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts}/>
        </>);
    return (<div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <toast_1.Toast ref={toast}/>
                    <toolbar_1.Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></toolbar_1.Toolbar>

                    <datatable_1.DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        <column_1.Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></column_1.Column>
                        <column_1.Column field="code" header="Code" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></column_1.Column>
                        <column_1.Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></column_1.Column>
                        <column_1.Column header="Image" body={imageBodyTemplate}></column_1.Column>
                        <column_1.Column field="price" header="Price" body={priceBodyTemplate} sortable></column_1.Column>
                        <column_1.Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ minWidth: '10rem' }}></column_1.Column>
                        <column_1.Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></column_1.Column>
                        <column_1.Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></column_1.Column>
                        <column_1.Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></column_1.Column>
                    </datatable_1.DataTable>

                    <dialog_1.Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2"/>}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <inputtext_1.InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={(0, utils_1.classNames)({
            'p-invalid': submitted && !product.name
        })}/>
                            {submitted && !product.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <inputtextarea_1.InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20}/>
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <radiobutton_1.RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'}/>
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <radiobutton_1.RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'}/>
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <radiobutton_1.RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'}/>
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <radiobutton_1.RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'}/>
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <inputnumber_1.InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US"/>
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <inputnumber_1.InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')}/>
                            </div>
                        </div>
                    </dialog_1.Dialog>

                    <dialog_1.Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
                            {product && (<span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>)}
                        </div>
                    </dialog_1.Dialog>

                    <dialog_1.Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }}/>
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </dialog_1.Dialog>
                </div>
            </div>
        </div>);
};
exports.default = Crud;

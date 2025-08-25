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
const carousel_1 = require("primereact/carousel");
const galleria_1 = require("primereact/galleria");
const image_1 = require("primereact/image");
const react_1 = __importStar(require("react"));
const PhotoService_1 = require("../../../../demo/service/PhotoService");
const ProductService_1 = require("../../../../demo/service/ProductService");
const MediaDemo = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [images, setImages] = (0, react_1.useState)([]);
    const galleriaResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    (0, react_1.useEffect)(() => {
        ProductService_1.ProductService.getProductsSmall().then((products) => setProducts(products));
        PhotoService_1.PhotoService.getImages().then((images) => setImages(images));
    }, []);
    const carouselItemTemplate = (product) => {
        return (<div className="border-1 surface-border border-round m-1 text-center py-5">
                <div className="mb-3">
                    <img src={`/demo/images/product/${product.image}`} alt={product.name} className="w-6 shadow-2"/>
                </div>
                <div>
                    <h4 className="p-mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <span className={`product-badge status-${product.inventoryStatus?.toLowerCase()}`}>{product.inventoryStatus}</span>
                    <div className="car-buttons mt-5">
                        <button_1.Button type="button" className="mr-2" rounded icon="pi pi-search"></button_1.Button>
                        <button_1.Button type="button" className="mr-2" severity="success" rounded icon="pi pi-star"></button_1.Button>
                        <button_1.Button type="button" severity="help" rounded icon="pi pi-cog"></button_1.Button>
                    </div>
                </div>
            </div>);
    };
    const galleriaItemTemplate = (item) => <img src={`/${item.itemImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block' }}/>;
    const galleriaThumbnailTemplate = (item) => <img src={`/${item.thumbnailImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block' }}/>;
    return (<div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5>Carousel</h5>
                    <carousel_1.Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></carousel_1.Carousel>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Image</h5>
                    <div className="flex justify-content-center">
                        <image_1.Image src={`/demo/images/galleria/galleria10.jpg`} alt="Image" width="250" preview/>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Galleria</h5>
                    <galleria_1.Galleria value={images} responsiveOptions={galleriaResponsiveOptions} numVisible={7} circular style={{ maxWidth: '800px', margin: 'auto' }} item={galleriaItemTemplate} thumbnail={galleriaThumbnailTemplate}></galleria_1.Galleria>
                </div>
            </div>
        </div>);
};
exports.default = MediaDemo;

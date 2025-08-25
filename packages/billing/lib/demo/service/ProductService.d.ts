import { Demo } from '../../types';
export declare const ProductService: {
    getProductsSmall(): Promise<Demo.Product[]>;
    getProducts(): Promise<Demo.Product[]>;
    getProductsWithOrdersSmall(): Promise<Demo.Product[]>;
};

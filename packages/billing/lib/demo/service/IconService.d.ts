import { Demo } from '../../types';
export declare const IconService: {
    getIcons(): Promise<Demo.Icon[]>;
    getIcon(id: number): Demo.Icon | undefined;
};

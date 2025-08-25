import { TreeNode } from 'primereact/treenode';
export declare const NodeService: {
    getFiles(): Promise<TreeNode[]>;
    getLazyFiles(): Promise<TreeNode[]>;
    getFilesystem(): Promise<TreeNode[]>;
    getLazyFilesystem(): Promise<TreeNode[]>;
};

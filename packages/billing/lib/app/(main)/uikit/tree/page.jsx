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
const tree_1 = require("primereact/tree");
const treetable_1 = require("primereact/treetable");
const column_1 = require("primereact/column");
const NodeService_1 = require("../../../../demo/service/NodeService");
const TreeDemo = () => {
    const [files, setFiles] = (0, react_1.useState)([]);
    const [files2, setFiles2] = (0, react_1.useState)([]);
    const [selectedFileKeys, setSelectedFileKeys] = (0, react_1.useState)(null);
    const [selectedFileKeys2, setSelectedFileKeys2] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        NodeService_1.NodeService.getFiles().then((files) => setFiles(files));
        NodeService_1.NodeService.getFilesystem().then((files) => setFiles2(files));
    }, []);
    return (<div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Tree</h5>
                    <tree_1.Tree value={files} selectionMode="checkbox" selectionKeys={selectedFileKeys} onSelectionChange={(e) => setSelectedFileKeys(e.value)}/>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>TreeTable</h5>
                    <treetable_1.TreeTable value={files2} selectionMode="checkbox" selectionKeys={selectedFileKeys2} onSelectionChange={(e) => setSelectedFileKeys2(e.value)}>
                        <column_1.Column field="name" header="Name" expander/>
                        <column_1.Column field="size" header="Size"/>
                        <column_1.Column field="type" header="Type"/>
                    </treetable_1.TreeTable>
                </div>
            </div>
        </div>);
};
exports.default = TreeDemo;

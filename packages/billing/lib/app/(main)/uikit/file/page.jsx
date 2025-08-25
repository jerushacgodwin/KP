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
const fileupload_1 = require("primereact/fileupload");
const toast_1 = require("primereact/toast");
const FileDemo = () => {
    const toast = (0, react_1.useRef)(null);
    const onUpload = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Success',
            detail: 'File Uploaded',
            life: 3000
        });
    };
    return (<div className="grid">
            <toast_1.Toast ref={toast}></toast_1.Toast>
            <div className="col-12">
                <div className="card">
                    <h5>Advanced</h5>
                    <fileupload_1.FileUpload name="demo[]" url="/api/upload" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}/>

                    <h5>Basic</h5>
                    <fileupload_1.FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload}/>
                </div>
            </div>
        </div>);
};
exports.default = FileDemo;

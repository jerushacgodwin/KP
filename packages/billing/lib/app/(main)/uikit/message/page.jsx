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
const toast_1 = require("primereact/toast");
const messages_1 = require("primereact/messages");
const message_1 = require("primereact/message");
const inputtext_1 = require("primereact/inputtext");
const button_1 = require("primereact/button");
const MessagesDemo = () => {
    const [username, setUsername] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const toast = (0, react_1.useRef)(null);
    const message = (0, react_1.useRef)(null);
    const addSuccessMessage = () => {
        message.current?.show({ severity: 'success', content: 'Message Detail' });
    };
    const addInfoMessage = () => {
        message.current?.show({ severity: 'info', content: 'Message Detail' });
    };
    const addWarnMessage = () => {
        message.current?.show({ severity: 'warn', content: 'Message Detail' });
    };
    const addErrorMessage = () => {
        message.current?.show({ severity: 'error', content: 'Message Detail' });
    };
    const showSuccess = () => {
        toast.current?.show({
            severity: 'success',
            summary: 'Success Message',
            detail: 'Message Detail',
            life: 3000
        });
    };
    const showInfo = () => {
        toast.current?.show({
            severity: 'info',
            summary: 'Info Message',
            detail: 'Message Detail',
            life: 3000
        });
    };
    const showWarn = () => {
        toast.current?.show({
            severity: 'warn',
            summary: 'Warn Message',
            detail: 'Message Detail',
            life: 3000
        });
    };
    const showError = () => {
        toast.current?.show({
            severity: 'error',
            summary: 'Error Message',
            detail: 'Message Detail',
            life: 3000
        });
    };
    return (<div className="grid">
            <div className="col-12 lg:col-6">
                <div className="card">
                    <h5>Toast</h5>
                    <div className="flex flex-wrap gap-2">
                        <toast_1.Toast ref={toast}/>
                        <button_1.Button type="button" onClick={showSuccess} label="Success" severity="success"/>
                        <button_1.Button type="button" onClick={showInfo} label="Info" severity="info"/>
                        <button_1.Button type="button" onClick={showWarn} label="Warn" severity="warning"/>
                        <button_1.Button type="button" onClick={showError} label="Error" severity="danger"/>
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-6">
                <div className="card">
                    <h5>Messages</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Success" type="button" onClick={addSuccessMessage} severity="success"/>
                        <button_1.Button label="Info" type="button" onClick={addInfoMessage} severity="info"/>
                        <button_1.Button label="Warn" type="button" onClick={addWarnMessage} severity="warning"/>
                        <button_1.Button label="Error" type="button" onClick={addErrorMessage} severity="danger"/>
                    </div>
                    <messages_1.Messages ref={message}/>
                </div>
            </div>

            <div className="col-12 lg:col-8">
                <div className="card">
                    <h5>Inline</h5>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="username1" className="col-fixed w-9rem">
                            Username
                        </label>
                        <inputtext_1.InputText id="username1" value={username} onChange={(e) => setUsername(e.target.value)} required className="p-invalid"/>
                        <message_1.Message severity="error" text="Username is required"/>
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2">
                        <label htmlFor="email" className="col-fixed w-9rem">
                            Email
                        </label>
                        <inputtext_1.InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-invalid"/>
                        <message_1.Message severity="error"/>
                    </div>
                </div>
            </div>

            <div className="col-12 lg:col-4">
                <div className="card">
                    <h5>Help Text</h5>
                    <div className="field p-fluid">
                        <label htmlFor="username2">Username</label>
                        <inputtext_1.InputText id="username2" type="text" className="p-invalid" aria-describedby="username-help"/>
                        <small id="username-help" className="p-error">
                            Enter your username to reset your password.
                        </small>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = MessagesDemo;

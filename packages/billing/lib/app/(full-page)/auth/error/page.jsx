"use strict";
/* eslint-disable @next/next/no-img-element */
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("next/navigation");
const react_1 = __importDefault(require("react"));
const button_1 = require("primereact/button");
const ErrorPage = () => {
    const router = (0, navigation_1.useRouter)();
    return (<div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <img src="/demo/images/error/logo-error.svg" alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0"/>
                <div style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background: 'linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)'
        }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                        <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                            <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                        </div>
                        <h1 className="text-900 font-bold text-5xl mb-2">Error Occured</h1>
                        <div className="text-600 mb-5">Something went wrong.</div>
                        <img src="/demo/images/error/asset-error.svg" alt="Error" className="mb-5" width="80%"/>
                        <button_1.Button icon="pi pi-arrow-left" label="Go to Dashboard" text onClick={() => router.push('/')}/>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = ErrorPage;

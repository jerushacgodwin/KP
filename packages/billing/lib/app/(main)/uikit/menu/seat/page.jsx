"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const page_1 = __importDefault(require("../page"));
function SeatDemo() {
    return (<page_1.default>
            <div className="flex align-items-center py-5 px-3">
                <i className="pi pi-fw pi-ticket mr-2 text-2xl"/>
                <p className="m-0 text-lg">Seat Component Content via Child Route</p>
            </div>
        </page_1.default>);
}
exports.default = SeatDemo;

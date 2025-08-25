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
const inputtext_1 = require("primereact/inputtext");
const button_1 = require("primereact/button");
const inputtextarea_1 = require("primereact/inputtextarea");
const dropdown_1 = require("primereact/dropdown");
const FormLayoutDemo = () => {
    const [dropdownItem, setDropdownItem] = (0, react_1.useState)(null);
    const dropdownItems = (0, react_1.useMemo)(() => [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ], []);
    (0, react_1.useEffect)(() => {
        setDropdownItem(dropdownItems[0]);
    }, [dropdownItems]);
    return (<div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Vertical</h5>
                    <div className="field">
                        <label htmlFor="name1">Name</label>
                        <inputtext_1.InputText id="name1" type="text"/>
                    </div>
                    <div className="field">
                        <label htmlFor="email1">Email</label>
                        <inputtext_1.InputText id="email1" type="text"/>
                    </div>
                    <div className="field">
                        <label htmlFor="age1">Age</label>
                        <inputtext_1.InputText id="age1" type="text"/>
                    </div>
                </div>

                <div className="card p-fluid">
                    <h5>Vertical Grid</h5>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name2">Name</label>
                            <inputtext_1.InputText id="name2" type="text"/>
                        </div>
                        <div className="field col">
                            <label htmlFor="email2">Email</label>
                            <inputtext_1.InputText id="email2" type="text"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Horizontal</h5>
                    <div className="field grid">
                        <label htmlFor="name3" className="col-12 mb-2 md:col-2 md:mb-0">
                            Name
                        </label>
                        <div className="col-12 md:col-10">
                            <inputtext_1.InputText id="name3" type="text"/>
                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="email3" className="col-12 mb-2 md:col-2 md:mb-0">
                            Email
                        </label>
                        <div className="col-12 md:col-10">
                            <inputtext_1.InputText id="email3" type="text"/>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h5>Inline</h5>
                    <div className="formgroup-inline">
                        <div className="field">
                            <label htmlFor="firstname1" className="p-sr-only">
                                Firstname
                            </label>
                            <inputtext_1.InputText id="firstname1" type="text" placeholder="Firstname"/>
                        </div>
                        <div className="field">
                            <label htmlFor="lastname1" className="p-sr-only">
                                Lastname
                            </label>
                            <inputtext_1.InputText id="lastname1" type="text" placeholder="Lastname"/>
                        </div>
                        <button_1.Button label="Submit"></button_1.Button>
                    </div>
                </div>

                <div className="card">
                    <h5>Help Text</h5>
                    <div className="field p-fluid">
                        <label htmlFor="username">Username</label>
                        <inputtext_1.InputText id="username" type="text"/>
                        <small>Enter your username to reset your password.</small>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Advanced</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Firstname</label>
                            <inputtext_1.InputText id="firstname2" type="text"/>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Lastname</label>
                            <inputtext_1.InputText id="lastname2" type="text"/>
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Address</label>
                            <inputtextarea_1.InputTextarea id="address" rows={4}/>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="city">City</label>
                            <inputtext_1.InputText id="city" type="text"/>
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">State</label>
                            <dropdown_1.Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></dropdown_1.Dropdown>
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="zip">Zip</label>
                            <inputtext_1.InputText id="zip" type="text"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = FormLayoutDemo;

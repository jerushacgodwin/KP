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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const splitbutton_1 = require("primereact/splitbutton");
const button_1 = require("primereact/button");
const index_module_scss_1 = __importDefault(require("./index.module.scss"));
const utils_1 = require("primereact/utils");
const ButtonDemo = () => {
    const [loading1, setLoading1] = (0, react_1.useState)(false);
    const [loading2, setLoading2] = (0, react_1.useState)(false);
    const [loading3, setLoading3] = (0, react_1.useState)(false);
    const [loading4, setLoading4] = (0, react_1.useState)(false);
    const onLoadingClick1 = () => {
        setLoading1(true);
        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    };
    const onLoadingClick2 = () => {
        setLoading2(true);
        setTimeout(() => {
            setLoading2(false);
        }, 2000);
    };
    const onLoadingClick3 = () => {
        setLoading3(true);
        setTimeout(() => {
            setLoading3(false);
        }, 2000);
    };
    const onLoadingClick4 = () => {
        setLoading4(true);
        setTimeout(() => {
            setLoading4(false);
        }, 2000);
    };
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        },
        {
            label: 'Home',
            icon: 'pi pi-home'
        }
    ];
    return (<div className="grid">
            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Default</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Submit"></button_1.Button>
                        <button_1.Button label="Disabled" disabled></button_1.Button>
                        <button_1.Button label="Link" link></button_1.Button>
                    </div>
                </div>

                <div className="card">
                    <h5>Severities</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Primary"/>
                        <button_1.Button label="Secondary" severity="secondary"/>
                        <button_1.Button label="Success" severity="success"/>
                        <button_1.Button label="Info" severity="info"/>
                        <button_1.Button label="Warning" severity="warning"/>
                        <button_1.Button label="Help" severity="help"/>
                        <button_1.Button label="Danger" severity="danger"/>
                    </div>
                </div>

                <div className="card">
                    <h5>Text</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Primary" text/>
                        <button_1.Button label="Secondary" severity="secondary" text/>
                        <button_1.Button label="Success" severity="success" text/>
                        <button_1.Button label="Info" severity="info" text/>
                        <button_1.Button label="Warning" severity="warning" text/>
                        <button_1.Button label="Help" severity="help" text/>
                        <button_1.Button label="Danger" severity="danger" text/>
                        <button_1.Button label="Plain" className="p-button-plain" text/>
                    </div>
                </div>

                <div className="card">
                    <h5>Outlined</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Primary" outlined/>
                        <button_1.Button label="Secondary" severity="secondary" outlined/>
                        <button_1.Button label="Success" severity="success" outlined/>
                        <button_1.Button label="Info" severity="info" outlined/>
                        <button_1.Button label="Warning" severity="warning" outlined/>
                        <button_1.Button label="Help" severity="help" outlined/>
                        <button_1.Button label="Danger" severity="danger" outlined/>
                    </div>
                </div>

                <div className="card">
                    <h5>Button Group</h5>
                    <span className="p-buttonset flex">
                        <button_1.Button label="Save" icon="pi pi-check"/>
                        <button_1.Button label="Delete" icon="pi pi-trash"/>
                        <button_1.Button label="Cancel" icon="pi pi-times"/>
                    </span>
                </div>

                <div className="card">
                    <h5>SplitButton</h5>
                    <div className="flex flex-wrap gap-2">
                        <splitbutton_1.SplitButton label="Save" icon="pi pi-check" model={items} severity="secondary"></splitbutton_1.SplitButton>
                        <splitbutton_1.SplitButton label="Save" icon="pi pi-check" model={items} severity="success"></splitbutton_1.SplitButton>
                        <splitbutton_1.SplitButton label="Save" icon="pi pi-check" model={items} severity="info"></splitbutton_1.SplitButton>
                        <splitbutton_1.SplitButton label="Save" icon="pi pi-check" model={items} severity="warning"></splitbutton_1.SplitButton>
                        <splitbutton_1.SplitButton label="Save" icon="pi pi-check" model={items} severity="danger"></splitbutton_1.SplitButton>
                    </div>
                </div>

                <div className="card">
                    <h5>Template</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button className={(0, utils_1.classNames)(index_module_scss_1.default['p-button'], index_module_scss_1.default['google'])} aria-label="Google">
                            <span className="flex align-items-center px-2 bg-purple-700 text-white">
                                <i className="pi pi-google"></i>
                            </span>
                            <span className="px-3 py-2 flex align-items-center text-white">Google</span>
                        </button_1.Button>
                        <button_1.Button className={(0, utils_1.classNames)(index_module_scss_1.default['p-button'], index_module_scss_1.default['twitter'])} aria-label="Twitter">
                            <span className="flex align-items-center px-2 bg-blue-500 text-white">
                                <i className="pi pi-twitter"></i>
                            </span>
                            <span className="px-3 py-2 flex align-items-center text-white">Twitter</span>
                        </button_1.Button>
                        <button_1.Button className={(0, utils_1.classNames)(index_module_scss_1.default['p-button'], index_module_scss_1.default['discord'])} aria-label="Discord">
                            <span className="flex align-items-center px-2 bg-bluegray-800 text-white">
                                <i className="pi pi-discord"></i>
                            </span>
                            <span className="px-3 py-2 flex align-items-center text-white">Discord</span>
                        </button_1.Button>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Icons</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button icon="pi pi-star-fill"></button_1.Button>
                        <button_1.Button label="Bookmark" icon="pi pi-bookmark"></button_1.Button>
                        <button_1.Button label="Bookmark" icon="pi pi-bookmark" iconPos="right"></button_1.Button>
                    </div>
                </div>

                <div className="card">
                    <h5>Raised</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Primary" raised/>
                        <button_1.Button label="Secondary" raised severity="secondary"/>
                        <button_1.Button label="Success" raised severity="success"/>
                        <button_1.Button label="Info" raised severity="info"/>
                        <button_1.Button label="Warning" raised severity="warning"/>
                        <button_1.Button label="Help" raised severity="help"/>
                        <button_1.Button label="Danger" raised severity="danger"/>
                    </div>
                </div>

                <div className="card">
                    <h5>Rounded</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Primary" rounded/>
                        <button_1.Button label="Secondary" rounded severity="secondary"/>
                        <button_1.Button label="Success" rounded severity="success"/>
                        <button_1.Button label="Info" rounded severity="info"/>
                        <button_1.Button label="Warning" rounded severity="warning"/>
                        <button_1.Button label="Help" rounded severity="help"/>
                        <button_1.Button label="Danger" rounded severity="danger"/>
                    </div>
                </div>

                <div className="card">
                    <h5>Rounded Icons</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button icon="pi pi-check" rounded/>
                        <button_1.Button icon="pi pi-bookmark" rounded severity="secondary"/>
                        <button_1.Button icon="pi pi-search" rounded severity="success"/>
                        <button_1.Button icon="pi pi-user" rounded severity="info"/>
                        <button_1.Button icon="pi pi-bell" rounded severity="warning"/>
                        <button_1.Button icon="pi pi-heart" rounded severity="help"/>
                        <button_1.Button icon="pi pi-times" rounded severity="danger"/>
                    </div>
                </div>

                <div className="card">
                    <h5>Rounded Text</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button icon="pi pi-check" rounded text/>
                        <button_1.Button icon="pi pi-bookmark" rounded text severity="secondary"/>
                        <button_1.Button icon="pi pi-search" rounded text severity="success"/>
                        <button_1.Button icon="pi pi-user" rounded text severity="info"/>
                        <button_1.Button icon="pi pi-bell" rounded text severity="warning"/>
                        <button_1.Button icon="pi pi-heart" rounded text severity="help"/>
                        <button_1.Button icon="pi pi-times" rounded text severity="danger"/>
                        <button_1.Button icon="pi pi-filter" rounded text className="p-button-plain"/>
                    </div>
                </div>

                <div className="card">
                    <h5>Rounded Outlined</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button icon="pi pi-check" rounded outlined/>
                        <button_1.Button icon="pi pi-bookmark" rounded outlined severity="secondary"/>
                        <button_1.Button icon="pi pi-search" rounded outlined severity="success"/>
                        <button_1.Button icon="pi pi-user" rounded outlined severity="info"/>
                        <button_1.Button icon="pi pi-bell" rounded outlined severity="warning"/>
                        <button_1.Button icon="pi pi-heart" rounded outlined severity="help"/>
                        <button_1.Button icon="pi pi-times" rounded outlined severity="danger"/>
                    </div>
                </div>

                <div className="card">
                    <h5>Loading</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button label="Search" icon="pi pi-search" loading={loading1} onClick={onLoadingClick1}/>
                        <button_1.Button label="Search" icon="pi pi-search" iconPos="right" loading={loading2} onClick={onLoadingClick2}/>
                        <button_1.Button icon="pi pi-search" loading={loading3} onClick={onLoadingClick3}/>
                        <button_1.Button label="Search" loading={loading4} onClick={onLoadingClick4}/>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = ButtonDemo;

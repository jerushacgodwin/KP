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
const link_1 = __importDefault(require("next/link"));
const IconService_1 = require("../../../../demo/service/IconService");
const inputtext_1 = require("primereact/inputtext");
const IconsDemo = () => {
    const [icons, setIcons] = (0, react_1.useState)([]);
    const [filteredIcons, setFilteredIcons] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        IconService_1.IconService.getIcons().then((data) => {
            data.sort((icon1, icon2) => {
                if (icon1.properties.name < icon2.properties.name)
                    return -1;
                else if (icon1.properties.name < icon2.properties.name)
                    return 1;
                else
                    return 0;
            });
            setIcons(data);
            setFilteredIcons(data);
        });
    }, []);
    const onFilter = (event) => {
        if (!event.currentTarget.value) {
            setFilteredIcons(icons);
        }
        else {
            setFilteredIcons(icons.filter((it) => {
                return it.icon && it.icon.tags && it.icon.tags[0].includes(event.currentTarget.value);
            }));
        }
    };
    return (<div className="card">
            <h2>Icons</h2>
            <p>
                PrimeReact components internally use{' '}
                <link_1.default href="https://github.com/primefaces/primeicons" className="font-medium hover:underline text-primary" target={'_blank'}>
                    PrimeIcons
                </link_1.default>{' '}
                library, the official icons suite from{' '}
                <link_1.default href="https://www.primetek.com.tr" className="font-medium hover:underline text-primary" target={'_blank'}>
                    PrimeTek
                </link_1.default>
                .
            </p>
            <h4>Download</h4>
            <p>PrimeIcons is available at npm, run the following command to download it to your project.</p>
            <pre className="app-code">
                <code>{`npm install primeicons --save`}</code>
            </pre>
            <h4>Getting Started</h4>
            <p>
                PrimeIcons use the <strong>pi pi-&#123;icon&#125;</strong> syntax such as <strong>pi pi-check</strong>. A standalone icon can be displayed using an element like <i>i</i> or <i>span</i>
            </p>
            <pre className="app-code">
                <code>
                    {`<i className="pi pi-check" style={{ marginRight: '.5rem' }}></i>
<i className="pi pi-times"></i>`}
                </code>
            </pre>
            <h4>Size</h4>
            <p>Size of the icons can easily be changed using font-size property.</p>
            <pre className="app-code">
                <code>
                    {`
<i className="pi pi-check"></i>
`}
                </code>
            </pre>
            <i className="pi pi-check"></i>

            <pre className="app-code">
                <code>
                    {`
<i className="pi pi-check" style={{ fontSize: '2rem' }}></i>
`}
                </code>
            </pre>
            <i className="pi pi-check" style={{ fontSize: '2rem' }}></i>
            <h4>Spinning Animation</h4>
            <p>Special pi-spin class applies continuous rotation to an icon.</p>
            <pre className="app-code">
                <code>{`<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>`}</code>
            </pre>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
            <h4>List of Icons</h4>
            <p>
                Here is the current list of PrimeIcons, more icons are added periodically. You may also{' '}
                <link_1.default href="https://github.com/primefaces/primeicons/issues" className="font-medium hover:underline text-primary" target={'_blank'}>
                    request new icons
                </link_1.default>{' '}
                at the issue tracker.
            </p>
            <div>
                <inputtext_1.InputText type="text" className="w-full p-3 mt-3 mb-5" onInput={onFilter} placeholder="Search an icon"/>
            </div>
            <div className="grid icons-list text-center">
                {filteredIcons &&
            filteredIcons.map((iconMeta) => {
                const { icon, properties } = iconMeta;
                return (icon?.tags?.indexOf('deprecate') === -1 && (<div className="col-6 sm:col-4 lg:col-3 xl:col-2 pb-5" key={properties?.name}>
                                    <i className={'text-2xl mb-2 pi pi-' + properties?.name}></i>
                                    <div>pi-{properties?.name}</div>
                                </div>));
            })}
            </div>
        </div>);
};
exports.default = IconsDemo;

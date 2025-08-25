"use strict";
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
const tooltip_1 = require("primereact/tooltip");
const utils_1 = require("primereact/utils");
const react_1 = __importStar(require("react"));
const BlockViewer = (props) => {
    const [blockView, setBlockView] = (0, react_1.useState)('PREVIEW');
    const actionCopyRef = (0, react_1.useRef)(null);
    const copyCode = async (event) => {
        await navigator.clipboard.writeText(props.code);
        event.preventDefault();
    };
    return (<div className="block-viewer">
            <div className="block-section">
                <div className="block-header">
                    <span className="block-title">
                        <span>{props.header}</span>
                        {props.new && <span className="badge-new">New</span>}
                        {props.free && <span className="badge-free">Free</span>}
                    </span>
                    <div className="block-actions">
                        <button tabIndex={0} className={(0, utils_1.classNames)('p-link', { 'block-action-active': blockView === 'PREVIEW' })} onClick={() => setBlockView('PREVIEW')}>
                            <span>Preview</span>
                        </button>
                        <button className={(0, utils_1.classNames)('p-link', { 'block-action-active': blockView === 'CODE' })} onClick={() => setBlockView('CODE')}>
                            <span>Code</span>
                        </button>
                        <button ref={actionCopyRef} tabIndex={0} className="p-link block-action-copy" onClick={copyCode}>
                            <i className="pi pi-copy"></i>
                        </button>
                        <tooltip_1.Tooltip target={actionCopyRef} position="bottom" content="Copied to clipboard" event="focus"/>
                    </div>
                </div>
                <div className="block-content">
                    {blockView === 'PREVIEW' && (<div className={props.containerClassName} style={props.previewStyle}>
                            {props.children}
                        </div>)}

                    {blockView === 'CODE' && (<pre className="app-code">
                            <code>{props.code}</code>
                        </pre>)}
                </div>
            </div>
        </div>);
};
exports.default = BlockViewer;

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
const api_1 = require("primereact/api");
const button_1 = require("primereact/button");
const inputswitch_1 = require("primereact/inputswitch");
const radiobutton_1 = require("primereact/radiobutton");
const sidebar_1 = require("primereact/sidebar");
const utils_1 = require("primereact/utils");
const react_1 = __importStar(require("react"));
const layoutcontext_1 = require("./context/layoutcontext");
const AppConfig = (props) => {
    const [scales] = (0, react_1.useState)([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = (0, react_1.useContext)(layoutcontext_1.LayoutContext);
    const { setRipple, changeTheme } = (0, react_1.useContext)(api_1.PrimeReactContext);
    const onConfigButtonClick = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: true }));
    };
    const onConfigSidebarHide = () => {
        setLayoutState((prevState) => ({ ...prevState, configSidebarVisible: false }));
    };
    const changeInputStyle = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };
    const changeRipple = (e) => {
        setRipple?.(e.value);
        setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
    };
    const changeMenuMode = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };
    const _changeTheme = (theme, colorScheme) => {
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState) => ({ ...prevState, theme, colorScheme }));
        });
    };
    const decrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale - 1 }));
    };
    const incrementScale = () => {
        setLayoutConfig((prevState) => ({ ...prevState, scale: prevState.scale + 1 }));
    };
    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + 'px';
    };
    (0, react_1.useEffect)(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);
    return (<>
            <button className="layout-config-button config-link" type="button" onClick={onConfigButtonClick}>
                <i className="pi pi-cog"></i>
            </button>

            <sidebar_1.Sidebar visible={layoutState.configSidebarVisible} onHide={onConfigSidebarHide} position="right" className="layout-config-sidebar w-20rem">
                {!props.simple && (<>
                        <h5>Scale</h5>
                        <div className="flex align-items-center">
                            <button_1.Button icon="pi pi-minus" type="button" onClick={decrementScale} rounded text className="w-2rem h-2rem mr-2" disabled={layoutConfig.scale === scales[0]}></button_1.Button>
                            <div className="flex gap-2 align-items-center">
                                {scales.map((item) => {
                return <i className={(0, utils_1.classNames)('pi pi-circle-fill', { 'text-primary-500': item === layoutConfig.scale, 'text-300': item !== layoutConfig.scale })} key={item}></i>;
            })}
                            </div>
                            <button_1.Button icon="pi pi-plus" type="button" onClick={incrementScale} rounded text className="w-2rem h-2rem ml-2" disabled={layoutConfig.scale === scales[scales.length - 1]}></button_1.Button>
                        </div>

                        <h5>Menu Type</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <radiobutton_1.RadioButton name="menuMode" value={'static'} checked={layoutConfig.menuMode === 'static'} onChange={(e) => changeMenuMode(e)} inputId="mode1"></radiobutton_1.RadioButton>
                                <label htmlFor="mode1">Static</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <radiobutton_1.RadioButton name="menuMode" value={'overlay'} checked={layoutConfig.menuMode === 'overlay'} onChange={(e) => changeMenuMode(e)} inputId="mode2"></radiobutton_1.RadioButton>
                                <label htmlFor="mode2">Overlay</label>
                            </div>
                        </div>

                        <h5>Input Style</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <radiobutton_1.RadioButton name="inputStyle" value={'outlined'} checked={layoutConfig.inputStyle === 'outlined'} onChange={(e) => changeInputStyle(e)} inputId="outlined_input"></radiobutton_1.RadioButton>
                                <label htmlFor="outlined_input">Outlined</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <radiobutton_1.RadioButton name="inputStyle" value={'filled'} checked={layoutConfig.inputStyle === 'filled'} onChange={(e) => changeInputStyle(e)} inputId="filled_input"></radiobutton_1.RadioButton>
                                <label htmlFor="filled_input">Filled</label>
                            </div>
                        </div>

                        <h5>Ripple Effect</h5>
                        <inputswitch_1.InputSwitch checked={layoutConfig.ripple} onChange={(e) => changeRipple(e)}></inputswitch_1.InputSwitch>
                    </>)}
                <h5>PrimeOne Design</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-light-indigo', 'light')}>
                            <img src="/layout/images/themes/lara-light-indigo.png" className="w-2rem h-2rem" alt="Lara Light Indigo"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-light-blue', 'light')}>
                            <img src="/layout/images/themes/lara-light-blue.png" className="w-2rem h-2rem" alt="Lara Light Blue"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-light-purple', 'light')}>
                            <img src="/layout/images/themes/lara-light-purple.png" className="w-2rem h-2rem" alt="Lara Light Purple"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-light-teal', 'light')}>
                            <img src="/layout/images/themes/lara-light-teal.png" className="w-2rem h-2rem" alt="Lara Light Teal"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-dark-indigo', 'dark')}>
                            <img src="/layout/images/themes/lara-dark-indigo.png" className="w-2rem h-2rem" alt="Lara Dark Indigo"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-dark-blue', 'dark')}>
                            <img src="/layout/images/themes/lara-dark-blue.png" className="w-2rem h-2rem" alt="Lara Dark Blue"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-dark-purple', 'dark')}>
                            <img src="/layout/images/themes/lara-dark-purple.png" className="w-2rem h-2rem" alt="Lara Dark Purple"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('lara-dark-teal', 'dark')}>
                            <img src="/layout/images/themes/lara-dark-teal.png" className="w-2rem h-2rem" alt="Lara Dark Teal"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('soho-light', 'light')}>
                            <img src="/layout/images/themes/soho-light.png" className="w-2rem h-2rem" alt="Soho Light"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('soho-dark', 'dark')}>
                            <img src="/layout/images/themes/soho-dark.png" className="w-2rem h-2rem" alt="Soho Dark"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('viva-light', 'light')}>
                            <img src="/layout/images/themes/viva-light.svg" className="w-2rem h-2rem" alt="Viva Light"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('viva-dark', 'dark')}>
                            <img src="/layout/images/themes/viva-dark.svg" className="w-2rem h-2rem" alt="Viva Dark"/>
                        </button>
                    </div>
                </div>

                <h5>Bootstrap</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-light-blue', 'light')}>
                            <img src="/layout/images/themes/bootstrap4-light-blue.svg" className="w-2rem h-2rem" alt="Bootstrap Light Blue"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-light-purple', 'light')}>
                            <img src="/layout/images/themes/bootstrap4-light-purple.svg" className="w-2rem h-2rem" alt="Bootstrap Light Purple"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-dark-blue', 'dark')}>
                            <img src="/layout/images/themes/bootstrap4-dark-blue.svg" className="w-2rem h-2rem" alt="Bootstrap Dark Blue"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('bootstrap4-dark-purple', 'dark')}>
                            <img src="/layout/images/themes/bootstrap4-dark-purple.svg" className="w-2rem h-2rem" alt="Bootstrap Dark Purple"/>
                        </button>
                    </div>
                </div>

                <h5>Material Design</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-light-indigo', 'light')}>
                            <img src="/layout/images/themes/md-light-indigo.svg" className="w-2rem h-2rem" alt="Material Light Indigo"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-light-deeppurple', 'light')}>
                            <img src="/layout/images/themes/md-light-deeppurple.svg" className="w-2rem h-2rem" alt="Material Light DeepPurple"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-dark-indigo', 'dark')}>
                            <img src="/layout/images/themes/md-dark-indigo.svg" className="w-2rem h-2rem" alt="Material Dark Indigo"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('md-dark-deeppurple', 'dark')}>
                            <img src="/layout/images/themes/md-dark-deeppurple.svg" className="w-2rem h-2rem" alt="Material Dark DeepPurple"/>
                        </button>
                    </div>
                </div>

                <h5>Material Design Compact</h5>
                <div className="grid">
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-light-indigo', 'light')}>
                            <img src="/layout/images/themes/md-light-indigo.svg" className="w-2rem h-2rem" alt="Material Light Indigo"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-light-deeppurple', 'light')}>
                            <img src="/layout/images/themes/md-light-deeppurple.svg" className="w-2rem h-2rem" alt="Material Light Deep Purple"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-dark-indigo', 'dark')}>
                            <img src="/layout/images/themes/md-dark-indigo.svg" className="w-2rem h-2rem" alt="Material Dark Indigo"/>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="p-link w-2rem h-2rem" onClick={() => _changeTheme('mdc-dark-deeppurple', 'dark')}>
                            <img src="/layout/images/themes/md-dark-deeppurple.svg" className="w-2rem h-2rem" alt="Material Dark Deep Purple"/>
                        </button>
                    </div>
                </div>
            </sidebar_1.Sidebar>
        </>);
};
exports.default = AppConfig;

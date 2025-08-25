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
const link_1 = __importDefault(require("next/link"));
const ripple_1 = require("primereact/ripple");
const utils_1 = require("primereact/utils");
const react_1 = __importStar(require("react"));
const menucontext_1 = require("./context/menucontext");
const navigation_1 = require("next/navigation");
const AppMenuitem = (props) => {
    const pathname = (0, navigation_1.usePathname)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const { activeMenu, setActiveMenu } = (0, react_1.useContext)(menucontext_1.MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isActiveRoute = item.to && pathname === item.to;
    const active = activeMenu === key || activeMenu.startsWith(key + '-');
    const onRouteChange = (url) => {
        if (item.to && item.to === url) {
            setActiveMenu(key);
        }
    };
    (0, react_1.useEffect)(() => {
        onRouteChange(pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams]);
    const itemClick = (event) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }
        // toggle active state
        if (item.items)
            setActiveMenu(active ? props.parentKey : key);
        else
            setActiveMenu(key);
    };
    const subMenu = item.items && item.visible !== false && (<div className="layout-submenu" key={item.label}>
            <ul>
                {item.items.map((child, i) => {
            return <AppMenuitem item={child} index={i} className={child.badgeClass} parentKey={key} key={child.label}/>;
        })}
            </ul>
        </div>);
    return (<li className={(0, utils_1.classNames)({ 'layout-root-menuitem': props.root, 'active-menuitem': active })}>
            {props.root && item.visible !== false && <div className="layout-menuitem-root-text">{item.label}</div>}
            {(!item.to || item.items) && item.visible !== false ? (<a href={item.url} onClick={(e) => itemClick(e)} className={(0, utils_1.classNames)(item.class, 'p-ripple')} target={item.target} tabIndex={0}>
                    <i className={(0, utils_1.classNames)('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <ripple_1.Ripple />
                </a>) : null}

            {item.to && !item.items && item.visible !== false ? (<link_1.default href={item.to} replace={item.replaceUrl} target={item.target} onClick={(e) => itemClick(e)} className={(0, utils_1.classNames)(item.class, 'p-ripple', { 'active-route': isActiveRoute })} tabIndex={0}>
                    <i className={(0, utils_1.classNames)('layout-menuitem-icon', item.icon)}></i>
                    <span className="layout-menuitem-text">{item.label}</span>
                    {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
                    <ripple_1.Ripple />
                </link_1.default>) : null}

            {subMenu}
        </li>);
};
exports.default = AppMenuitem;

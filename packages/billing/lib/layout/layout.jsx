"use strict";
/* eslint-disable react-hooks/exhaustive-deps */
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
const hooks_1 = require("primereact/hooks");
const react_1 = __importStar(require("react"));
const utils_1 = require("primereact/utils");
const AppFooter_1 = __importDefault(require("./AppFooter"));
const AppSidebar_1 = __importDefault(require("./AppSidebar"));
const AppTopbar_1 = __importDefault(require("./AppTopbar"));
const AppConfig_1 = __importDefault(require("./AppConfig"));
const layoutcontext_1 = require("./context/layoutcontext");
const api_1 = require("primereact/api");
const navigation_1 = require("next/navigation");
const Layout = ({ children }) => {
    const { layoutConfig, layoutState, setLayoutState } = (0, react_1.useContext)(layoutcontext_1.LayoutContext);
    const { setRipple } = (0, react_1.useContext)(api_1.PrimeReactContext);
    const topbarRef = (0, react_1.useRef)(null);
    const sidebarRef = (0, react_1.useRef)(null);
    const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = (0, hooks_1.useEventListener)({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(sidebarRef.current?.isSameNode(event.target) ||
                sidebarRef.current?.contains(event.target) ||
                topbarRef.current?.menubutton?.isSameNode(event.target) ||
                topbarRef.current?.menubutton?.contains(event.target));
            if (isOutsideClicked) {
                hideMenu();
            }
        }
    });
    const pathname = (0, navigation_1.usePathname)();
    const searchParams = (0, navigation_1.useSearchParams)();
    (0, react_1.useEffect)(() => {
        hideMenu();
        hideProfileMenu();
    }, [pathname, searchParams]);
    const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = (0, hooks_1.useEventListener)({
        type: 'click',
        listener: (event) => {
            const isOutsideClicked = !(topbarRef.current?.topbarmenu?.isSameNode(event.target) ||
                topbarRef.current?.topbarmenu?.contains(event.target) ||
                topbarRef.current?.topbarmenubutton?.isSameNode(event.target) ||
                topbarRef.current?.topbarmenubutton?.contains(event.target));
            if (isOutsideClicked) {
                hideProfileMenu();
            }
        }
    });
    const hideMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false
        }));
        unbindMenuOutsideClickListener();
        unblockBodyScroll();
    };
    const hideProfileMenu = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: false
        }));
        unbindProfileMenuOutsideClickListener();
    };
    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };
    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };
    (0, react_1.useEffect)(() => {
        if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
            bindMenuOutsideClickListener();
        }
        layoutState.staticMenuMobileActive && blockBodyScroll();
    }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive]);
    (0, react_1.useEffect)(() => {
        if (layoutState.profileSidebarVisible) {
            bindProfileMenuOutsideClickListener();
        }
    }, [layoutState.profileSidebarVisible]);
    (0, hooks_1.useUnmountEffect)(() => {
        unbindMenuOutsideClickListener();
        unbindProfileMenuOutsideClickListener();
    });
    const containerClass = (0, utils_1.classNames)('layout-wrapper', {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive,
        'p-input-filled': layoutConfig.inputStyle === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple
    });
    return (<react_1.default.Fragment>
            <div className={containerClass}>
                <AppTopbar_1.default ref={topbarRef}/>
                <div ref={sidebarRef} className="layout-sidebar">
                    <AppSidebar_1.default />
                </div>
                <div className="layout-main-container">
                    <div className="layout-main">{children}</div>
                    <AppFooter_1.default />
                </div>
                <AppConfig_1.default />
                <div className="layout-mask"></div>
            </div>
        </react_1.default.Fragment>);
};
exports.default = Layout;

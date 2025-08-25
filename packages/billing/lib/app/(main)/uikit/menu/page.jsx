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
const menubar_1 = require("primereact/menubar");
const inputtext_1 = require("primereact/inputtext");
const breadcrumb_1 = require("primereact/breadcrumb");
const steps_1 = require("primereact/steps");
const tabmenu_1 = require("primereact/tabmenu");
const tieredmenu_1 = require("primereact/tieredmenu");
const menu_1 = require("primereact/menu");
const button_1 = require("primereact/button");
const contextmenu_1 = require("primereact/contextmenu");
const megamenu_1 = require("primereact/megamenu");
const panelmenu_1 = require("primereact/panelmenu");
const navigation_1 = require("next/navigation");
const navigation_2 = require("next/navigation");
const MenuDemo = ({ children }) => {
    const [activeIndex, setActiveIndex] = (0, react_1.useState)(0);
    const menu = (0, react_1.useRef)(null);
    const contextMenu = (0, react_1.useRef)(null);
    const router = (0, navigation_1.useRouter)();
    const pathname = (0, navigation_2.usePathname)();
    const checkActiveIndex = (0, react_1.useCallback)(() => {
        const paths = pathname.split('/');
        const currentPath = paths[paths.length - 1];
        switch (currentPath) {
            case 'seat':
                setActiveIndex(1);
                break;
            case 'payment':
                setActiveIndex(2);
                break;
            case 'confirmation':
                setActiveIndex(3);
                break;
            default:
                break;
        }
    }, [pathname]);
    (0, react_1.useEffect)(() => {
        checkActiveIndex();
    }, [checkActiveIndex]);
    const nestedMenuitems = [
        {
            label: 'Customers',
            icon: 'pi pi-fw pi-table',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'Customer',
                            icon: 'pi pi-fw pi-plus'
                        },
                        {
                            label: 'Duplicate',
                            icon: 'pi pi-fw pi-copy'
                        }
                    ]
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit'
                }
            ]
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search'
                }
            ]
        },
        {
            label: 'Shipments',
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass'
                },
                {
                    label: 'Map',
                    icon: 'pi pi-fw pi-map-marker'
                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-pencil'
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out'
        }
    ];
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
    const wizardItems = [
        { label: 'Personal', command: () => router.push('/uikit/menu') },
        { label: 'Seat', command: () => router.push('/uikit/menu/seat') },
        { label: 'Payment', command: () => router.push('/uikit/menu/payment') },
        {
            label: 'Confirmation',
            command: () => router.push('/uikit/menu/confirmation')
        }
    ];
    const tieredMenuItems = [
        {
            label: 'Customers',
            icon: 'pi pi-fw pi-table',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'Customer',
                            icon: 'pi pi-fw pi-plus'
                        },
                        {
                            label: 'Duplicate',
                            icon: 'pi pi-fw pi-copy'
                        }
                    ]
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit'
                }
            ]
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search'
                }
            ]
        },
        {
            label: 'Shipments',
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass'
                },
                {
                    label: 'Map',
                    icon: 'pi pi-fw pi-map-marker'
                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-pencil'
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }
            ]
        },
        {
            separator: true
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-sign-out'
        }
    ];
    const overlayMenuItems = [
        {
            label: 'Save',
            icon: 'pi pi-save'
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            separator: true
        },
        {
            label: 'Home',
            icon: 'pi pi-home'
        }
    ];
    const menuitems = [
        {
            label: 'Customers',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus'
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit'
                }
            ]
        },
        {
            label: 'Orders',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search'
                }
            ]
        }
    ];
    const contextMenuItems = [
        {
            label: 'Save',
            icon: 'pi pi-save'
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            separator: true
        },
        {
            label: 'Options',
            icon: 'pi pi-cog'
        }
    ];
    const megamenuItems = [
        {
            label: 'Fashion',
            icon: 'pi pi-fw pi-tag',
            items: [
                [
                    {
                        label: 'Woman',
                        items: [{ label: 'Woman Item' }, { label: 'Woman Item' }, { label: 'Woman Item' }]
                    },
                    {
                        label: 'Men',
                        items: [{ label: 'Men Item' }, { label: 'Men Item' }, { label: 'Men Item' }]
                    }
                ],
                [
                    {
                        label: 'Kids',
                        items: [{ label: 'Kids Item' }, { label: 'Kids Item' }]
                    },
                    {
                        label: 'Luggage',
                        items: [{ label: 'Luggage Item' }, { label: 'Luggage Item' }, { label: 'Luggage Item' }]
                    }
                ]
            ]
        },
        {
            label: 'Electronics',
            icon: 'pi pi-fw pi-desktop',
            items: [
                [
                    {
                        label: 'Computer',
                        items: [{ label: 'Computer Item' }, { label: 'Computer Item' }]
                    },
                    {
                        label: 'Camcorder',
                        items: [{ label: 'Camcorder Item' }, { label: 'Camcorder Item' }, { label: 'Camcorder Item' }]
                    }
                ],
                [
                    {
                        label: 'TV',
                        items: [{ label: 'TV Item' }, { label: 'TV Item' }]
                    },
                    {
                        label: 'Audio',
                        items: [{ label: 'Audio Item' }, { label: 'Audio Item' }, { label: 'Audio Item' }]
                    }
                ],
                [
                    {
                        label: 'Sports.7',
                        items: [{ label: 'Sports.7.1' }, { label: 'Sports.7.2' }]
                    }
                ]
            ]
        },
        {
            label: 'Furniture',
            icon: 'pi pi-fw pi-image',
            items: [
                [
                    {
                        label: 'Living Room',
                        items: [{ label: 'Living Room Item' }, { label: 'Living Room Item' }]
                    },
                    {
                        label: 'Kitchen',
                        items: [{ label: 'Kitchen Item' }, { label: 'Kitchen Item' }, { label: 'Kitchen Item' }]
                    }
                ],
                [
                    {
                        label: 'Bedroom',
                        items: [{ label: 'Bedroom Item' }, { label: 'Bedroom Item' }]
                    },
                    {
                        label: 'Outdoor',
                        items: [{ label: 'Outdoor Item' }, { label: 'Outdoor Item' }, { label: 'Outdoor Item' }]
                    }
                ]
            ]
        },
        {
            label: 'Sports',
            icon: 'pi pi-fw pi-star',
            items: [
                [
                    {
                        label: 'Basketball',
                        items: [{ label: 'Basketball Item' }, { label: 'Basketball Item' }]
                    },
                    {
                        label: 'Football',
                        items: [{ label: 'Football Item' }, { label: 'Football Item' }, { label: 'Football Item' }]
                    }
                ],
                [
                    {
                        label: 'Tennis',
                        items: [{ label: 'Tennis Item' }, { label: 'Tennis Item' }]
                    }
                ]
            ]
        }
    ];
    const panelMenuitems = [
        {
            label: 'Customers',
            icon: 'pi pi-fw pi-table',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',
                    items: [
                        {
                            label: 'Customer',
                            icon: 'pi pi-fw pi-plus'
                        },
                        {
                            label: 'Duplicate',
                            icon: 'pi pi-fw pi-copy'
                        }
                    ]
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-user-edit'
                }
            ]
        },
        {
            label: 'Orders',
            icon: 'pi pi-fw pi-shopping-cart',
            items: [
                {
                    label: 'View',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-search'
                }
            ]
        },
        {
            label: 'Shipments',
            icon: 'pi pi-fw pi-envelope',
            items: [
                {
                    label: 'Tracker',
                    icon: 'pi pi-fw pi-compass'
                },
                {
                    label: 'Map',
                    icon: 'pi pi-fw pi-map-marker'
                },
                {
                    label: 'Manage',
                    icon: 'pi pi-fw pi-pencil'
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog'
                },
                {
                    label: 'Billing',
                    icon: 'pi pi-fw pi-file'
                }
            ]
        }
    ];
    const toggleMenu = (event) => {
        menu.current?.toggle(event);
    };
    const onContextRightClick = (event) => {
        contextMenu.current?.show(event);
    };
    const menubarEndTemplate = () => {
        return (<span className="p-input-icon-left">
                <i className="pi pi-search"/>
                <inputtext_1.InputText type="text" placeholder="Search"/>
            </span>);
    };
    return (<div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5>Menubar</h5>
                    <menubar_1.Menubar model={nestedMenuitems} end={menubarEndTemplate}></menubar_1.Menubar>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Breadcrumb</h5>
                    <breadcrumb_1.BreadCrumb home={breadcrumbHome} model={breadcrumbItems}/>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Steps</h5>
                    <steps_1.Steps model={wizardItems} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false}/>
                    {pathname === '/uikit/menu' ? (<div className="flex align-items-center py-5 px-3">
                            <i className="pi pi-fw pi-user mr-2 text-2xl"/>
                            <p className="m-0 text-lg">Personal Component Content via Child Route</p>
                        </div>) : (<>{children}</>)}
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>TabMenu</h5>
                    <tabmenu_1.TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}/>
                    {pathname === '/uikit/menu' ? (<div className="flex align-items-center py-5 px-3">
                            <i className="pi pi-fw pi-user mr-2 text-2xl"/>
                            <p className="m-0 text-lg">Personal Component Content via Child Route</p>
                        </div>) : (<>{children}</>)}
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <h5>Tiered Menu</h5>
                    <tieredmenu_1.TieredMenu model={tieredMenuItems}/>
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <h5>Plain Menu</h5>
                    <menu_1.Menu model={menuitems}/>
                </div>
            </div>

            <div className="col-12 md:col-4">
                <div className="card">
                    <h5>Overlay Menu</h5>

                    <menu_1.Menu ref={menu} model={overlayMenuItems} popup/>
                    <button_1.Button type="button" label="Options" icon="pi pi-angle-down" onClick={toggleMenu} style={{ width: 'auto' }}/>
                </div>

                <div className="card" onContextMenu={onContextRightClick}>
                    <h5>ContextMenu</h5>
                    Right click to display.
                    <contextmenu_1.ContextMenu ref={contextMenu} model={contextMenuItems} breakpoint="767px"/>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>MegaMenu - Horizontal</h5>
                    <megamenu_1.MegaMenu model={megamenuItems} breakpoint="767px"/>

                    <h5 style={{ marginTop: '1.55em' }}>MegaMenu - Vertical</h5>
                    <megamenu_1.MegaMenu model={megamenuItems} orientation="vertical" breakpoint="767px"/>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>PanelMenu</h5>
                    <panelmenu_1.PanelMenu model={panelMenuitems}/>
                </div>
            </div>
        </div>);
};
exports.default = MenuDemo;

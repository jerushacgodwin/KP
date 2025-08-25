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
const toolbar_1 = require("primereact/toolbar");
const button_1 = require("primereact/button");
const splitbutton_1 = require("primereact/splitbutton");
const accordion_1 = require("primereact/accordion");
const tabview_1 = require("primereact/tabview");
const panel_1 = require("primereact/panel");
const fieldset_1 = require("primereact/fieldset");
const card_1 = require("primereact/card");
const divider_1 = require("primereact/divider");
const inputtext_1 = require("primereact/inputtext");
const splitter_1 = require("primereact/splitter");
const menu_1 = require("primereact/menu");
const PanelDemo = () => {
    const menu1 = (0, react_1.useRef)(null);
    const toolbarItems = [
        {
            label: 'Save',
            icon: 'pi pi-check'
        },
        {
            label: 'Update',
            icon: 'pi pi-sync'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        },
        {
            label: 'Home Page',
            icon: 'pi pi-home'
        }
    ];
    const toolbarLeftTemplate = () => {
        return (<>
                <button_1.Button label="New" icon="pi pi-plus" style={{ marginRight: '.5em' }}/>
                <button_1.Button label="Open" icon="pi pi-folder-open" severity="secondary"/>

                <i className="pi pi-bars p-toolbar-separator" style={{ marginRight: '.5em' }}></i>

                <button_1.Button icon="pi pi-check" severity="success" style={{ marginRight: '.5em' }}/>
                <button_1.Button icon="pi pi-trash" severity="warning" style={{ marginRight: '.5em' }}/>
                <button_1.Button icon="pi pi-print" severity="danger"/>
            </>);
    };
    const toolbarRightTemplate = <splitbutton_1.SplitButton label="Options" icon="pi pi-check" model={toolbarItems} menuStyle={{ width: '12rem' }}></splitbutton_1.SplitButton>;
    const cardHeader = (<div className="flex align-items-center justify-content-between mb-0 p-3 pb-0">
            <h5 className="m-0">Card</h5>
            <button_1.Button icon="pi pi-plus" text onClick={(event) => menu1.current?.toggle(event)}/>
            <menu_1.Menu ref={menu1} popup model={[
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
            { label: 'Update', icon: 'pi pi-fw pi-sync' }
        ]}/>
        </div>);
    return (<div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Toolbar</h5>
                    <toolbar_1.Toolbar start={toolbarLeftTemplate} end={toolbarRightTemplate}></toolbar_1.Toolbar>
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>AccordionPanel</h5>
                    <accordion_1.Accordion activeIndex={0}>
                        <accordion_1.AccordionTab header="Header I">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                            </p>
                        </accordion_1.AccordionTab>
                        <accordion_1.AccordionTab header="Header II">
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </accordion_1.AccordionTab>
                        <accordion_1.AccordionTab header="Header III">
                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt
                                in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                                minus.
                            </p>
                        </accordion_1.AccordionTab>
                    </accordion_1.Accordion>
                </div>
                <div className="card">
                    <h5>TabView</h5>
                    <tabview_1.TabView>
                        <tabview_1.TabPanel header="Header I">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                            </p>
                        </tabview_1.TabPanel>
                        <tabview_1.TabPanel header="Header II">
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </tabview_1.TabPanel>
                        <tabview_1.TabPanel header="Header III">
                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt
                                in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                                minus.
                            </p>
                        </tabview_1.TabPanel>
                    </tabview_1.TabView>
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Panel</h5>
                    <panel_1.Panel header="Header" toggleable>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </panel_1.Panel>
                </div>
                <div className="card">
                    <h5>Fieldset</h5>
                    <fieldset_1.Fieldset legend="Legend" toggleable>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </fieldset_1.Fieldset>
                </div>
                <card_1.Card header={cardHeader}>
                    <p className="line-height-3 m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </card_1.Card>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Divider</h5>
                    <div className="grid">
                        <div className="col-5 flex align-items-center justify-content-center">
                            <div className="p-fluid">
                                <div className="field">
                                    <label htmlFor="username">Username</label>
                                    <inputtext_1.InputText id="username" type="text"/>
                                </div>
                                <div className="field">
                                    <label htmlFor="password">Password</label>
                                    <inputtext_1.InputText id="password" type="password"/>
                                </div>
                                <button_1.Button label="Login"></button_1.Button>
                            </div>
                        </div>
                        <div className="col-1">
                            <divider_1.Divider layout="vertical">
                                <b>OR</b>
                            </divider_1.Divider>
                        </div>
                        <div className="col-5 align-items-center justify-content-center">
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>

                            <divider_1.Divider layout="horizontal" align="center">
                                <span className="p-tag">Badge</span>
                            </divider_1.Divider>

                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt
                                in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                                minus.
                            </p>

                            <divider_1.Divider align="right">
                                <button_1.Button label="Button" icon="pi pi-search" outlined></button_1.Button>
                            </divider_1.Divider>

                            <p>
                                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                                reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien. Morbi dapibus luctus odio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Splitter</h5>
                    <splitter_1.Splitter style={{ height: '300px' }}>
                        <splitter_1.SplitterPanel size={30} minSize={10}>
                            <div className="h-full flex align-items-center justify-content-center">Panel 1</div>
                        </splitter_1.SplitterPanel>
                        <splitter_1.SplitterPanel size={70}>
                            <splitter_1.Splitter layout="vertical">
                                <splitter_1.SplitterPanel size={50} minSize={10}>
                                    <div className="h-full flex align-items-center justify-content-center">Panel 2</div>
                                </splitter_1.SplitterPanel>
                                <splitter_1.SplitterPanel size={50} minSize={10}>
                                    <div className="h-full flex align-items-center justify-content-center">Panel 3</div>
                                </splitter_1.SplitterPanel>
                            </splitter_1.Splitter>
                        </splitter_1.SplitterPanel>
                    </splitter_1.Splitter>
                </div>
            </div>
        </div>);
};
exports.default = PanelDemo;

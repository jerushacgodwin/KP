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
const progressbar_1 = require("primereact/progressbar");
const button_1 = require("primereact/button");
const badge_1 = require("primereact/badge");
const tag_1 = require("primereact/tag");
const avatar_1 = require("primereact/avatar");
const avatargroup_1 = require("primereact/avatargroup");
const chip_1 = require("primereact/chip");
const skeleton_1 = require("primereact/skeleton");
const scrollpanel_1 = require("primereact/scrollpanel");
const scrolltop_1 = require("primereact/scrolltop");
const MiscDemo = () => {
    const [value, setValue] = (0, react_1.useState)(0);
    const intervalRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            setValue((prevValue) => {
                const newVal = prevValue + Math.floor(Math.random() * 10) + 1;
                return newVal >= 100 ? 100 : newVal;
            });
        }, 2000);
        intervalRef.current = interval;
        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, []);
    return (<div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>ProgressBar</h5>
                    <div className="grid">
                        <div className="col">
                            <progressbar_1.ProgressBar value={value}/>
                        </div>
                        <div className="col">
                            <progressbar_1.ProgressBar value="50" showValue={false}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="card">
                    <h4>Badge</h4>
                    <h5>Numbers</h5>
                    <div className="flex flex-wrap gap-2">
                        <badge_1.Badge value="2"></badge_1.Badge>
                        <badge_1.Badge value="8" severity="success"></badge_1.Badge>
                        <badge_1.Badge value="4" severity="info"></badge_1.Badge>
                        <badge_1.Badge value="12" severity="warning"></badge_1.Badge>
                        <badge_1.Badge value="3" severity="danger"></badge_1.Badge>
                    </div>

                    <h5>Positioned Badge</h5>
                    <div className="flex flex-wrap gap-2">
                        <i className="pi pi-bell mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '2rem' }}>
                            <badge_1.Badge value="2"></badge_1.Badge>
                        </i>
                        <i className="pi pi-calendar mr-4 p-text-secondary p-overlay-badge" style={{ fontSize: '2rem' }}>
                            <badge_1.Badge value="10+" severity="danger"></badge_1.Badge>
                        </i>
                        <i className="pi pi-envelope p-text-secondary p-overlay-badge" style={{ fontSize: '2rem' }}>
                            <badge_1.Badge severity="danger"></badge_1.Badge>
                        </i>
                    </div>

                    <h5>Button Badge</h5>
                    <div className="flex flex-wrap gap-2">
                        <button_1.Button type="button" label="Emails">
                            <badge_1.Badge value="8"></badge_1.Badge>
                        </button_1.Button>
                        <button_1.Button type="button" label="Messages" icon="pi pi-users" severity="warning">
                            <badge_1.Badge value="8" severity="danger"></badge_1.Badge>
                        </button_1.Button>
                    </div>
                    <h5>Sizes</h5>
                    <div className="flex flex-wrap gap-2 align-items-end">
                        <badge_1.Badge value="2"></badge_1.Badge>
                        <badge_1.Badge value="4" size="large" severity="warning"></badge_1.Badge>
                        <badge_1.Badge value="6" size="xlarge" severity="success"></badge_1.Badge>
                    </div>
                </div>

                <div className="card">
                    <h4>Avatar</h4>
                    <h5>Avatar Group</h5>
                    <avatargroup_1.AvatarGroup className="mb-3">
                        <avatar_1.Avatar image={`/demo/images/avatar/amyelsner.png`} size="large" shape="circle"></avatar_1.Avatar>
                        <avatar_1.Avatar image={`/demo/images/avatar/asiyajavayant.png`} size="large" shape="circle"></avatar_1.Avatar>
                        <avatar_1.Avatar image={`/demo/images/avatar/onyamalimba.png`} size="large" shape="circle"></avatar_1.Avatar>
                        <avatar_1.Avatar image={`/demo/images/avatar/ionibowcher.png`} size="large" shape="circle"></avatar_1.Avatar>
                        <avatar_1.Avatar image={`/demo/images/avatar/xuxuefeng.png`} size="large" shape="circle"></avatar_1.Avatar>
                        <avatar_1.Avatar label="+2" shape="circle" size="large" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }}></avatar_1.Avatar>
                    </avatargroup_1.AvatarGroup>

                    <h5>Label - Circle</h5>
                    <div className="flex flex-wrap gap-2 align-items-end">
                        <avatar_1.Avatar label="P" size="xlarge" shape="circle"></avatar_1.Avatar>
                        <avatar_1.Avatar label="V" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle"></avatar_1.Avatar>
                        <avatar_1.Avatar label="U" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} shape="circle"></avatar_1.Avatar>
                    </div>

                    <h5>Icon - Badge</h5>
                    <avatar_1.Avatar className="p-overlay-badge" icon="pi pi-user" size="xlarge">
                        <badge_1.Badge value="4"/>
                    </avatar_1.Avatar>
                </div>

                <div className="card">
                    <h4>ScrollTop</h4>
                    <scrollpanel_1.ScrollPanel style={{ width: '250px', height: '200px' }}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet
                            consectetur adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus
                            orci ac auctor augue mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut
                            etiam sit amet nisl purus. Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris.
                            Eget egestas purus viverra accumsan in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
                        </p>
                        <scrolltop_1.ScrollTop target="parent" className="custom-scrolltop" threshold={100} icon="pi pi-arrow-up"></scrolltop_1.ScrollTop>
                    </scrollpanel_1.ScrollPanel>
                </div>
            </div>
            <div className="col-12 lg:col-6">
                <div className="card">
                    <h4>Tag</h4>
                    <h5>Tags</h5>
                    <div className="flex flex-wrap gap-2">
                        <tag_1.Tag value="Primary"></tag_1.Tag>
                        <tag_1.Tag severity="success" value="Success"></tag_1.Tag>
                        <tag_1.Tag severity="info" value="Info"></tag_1.Tag>
                        <tag_1.Tag severity="warning" value="Warning"></tag_1.Tag>
                        <tag_1.Tag severity="danger" value="Danger"></tag_1.Tag>
                    </div>

                    <h5>Pills</h5>
                    <div className="flex flex-wrap gap-2">
                        <tag_1.Tag value="Primary" rounded></tag_1.Tag>
                        <tag_1.Tag severity="success" value="Success" rounded></tag_1.Tag>
                        <tag_1.Tag severity="info" value="Info" rounded></tag_1.Tag>
                        <tag_1.Tag severity="warning" value="Warning" rounded></tag_1.Tag>
                        <tag_1.Tag severity="danger" value="Danger" rounded></tag_1.Tag>
                    </div>

                    <h5>Icons</h5>
                    <div className="flex flex-wrap gap-2">
                        <tag_1.Tag icon="pi pi-user" value="Primary"></tag_1.Tag>
                        <tag_1.Tag icon="pi pi-check" severity="success" value="Success"></tag_1.Tag>
                        <tag_1.Tag icon="pi pi-info-circle" severity="info" value="Info"></tag_1.Tag>
                        <tag_1.Tag icon="pi pi-exclamation-triangle" severity="warning" value="Warning"></tag_1.Tag>
                        <tag_1.Tag icon="pi pi-times" severity="danger" value="Danger"></tag_1.Tag>
                    </div>
                </div>

                <div className="card">
                    <h4>Chip</h4>
                    <h5>Basic</h5>
                    <div className="flex flex-wrap align-items-center gap-2">
                        <chip_1.Chip label="Action"/>
                        <chip_1.Chip label="Comedy"/>
                        <chip_1.Chip label="Mystery"/>
                        <chip_1.Chip label="Thriller" removable/>
                    </div>

                    <h5>Icon</h5>
                    <div className="flex align-items-center flex-wrap gap-1">
                        <chip_1.Chip label="Apple" icon="pi pi-apple"/>
                        <chip_1.Chip label="Facebook" icon="pi pi-facebook"/>
                        <chip_1.Chip label="Google" icon="pi pi-google"/>
                        <chip_1.Chip label="Microsoft" icon="pi pi-microsoft" removable/>
                    </div>

                    <h5>Image</h5>
                    <div className="flex align-items-center flex-wrap gap-1">
                        <chip_1.Chip label="Amy Elsner" image={`/demo/images/avatar/amyelsner.png`}/>
                        <chip_1.Chip label="Asiya Javayant" image={`/demo/images/avatar/asiyajavayant.png`}/>
                        <chip_1.Chip label="Onyama Limba" image={`/demo/images/avatar/onyamalimba.png`}/>
                        <chip_1.Chip label="Xuxue Feng" image={`/demo/images/avatar/xuxuefeng.png`} removable/>
                    </div>

                    <h5>Styling</h5>
                    <div className="flex align-items-center flex-wrap gap-1 custom-chip">
                        <chip_1.Chip label="Action"/>
                        <chip_1.Chip label="Apple" icon="pi pi-apple"/>
                        <chip_1.Chip label="Onyama Limba" image={`/demo/images/avatar/onyamalimba.png`}/>
                        <chip_1.Chip label="Xuxue Feng" image={`/demo/images/avatar/xuxuefeng.png`} removable/>
                    </div>
                </div>

                <div className="card">
                    <h4>Skeleton</h4>
                    <div className="border-round border-1 surface-border p-4">
                        <div className="flex mb-3">
                            <skeleton_1.Skeleton shape="circle" size="4rem" className="mr-2"></skeleton_1.Skeleton>
                            <div>
                                <skeleton_1.Skeleton width="10rem" className="mb-2"></skeleton_1.Skeleton>
                                <skeleton_1.Skeleton width="5rem" className="mb-2"></skeleton_1.Skeleton>
                                <skeleton_1.Skeleton height=".5rem"></skeleton_1.Skeleton>
                            </div>
                        </div>
                        <skeleton_1.Skeleton width="100%" height="150px"></skeleton_1.Skeleton>
                        <div className="flex justify-content-between mt-3">
                            <skeleton_1.Skeleton width="4rem" height="2rem"></skeleton_1.Skeleton>
                            <skeleton_1.Skeleton width="4rem" height="2rem"></skeleton_1.Skeleton>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = MiscDemo;

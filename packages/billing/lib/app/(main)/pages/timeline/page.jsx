"use strict";
/* eslint-disable @next/next/no-img-element */
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const button_1 = require("primereact/button");
const card_1 = require("primereact/card");
const timeline_1 = require("primereact/timeline");
const TimelineDemo = () => {
    const customEvents = [
        {
            status: 'Ordered',
            date: '15/10/2025 10:30',
            icon: 'pi pi-shopping-cart',
            color: '#9C27B0',
            image: 'game-controller.jpg'
        },
        {
            status: 'Processing',
            date: '15/10/2025 14:00',
            icon: 'pi pi-cog',
            color: '#673AB7'
        },
        {
            status: 'Shipped',
            date: '15/10/2025 16:15',
            icon: 'pi pi-envelope',
            color: '#FF9800'
        },
        {
            status: 'Delivered',
            date: '16/10/2025 10:00',
            icon: 'pi pi-check',
            color: '#607D8B'
        }
    ];
    const horizontalEvents = ['2023', '2024', '2025', '2026'];
    const customizedContent = (item) => {
        return (<card_1.Card title={item.status} subTitle={item.date}>
                {item.image && <img src={`/demo/images/product/${item.image}`} onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')} alt={item.name} width={200} className="shadow-2 mb-3"/>}
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
                <button_1.Button label="Read more" text></button_1.Button>
            </card_1.Card>);
    };
    const customizedMarker = (item) => {
        return (<span className="custom-marker shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>);
    };
    return (<div>
            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Left Align</h5>
                        <timeline_1.Timeline value={customEvents} content={(item) => item.status}/>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Right Align</h5>
                        <timeline_1.Timeline value={customEvents} align="right" content={(item) => item.status}/>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Alternate Align</h5>
                        <timeline_1.Timeline value={customEvents} align="alternate" content={(item) => item.status}/>
                    </div>
                </div>

                <div className="col-12 md:col-6">
                    <div className="card">
                        <h5>Opposite Content</h5>
                        <timeline_1.Timeline value={customEvents} opposite={(item) => item.status} content={(item) => <small className="p-text-secondary">{item.date}</small>}/>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card timeline-demo">
                        <h5>Customized</h5>
                        <timeline_1.Timeline value={customEvents} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent}/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card">
                        <h5>Horizontal</h5>
                        <h6>Top Align</h6>
                        <timeline_1.Timeline value={horizontalEvents} layout="horizontal" content={(item) => item}/>

                        <h6>Bottom Align</h6>
                        <timeline_1.Timeline value={horizontalEvents} layout="horizontal" content={(item) => item}/>

                        <h6>Alternate Align</h6>
                        <timeline_1.Timeline value={horizontalEvents} layout="horizontal" align="alternate" content={(item) => item} opposite={<span>&nbsp;</span>}/>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = TimelineDemo;

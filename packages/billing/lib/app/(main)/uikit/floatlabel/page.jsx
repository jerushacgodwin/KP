"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const autocomplete_1 = require("primereact/autocomplete");
const calendar_1 = require("primereact/calendar");
const chips_1 = require("primereact/chips");
const dropdown_1 = require("primereact/dropdown");
const inputmask_1 = require("primereact/inputmask");
const inputnumber_1 = require("primereact/inputnumber");
const inputtext_1 = require("primereact/inputtext");
const inputtextarea_1 = require("primereact/inputtextarea");
const multiselect_1 = require("primereact/multiselect");
const react_1 = require("react");
const CountryService_1 = require("../../../../demo/service/CountryService");
const FloatLabelDemo = () => {
    const [countries, setCountries] = (0, react_1.useState)([]);
    const [filteredCountries, setFilteredCountries] = (0, react_1.useState)([]);
    const [value1, setValue1] = (0, react_1.useState)("");
    const [value2, setValue2] = (0, react_1.useState)(null);
    const [value3, setValue3] = (0, react_1.useState)("");
    const [value4, setValue4] = (0, react_1.useState)("");
    const [value5, setValue5] = (0, react_1.useState)(null);
    const [value6, setValue6] = (0, react_1.useState)([]);
    const [value7, setValue7] = (0, react_1.useState)("");
    const [value8, setValue8] = (0, react_1.useState)(null);
    const [value9, setValue9] = (0, react_1.useState)("");
    const [value10, setValue10] = (0, react_1.useState)(null);
    const [value11, setValue11] = (0, react_1.useState)(null);
    const [value12, setValue12] = (0, react_1.useState)("");
    const cities = [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
    ];
    (0, react_1.useEffect)(() => {
        CountryService_1.CountryService.getCountries().then((countries) => {
            setCountries(countries);
        });
    }, []);
    const searchCountry = (event) => {
        const filtered = [];
        const query = event.query;
        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        setFilteredCountries(filtered);
    };
    return (<div className="card">
            <h5>Float Label</h5>
            <p>
                All input text components support floating labels by adding (
                <mark>.p-float-label</mark>) to wrapper class.
            </p>
            <div className="grid p-fluid mt-3">
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <inputtext_1.InputText type="text" id="inputtext" value={value1} onChange={(e) => setValue1(e.target.value)}/>
                        <label htmlFor="inputtext">InputText</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <autocomplete_1.AutoComplete id="autocomplete" value={value2} onChange={(e) => setValue2(e.value)} suggestions={filteredCountries} completeMethod={searchCountry} field="name"></autocomplete_1.AutoComplete>
                        <label htmlFor="autocomplete">AutoComplete</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label p-input-icon-left">
                        <i className="pi pi-search"/>
                        <inputtext_1.InputText id="lefticon" value={value3} onChange={(e) => setValue3(e.target.value)}/>
                        <label htmlFor="lefticon">Left Icon</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-spin pi-spinner"/>
                        <inputtext_1.InputText id="righticon" value={value4} onChange={(e) => setValue4(e.target.value)}/>
                        <label htmlFor="righticon">Right Icon</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <calendar_1.Calendar inputId="calendar" value={value5} onChange={(e) => setValue5(e.value ?? "")}></calendar_1.Calendar>
                        <label htmlFor="calendar">Calendar</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <chips_1.Chips inputId="chips" value={value6} onChange={(e) => setValue6(e.value ?? [])}></chips_1.Chips>
                        <label htmlFor="chips">Chips</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <inputmask_1.InputMask id="inputmask" mask="99/99/9999" value={value7} onChange={(e) => setValue7(e.value ?? "")}></inputmask_1.InputMask>
                        <label htmlFor="inputmask">InputMask</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <inputnumber_1.InputNumber id="inputnumber" value={value8} onValueChange={(e) => setValue8(e.target.value ?? null)}></inputnumber_1.InputNumber>
                        <label htmlFor="inputnumber">InputNumber</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <span className="p-float-label">
                            <inputtext_1.InputText type="text" id="inputgroup" value={value9} onChange={(e) => setValue9(e.target.value)}/>
                            <label htmlFor="inputgroup">InputGroup</label>
                        </span>
                    </div>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <dropdown_1.Dropdown id="dropdown" options={cities} value={value10} onChange={(e) => setValue10(e.value)} optionLabel="name"></dropdown_1.Dropdown>
                        <label htmlFor="dropdown">Dropdown</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <multiselect_1.MultiSelect id="multiselect" options={cities} value={value11} onChange={(e) => setValue11(e.value)} optionLabel="name"></multiselect_1.MultiSelect>
                        <label htmlFor="multiselect">MultiSelect</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <inputtextarea_1.InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)}></inputtextarea_1.InputTextarea>
                        <label htmlFor="textarea">Textarea</label>
                    </span>
                </div>
            </div>
        </div>);
};
exports.default = FloatLabelDemo;

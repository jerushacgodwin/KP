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
const password_1 = require("primereact/password");
const react_1 = require("react");
const CountryService_1 = require("../../../../demo/service/CountryService");
const InvalidStateDemo = () => {
    const [countries, setCountries] = (0, react_1.useState)([]);
    const [filteredCountries, setFilteredCountries] = (0, react_1.useState)([]);
    const [value1, setValue1] = (0, react_1.useState)("");
    const [value2, setValue2] = (0, react_1.useState)(null);
    const [value3, setValue3] = (0, react_1.useState)(null);
    const [value4, setValue4] = (0, react_1.useState)([]);
    const [value5, setValue5] = (0, react_1.useState)("");
    const [value6, setValue6] = (0, react_1.useState)("");
    const [value7, setValue7] = (0, react_1.useState)(0);
    const [value8, setValue8] = (0, react_1.useState)(null);
    const [value9, setValue9] = (0, react_1.useState)(null);
    const [value10, setValue10] = (0, react_1.useState)("");
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
        // in a real application, make a request to a remote url with the query and
        // return filtered results, for demo we filter at client side
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
    const onCalendarChange = (e) => {
        setValue3(e.value);
    };
    return (<div className="card">
            <h5>Invalid State</h5>
            <div className="grid p-fluid">
                <div className="col-12 md:col-6">
                    <div className="field mt-3">
                        <label htmlFor="inputtext">InputText</label>
                        <inputtext_1.InputText type="text" id="inputtext" value={value1} onChange={(e) => setValue1(e.target.value)} className="p-invalid"/>
                    </div>
                    <div className="field">
                        <label htmlFor="autocomplete">AutoComplete</label>
                        <autocomplete_1.AutoComplete id="autocomplete" value={value2} onChange={(e) => setValue2(e.value)} suggestions={filteredCountries} completeMethod={searchCountry} field="name" className="p-invalid"/>
                    </div>
                    <div className="field">
                        <label htmlFor="calendar">Calendar</label>
                        <calendar_1.Calendar inputId="calendar" value={value3} onChange={onCalendarChange} className="p-invalid" showIcon/>
                    </div>
                    <div className="field">
                        <label htmlFor="chips">Chips</label>
                        <chips_1.Chips inputId="chips" value={value4} onChange={(e) => setValue4(e.value ?? [])} className="p-invalid"/>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <password_1.Password inputId="password" value={value5} onChange={(e) => setValue5(e.target.value)} className="p-invalid"/>
                    </div>
                </div>

                <div className="col-12 md:col-6">
                    <div className="field mt-3">
                        <label htmlFor="inputmask">InputMask</label>
                        <inputmask_1.InputMask id="inputmask" mask="99/99/9999" value={value6} onChange={(e) => setValue6(e.value ?? "")} className="p-invalid"/>
                    </div>
                    <div className="field">
                        <label htmlFor="inputnumber">InputNumber</label>
                        <inputnumber_1.InputNumber id="inputnumber" value={value7} onValueChange={(e) => setValue7(e.target.value ?? 0)} className="p-invalid"/>
                    </div>
                    <div className="field">
                        <label htmlFor="dropdown">Dropdown</label>
                        <dropdown_1.Dropdown id="dropdown" options={cities} value={value8} onChange={(e) => setValue8(e.value)} optionLabel="name" className="p-invalid"/>
                    </div>
                    <div className="field">
                        <label htmlFor="multiselect">MultiSelect</label>
                        <multiselect_1.MultiSelect id="multiselect" options={cities} value={value9} onChange={(e) => setValue9(e.value)} optionLabel="name" className="p-invalid"/>
                    </div>
                    <div className="field">
                        <label htmlFor="textarea">Textarea</label>
                        <inputtextarea_1.InputTextarea id="textarea" rows={3} cols={30} value={value10} onChange={(e) => setValue10(e.target.value)} className="p-invalid"/>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = InvalidStateDemo;

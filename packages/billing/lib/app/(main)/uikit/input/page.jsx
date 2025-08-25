"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const autocomplete_1 = require("primereact/autocomplete");
const button_1 = require("primereact/button");
const calendar_1 = require("primereact/calendar");
const checkbox_1 = require("primereact/checkbox");
const chips_1 = require("primereact/chips");
const colorpicker_1 = require("primereact/colorpicker");
const dropdown_1 = require("primereact/dropdown");
const inputnumber_1 = require("primereact/inputnumber");
const inputswitch_1 = require("primereact/inputswitch");
const inputtext_1 = require("primereact/inputtext");
const inputtextarea_1 = require("primereact/inputtextarea");
const knob_1 = require("primereact/knob");
const listbox_1 = require("primereact/listbox");
const multiselect_1 = require("primereact/multiselect");
const radiobutton_1 = require("primereact/radiobutton");
const rating_1 = require("primereact/rating");
const selectbutton_1 = require("primereact/selectbutton");
const slider_1 = require("primereact/slider");
const togglebutton_1 = require("primereact/togglebutton");
const react_1 = require("react");
const CountryService_1 = require("../../../../demo/service/CountryService");
const InputDemo = () => {
    const [floatValue, setFloatValue] = (0, react_1.useState)("");
    const [autoValue, setAutoValue] = (0, react_1.useState)([]);
    const [selectedAutoValue, setSelectedAutoValue] = (0, react_1.useState)(null);
    const [autoFilteredValue, setAutoFilteredValue] = (0, react_1.useState)([]);
    const [calendarValue, setCalendarValue] = (0, react_1.useState)(null);
    const [inputNumberValue, setInputNumberValue] = (0, react_1.useState)(null);
    const [chipsValue, setChipsValue] = (0, react_1.useState)([]);
    const [sliderValue, setSliderValue] = (0, react_1.useState)("");
    const [ratingValue, setRatingValue] = (0, react_1.useState)(null);
    const [colorValue, setColorValue] = (0, react_1.useState)("1976D2");
    const [knobValue, setKnobValue] = (0, react_1.useState)(20);
    const [radioValue, setRadioValue] = (0, react_1.useState)(null);
    const [checkboxValue, setCheckboxValue] = (0, react_1.useState)([]);
    const [switchValue, setSwitchValue] = (0, react_1.useState)(false);
    const [listboxValue, setListboxValue] = (0, react_1.useState)(null);
    const [dropdownValue, setDropdownValue] = (0, react_1.useState)(null);
    const [multiselectValue, setMultiselectValue] = (0, react_1.useState)(null);
    const [toggleValue, setToggleValue] = (0, react_1.useState)(false);
    const [selectButtonValue1, setSelectButtonValue1] = (0, react_1.useState)(null);
    const [selectButtonValue2, setSelectButtonValue2] = (0, react_1.useState)(null);
    const [inputGroupValue, setInputGroupValue] = (0, react_1.useState)(false);
    const listboxValues = [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
    ];
    const dropdownValues = [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
    ];
    const multiselectValues = [
        { name: "Australia", code: "AU" },
        { name: "Brazil", code: "BR" },
        { name: "China", code: "CN" },
        { name: "Egypt", code: "EG" },
        { name: "France", code: "FR" },
        { name: "Germany", code: "DE" },
        { name: "India", code: "IN" },
        { name: "Japan", code: "JP" },
        { name: "Spain", code: "ES" },
        { name: "United States", code: "US" },
    ];
    const selectButtonValues1 = [
        { name: "Option 1", code: "O1" },
        { name: "Option 2", code: "O2" },
        { name: "Option 3", code: "O3" },
    ];
    const selectButtonValues2 = [
        { name: "Option 1", code: "O1" },
        { name: "Option 2", code: "O2" },
        { name: "Option 3", code: "O3" },
    ];
    (0, react_1.useEffect)(() => {
        CountryService_1.CountryService.getCountries().then((data) => setAutoValue(data));
    }, []);
    const searchCountry = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValue([...autoValue]);
            }
            else {
                setAutoFilteredValue(autoValue.filter((country) => {
                    return country.name
                        .toLowerCase()
                        .startsWith(event.query.toLowerCase());
                }));
            }
        }, 250);
    };
    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked)
            selectedValue.push(e.value);
        else
            selectedValue.splice(selectedValue.indexOf(e.value), 1);
        setCheckboxValue(selectedValue);
    };
    const itemTemplate = (option) => {
        return (<div className="flex align-items-center">
                <img alt={option.name} src={`/demo/images/flag/flag_placeholder.png`} onError={(e) => (e.currentTarget.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")} className={`flag flag-${option.code.toLowerCase()}`} style={{ width: "21px" }}/>
                <span className="ml-2">{option.name}</span>
            </div>);
    };
    return (<div className="grid p-fluid input-demo">
            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>InputText</h5>
                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <inputtext_1.InputText type="text" placeholder="Default"></inputtext_1.InputText>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <inputtext_1.InputText type="text" placeholder="Disabled" disabled></inputtext_1.InputText>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <inputtext_1.InputText type="text" placeholder="Invalid" className="p-invalid"/>
                        </div>
                    </div>

                    <h5>Icons</h5>
                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <span className="p-input-icon-left">
                                <i className="pi pi-user"/>
                                <inputtext_1.InputText type="text" placeholder="Username"/>
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <span className="p-input-icon-right">
                                <inputtext_1.InputText type="text" placeholder="Search"/>
                                <i className="pi pi-search"/>
                            </span>
                        </div>
                        <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                            <span className="p-input-icon-left p-input-icon-right">
                                <i className="pi pi-user"/>
                                <inputtext_1.InputText type="text" placeholder="Search"/>
                                <i className="pi pi-search"/>
                            </span>
                        </div>
                    </div>

                    <h5>Float Label</h5>
                    <span className="p-float-label">
                        <inputtext_1.InputText id="username" type="text" value={floatValue} onChange={(e) => setFloatValue(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </span>

                    <h5>Textarea</h5>
                    <inputtextarea_1.InputTextarea placeholder="Your Message" rows={5} cols={30}/>

                    <h5>AutoComplete</h5>
                    <autocomplete_1.AutoComplete placeholder="Search" id="dd" dropdown multiple value={selectedAutoValue} onChange={(e) => setSelectedAutoValue(e.value)} suggestions={autoFilteredValue} completeMethod={searchCountry} field="name"/>

                    <h5>Calendar</h5>
                    <calendar_1.Calendar showIcon showButtonBar value={calendarValue} onChange={(e) => setCalendarValue(e.value ?? null)}/>

                    <h5>InputNumber</h5>
                    <inputnumber_1.InputNumber value={inputNumberValue} onValueChange={(e) => setInputNumberValue(e.value ?? null)} showButtons mode="decimal"></inputnumber_1.InputNumber>

                    <h5>Chips</h5>
                    <chips_1.Chips value={chipsValue} onChange={(e) => setChipsValue(e.value ?? [])}/>
                </div>

                <div className="card">
                    <div className="grid">
                        <div className="col-12">
                            <h5>Slider</h5>
                            <inputtext_1.InputText value={sliderValue} onChange={(e) => setSliderValue(parseInt(e.target.value, 10))}/>
                            <slider_1.Slider value={sliderValue} onChange={(e) => setSliderValue(e.value)}/>
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>Rating</h5>
                            <rating_1.Rating value={ratingValue} onChange={(e) => setRatingValue(e.value ?? 0)}/>
                        </div>
                        <div className="col-12 md:col-6">
                            <h5>ColorPicker</h5>
                            <colorpicker_1.ColorPicker value={colorValue} onChange={(e) => setColorValue(e.value ?? "")} style={{ width: "2rem" }}/>
                        </div>
                        <div className="col-12">
                            <h5>Knob</h5>
                            <knob_1.Knob value={knobValue} valueTemplate={"{value}%"} onChange={(e) => setKnobValue(e.value)} step={10} min={-50} max={50}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>RadioButton</h5>
                    <div className="grid">
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <radiobutton_1.RadioButton inputId="option1" name="option" value="Chicago" checked={radioValue === "Chicago"} onChange={(e) => setRadioValue(e.value)}/>
                                <label htmlFor="option1">Chicago</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <radiobutton_1.RadioButton inputId="option2" name="option" value="Los Angeles" checked={radioValue === "Los Angeles"} onChange={(e) => setRadioValue(e.value)}/>
                                <label htmlFor="option2">Los Angeles</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <radiobutton_1.RadioButton inputId="option3" name="option" value="New York" checked={radioValue === "New York"} onChange={(e) => setRadioValue(e.value)}/>
                                <label htmlFor="option3">New York</label>
                            </div>
                        </div>
                    </div>

                    <h5>Checkbox</h5>
                    <div className="grid">
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                                <checkbox_1.Checkbox inputId="checkOption1" name="option" value="Chicago" checked={checkboxValue.indexOf("Chicago") !== -1} onChange={onCheckboxChange}/>
                                <label htmlFor="checkOption1">Chicago</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                                <checkbox_1.Checkbox inputId="checkOption2" name="option" value="Los Angeles" checked={checkboxValue.indexOf("Los Angeles") !==
            -1} onChange={onCheckboxChange}/>
                                <label htmlFor="checkOption2">
                                    Los Angeles
                                </label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                                <checkbox_1.Checkbox inputId="checkOption3" name="option" value="New York" checked={checkboxValue.indexOf("New York") !== -1} onChange={onCheckboxChange}/>
                                <label htmlFor="checkOption3">New York</label>
                            </div>
                        </div>
                    </div>

                    <h5>Input Switch</h5>
                    <inputswitch_1.InputSwitch checked={switchValue} onChange={(e) => setSwitchValue(e.value ?? false)}/>
                </div>

                <div className="card">
                    <h5>Listbox</h5>
                    <listbox_1.ListBox value={listboxValue} onChange={(e) => setListboxValue(e.value)} options={listboxValues} optionLabel="name" filter/>

                    <h5>Dropdown</h5>
                    <dropdown_1.Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select"/>

                    <h5>MultiSelect</h5>
                    <multiselect_1.MultiSelect value={multiselectValue} onChange={(e) => setMultiselectValue(e.value)} options={multiselectValues} itemTemplate={itemTemplate} optionLabel="name" placeholder="Select Countries" filter className="multiselect-custom" display="chip"/>
                </div>

                <div className="card">
                    <h5>ToggleButton</h5>
                    <togglebutton_1.ToggleButton checked={toggleValue} onChange={(e) => setToggleValue(e.value)} onLabel="Yes" offLabel="No"/>

                    <h5>SelectButton</h5>
                    <selectbutton_1.SelectButton value={selectButtonValue1} onChange={(e) => setSelectButtonValue1(e.value)} options={selectButtonValues1} optionLabel="name"/>

                    <h5>SelectButton - Multiple</h5>
                    <selectbutton_1.SelectButton value={selectButtonValue2} onChange={(e) => setSelectButtonValue2(e.value)} options={selectButtonValues2} optionLabel="name" multiple/>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Input Groups</h5>
                    <div className="grid p-fluid">
                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <inputtext_1.InputText placeholder="Username"/>
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-shopping-cart"></i>
                                </span>
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-globe"></i>
                                </span>
                                <inputtext_1.InputText placeholder="Price"/>
                                <span className="p-inputgroup-addon">$</span>
                                <span className="p-inputgroup-addon">.00</span>
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <button_1.Button label="Search"/>
                                <inputtext_1.InputText placeholder="Keyword"/>
                            </div>
                        </div>

                        <div className="col-12 md:col-6">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon p-inputgroup-addon-checkbox">
                                    <checkbox_1.Checkbox checked={inputGroupValue} onChange={(e) => setInputGroupValue(e.checked ?? false)}/>
                                </span>
                                <inputtext_1.InputText placeholder="Confirm"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = InputDemo;

"use strict";
/* eslint-disable @next/next/no-img-element */
"use client";
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
const react_1 = __importStar(require("react"));
const dropdown_1 = require("primereact/dropdown");
const utilities_1 = __importDefault(require("../utilities/utilities"));
;
const FessEntry = ({ school, student, feeCategories, onDataChange, feesData }) => {
    const toast = (0, react_1.useRef)(null);
    const [feeItems, setFeeItems] = (0, react_1.useState)([
        { school_id: null, class_id: null, user_id: null, fees_type: null, amount: 0 },
    ]);
    const updateItem = (index, key, value) => {
        const updated = [...feeItems];
        updated[index][key] = value;
        setFeeItems(updated);
        if (onDataChange) {
            const total = updated.reduce((sum, item) => sum + item.amount, 0);
            onDataChange({ items: updated, total });
        }
    };
    const addRow = () => {
        setFeeItems([...feeItems, { school_id: null, class_id: null, user_id: null, fees_type: null, amount: 0 }]);
    };
    const total = feeItems.reduce((sum, item) => sum + item.amount, 0);
    return (<div className="max-w-3xl mx-auto p-6 border bg-white font-sans text-sm">
      {/* Header */}
      <div className="text-center mb-6 border-b pb-2">
        <h1 className="text-xl font-bold">{school.name}</h1>
        <p>{school.address}</p>
        <p>Phone: {school.phone} | Email: {school.email}</p>
      </div>

      {/* Receipt Info */}
      <div className="flex justify-between mb-4">
        <div>
          <p><strong>Bill Date: {new Date().toLocaleDateString()}</strong></p>
          <p><strong>Receipt No: {(0, utilities_1.default)()}</strong></p>
        </div>
        <div className="text-left">
          <p><strong>Student:</strong> {student.name}</p>
          <p><strong>Class:</strong> {student.iClass?.name}</p>
          <p><strong>Admission No:</strong> {student.user_id}</p>
        </div>
      </div>

      {/* Fee Items (Table-like with divs) */}
      <div className="border border-gray-400 divide-y divide-gray-400 mb-4">
          {/* Add Row Button */}
      <button onClick={addRow} className="mt-2 text-blue-600 underline text-xs">
        + Add Row
      </button>
        {/* Header Row */}
        <div className="flex font-semibold bg-gray-100">
          <div className="w-1/12 p-2 border-r border-gray-400 text-left">#</div>
          <div className="w-4/12 p-2 border-r border-gray-400">Fee Category</div>
           <div className="w-4/12 p-2 border-r border-gray-400">Fee To Pay</div>
          <div className="w-3/12 p-2 text-right">Amount</div>
        </div>

        {/* Fee Rows */}
        {feeItems.map((item, i) => (<div key={i} className="flex items-center">
            <div className="w-1/12 p-2 border-r border-gray-400 text-left">{i + 1}</div>
            <div className="w-4/12 p-2 pl-0 border-r border-gray-400">
            <input type="hidden" value={student.iClass?.class_id}/>
            <input type="hidden" value={student.user_id}/>
            <input type="hidden" value={student.school_id}/>

              <dropdown_1.Dropdown value={item.fees_type} options={feeCategories} optionLabel="name" optionValue="id" onChange={(e) => updateItem(i, "fees_type", e.value)} placeholder="Select Fee" className="pl-0"/>
            </div>
            <div className="w-4/12 p-2 pl-0 border-r border-gray-400">
              <input type="text" value={item.amount - (feesData[0]?.paid_amount || 0)}/>
            </div>
            <div className="w-3/12 p-2 text-right">
              <input className="w-full text-right p-1 outline-none" type="text" value={item.amount} onChange={(e) => updateItem(i, "amount", parseFloat(e.target.value) || 0)}/>
            </div>
          </div>))}
      </div>

    

      {/* Payment Summary */}
      <div className="my-4">
        <div className="flex justify-between">
          <span>Total</span>
          <span>{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Net Payable</span>
          <span>{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6">
        <p><strong>Amount in Words:</strong> __________________________</p>
        <div className="mt-6 text-right">
          <p>Authorized Signatory</p>
        </div>
      </div>
    </div>);
};
exports.default = FessEntry;

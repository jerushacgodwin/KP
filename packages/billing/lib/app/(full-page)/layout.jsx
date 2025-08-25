"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
const AppConfig_1 = __importDefault(require("../../layout/AppConfig"));
const react_1 = __importDefault(require("react"));
exports.metadata = {
    title: 'PrimeReact Sakai',
    description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.'
};
function SimpleLayout({ children }) {
    return (<react_1.default.Fragment>
            {children}
            <AppConfig_1.default simple/>
        </react_1.default.Fragment>);
}
exports.default = SimpleLayout;

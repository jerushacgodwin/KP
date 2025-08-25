"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const layoutcontext_1 = require("../layout/context/layoutcontext");
const api_1 = require("primereact/api");
require("primereact/resources/primereact.css");
require("primeflex/primeflex.css");
require("primeicons/primeicons.css");
require("../styles/layout/layout.scss");
require("../styles/demo/Demos.scss");
function RootLayout({ children }) {
    return (<html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`./themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <api_1.PrimeReactProvider>
                    <layoutcontext_1.LayoutProvider>{children}</layoutcontext_1.LayoutProvider>
                </api_1.PrimeReactProvider>
            </body>
        </html>);
}
exports.default = RootLayout;

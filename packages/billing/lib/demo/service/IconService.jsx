"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconService = void 0;
let icons = [];
let selectedIcon;
exports.IconService = {
    getIcons() {
        return fetch('/demo/data/icons.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.icons);
    },
    getIcon(id) {
        if (icons) {
            selectedIcon = icons.find((x) => x.properties?.id === id);
            return selectedIcon;
        }
    }
};

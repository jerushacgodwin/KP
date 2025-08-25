"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoService = void 0;
exports.PhotoService = {
    getImages() {
        return fetch('/demo/data/photos.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
};

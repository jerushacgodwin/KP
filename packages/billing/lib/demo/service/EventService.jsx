"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
exports.EventService = {
    getEvents() {
        return fetch('/demo/data/events.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryService = void 0;
exports.CountryService = {
    getCountries() {
        return fetch('/demo/data/countries.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data);
    }
};

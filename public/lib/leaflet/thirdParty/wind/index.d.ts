import * as L from 'leaflet';
export { Field } from 'wind-core';

declare const WindLayer: (new (...args: any[]) => any) & typeof L.Class;

export { WindLayer, WindLayer as default };

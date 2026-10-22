import {startSiege} from './arena-front.mjs';
void startSiege({previewHour:new URLSearchParams(location.search).has('night')?22:undefined}).catch(console.error);

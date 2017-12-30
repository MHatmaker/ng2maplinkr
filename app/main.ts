// import './polyfills.ts';
// import { enableProdMode } from '@angular/core';
console.log("ready to import platformBrowserDynamic");
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
console.log("ready to import AppModule");
import { AppModule } from './app.module';

console.log("ready to platformBrowserDynamic.bootstrapModule");

platformBrowserDynamic().bootstrapModule(AppModule);

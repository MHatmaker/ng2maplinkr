// import './polyfills.ts';
// import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

console.log("ready to platformBrowserDynamic.bootstrapModule");

platformBrowserDynamic().bootstrapModule(AppModule);

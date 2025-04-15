import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NavigateService } from './services/navigate.service';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		// mocken
		// { provide: NavigateService, useClass: NavigateService },
		// NavigateService, // optimization  tree-shaking
	],
};

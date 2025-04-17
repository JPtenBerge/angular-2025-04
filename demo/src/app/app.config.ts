import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { NavigateService } from './services/navigate.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
	providers: [
		// provideZoneChangeDetection({ eventCoalescing: true }),
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(),

		// mocken
		// { provide: NavigateService, useClass: NavigateService },
		// NavigateService, // optimization  tree-shaking
	],
};

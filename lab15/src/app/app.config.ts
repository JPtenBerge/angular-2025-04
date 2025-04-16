import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeNL from '@angular/common/locales/nl';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { errorInterceptor } from './interceptors/error.interceptor';

registerLocaleData(localeNL);

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([errorInterceptor])),
		provideAnimations(), // required animations providers
		provideToastr(), // Toastr providers
		{ provide: LOCALE_ID, useValue: 'nl-NL' },
	],
};

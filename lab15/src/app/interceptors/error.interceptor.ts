import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';

export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
	const toastr = inject(ToastrService);

	return next(req).pipe(
		catchError(err => {
			if (err instanceof HttpErrorResponse) {
				toastr.error(
					`Server ${err.status === 0 ? `is down.` : `returned status code ${err.status}`}`,
					'Server error',
				);
				console.error('Server returned', err.status);
			}
			throw err; // rethrow
		}),
	);
}

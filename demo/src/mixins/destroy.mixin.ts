import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export const destroyMixin = () => {
	return class implements OnDestroy {
		nuke$ = new Subject<void>();

		ngOnDestroy() {
			console.log('NUKING');
			this.nuke$.next();
			this.nuke$.complete();
		}
	};
};

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CarViewerComponent } from "../../components/car-viewer/car-viewer.component";

@Component({
	selector: 'app-internals',
	imports: [CarViewerComponent],
	templateUrl: './internals.page.html',
})
export class InternalsPage {
	name = 'Wesley';
	config = { name: 'Wesley 2' };
	cdr = inject(ChangeDetectorRef);
	cars = [
		{ make: 'Kia', model: 'Niro' },
		{ make: 'Opel', model: 'Astra' },
		{ make: 'Mishubishi', model: 'Colt' },
	];

	changeName() {
		// zone.js
		// geeft aan dat shit verandert

		console.log('timeout:', setTimeout);

		setTimeout(() => {
			console.log('timeout klaar');
			this.name = 'Ruud';
			this.config.name = 'Ruud';
			this.cdr.detectChanges();
		}, 1000);
	}

	addCar() {
		this.cars = [...this.cars, { make: 'Tesla', model: 'Model Y' }];
	}
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';

@Component({
	selector: 'app-car-viewer',
	imports: [],
	templateUrl: './car-viewer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarViewerComponent {
	cars = input.required<{ make: string; model: string }[]>();
	cdr = inject(ChangeDetectorRef);

	constructor() {
		// effect(() => {
		// 	console.log('carssssss:', this.cars());
		// 	this.cdr.markForCheck();
		// });
		// expression was changed after it was checked exception
	}

	getCarView(car: { make: string; model: string }) {
		car.model += 'q';
		return `carview ${car.make} ${car.model}`;
	}

	addCar() {
		this.cars().push({ make: 'Tesla', model: 'Model Y' });
	}
}

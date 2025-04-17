import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
	imports: [],
	templateUrl: './signals.page.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsPage {
	// signals?

	// makkelijker dan RxJS
	// hij ruimt automatisch je shit op

	// reactieve waarde
	// reactive primitive
	// - signal()
	// - computed()
	// - effect()

	// HttpClient:
	// - resource()  Promise  fetch() GET
	// - rxResource()  Observable  
	// Observables maar dan simpeler en wat minder krachtig.
	// - ALLE operators
	// - operators => procedureel uitschrijven

	numberrr = 42;

	number = signal<number>(42); // behaviorsubject met distinctUntilChanged()
	isEven = computed(() => this.number() % 2 === 0)

	constructor() {
		effect(() => {
			console.log('effect!', this.isEven());
		});
	}

	increment() {

		

		this.numberrr += 5;
		// this.number.set(108);
		this.number.update(prev => prev + 2);
	}
}

import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
	BehaviorSubject,
	map,
	Observable,
	ReplaySubject,
	Subject,
	Subscription,
	takeUntil,
	timer,
} from 'rxjs'; // Reactive Extensions for JavaScript
import { destroyMixin } from '../../../mixins/destroy.mixin';

@Component({
	selector: 'app-observables',
	imports: [AsyncPipe],
	templateUrl: './observables.page.html',
})
export class ObservablesPage extends destroyMixin() {
	subscription?: Subscription;
	source$ = new Observable<number[]>();

	ngOnInit() {
		// observables zijn lazy

		// hongaarse notatie

		// let source$ = new Observable<number>(subject => {
		// 	console.log('observing!');
		// 	subject.next(4);
		// 	subject.next(9);

		// 	setTimeout(() => {
		// 		subject.next(8);
		// 		subject.next(15);
		// 	}, 2000);
		// });

		// // somewhere else in code
		// console.log('hoi');

		// // setTimeout(() => {
		// // console.log('subscring');
		//  source$.pipe(map(x => x * 10)).subscribe(value => console.log(value));
		// // }, 5000);

		// console.log('doei');

		// console.log('helllooooooooooo');
		// let source$ = new ReplaySubject<number>(1);

		// // source$.next(4);
		// // source$.next(8);
		// // source$.next(15);

		// source$.subscribe(value => console.log('value:', value));

		// source$.next(16);
		// source$.next(23);
		// source$.next(42);

		this.subscription = timer(0, 500)
			.pipe(takeUntil(this.nuke$))
			.subscribe(val => console.log('timer 2:', val));
	}

	override ngOnDestroy() {
		super.ngOnDestroy();

	// 	this.subscription?.unsubscribe(); // mucho importanto
	// 	// this.subscription.unsubscribe(); // mucho importanto
	// 	// this.subscription.unsubscribe(); // mucho importanto
	// 	// this.subscription.unsubscribe(); // mucho importanto
	// 	// this.subscription.unsubscribe(); // mucho importanto
	// 	// this.subscription.unsubscribe(); // mucho importanto
	// 	// this.subscription.unsubscribe(); // mucho importanto
	}
}

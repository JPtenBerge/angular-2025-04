import { afterRender, Component, input, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'app-life',
	imports: [],
	templateUrl: './life.component.html',
})
export class LifeComponent implements OnInit, OnDestroy {
  
  message = input<string>();
  intervalId!: ReturnType<typeof setInterval>;

	constructor() { // 
		console.log('[life] constructor', this.message());
	}
	ngOnInit() { // draait vooraf aan render
		console.log('[life] ngOnInit', this.message());
 
    this.intervalId = setInterval(() => {
      console.log('[life] timer!');
    }, 2000);
	}

  // ngAfterViewInit() {

  // }


	ngOnDestroy() {
		console.log('[life] ngOnDestroy');

    clearInterval(this.intervalId);

    // dingen opruimen/cleanup
    // resources ... die je gebruikt
    // - alles met canvas
    // - beetje HttpClient
    // - => OBSERVABLES  .subscribe()  .unsubscribe()
    // - indexedDatabase openConnection()
    // - camera API
    // - websockets
    // - timers/ setTimeout() sliding timeout
	}
}

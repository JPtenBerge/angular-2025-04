import { CurrencyPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EuroPipe } from './pipes/euro.pipe';
import { createFramework, Framework } from './entities/framework';
import { LifeComponent } from './components/life/life.component';
import { AutocompleterComponent } from './components/autocompleter/autocompleter.component';
import { HttpClient } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		FormsModule,
		UpperCasePipe,
		CurrencyPipe,
		DatePipe,
		EuroPipe,
		JsonPipe,
		LifeComponent,
		AutocompleterComponent,
		LoaderComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	showLife = false;
	name = 'Wesley';
	prijs = 12345678.9;
	nu = new Date('2025-01-18');

	http = inject(HttpClient);

	newFramework = createFramework();

	frameworks?: Framework[];

	ngOnInit() {
		// fetch('http://localhost:3000/frameworks')
		// karig?
		// - 500 409 statuscode is geen exception
		// - JSON parsing bij SUCCESS - 204 500
		// - features: interceptors

		this.http.get<Framework[]>('http://localhost:3000/frameworks').subscribe(frameworks => {
			this.frameworks = frameworks;
		});

		// fetch('...').then( x=> x.json()).catch(err => {})
	}

	addFramework() {
		// how to clone an object in JS
		// spreaden
		// let shallowClone  = { ...this.newFramework };
		// let deepClone  = JSON.parse(JSON.stringify(this.newFramework)); // traag.
		// let besteClone = structuredClone(this.newFramework);
		// this.frameworks.push({ ...this.newFramework });

		this.http.post('http://localhost:3000/frameworks', this.newFramework).subscribe(() => console.log('done!'));

	}

	handleFrameworkSelect(framework: Framework) {
		console.log('hey er is iets geselecteerd!!', framework);
	}
}

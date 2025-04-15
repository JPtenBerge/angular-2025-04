import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, input } from '@angular/core';
import { Framework } from '../../entities/framework';
import { LifeComponent } from '../../components/life/life.component';
import { AutocompleterComponent } from '../../components/autocompleter/autocompleter.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-zooi',
	imports: [LifeComponent, AutocompleterComponent, LoaderComponent],
	templateUrl: './zooi.page.html',
})
export class ZooiPage {
	showLife = false;
	name = 'Wesley';
	prijs = 12345678.9;
	nu = new Date('2025-01-18');
	http = inject(HttpClient);
	frameworks?: Framework[];
	route = inject(ActivatedRoute);


	id = input.required<string>();
	// bla = input.required<string>();

	constructor() {
		effect(() => {
			console.log('id:', this.id());
		});
	}

	ngOnInit() {
		// this.route.params

		this.http.get<Framework[]>('http://localhost:3000/frameworks').subscribe(frameworks => {
			this.frameworks = frameworks;
		});
	}

	handleFrameworkSelect(framework: Framework) {
		console.log('hey er is iets geselecteerd!!', framework);
	}
}

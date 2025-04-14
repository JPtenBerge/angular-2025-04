import { CurrencyPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EuroPipe } from './pipes/euro.pipe';
import { createFramework, Framework } from './entities/framework';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, FormsModule, UpperCasePipe, CurrencyPipe, DatePipe, EuroPipe, JsonPipe],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	name = 'Wesley';
	prijs = 12345678.9;
	nu = new Date('2025-01-18');

	newFramework = createFramework();

	frameworks: Framework[] = [
		{
			id: 4,
			name: 'Svelte',
			logoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.thenewstack.io%2Fmedia%2F2021%2F09%2F9969f494-sveltelogo.png&f=1&nofb=1&ipt=64053b176296758872648093f764ae8afd49e6cba291ce57524bca3fcb6b3386',
			rating: 9,
		},
		{
			id: 8,
			name: 'Vue',
			logoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fvue-9-logo-png-transparent.png&f=1&nofb=1&ipt=3a8be123f4a304a439b4292104bf381678db9ee439716fca2ca1051e279e6f55',
			rating: 7,
		},
		{
			id: 15,
			name: 'Angular',
			logoUrl:
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fv2%2Fresize%3Afit%3A1400%2F1*Klh1l7wkoG6PDPb9A5oCHQ.png&f=1&nofb=1&ipt=6e07a88522e0a770d5715f7af535f3efe96da1f988f7688fbcabe8808f387e6d',
			rating: 8.5,
		},
	];

	addFramework() {
		// how to clone an object in JS
		// spreaden
		
		// let shallowClone  = { ...this.newFramework };
		// let deepClone  = JSON.parse(JSON.stringify(this.newFramework)); // traag. 
		// let besteClone = structuredClone(this.newFramework);

		this.frameworks.push({ ...this.newFramework });
	}
}

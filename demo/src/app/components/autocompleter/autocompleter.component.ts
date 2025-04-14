import { Component } from '@angular/core';

@Component({
	selector: 'app-autocompleter',
	imports: [],
	templateUrl: './autocompleter.component.html',
})
export class AutocompleterComponent<T extends Record<string, string>> {
	data!: T[];
	query?: string;

	suggestions?: T[];

	autocomplete() {
        if (!this.query) {
            this.suggestions = this.data;
            return;
        }

		this.suggestions = [];

		for (let item of this.data) {
			for (let prop of Object.keys(item)) {
				// let bla = prop as keyof typeof item;

				if ((item[prop] as string).includes(this.query)) {
					this.suggestions.push(item);
				}
			}
		}
	}
}

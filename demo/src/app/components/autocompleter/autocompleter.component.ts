import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-autocompleter',
	imports: [FormsModule, JsonPipe],
	templateUrl: './autocompleter.component.html',
})
export class AutocompleterComponent<T extends {}> {
	data = input.required<T[]>();
	query?: string;
	selectItem = output<T>();

	suggestions?: T[];
	activeSuggestionIndex: number | null = null;

	autocomplete() {
        console.log('autocompleting!', this.query);
		if (!this.query) {
			this.suggestions = this.data();
			return;
		}

		this.suggestions = [];

		for (let item of this.data()) {
			for (let prop of Object.keys(item) as Array<keyof typeof item>) {
				if (typeof item[prop] !== 'string') {
					continue;
				}

				if (item[prop].includes(this.query)) {
					this.suggestions.push(item);
					break;
				}
			}
		}
	}

	next() {
        if (!this.suggestions || this.suggestions.length === 0) {
            return;
        }

		if (this.activeSuggestionIndex !== null) {
			this.activeSuggestionIndex = (this.activeSuggestionIndex + 1) % this.suggestions.length;
			return;
		}

		this.activeSuggestionIndex = 0;
	}

	select() {
		let activeItem = this.suggestions![this.activeSuggestionIndex!]; // "!" not recommended
		this.selectItem.emit(activeItem);
	}
}

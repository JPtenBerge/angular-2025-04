import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, inject, input, output, TemplateRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigateService } from '../../services/navigate.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
	selector: 'app-autocompleter',
	imports: [ReactiveFormsModule, JsonPipe, NgTemplateOutlet],
	templateUrl: './autocompleter.component.html',
})
export class AutocompleterComponent<T extends {}> {
	data = input.required<T[]>();
	query = new FormControl<string>('');
	selectItem = output<T>();

	navigateService = inject(NavigateService);

	itemTemplate =
		contentChild.required<
			TemplateRef<{ suggestion: T; currentIndex: number; activeSuggestionIndex: number | null }>
		>('frameworkTemplate');

	suggestions?: T[];
	activeSuggestionIndex: number | null = null;

	ngOnInit() {
		this.query.valueChanges
			.pipe(
				debounceTime(300),
				distinctUntilChanged()
			)
			// .pipe(debounceTime(300))
			// .pipe(distinctUntilChanged())
			.subscribe(value => this.autocomplete());
	}

	autocomplete() {
		console.log('autocompleting!', this.query.value);
		if (!this.query.value) {
			this.suggestions = this.data();
			return;
		}

		this.suggestions = [];

		for (let item of this.data()) {
			for (let prop of Object.keys(item) as Array<keyof typeof item>) {
				if (typeof item[prop] !== 'string') {
					continue;
				}

				if (item[prop].includes(this.query.value)) {
					this.suggestions.push(item);
					break;
				}
			}
		}
	}

	next() {
		this.activeSuggestionIndex = this.navigateService.next(this.suggestions, this.activeSuggestionIndex);
	}

	select() {
		let activeItem = this.suggestions![this.activeSuggestionIndex!]; // "!" not recommended
		this.selectItem.emit(activeItem);
	}
}

import { Component, EventEmitter, Output } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	FormControl,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { PlannedEvent } from '../models/planned-event';
import { EventService } from '../services/event.service';

@Component({
	selector: 'dp-create-event',
	templateUrl: './create-event.component.html',
	styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
	constructor(private eventService: EventService) {}

	@Output()
	eventSubmit = new EventEmitter<Omit<PlannedEvent, 'id'>>();

	form = new FormGroup(
		{
			name: new FormControl('', {
				nonNullable: true,
				validators: [Validators.required, Validators.minLength(2)],
				asyncValidators: [uniqueName(this.eventService)],
			}),
			start: new FormControl<Date | undefined>(undefined, {
				nonNullable: true,
				validators: [Validators.required],
			}),
			end: new FormControl<Date | undefined>(undefined, {
				nonNullable: true,
				validators: [Validators.required],
			}),
		},
		{ validators: [startBeforeEnd] },
	);

	submit() {
		if (this.form.valid) {
			this.eventSubmit.next({
				...asRequired(this.form.value),
				invitees: [],
			});
			this.form.reset();
		}
	}
}

function asRequired<T>(val: T): Required<T> {
	return val as Required<T>;
}

function startBeforeEnd(form: AbstractControl): ValidationErrors | null {
	const start: Date = form.get('start')!.value;
	const end: Date = form.get('end')!.value;
	return start && end && end.valueOf() <= start.valueOf() ? { startBeforeEnd: { start, end } } : null;
}

function uniqueName(eventService: EventService): AsyncValidatorFn {
	return control => {
		const name: string = control.value;
		return eventService.getAll({ name }).pipe(map(events => (events.length ? { uniqueName: { name } } : null)));
	};
}

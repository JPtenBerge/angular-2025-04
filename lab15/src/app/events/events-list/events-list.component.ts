import { Component, Input } from '@angular/core';
import { PlannedEvent } from '../models/planned-event';

@Component({
	selector: 'dp-events-list',
	templateUrl: './events-list.component.html',
	styleUrls: ['./events-list.component.scss'],
})
export class EventsListComponent {
	@Input()
	public events?: PlannedEvent[];
}

import { Component, OnInit } from '@angular/core';
import { PlannedEvent } from '../models/planned-event';
import { EventService } from '../services/event.service';

@Component({
	selector: 'dp-events-page',
	templateUrl: './events-page.component.html',
	styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
	public allEvents?: PlannedEvent[];

	constructor(private eventService: EventService) {}

	ngOnInit(): void {
		this.eventService.getAll().subscribe(events => {
			this.allEvents = events;
		});
	}

	addEvent($event: Omit<PlannedEvent, 'id'>) {
		this.eventService.create($event).subscribe(event => this.allEvents?.push(event));
	}
}

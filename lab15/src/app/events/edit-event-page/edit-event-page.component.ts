import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PlannedEvent } from '../models/planned-event';
import { EventService } from '../services/event.service';

@Component({
	selector: 'dp-edit-event',
	templateUrl: './edit-event-page.component.html',
	styleUrls: ['./edit-event-page.component.scss'],
})
export class EditEventPageComponent implements OnInit {
	public plannedEvent?: PlannedEvent;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private eventService: EventService,
	) {}

	ngOnInit(): void {
		this.route.paramMap
			.pipe(switchMap(params => this.eventService.get(+params.get('id')!)))
			.subscribe(plannedEvent => (this.plannedEvent = plannedEvent));
	}

	async update() {
		if (this.plannedEvent) {
			this.eventService.update(this.plannedEvent).subscribe(() => {
				this.router.navigate(['/events']);
			});
		}
	}
}

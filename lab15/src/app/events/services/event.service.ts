import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PlannedEvent } from '../models/planned-event';

@Injectable({ providedIn: 'root' })
export class EventService {
	constructor(private http: HttpClient) {}

	getAll(query?: { name?: string }): Observable<PlannedEvent[]> {
		const url = new URL(`${environment.backendUrl}/events`);
		if (query?.name) {
			url.searchParams.set('name', query.name);
		}
		return this.http.get<PlannedEvent[]>(url.href);
	}

	get(id: PlannedEvent['id']): Observable<PlannedEvent> {
		return this.http.get<PlannedEvent>(`${environment.backendUrl}/events/${id}`);
	}

	create(eventData: Omit<PlannedEvent, 'id'>): Observable<PlannedEvent> {
		return this.http.post<PlannedEvent>(`${environment.backendUrl}/events`, eventData);
	}

	update({ id, ...eventData }: PlannedEvent): Observable<PlannedEvent> {
		return this.http.put<PlannedEvent>(`${environment.backendUrl}/events/${id}`, eventData);
	}
}

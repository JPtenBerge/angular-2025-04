import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, UnaryFunction, map, pipe } from 'rxjs';
import { Contact, assertArray, assertIsContact } from '../models/contact';
import { environment } from '../../../environments/environment';

const CONTACT_API = `${environment.backendUrl}/contacts`;

@Injectable({ providedIn: 'root' })
export class ContactService {
	constructor(private http: HttpClient) {}

	getAll(): Observable<Contact[]> {
		return this.http.get<Contact>(CONTACT_API).pipe(assertMany(assertIsContact));
	}

	get(id: number): Observable<Contact> {
		return this.http.get(`${CONTACT_API}/${id}`).pipe(assert(assertIsContact));
	}

	create({ id, ...contactData }: Contact): Observable<Contact> {
		return this.http.post(CONTACT_API, contactData).pipe(assert(assertIsContact));
	}

	update({ id, ...contactData }: Contact): Observable<Contact> {
		return this.http.put(`${CONTACT_API}/${id}`, contactData).pipe(assert(assertIsContact));
	}

	delete(id: number) {
		return this.http.delete<void>(`${CONTACT_API}/${id}`);
	}
}

function assert<T>(
	assertionFn: (input: unknown) => asserts input is T,
): UnaryFunction<Observable<unknown>, Observable<T>> {
	return pipe(
		map(item => {
			assertionFn(item);
			return item;
		}),
	);
}

function assertMany<T>(
	assertionFn: (input: unknown) => asserts input is T,
): UnaryFunction<Observable<unknown>, Observable<T[]>> {
	return pipe(
		map(items => {
			assertArray(items);
			return items.map(item => {
				assertionFn(item);
				return item;
			});
		}),
	);
}

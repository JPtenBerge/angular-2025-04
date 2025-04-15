import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigateService {
	next<T>(data: T[] | undefined, activeIndex: number | null) {
		if (!data || data.length === 0) {
			return null;
		}

		return activeIndex !== null ? (activeIndex + 1) % data.length : 0;
	}
}

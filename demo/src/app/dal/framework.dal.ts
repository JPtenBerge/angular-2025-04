import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Framework } from '../entities/framework';
import { BehaviorSubject, lastValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FrameworkDal {
	http = inject(HttpClient);
	framework$ = new BehaviorSubject<Framework[] | null>(null);

	getAll() {
		this.http.get<Framework[]>('http://localhost:3000/frameworks').subscribe(frameworks => {
			this.framework$.next(frameworks);
		});

		return this.framework$.asObservable();
	}

	add(newFramework: Omit<Framework, 'id'>) {
		let postFramework = this.http.post<Framework>('http://localhost:3000/frameworks', newFramework);
		postFramework.subscribe(createdFramework => {
			this.framework$.next([...this.framework$.value!, createdFramework]);
		});

		return postFramework;
	}
}

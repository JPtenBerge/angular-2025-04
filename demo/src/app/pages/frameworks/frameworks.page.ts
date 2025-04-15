import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { createFramework, Framework } from '../../entities/framework';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-frameworks',
	imports: [FormsModule, JsonPipe],
	templateUrl: './frameworks.page.html',
})
export class FrameworksPage {
	http = inject(HttpClient);

	newFramework = createFramework();

	frameworks?: Framework[];

	ngOnInit() {
		this.http.get<Framework[]>('http://localhost:3000/frameworks').subscribe(frameworks => {
			this.frameworks = frameworks;
		});
	}

	addFramework() {
		this.http
			.post('http://localhost:3000/frameworks', this.newFramework)
			.subscribe(() => console.log('done!'));
	}
}

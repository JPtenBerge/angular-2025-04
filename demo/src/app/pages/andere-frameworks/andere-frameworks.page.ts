import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { createFramework, Framework } from '../../entities/framework';
import { JsonPipe } from '@angular/common';
import {
	AbstractControl,
	FormBuilder,
	FormControl,
	FormGroup,
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { FrameworkDal } from '../../dal/framework.dal';
import { filter } from 'rxjs';

const myValidator = (c: AbstractControl) => {
	return null;
};

const myBiggerValidator = (form: AbstractControl) => {
	let nameControl = form.get('name');
	if (!nameControl) {
		return { bigger: 'No name control found' };
	}

	// for generic form messages:
	return nameControl.value && nameControl.value.length < 10 ? { bigger: 'Name too small' } : null;

	// alternatively: nameControl.setErrors(['oh noes!']); to be able to display messages to a specific form control
};

@Component({
	imports: [ReactiveFormsModule, JsonPipe],
	templateUrl: './andere-frameworks.page.html',
})
export class AndereFrameworksPage {
	fb = inject(NonNullableFormBuilder);
	frameworkDal = inject(FrameworkDal);
	cdr = inject(ChangeDetectorRef);

	addFrameworkForm2 = this.fb.group(
		{
			name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.-]{3,}$/)]],
			rating: [0],
			logoUrl: [''],
		},
		{
			validators: [myBiggerValidator],
		},
	);

	addFrameworkForm = new FormGroup(
		{
			name: new FormControl<string>('', {
				validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9.-]{3,}$/), myValidator],
				nonNullable: true,
			}),
			rating: new FormControl<number>(1, { nonNullable: true }),
			logoUrl: new FormControl<string>('', { nonNullable: true }),
		},
		{
			validators: [myBiggerValidator],
		},
	);

	get f() {
		return this.addFrameworkForm2.controls;
	}

	frameworks?: Framework[];

	ngOnInit() {
		let frameworkGetAll = this.frameworkDal.getAll();
		frameworkGetAll.pipe(filter(x => x !== null)).subscribe(frameworks => {
			this.frameworks = frameworks;
			this.cdr.markForCheck(); // because Zone.js is stripped away now
		});
	}

	addFramework() {
		this.frameworkDal.add(this.addFrameworkForm2.getRawValue()).subscribe(() => {
			this.cdr.markForCheck();
		});
	}
}

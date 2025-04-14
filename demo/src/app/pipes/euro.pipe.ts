import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'euro' })
export class EuroPipe implements PipeTransform {
	transform(value: number | undefined) {
		if (!value) {
			return value; // Garbage In Garbage Out
		}

		if (value.toString().includes('.')) {
			let [wholes, decimals] = value.toString().split('.');
			return `€ ${wholes},${decimals.padEnd(2, '0')}`;
		}

		return `€ ${value}`;
	}
}

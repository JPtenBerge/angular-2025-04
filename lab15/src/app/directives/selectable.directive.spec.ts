import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { SelectableDirective, SelectionChange } from './selectable.directive';

@Component({
	template: `<div dpSelectable="foo"></div>`,
})
class TestComponent {}

describe('SelectableDirective', () => {
	let sut: SelectableDirective<string>;
	let element: HTMLElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TestComponent],
			imports: [SelectableDirective],
		}).compileComponents();
		const testFixture = TestBed.createComponent(TestComponent);
		const sutDebugElement = testFixture.debugElement.query(By.directive(SelectableDirective));
		sut = sutDebugElement.injector.get(SelectableDirective);
		element = sutDebugElement.nativeElement;
	});

	it('should be deselected by default', () => {
		expect(sut.selected).toBe(false);
	});

	it('should set the "dp-unselected" class', () => {
		expect(element.classList).toContain('dp-unselected');
		expect(element.classList).not.toContain('dp-selected');
	});

	describe('mousedown event', () => {
		function actEvent() {
			const mouseEvent = new MouseEvent('mousedown');
			element.dispatchEvent(mouseEvent);
		}

		it('should set selected to true', () => {
			actEvent();
			expect(sut.selected).toBe(true);
		});

		it('should set the "dp-selected" class', () => {
			actEvent();
			expect(element.classList).not.toContain('dp-unselected');
			expect(element.classList).toContain('dp-selected');
		});

		it('should emit a selectionChange event', async () => {
			const selectionChangedEvent = firstValueFrom(sut.selectionChange);
			const expected: SelectionChange<string> = {
				selected: true,
				subject: 'foo',
			};
			actEvent();
			expect(await selectionChangedEvent).toEqual(expected);
		});

		it('should set selected to false when already selected', () => {
			sut.selected = true;
			actEvent();
			expect(sut.selected).toBe(false);
		});

		it('should emit a selectionChange event with selected false when already selected', async () => {
			sut.selected = true;
			const selectionChangedEvent = firstValueFrom(sut.selectionChange);
			const expected: SelectionChange<string> = {
				selected: false,
				subject: 'foo',
			};
			actEvent();
			expect(await selectionChangedEvent).toEqual(expected);
		});
	});
});

import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface SelectionChange<T> {
	selected: boolean;
	subject: T;
}

@Directive({ selector: '[dpSelectable]', standalone: true })
export class SelectableDirective<T> {
	private classList: DOMTokenList;
	public selected = false;

	@Input('dpSelectable')
	public subject!: T;

	@Output()
	public selectionChange = new EventEmitter<SelectionChange<T>>();

	constructor(el: ElementRef) {
		this.classList = (el.nativeElement as HTMLElement).classList;
		this.updateSelected();
	}

	@HostListener('mousedown')
	mouseDown() {
		this.toggle();
	}

	@HostListener('mouseenter', ['$event'])
	mouseEnter(ev: MouseEvent) {
		if (ev.buttons === 1) {
			this.toggle();
		}
	}

	private toggle() {
		this.selected = !this.selected;
		this.updateSelected();
		this.emitSelectionChange();
	}

	private updateSelected() {
		if (this.selected) {
			this.classList.remove('dp-unselected');
			this.classList.add('dp-selected');
		} else {
			this.classList.remove('dp-selected');
			this.classList.add('dp-unselected');
		}
	}

	private emitSelectionChange() {
		this.selectionChange.emit({
			selected: this.selected,
			subject: this.subject,
		});
	}
}

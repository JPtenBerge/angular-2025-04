import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../models/contact';
import { SelectionChange } from '../../directives/selectable.directive';

@Component({
	selector: 'dp-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {
	@Input() contacts?: Contact[];
	@Output() delete = new EventEmitter<Contact>();
	@Output() edit = new EventEmitter<Contact>();
	@Output() selectContacts = new EventEmitter<Set<Contact>>();

	private editingContacts = new Set<Contact>();
	private selectedContacts = new Set<Contact>();

	updateSelection({ selected, subject }: SelectionChange<Contact>) {
		if (selected) {
			this.selectedContacts.add(subject);
		} else {
			this.selectedContacts.delete(subject);
		}
		this.selectContacts.emit(this.selectedContacts);
	}

	deleteContact(contactToDelete: Contact) {
		this.delete.emit(contactToDelete);
	}

	setColor($event: Event, contact: Contact) {
		const input = ($event as InputEvent).target as HTMLInputElement;
		contact.color = input.value;
	}

	setEditMode(contact: Contact, editForm: NgForm) {
		if (this.isInEditMode(contact)) {
			if (editForm.valid) {
				this.editingContacts.delete(contact);
				this.edit.emit(contact);
			}
		} else {
			this.editingContacts.add(contact);
		}
	}

	isInEditMode(contact: Contact) {
		return this.editingContacts.has(contact);
	}
}

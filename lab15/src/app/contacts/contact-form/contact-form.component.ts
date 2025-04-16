import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../models/contact';

@Component({
	selector: 'dp-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
	@Output() add = new EventEmitter<Contact>();

	newContact: Contact = {
		id: 0,
		firstName: '',
		surname: '',
		email: '',
	};

	addContact(contactForm: NgForm) {
		this.add.emit({ ...this.newContact });
		contactForm.reset();
	}
}

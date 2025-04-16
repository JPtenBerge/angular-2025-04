import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
	selector: 'dp-contacts-page',
	templateUrl: './contacts-page.component.html',
	styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit {
	constructor(private contactService: ContactService) {}

	allContacts?: Contact[];
	selectedContacts = new Set<Contact>();

	ngOnInit(): void {
		this.updateContacts();
	}

	private updateContacts() {
		this.allContacts = undefined;
		this.contactService.getAll().subscribe(contacts => {
			this.allContacts = contacts;
		});
	}

	addContact(contact: Contact) {
		this.contactService.create(contact).subscribe(() => {
			this.updateContacts();
		});
	}
	editContact(contact: Contact) {
		this.contactService.update(contact).subscribe(() => {
			this.updateContacts();
		});
	}
	deleteContact(contactToDelete: Contact) {
		this.contactService.delete(contactToDelete.id).subscribe(() => {
			this.updateContacts();
		});
	}

	selectContacts(contacts: Set<Contact>) {
		this.selectedContacts = contacts;
	}
	invite() {
		console.log(
			'Invite',
			[...this.selectedContacts].map(contact => contact.surname),
		);
	}
}

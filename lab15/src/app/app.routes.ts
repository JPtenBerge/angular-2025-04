import { Routes } from '@angular/router';
import { ContactsPageComponent } from './contacts/contacts-page/contacts-page.component';
import { EventsPageComponent } from './events/events-page/events-page.component';
import { EditEventPageComponent } from './events/edit-event-page/edit-event-page.component';

export const routes: Routes = [
	{ path: 'contacts', component: ContactsPageComponent },
	{ path: 'events', component: EventsPageComponent },
	{ path: 'events/edit/:id', component: EditEventPageComponent },
	{ path: '', pathMatch: 'full', redirectTo: '/contacts' },
];

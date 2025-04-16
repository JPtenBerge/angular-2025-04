import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContactsModule } from './contacts/contacts.module';
import { MenuComponent } from './menu/menu.component';
import { EventsModule } from './events/events.module';

@Component({
	selector: 'dp-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, ContactsModule, EventsModule, MenuComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

}

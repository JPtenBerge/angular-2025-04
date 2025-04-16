import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEventPageComponent } from './edit-event-page/edit-event-page.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';

@NgModule({
	declarations: [EditEventPageComponent, EventsListComponent, EventsPageComponent, CreateEventComponent],
	imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule],
})
export class EventsModule {}

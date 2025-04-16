import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactNamePipe } from './pipes/contact-name.pipe';
import { SelectableDirective } from '../directives/selectable.directive';

@NgModule({
	declarations: [ContactListComponent, ContactsPageComponent, ContactFormComponent, ContactNamePipe],
	imports: [FormsModule, CommonModule, SelectableDirective],
})
export class ContactsModule {}

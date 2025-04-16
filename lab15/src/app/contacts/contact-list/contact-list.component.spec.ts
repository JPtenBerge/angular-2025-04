import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from '../models/contact';
import { ContactListComponent } from './contact-list.component';
import { ContactsModule } from '../contacts.module';

describe('ContactListComponent', () => {
	let component: ContactListComponent;
	let element: HTMLElement;
	let fixture: ComponentFixture<ContactListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ContactsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ContactListComponent);
		component = fixture.componentInstance;
		element = fixture.nativeElement;
		fixture.detectChanges();
	});

	it('should show 2 contacts when 2 contacts are bound', () => {
		// Arrange
		component.contacts = [
			{ id: 1, email: '', firstName: '', surname: '' },
			{ id: 3, email: '', firstName: '', surname: '' },
		];

		// Act
		fixture.detectChanges();

		// Assert
		expect(element.querySelectorAll('tbody tr').length).toBe(2);
	});

	it('should format the name correctly', async () => {
		// Arrange
		component.contacts = [{ id: 1, firstName: 'James', surname: 'Bond', email: 'j@b.co.uk' }];

		// Act
		fixture.detectChanges();
		await fixture.whenStable();
		await fixture.whenStable();
		await fixture.whenStable();

		// Assert
		const nameData = element.querySelector<HTMLElement>('tbody tr:first-child td:first-child')!;
		expect(nameData.textContent).toContain('James Bond');
	});

	describe('when editing a contact', () => {
		let firstNameInput: HTMLInputElement;
		let surnameInput: HTMLInputElement;
		let emailInput: HTMLInputElement;
		let row: HTMLTableRowElement;

		beforeEach(async () => {
			// Arrange
			component.contacts = [
				{
					id: 1,
					firstName: 'James',
					surname: 'Bond',
					email: 'james.bond@mi6.co.uk',
				},
			];
			fixture.detectChanges();
			row = element.querySelector<HTMLTableRowElement>('tbody tr:first-child')!;
			const editButton = row.querySelector<HTMLButtonElement>('.editButton')!;
			editButton.click();
			fixture.detectChanges();
			await fixture.whenStable();

			firstNameInput = row.querySelector<HTMLInputElement>('input[name=firstName]')!;
			surnameInput = row.querySelector<HTMLInputElement>('input[name=surname]')!;
			emailInput = row.querySelector<HTMLInputElement>('input[name=email]')!;
		});

		it('should show edit inputs', async () => {
			expect(firstNameInput.value).toBe('James');
			expect(surnameInput.value).toBe('Bond');
			expect(emailInput.value).toBe('james.bond@mi6.co.uk');
		});

		it('should allow to edit the first name', async () => {
			// Arrange
			firstNameInput.value = 'Richard';
			firstNameInput.dispatchEvent(new Event('input'));

			// Act
			row.querySelector<HTMLButtonElement>('.saveButton')!.click();

			// Assert
			expect(component.contacts![0].firstName).toBe('Richard');
		});

		it('should not allow to save when contact is invalid', async () => {
			// Arrange
			let actualEdited: Contact | undefined;
			component.edit.subscribe(edited => {
				actualEdited = edited;
			});
			emailInput.value = 'invalid-email-address';
			emailInput.dispatchEvent(new Event('input'));

			// Act
			row.querySelector<HTMLButtonElement>('.saveButton')!.click();
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(actualEdited).toBeUndefined();
		});

		it('should emit an "edit" event', () => {
			// Arrange
			let actualEdited: Contact | undefined;
			component.edit.subscribe(edited => {
				actualEdited = edited;
			});

			// Act
			row.querySelector<HTMLButtonElement>('.saveButton')!.click();
			fixture.detectChanges();

			// Assert
			expect(actualEdited).toBe(component.contacts![0]);
		});

		it('should show the name again after edit', () => {
			// Arrange
			firstNameInput.value = 'Richard';
			firstNameInput.dispatchEvent(new Event('input'));

			// Act
			row.querySelector<HTMLButtonElement>('.saveButton')!.click();
			fixture.detectChanges();

			// Assert
			expect(row.querySelector<HTMLElement>('td:first-child')!.textContent).toContain('Richard Bond');
		});
	});

	describe('delete', () => {
		let row: HTMLTableRowElement;
		let contacts: Contact[];

		beforeEach(async () => {
			// Arrange
			contacts = [
				{
					id: 0,
					firstName: 'James',
					surname: 'Bond',
					email: 'james.bond@mi6.co.uk',
				},
			];
			component.contacts = contacts;
			fixture.detectChanges();
			await fixture.whenStable();
			row = element.querySelector<HTMLTableRowElement>('tbody tr:first-child')!;
		});

		it('should dispatch a "delete" event', () => {
			// Arrange
			let actualDeleted: Contact | undefined;
			component.delete.subscribe(deleted => {
				actualDeleted = deleted;
			});

			// Act
			row.querySelector<HTMLButtonElement>('.deleteButton')!.click();
			fixture.detectChanges();

			// Assert
			expect(actualDeleted).toBe(contacts[0]);
		});
	});

	describe('pick color', () => {
		let firstCell: HTMLTableCellElement;
		let colorInput: HTMLInputElement;
		beforeEach(async () => {
			component.contacts = [
				{
					id: 0,
					firstName: 'James',
					surname: 'Bond',
					email: 'james.bond@mi6.co.uk',
				},
			];
			fixture.detectChanges();
			await fixture.whenStable();
			firstCell = element.querySelector<HTMLTableCellElement>('tbody tr:first-child td:first-child')!;
			colorInput = firstCell.querySelector<HTMLInputElement>('input[type=color]')!;
		});

		it("should set the background color of the row to the contact's color", () => {
			component.contacts![0].color = '#ff0000';
			fixture.detectChanges();
			expect(firstCell.style.backgroundColor).toEqual('rgb(255, 0, 0)');
		});

		it('should change the background when a color is picked for this contact', () => {
			colorInput.value = '#ff0000';
			colorInput.dispatchEvent(new Event('input'));
			fixture.detectChanges();
			expect(firstCell.style.backgroundColor).toEqual('rgb(255, 0, 0)');
		});
	});
});

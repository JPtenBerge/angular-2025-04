import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contact } from '../models/contact';
import { ContactService } from './contact.service';

describe('Contact service', () => {
	let sut: ContactService;
	let httpMock: HttpTestingController;
	const contactsEndpoint = `${environment.backendUrl}/contacts`;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		sut = TestBed.inject(ContactService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('should not retrieve contacts when created', () => {
		httpMock.expectNone(contactsEndpoint);
	});

	describe('getAll', () => {
		it('should retrieve all contacts when called', async () => {
			// Arrange
			const expectedContacts: Contact[] = [{ id: 1, email: 'e@mail.com', firstName: 'foo', surname: 'bar' }];

			// Act
			const actualContactsAct = firstValueFrom(sut.getAll());
			httpMock.expectOne(contactsEndpoint).flush(expectedContacts);

			// Assert
			expect(await actualContactsAct).toEqual(expectedContacts);
		});
	});

	describe('create', () => {
		it('should post the contact data', async () => {
			// Arrange
			const expectedContactData: Omit<Contact, 'id'> = {
				email: 'e@mail.com',
				firstName: 'John',
				surname: 'Doe',
			};
			const expectedContact = {
				id: 6,
				...expectedContactData,
			};

			// Act
			const actualContactAct = lastValueFrom(sut.create(expectedContact));
			const httpRequest = httpMock.expectOne({
				url: contactsEndpoint,
				method: 'POST',
			});
			httpRequest.flush(expectedContact);
			const actualContact = await actualContactAct;

			// Assert
			expect(actualContact).toBe(expectedContact);
			expect(httpRequest.request.body).toEqual(expectedContactData);
		});
	});

	describe('update', () => {
		it('should put the contact data', async () => {
			// Arrange
			const expectedContactData: Omit<Contact, 'id'> = {
				email: 'e@mail.com',
				firstName: 'John',
				surname: 'Doe',
			};
			const expectedContact = { id: 5, ...expectedContactData };

			// Act
			const actualContactAct = lastValueFrom(sut.update(expectedContact));
			const httpRequest = httpMock.expectOne({
				url: `${contactsEndpoint}/5`,
				method: 'PUT',
			});
			httpRequest.flush(expectedContact);
			const actualContact = await actualContactAct;

			// Assert
			expect(actualContact).toBe(expectedContact);
			expect(httpRequest.request.body).toEqual(expectedContactData);
		});
	});

	describe('delete', () => {
		it('should send and HTTP delete', async () => {
			// Act
			const actualContactAct = lastValueFrom(sut.delete(5));
			const httpRequest = httpMock.expectOne({
				url: `${contactsEndpoint}/5`,
				method: 'DELETE',
			});
			httpRequest.flush({ status: 204 });
			await actualContactAct;

			// Assert
			expect(httpRequest.request.body).toBe(null);
		});
	});
});

import { TestBed } from '@angular/core/testing';
import { AutocompleterComponent } from './autocompleter.component';
import { FormsModule } from '@angular/forms';
import { NavigateService } from '../../services/navigate.service';
import { MockProvider } from 'ng-mocks';

interface Provincie {
	naam: string;
	hoofdstad: string;
}

describe('Component: Autocompleter', () => {
	let data: Provincie[];
	let sut: AutocompleterComponent<Provincie>;
	let navigateServiceMock: jasmine.SpyObj<NavigateService>;

	beforeEach(() => {
		data = [
			{ naam: 'Drenthe', hoofdstad: 'Assen' },
			{ naam: 'Groningen', hoofdstad: 'Groningen' },
			{ naam: 'Noord-Holland', hoofdstad: 'Haarlem' },
			{ naam: 'Zuid-Holland', hoofdstad: 'Rotterdam' },
			{ naam: 'Zeeland', hoofdstad: 'Middelburg' },
			{ naam: 'Flevoland', hoofdstad: 'Lelystad' },
			{ naam: 'Overijssel', hoofdstad: 'Zwolle' },
			{ naam: 'Gelderland', hoofdstad: 'Arnhem' },
			{ naam: 'Limburg', hoofdstad: 'Maastrig' },
		];

		// without ng-mocks:
		// navigateServiceMock = jasmine.createSpyObj<NavigateService>('navigateServiceMock', ['next']);
		// navigateServiceMock.next.and.returnValue(42);

		// navigateServiceMock = new NavigateService();
		// spyOn(navigateServiceMock, 'next');

		TestBed.configureTestingModule({
			declarations: [], // niet-standalone components pipes directives
			imports: [AutocompleterComponent, FormsModule], // modules
			providers: [MockProvider(NavigateService)], // services/DI globale instellingen als locale
		});
		navigateServiceMock = TestBed.inject(NavigateService) as jasmine.SpyObj<NavigateService>;
		navigateServiceMock.next.and.returnValue(42);

		let fixture = TestBed.createComponent(AutocompleterComponent<Provincie>);
		fixture.componentRef.setInput('data', data);
		sut = fixture.componentInstance;
	});

	it('autocompletes a list of suggestions', () => {
		// Arrange
		sut.query = 's';

		// Act
		sut.autocomplete();

		// Assert
		let expected = [
			{ naam: 'Drenthe', hoofdstad: 'Assen' },
			{ naam: 'Flevoland', hoofdstad: 'Lelystad' },
			{ naam: 'Overijssel', hoofdstad: 'Zwolle' },
			{ naam: 'Limburg', hoofdstad: 'Maastrig' },
		];
		expect(sut.suggestions).toEqual(expected);
	});

	it('shows all data if no query is provided', () => {
		// Act
		sut.autocomplete();

		// Assert
		expect(sut.suggestions).toEqual(data);
	});

	it('handles different datatypes gracefully', () => {
		// Arrange
		let fixture = TestBed.createComponent(AutocompleterComponent<{ x?: number; y?: null | string }>);
		fixture.componentRef.setInput('data', [{ x: 41 }, { y: 'hoi' }, { y: null }, { y: 'blaai' }]);
		let sut = fixture.componentInstance;
		sut.query = 'i';

		// Act
		sut.autocomplete();

		// Assert
		expect(sut.suggestions).toEqual([{ y: 'hoi' }, { y: 'blaai' }]);
	});

	it('adds suggestions uniquely', () => {
		// Arrange
		sut.query = 'e';

		// Act
		sut.autocomplete();

		// Assert
		let expected = [
			{ naam: 'Drenthe', hoofdstad: 'Assen' },
			{ naam: 'Groningen', hoofdstad: 'Groningen' },
			{ naam: 'Noord-Holland', hoofdstad: 'Haarlem' },
			{ naam: 'Zuid-Holland', hoofdstad: 'Rotterdam' },
			{ naam: 'Zeeland', hoofdstad: 'Middelburg' },
			{ naam: 'Flevoland', hoofdstad: 'Lelystad' },
			{ naam: 'Overijssel', hoofdstad: 'Zwolle' },
			{ naam: 'Gelderland', hoofdstad: 'Arnhem' },
		];
		expect(sut.suggestions).toEqual(expected);
	});

	// it('does not navigate to the next suggestion if there are no suggestions', () => {
	// 	// Arrange
	// 	sut.query = 'qwerty';
	// 	sut.autocomplete();

	// 	// Act
	// 	sut.next();

	// 	// Assert
	// 	expect(sut.activeSuggestionIndex).toBeNull();
	// });

	it(`uses the ${NavigateService.name} for nexting`, () => {
		// Act
		sut.next();

		// Assert
		expect(navigateServiceMock.next).toHaveBeenCalled(); // spionnetje
		expect(sut.activeSuggestionIndex).toBe(42);
	});
});

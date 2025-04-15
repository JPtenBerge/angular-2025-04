import { AutocompleterComponent } from './autocompleter.component';

interface Provincie {
	naam: string;
	hoofdstad: string;
}

describe('Component: Autocompleter', () => {
	let data: Provincie[];
	let sut: AutocompleterComponent<Provincie>;

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
		sut = new AutocompleterComponent<Provincie>(); // TestBed
	});

	it('autocompletes a list of suggestions', () => {
		// Arrange
		sut.data = data;
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
		// Arrange
		sut.data = data;

		// Act
		sut.autocomplete();

		// Assert
		expect(sut.suggestions).toEqual(data);
	});

	it('handles different datatypes gracefully', () => {
		// Arrange
		let sut = new AutocompleterComponent<{ x?: number; y?: null | string }>();
		sut.data = [{ x: 41 }, { y: 'hoi' }, { y: null }, { y: 'blaai' }];
		sut.query = 'i';

		// Act
		sut.autocomplete();

		// Assert
		expect(sut.suggestions).toEqual([{ y: 'hoi' }, { y: 'blaai' }]);
	});

	it('adds suggestions uniquely', () => {
		// Arrange
		sut.data = data;
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

    it('does not navigate to the next suggestion if there are no suggestions', () => {
        // Arrange
        sut.data = data;
        sut.query = 'qwerty';
        sut.autocomplete();

        // Act
        sut.next();

        // Assert
        expect(sut.activeSuggestionIndex).toBeNull();
    });

	describe('nexting', () => {
		beforeEach(() => {
			sut.data = data;
			sut.query = 's';
			sut.autocomplete();
		});

		it('navigates to the first suggestion when no suggestion is active', () => {
			// Act
			sut.next();

			// Assert
			expect(sut.activeSuggestionIndex).toBe(0);
		});

		it('navigates to the second suggestion when the first suggestion is active', () => {
			// Arrange
			sut.next();

			// Act
			sut.next();

			// Assert
			expect(sut.activeSuggestionIndex).toBe(1);
		});

		it('navigates to the first suggestion when the last suggestion is active', () => {
			// Arrange
			sut.suggestions?.forEach(s => sut.next());

			// Act
			sut.next();

			// Assert
			expect(sut.activeSuggestionIndex).toBe(0);
		});
	});
});

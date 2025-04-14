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
		sut = new AutocompleterComponent<Provincie>();
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
    })
});

import { EuroPipe } from "./euro.pipe";

describe('Pipe: Euro', () => { // [TestClass]
    let sut: EuroPipe;

    beforeEach(() => {
        sut = new EuroPipe(); // system under test
    });

    it('formats a whole number as a currency', () => { // [TestMethod] @Test
        expect(sut.transform(123)).toBe(`€ 123,-`);
	});

    it('formats a negative number as a currency', () => { // [TestMethod] @Test
        expect(sut.transform(-123)).toBe(`-€ 123,-`);
	});

    it('formats a number with one decimal as a currency', () => { // [TestMethod] @Test
        expect(sut.transform(123.4)).toBe(`€ 123,40`);
	});

    it('formats a number with two decimals as a currency', () => { // [TestMethod] @Test
        expect(sut.transform(123.45)).toBe(`€ 123,45`);
    });

    it('handles undefined gracefully', () => { // [TestMethod] @Test
        expect(sut.transform(undefined)).toBeUndefined();
    });
});
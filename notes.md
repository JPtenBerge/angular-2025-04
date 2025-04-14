# Notes

## Geschiedenis

AngularJS
- voorganger van Angular
- versie 1.0.0 - 1.9.0
- kwam uit in 2011

Angular
- versie 2.x - 19.x
- kwam uit in 2016
- van Google
- full-fledged framework
- features out of the box:
  - dependency injection
  - routing
  - `HttpClient` voor communicatie met de backend
  - interceptors
  - unittesten
  - forms
- men programmeert in TypeScript
- vooral geliefd in Enterprise

Angular vs the world
- rest van de libraries zijn view libraries
- React - 2013 - facebook/Meta
- Vue - Evan You - ex-Google
- Angular - Google
- Svelte - Rich Harris - Vercel
- Lit (web components) - Google

nadelen Angular:
- Ruud vindt TypeScript en JavaScript stom
- Wesley vond boilerplate
- updaten sucks.
- momenteel zit Angular in een heule lange grote MIGRATIEPERIODE

## Project aanmaken 

Een paar dingen aanmaken:
- index.html
- alle client-side libs toevoegen
  - @angular/core
  - @angular/forms
  - @angular/routing
  - @angular/...
  - rxjs
  - zone.js
  - tslib
- unittesten
  - karma jasmine <== wat standaard bij Angular komt
    - karma is deprecated.
  - mocha chai sinon jest (React)   @testing-library  Vitest
- end-to-end testen
  - Cypress
  - Playwright
  - Selenium (heule ouwe)
  - WebdriverIO
  - Nightwatch
  - Testcafe
- TypeScript installeren & configureren

Makkelijker - de CLI!` @angular/cli`

- ng new <projectnaam>
- ng serve - compileert alles en deployt alles op een lokaal webservertje 	
- ng build
- ng test
  - ng test --code-coverage
- ng e2e

## Paradigmas der webdev

SPA - Single Page Application
- Angular Vue React Svelte Blazor Solid    Qwik 

SSR - Server-Side Rendering
- Nuxt Next SvelteKit QwikCity SolidStart ASP.NET Core @angular/ssr
- hydration

MPA - Multi Page Application

## Pipes

Handig voor formatten van data, bij het databinden meegeven:

```html
{{name | uppercase}}
{{nu | date: 'd-m-Y' | empty}}
```

- output van de ene pipe is de input voor de volgende pipe
- default pipes
  - uppercase
  - lowercase
  - titlecase
  - currency
  - date
  - obj | json   handig voor debuggen
  - number
  - percentage
  - async  Promise/Observable


## Unittesten

- karma    <== runner rapporteert
- jasmine  <== framework assertions

```ts
describe('...', () => {
	it('..', () => {

	});
});
```

Let op: [Karma](https://github.com/karma-runner/karma) is al een tijdje deprecated. [Angular is bezig met het evalueren van nieuwere tools](https://angular.dev/roadmap):
>We're currently evaluating Web Test Runner, Vitest, and Jest as candidates for a new test runner for Angular projects while preserving Jasmine as assertion library to not break existing tests.


## Formulieren

Twee manieren!

- Template-driven (FormsModule)
  - hier staat alles in je template
- Model-driven (ReactiveFormsModule)
  - hier niet.

Reactive forms voordelen:
- meer scheiding == meer beter
- unittestbaarheid
- custom validators zijn "gewoon" functies


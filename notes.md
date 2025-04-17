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
- Nuxt Next SvelteKit QwikCity SolidStart ASP.NET Core @angular/ssr Analog (Vite)
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

Volgens de [State of JS](https://2024.stateofjs.com/en-US/libraries/testing/) doet Vitest het behoorlijk goed. Goede kans dat Angular daar naartoe gaat bewegen. Jest is momenteel de populairste optie, goede kans dat die ook ondersteund wordt. [Vitest met Angular inzetten](https://timdeschryver.dev/blog/angular-testing-library-with-vitest). Jest heeft momenteel officieel experimental support, Vitest niet.

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

## Components

- lifecycle
- herbruikbaar UI-component
  - TDD

```ts
// wat Angular doet
let comp = new LifeComponent(); // constructor
comp.inputVal = comp.getAttribute('message'); // input binding
comp.ngOnInit();


// veel later



comp.ngOnDestroy();
```

## Test-driven development (TDD)

1. Schrijf een test
2. Draai de test en zie dat hij faalt
3. Vibe code/implementeer   minimale code
4. Draai de test en zie dat hij slaagt / alle tests
5. Refactor

Repeat.

RED-GREEN-REFACTOR

npm i json-server@0.17.4
npx json-server .\data.json --delay 3000

## Backendcommunicatie

- `fetch()` is prima:
  ```ts
  fetch('http://localhost:3000/frameworks').then(x => x.json()).then(frameworks => { /* ... */ });
  ```
  Maar:
  - 500/409 statuscode is geen exception, triggert je `.catch()` niet
    ```ts
    fetch('...').then( x=> x.json()).catch(err => {})
    ```
  - JSON-parsing bij 200 OK, maar niet bij 201/204/401/500-statuscodes
  - features als interceptors - bij ieder request bijv. een authenticatie-header meesturen
- [Axios](https://www.npmjs.com/package/axios) is een veelgeziene package in dit spectrum
- Angular's `HttpClient` doet automatisch JSON parsen, biedt ondersteuning voor interceptors, maar werkt nog met Observables.
- [TanStack Query](https://tanstack.com/query/v5/docs/framework/angular/overview) ben ik wel van gecharmeerd de laatste tijd. Hier en daar met testen een beetje tricky om aan de praat te krijgen, maar wel erg fijn dat hij zelf states bijhoudt van `isSuccess()` `isPending()`, etc. Werkt ook met Angular's hippe nieuwe signals. Kan ook queries retryen en "stale" data invalidaten/refreshen.

## Dependency injection / services

- een instantie van een object krijgen zonder dat je 'm zelf aanmaakt
  - geen `new BlaService();`
    - lastiger te testen. lastiger te mocken.
- een vorm van inversion of control
- dingen injecteren:
  - constructor // 2+
  - `inject()` // 14+
- iets beschikbaar maken:
  - `@Injectable()`
  - `providers` - config van je app  singleton
  - `viewProviders` - singleton binnen component en diens children

## Routing

- SPA is meestal pagina's (WhatsApp Web bijv.)
- geen paginarefreshes meer, enkel content vervangen
- veel minder FOUC  Flash Of Unstyled Content

SPA in index.html:

- optie 1:
  ```html
  <div id="page1">...</div>
  <div id="page2">...</div>
  <div id="page3">...</div>
  ...
  <div id="page4" active>...</div>
  <div id="page5">...</div>
  ```

- optie 2: alle paginatemplates client-side zijn, maar dan in-memory
- optie 3: lazy loading - iedere paginatemplate van server ophaalt
- fancy optie 4 (komt meer bij PWAs langs): PRPL
  - Push critical resources  <== alles wat voor de eerste paginarender nodig is.
  - Render initial route
  - Pre-cache additional routes  <== inladen
  - Lazy loading the rest

Stappen in Angular:

1. route config
2. `<router-outlet>` voor de paginacontent
3. pagina's maken

Angular Router:
- basaal pagina's
- parameters mee wil geven
- child routes
- route guards  - ingelogd
- route resolvers
- lazy loading

## Observables

Reactivity - Observables. Wordt in Angular best veel ingezet:
- `HttpClient`  `.subscribe()`
- ReactiveForms
  - `this.form.valueChanges.subscribe()`
- `@Output()`  `EventEmitter` <== Observable
- Routing
  - `this.route.params.subscribe()`

`HttpClient` geeft dus een Observable terug. Moet je die `unsubscriben()`?

- na een request, als de response binnen is, wordt de observable `gecomplete()`
- de meeste developers doen het niet.
- vaak abstraheert het DAL weg hoe er met server wordt gecommuniceerd:
  ```ts
  export class HomeComponent {
    private productDal = inject(ProductDal);
    ngOnInit() {
      this.productDal.getAll().subscribe( ...)
    }
  }
  ```
  Als je niet zeker weet of het een HTTP-observable is, is unsubscriben wel het netst.

use cases observables:
- WebSocket    (HTTP promises)
- chat
- authenticationstate
- master-details op zelfde scherm

5 fasen "reactive denken"
- Observable subscriben
- operators
- Subjects
- ingewikkelde operators  `switchMap()` `mergeMap()` `iif()`
- principes - nooit `.subscribe()` in je TypeScript-code
  ```html
  @for(frameworks of frameworkObservable | async) { ... }
  ```

**Subjects**

- `Subject<T>`: `.subscribe()` krijgt enkel wat er vanaf dan ge`next()` wordt
- `BehaviorSubject<T>`: `.subscribe()` krijgt de laatste waarde en wat er vanaf dan ge`next()` wordt
- `ReplaySubject<T>`: `.subscribe()` krijgt een geschiedenis van items binnen (standaard alles) en wat er vanaf dan ge`next()` wordt

## Lijst bijwerken

Na een POST je lijst van data bijwerken:

1. na adden alles opnieuw ophalen
   - nadeel: maximaal je server aan het belasten
   - nadeel: traaaaagst
   - voordeel: makkelijk - meestal .getAll()
   - voordeel: meest in sync met server

2. object meteen handmatig aan lijst toevoegen
   - nadeel: je weet niet of dat adden goed gaat - communicatie
   - nadeel: minst in sync met server - id
   - voordeel: SNEL MAKKELIJK

3. POST-response de bijgewerkte entiteit handmatig aan lijst toevoegen
   - voordeel: classy
   - voordeel: adden gaat goed
   - nadeel: minder in sync met server 
   - nadeel: minder snel
   - alternatief: POST-response de hele lijst teruggeeft - trager. minder conform REST

spinner: mogen slimmer++ worden. Na 5 sec. geen resultaat? Na 15 sec. geen resultaat? "Goh dat duurt lang he?" richting gebruiker.

## Change detection

ALLE databindingexpressies op de pagina af.

{{bla}}
[disabled]="..."
@for
@if

// wat Angular doet => zone.js

let originalTimeout = window.setTimeout;

window.setTimeout = (callback, ms) => {
	originalTimeout(() => {
		callback(); // waar wij data mogelijk aanpassen
		runChangeDetection();
	}, ms);
};

undefined = 'hoi';

waarom zone.js weg:
- minder magie
- meer controle
- performance




wanneer OnPush-componenten wel worden gerenderd:
- bij markForCheck()
- als event in component zelf optreedt
- als inputparameter veranderd (oldVal === newVal, let op met arrays/objects)
- signals



## UI testing / end-to-end testing
- verschil? backend mocken of niet.

Tools:
- Cypress
  - Cypress Inc.
  - Cypress Dashboard/Cloud
  - architectuur  alle commando's klaarzetten/batchen
  - API  Promise   interactie  cy.get('bla').should('have.text', 'bla');
    TypeScript  .d.ts
- Playwright
  - Microsoft
  - volop TypeScript
  - browser support
  - chique API
- Selenium (20+ jaar oud)
- Testcafe
- WebdriverIO

## Angular's migratie

Oud Angular vs new Angular.

**Component input/outputs**

```ts
// Angular 2+
export class JouwComponent {
	@Input() data;
	@Output() selectItem = new EventEmitter<T>();
}

// Angular 17+
export class JouwComponent {
	data = input(); // input signal
	selectItem = output<T>(); // output signal
}
```

**Dependency injection**

Oud Angular vult `providers`-array, nieuw Angular `providedIn: 'root'`

```ts
// Angular 2+
{
	providers: [
		// { provide: NavigateService, useClass: NavigateService },
		NavigateService,
	],
};

// Angular 7+
@Injectable({ providedIn: 'root' })
export class NavigateService {
```

## Overig

**How to clone an object**

```ts
let shallowClone  = { ...this.newFramework };
let deepClone  = JSON.parse(JSON.stringify(this.newFramework)); // traag.
let besteClone = structuredClone(this.newFramework);
```

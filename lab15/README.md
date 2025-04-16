# Datepicker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

This project is customized to have a dual boot setup. Both [jest](https://jestjs.io/) and [karma](https://karma-runner.github.io) tests are included.

**Note:** This _not_ something you would do for production, but it makes it so you can see the solutions for both.

- Run `npm run test:karma` to execute the unit tests via Karma.
- Run `npm run test:jest` to execute the unit tests via Jest.

## Running mutation testing

This project also has [StrykerJS](https://stryker-mutator.io) installed to perform [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing). Since the unit tests use a dual boot setup, StrykerJS is also configured as a dual boot setup.

- Run `npm run test:mutation:karma` to execute mutation testing using karma and the the `@stryker-mutator/karma-runner` plugin.
- Run `npm run test:mutation:jest` to execute mutation testing using jest and the the `@stryker-mutator/jest-runner` plugin.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

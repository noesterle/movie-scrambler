# MovieScrambler

## About

This project was designed to help further learn Angular, Typescript, HTML, and CSS.
This project is called Movie Scrambler.
Once a development server is started, it allows users to search for movie information using [OMDb](https://www.omdbapi.com) to gather the information.
After the information is populated on the webpage, it also shows a scrambled version of the movie plot made up of random synonyms of every word of the plot.
These synonyms are retrieved using [WordsAPI](https://www.wordsapi.com/), which is accessible through [RapidAPI](https://rapidapi.com/).

## Getting Set Up to Run

In order to run, the user needs API Keys from OMDb and from RapidAPI. 
Keys to these APIs can be obtained at limited free tiers, you can sign up for an OMDb Key [here](https://www.omdbapi.com/apikey.aspx) and the WordsAPI RapidAPI Key [here](https://rapidapi.com/dpventures/api/wordsapi/pricing).

## Using the Keys

### API Quotas, Limiting, and Testing

I believe OMDb will stop responding with movies to requests that go over the rate limit, but I have not been in this situation to know. 
However, RapidAPI will charge your payment information if you go over the quota. 

#### RapidAPI

Once a RapidAPI account has been signed up for, to see the Key's Quota usage, navigate to the account's [Subscription and Usage page](https://rapidapi.com/developer/billing/subscriptions-and-usage).

A RapidAPI user can test endpoints using a built in tool [here](https://rapidapi.com/dpventures/api/wordsapi/endpoints).
That tool can also be used to see how many requests have been made. 
By making a request using the `Test Endpoint` button, click on `Results` to see the reply.
Then click `Headers` and look for `x-ratelimit-requests-remaining`, that associated number will be the number of remaining requests that key can make.

#### OMDb

To test using the OMDb API, there is an example available on [their website](https://www.omdbapi.com/) where a user can search for movies by filling in parameters and the website will construct the request, show the user the request, and show the user the reply and result.

### Adding the API Keys to the Project

After obtaining the API Keys, they need to be added to the project. 
In order to add the API Keys, copy `keys.ts.example` in `movie-scrambler/src/app`, paste it into `movie-scrambler/src/app`, and rename the key `keys.ts`.
Put the OMDb key in between the quotes following `MOVIE_API_KEY`.
Put the RapidAPI Key for WordsAPI in between the quotes following the `WORDS_API_KEY`.

With the `keys.ts` file being added, the project will successfully compile when running the development server as detailed below.

## Default Generated Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

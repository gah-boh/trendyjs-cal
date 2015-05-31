# TrendyJS 2015 - Edition
Sample app for my Pittsburgh TechFest talk. This app shows how to use [React](https://facebook.github.io/react/), [React Router](https://github.com/rackt/react-router), [RxJS](https://github.com/Reactive-Extensions/RxJS), [Immutable](https://facebook.github.io/immutable-js/), and [Aurelia's dependency injection](https://github.com/aurelia/dependency-injection) together and with ES2015 using [Babel](http://babeljs.io/) and finally a [webpack](http://webpack.github.io/) build.

## Installation
- Clone the repo
- Run `npm install`
- To build and start the server run `npm start`
- Go to `localhost:9000` to see the app

## Excercises
This project has several missing features on purpose. They are marked with `TODO:` The purpose of this is to allow you to play around with these technologies without having to set up a whole project, and having a point of reference.

### Features to add as an excercise
- month-view.js
    - add buttons for going to the previous and the next month with routes.
- date-builder.js
    - Make the buildMonth method return an immutable data structure.
    - Add the `PureRender` mixin to the month.js component when pasing in immutable from buildMonth in previous step.


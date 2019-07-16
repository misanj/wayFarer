# wayFarer

[![Build Status](https://travis-ci.com/misanj/wayFarer.svg?branch=develop)](https://travis-ci.com/misanj/wayFarer) [![Coverage Status](https://coveralls.io/repos/github/misanj/wayFarer/badge.svg?branch=develop)](https://coveralls.io/github/misanj/wayFarer?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/60ba4f93acf7a8198bc0/maintainability)](https://codeclimate.com/github/misanj/wayFarer/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/60ba4f93acf7a8198bc0/test_coverage)](https://codeclimate.com/github/misanj/wayFarer/test_coverage)


WayFarer is a public bus transportation booking server.

## Installing / Getting started

Running this application, you'll need to have Node.js and git version control installed to clone the repo. Then follow the instructions....

- clone the repo using

```shell
https://github.com/misanj/bankaApp.git
```
- run `npm install --prod` to install dependencies
- create a .env file from the .env.example file and fill in the necessary environment variables
- run `npm run build` to build the project and then run `npm start` to start the server
- now access the server on the localhost port 5200 i.e `localhost:4000 or 127.0.0.1:4000`

 Now the server will go live and listen for requests


## Developing

To futher develop this app, a few handy tools nodemon, debug and some other dev dependencies have been put inplace to enable a smooth run, You can access them by starting the server using npm run dev. But before using the command, make sure to follow the steps below:

```shell
git clone https://github.com/misanj/wayFarer.git
cd wayFarer/
npm install
npm run dev
```

### Building

The app is written in ES6+ and wired to run ES5 transpiled code in production. To transpile any changes to ES5 run the script shown below:

```shell
npm run build
```
Babel then transpiles your ES6+ files to ES5 for environment compatibility


## Features

* User (client) can sign up
* Admin/staff can view all user accounts

* User can sign up
* User can sign in
* Admin can create a trip
* Admin can cancel a trip
* Both Admin and Users can see all trips
* Users can book a seat on a trip
* View all bookings. An Admin can see all bookings
* while user can see all of his/her  bookings
* Users can delete their booking
* Users can get a list of filtered trips based on origin
* Users can get a list of filtered trips based on destination
* Users can specify their seat numbers when making a booking 


## Links


- Repository: https://github.com/misanj/wayFarer
- Pivotal tracker: https://www.pivotaltracker.com/n/projects/2360682
- Heroku: https://way-far-er.herokuapp.com/api/v1

## Licensing

Copyright (C) Misanj Temisan Otokuefor "The code in this project is licensed under ISC LICENSE"
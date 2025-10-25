# Secrets API Client

This Node.js application built with Express and Axios interacts with the Secrets API.

## Overview

The application facilitates CRUD (Create, Read, Update, Delete) operations on secrets stored in the Secrets API.

## Setup

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Replace `yourBearerToken` in `index.js` with your own bearer token from the Secrets API.
4. Run the application using `npm start`.

## Usage

- Routes:
  - `POST /get-secret`: Retrieve a secret by its ID.
  - `POST /post-secret`: Post a new secret.
  - `POST /put-secret`: Update an existing secret.
  - `POST /patch-secret`: Partially update an existing secret.
  - `POST /delete-secret`: Delete a secret by its ID.

- Each route requires specific parameters in the request body, as documented in the [Secrets API documentation](https://secrets-api.appbrewery.com/).

## Dependencies

- Express: Web framework for Node.js.
- Axios: HTTP client for requests to the Secrets API.
- Body-parser: Middleware for parsing incoming request bodies.

## Credits

This project is part of [The Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) by Angela Yu.

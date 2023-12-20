# Spread API

## Introduction

The Spread API enables access to information about market spreads based on data retrieved from [Buda.com API](https://api.buda.com)

## Features

### Spread API

The API allows 4 main actions to the user:

- Create a spread alert (POST - /v1/spreads/alert)
- Get all spreads (GET - /v1/spreads)
- Get a single spread (GET - /v1/spreads/market_id)
- Get spread alert status (GET - /v1/spreads/spread_id)

### API documentation

This API has been developed using [Swagger](https://swagger.io/) to provide a better developer experience.

To navigate to the graphic interface swagger provides, please visit `http://localhost:3000/api-docs`.

This page features the different endpoints of the API, http methods, param types, and request and response example objects.

### Containerization

There is an implementation to create a docker image from the project's source code.

These instructions can be found in the `Dockerfile` at the root directory.

In order to build the image after making changes, please run the following command:

```bash
docker build . -t spread-api
```

After the image has been built, you can run it with:

```bash
docker run -p 3000:3000 spread-api
```

### Testing

For this project, most efforts have been made to test the `spreads service`, but there are also test cases for the `spreads controller` and `app controller` to make sure there are no exceptions and the dependency injection works correctly.

To run the test cases, run:

```
npm run test
```

Alternatively you can add the option `:watch` to run the tests every time you make a change to the code.

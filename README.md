# CheeSwhiz - Galvanize Q2 Back End Project

For full documentation of the CheeSwhiz API please visit: http://cheeswhiz.herokuapp.com/api-docs/

CheeSwhiz is an api that allows users to get information about Cheese. CheeSwhiz has 3 levels of users: non-logged in, registered users, and super-users. All users can view all cheeses in the database; add a cheese to the database; search for cheeses by name, animal milk, firmness; find a substitute cheese; randomly generate a cheese; and find a local cheese store. Everyone can log in or create a basic account with CheeSwhiz. Registered users can save favorite cheeses, add notes to their favorite cheeses, and delete favorites.  Lastly there are super-users (@danielmarcgardner and @reidPD) who can update cheeses in the database as well as delete them.

CheeSwhiz was voted 2nd best project in the class and was the most used API in Q3 to build a front end for.

CheeSwhiz is built with Swagger which is built on top of Node and Express. Swagger builds the interactive documentation that is deployed and does some of the basic validations. CheeSwhiz uses a PostgreSQL database to store data and is connected to the server using Knex. User authentication and authorization is transmitted and decoded using JWT. CheeSwhiz uses Mocha/Super Test for testing.

# Getting Started

1. Fork and clone repo
2. `npm install`
3. Please register for [Yelp OAuth Tokens](https://www.yelp.com/developers/v3/manage_app) for the find a cheese store search functionality.
4. Set up a '.env' file. The '.env' file should look like this:
```
JWT_KEY=xxxxx
OAUTH_CONSUMER_KEY= xxxxx
OAUTH_CONSUMER_SECRET= xxxxx
OAUTH_TOKEN= xxxxx
OAUTH_TOKEN_SECRET= xxxxx
```
5. `swagger project edit` To run it locally in development mode.

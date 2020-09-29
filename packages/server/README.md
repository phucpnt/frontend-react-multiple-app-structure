## What the server includes?

Sentifi intelligence includes multiple applications. This server will serve each application on dedicated `/sub-path`.

* Company module: `/company`
* Market module: `/market`
* More...

This server will include the authentication for user login.
* Hide away the client secret & client key from the frontend.


## Authentication handling

* User send request to server
* server check the `cookie` which include the api token
* server send a request to API check if token is still valid
    * If valid, server allow user to load the next page
    * If not valid, server redirect user to login page

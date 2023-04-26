# test-colkie
## Docker commands
- To launch application
    - first time or after removing image - `docker-compose up --build`
    - from then on - `docker-compose up` or for detached mode - `docker-compose up -d`
- To stop application
    - `docker-compose stop`
- To stop application and remove docker containers
    - `docker-compose down`
- To stop application and remove volumes and image permanently (warning db data will be erased)
    - `docker-compose down -v`
    - `docker image rm tes-colkie`

## Unit tests and E2E test
- Unit tests for the service and controllers are located in their respective folders 
    - example `test-colkie/src/users.`
- E2E tests are located in the project root, `test-colkie/test.`
- Test coverage can be improved with more time.
- Test are included in github actions so that they are run automatically on github whenever there is a push, pull request or merge

## Documentation
- OpenAPI documentation is created using swagger and can be viewed at 
    - `http://localhost:3000/api`

## Functionality
- Application runs on localhost:3000, example: `localhost:3000/rooms/user`
- To be able to test one has to create a room and a user using the `POST /rooms` and `POST /users` endpoints.
- This will return the required room `id` and user `id` to use in the other endpoints.
- If the room or user do not exist in the database, adding users or messages to a room will fail.
- When a user requests messages from a room, all messages added since last request will be sent.
- This works by updating the `lastLogin` field whenever latest messages are sent.
- Postgres was used as the database, which contains 4 tables. It can be accessed from outside of the docker environment using `localhost:5400`. The database name, username and password can be found in the following files:
    - `.env` 
    - `docker-compose.yml`.
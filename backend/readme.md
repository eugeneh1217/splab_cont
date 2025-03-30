# Backend
Database flavor is sqlite.

## Backend Set up
1. install sqlite3 with `sudo apt-get install sqlite3`
2. create virtual env, install requirements, activate environment
3. run alembic migration with `alembic upgrade head` from `backend/` directory
4. source .env from `backend/`
5. run backend server with `./run.sh` from `backend/`
6. can run tests with `./test.sh` from `backend/`


## FastAPI
FastAPI was selected because it
* Is fast
* Enforces OpenAPI standard
* Generates docs for frontend team
* Uses Pydantic models

[FastAPI
Testing](https://fastapi.tiangolo.com/tutorial/testing/#using-testclient)
* Testing is used for integration testing as well as unit testing
* Tests are written in order and use a real SQLite3 database to test
  integration.

## DBML
[DBML](https://dbml.dbdiagram.io/home/) is "Database Markup Language" used to
create database schema diagram.

## Alembic
[Alembic](https://github.com/sqlalchemy/alembic) is a python sqlalchemy database migration tool.
[Alembic
 Tutorial](https://alembic.sqlalchemy.org/en/latest/tutorial.html#create-a-migration-script)
New Alembic versions are created with `alembic revision -m "migration title"`.
Run migrations until most recent version with `alembic upgrade head`.

## SQLite
### Linux Setup
Install dependencies with `sudo apt-get install sqlite3`

### Create Database
[SQLite3](https://www.sqlite.org/quickstart.html)
Create database file with `sqlite3 ~/splab/data/database.db`


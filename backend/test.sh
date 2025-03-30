#!/bin/sh
alembic downgrade -1
alembic upgrade head
pytest


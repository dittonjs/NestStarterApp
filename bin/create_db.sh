#!/bin/bash

source .env
echo "Creating db '$DB_NAME'"

pg_ctl status || pg_ctl start

{
  createdb $DB_NAME && echo "Database '$DB_NAME' created successfully"
} || {
  echo "Database '$DB_NAME' already exists, skipping creation."
}

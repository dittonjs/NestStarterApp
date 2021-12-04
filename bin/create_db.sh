#!/bin/bash

source .env
echo "Creating db '$DATABASE_URL'"

pg_ctl status || pg_ctl start

{
  createdb $DATABASE_URL && echo "Database '$DATABASE_URL' created successfully"
} || {
  echo "Database '$DATABASE_URL' already exists, skipping creation."
}

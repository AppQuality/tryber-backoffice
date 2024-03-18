#!/bin/bash

USERNAME=$(cat generate-devel-token.json | jq -r .username)
PASSWORD=$(cat generate-devel-token.json | jq -r .password)
URL=$(cat generate-devel-token.json | jq -r .url)
DATA='{"username":"'$USERNAME'","password":"'$PASSWORD'"}'

echo "REACT_APP_DEFAULT_TOKEN="$(curl -X POST -H 'Content-type: application/json' -A "Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/81.0" --data "$DATA" $URL/authenticate | jq -r .token  ) > .env.development.local

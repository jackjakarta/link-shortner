#!/bin/sh

aws secretsmanager get-secret-value --secret-id prod/klikr --query 'SecretString' --output text | jq -r 'to_entries | .[] | "\(.key)=\(.value)"' > .env

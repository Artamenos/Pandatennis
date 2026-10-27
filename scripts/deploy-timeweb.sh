#!/usr/bin/env bash
set -euo pipefail

: "${TIMEWEB_HOST:?TIMEWEB_HOST is required}"
: "${TIMEWEB_USER:?TIMEWEB_USER is required}"
: "${TIMEWEB_PORT:=22}"
: "${TIMEWEB_PATH:?TIMEWEB_PATH is required}"
: "${TIMEWEB_SSH_KEY:?TIMEWEB_SSH_KEY is required}"
: "${TIMEWEB_KNOWN_HOSTS:?TIMEWEB_KNOWN_HOSTS is required}"

test -d out
test -s out/index.html
[[ "$TIMEWEB_USER" =~ ^[a-zA-Z0-9_-]+$ ]] || { echo 'Invalid SSH user'; exit 1; }
[[ "$TIMEWEB_HOST" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]+$ ]] || { echo 'Invalid SSH host'; exit 1; }
[[ "$TIMEWEB_PORT" =~ ^[0-9]{1,5}$ ]] || { echo 'Invalid SSH port'; exit 1; }
# rsync --delete must only target the explicitly configured website directory.
[[ "$TIMEWEB_PATH" =~ ^/home/[a-zA-Z0-9_/-]+/public_html/?$ ]] || { echo 'Expected an absolute Timeweb public_html path'; exit 1; }
[[ "$TIMEWEB_PATH" != *//* ]] || { echo 'Invalid deployment path'; exit 1; }
work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT

key_file="$work_dir/deploy_key"
known_hosts_file="$work_dir/known_hosts"
printf '%s\n' "$TIMEWEB_SSH_KEY" > "$key_file"
printf '%s\n' "$TIMEWEB_KNOWN_HOSTS" > "$known_hosts_file"
chmod 600 "$key_file" "$known_hosts_file"

rsync -az --delete \
  --exclude '.well-known/' \
  -e "ssh -p $TIMEWEB_PORT -i $key_file -o IdentitiesOnly=yes -o UserKnownHostsFile=$known_hosts_file -o StrictHostKeyChecking=yes" \
  out/ "$TIMEWEB_USER@$TIMEWEB_HOST:$TIMEWEB_PATH/"

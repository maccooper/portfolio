#!/usr/bin/env bash
# show-projects.sh
# Streams project descriptions from descriptions.json, one at a time.
# Run from repo root: bash show-projects.sh
# Requires: jq  (brew install jq / apt install jq)

set -euo pipefail

ls projects/ | while read p; do
  jq -r ".$p" descriptions.json
  sleep 1.5
done

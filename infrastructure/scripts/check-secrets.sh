#!/usr/bin/env sh
set -eu

if git ls-files | grep -E '(^|/)\.env($|\.)' | grep -v '\.env\.example$'; then
  echo "A dotenv secret file is tracked by Git." >&2
  exit 1
fi

echo "No dotenv secret files are tracked."

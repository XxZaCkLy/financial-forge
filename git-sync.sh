#!/bin/bash
set -e

# Ask for a commit message if not provided
if [ -z "$1" ]; then
  echo "Enter commit message:"
  read msg
else
  msg=$1
fi

# Stage, commit, pull (with rebase), and push
git add .
git commit -m "$msg" || echo "⚠️ Nothing to commit"
git pull --rebase origin main
git push origin main
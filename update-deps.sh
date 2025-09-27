#!/bin/bash
set -e

echo "🔍 Checking for outdated packages..."
pnpm outdated || true

echo "⬆️ Updating all dependencies to latest..."
pnpm update --latest

echo "📦 Reinstalling clean dependencies..."
rm -rf node_modules pnpm-lock.yaml
pnpm install

echo "✅ Dependencies updated and lockfile refreshed!"
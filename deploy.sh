#!/bin/bash

# Circuit Sorcerer Site Deployment Script
# Deploys static site to Synology NAS

set -e

NAS_HOST="192.168.1.104"
NAS_PORT="6969"
NAS_USER="dad"
NAS_PATH="/volume1/web/CS"
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "🚀 Deploying Circuit Sorcerer site to NAS..."
echo "   Host: ${NAS_USER}@${NAS_HOST}:${NAS_PORT}"
echo "   Path: ${NAS_PATH}"
echo ""

# Build the site
echo "📦 Building site..."
cd "${PROJECT_DIR}"
npm run build

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Error: out/ directory not found. Build may have failed."
    exit 1
fi

echo "✅ Build complete!"
echo ""

# Create directory on NAS if it doesn't exist
echo "📁 Creating deployment directory on NAS..."
ssh -p ${NAS_PORT} ${NAS_USER}@${NAS_HOST} "mkdir -p ${NAS_PATH}"

# Deploy files
echo "📤 Uploading files to NAS..."
rsync -avz --progress \
    --delete \
    -e "ssh -p ${NAS_PORT}" \
    "${PROJECT_DIR}/out/" \
    "${NAS_USER}@${NAS_HOST}:${NAS_PATH}/"

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: http://${NAS_HOST}/CS/"
echo ""

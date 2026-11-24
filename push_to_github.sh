#!/bin/bash
# Script to push student-management-api to GitHub

set -e

echo "=========================================="
echo " Pushing to GitHub: aiswaryabala17"
echo " Repo: student-management-api"
echo "=========================================="

# Ensure branch is main
git branch -M main

# Push to GitHub
git push -u origin main

echo ""
echo "✅ Successfully pushed to https://github.com/aiswaryabala17/student-management-api"

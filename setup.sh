#!/bin/bash

# MERN Portfolio Setup Script for Mac/Linux

echo ""
echo "==================================="
echo "MERN Portfolio Setup"
echo "==================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Error: Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js found:"
node --version
echo ""

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd client
npm install
cd ..

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
cd server
npm install
cd ..

echo ""
echo "==================================="
echo "Setup Complete!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Configure MongoDB connection in server/.env"
echo "2. Set Gmail credentials in server/.env"
echo "3. Run: npm run dev"
echo ""
echo "See QUICKSTART.md for detailed instructions."
echo ""

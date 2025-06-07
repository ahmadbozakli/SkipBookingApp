#!/bin/bash

# Development script for the Skip Booking App

echo " Starting Skip Booking App in development mode..."

# Run development environment with docker-compose
docker-compose --profile dev up skip-booking-dev

echo " Development server started at http://localhost:3001"

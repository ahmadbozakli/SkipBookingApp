# Build script for the Skip Booking App

echo " Building Skip Booking App..."

# Build Docker image
docker build -t skip-booking-app .

echo " Build complete!"
echo " To run the app: docker run -p 3000:80 skip-booking-app"
echo " To run with docker-compose: docker-compose up"

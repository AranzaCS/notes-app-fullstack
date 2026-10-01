#!/bin/bash
echo "=== Installing Backend Dependencies ==="
cd backend
npm install

echo "=== Installing Frontend Dependencies ==="
cd ../frontend
npm install


echo "=== Starting Backend (NestJS on http://localhost:3001) ==="
cd ../backend
npm run start:dev &
BACKEND_PID=$!

echo "=== Starting Frontend (Vite on http://localhost:5173) ==="
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Press Ctrl+C to kill both background processes on exit
trap "kill $BACKEND_PID$FRONTEND_PID; exit" INT TERM EXIT

echo "Application ready!"
echo "Press Ctrl+C to stop all processes."

wait
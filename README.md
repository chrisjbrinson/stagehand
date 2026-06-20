# Stagehand

Stagehand is a prototype installation management platform for interactive experiences and digital exhibits.

The project was created to explore the software architecture behind managing multiple installations, monitoring system health, controlling scene changes, and tracking operational activity.

## Features

* Installation dashboard
* Scene control API
* Activity/event logging
* FastAPI backend
* React + TypeScript frontend

## Technology Stack

### Backend

* Python
* FastAPI
* Uvicorn

### Frontend

* React
* TypeScript
* Vite

## Current Functionality

* View installation status
* View scene information
* Trigger scene changes
* Record activity events
* Display activity feed

## Future Enhancements

* Event timestamps
* Real-time updates via WebSockets
* TouchDesigner integration
* Asset deployment workflows
* Health monitoring and alerting

## Running Locally

### Backend

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Project Goals

This project is intended as a learning platform for modern full-stack development and creative technology workflows, combining API development, frontend engineering, and interactive system control concepts.


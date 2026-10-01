# Full-Stack Notes SPA

A full-stack web application for creating, editing, archiving, and deleting notes built with **NestJS**, **React (Vite + TypeScript)**, **TypeORM**, and **SQLite**.

---

## Architecture & Stack

- **Backend:** NestJS (Node.js framework enforcing Controller-Service-Repository pattern).
- **Database:** TypeORM with `sql.js` (SQLite in-memory/file driver, zero database installation required).

- **Frontend:** React with TypeScript (built with Vite for high performance).
- **HTTP Client:** Axios with centralized API client configuration.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

---

## Quick Start

Run a single command from the root directory to set up dependencies, initialize the database schema, and launch both frontend and backend servers:

```bash
bash run.sh
```

**Frontend Application:** http://localhost:5173

**Backend API:** http://localhost:3001/api/notes
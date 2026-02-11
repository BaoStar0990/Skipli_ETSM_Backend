# ETMS Backend

This ETMS backend system is built on **_Express.js_** + **_TypeScript_**. This project uses **_Express_**, **_Firebase Admin_**, and supporting services (**_SendGrid_**, **_Twilio_**) with a layered architecture (N-tier architecture).

- As ExpressJS is a minimalist framework of NodeJS for building API, this design allow developers to freely design their project structure. Therefore I have built the project on the pattern of OOP as most similar as possible

## Project Structure

```
.
├─ src/
│  ├─ server.ts                  # App entrypoint
│  ├─ type.d.ts                  # Global type declarations
│  ├─ config/                    # App, DB, mail, and third-party configs
│  ├─ constants/                 # Enums and constant values
│  ├─ controllers/               # HTTP request handlers
│  ├─ dtos/                      # Request/response DTOs and validation
│  ├─ entities/                  # Domain entities
│  ├─ exceptions/                # Custom error types
│  ├─ middlewares/               # Express middlewares
│  ├─ repositories/              # Data access layer
│  │  ├─ impls/                   # Repository implementations
│  │  └─ interfaces/             # Repository interfaces
│  ├─ routes/                    # Route definitions
│  ├─ services/                  # Business logic layer
│  │  ├─ impls/                   # Service implementations
│  │  └─ interfaces/             # Service interfaces
│  └─ utils/                     # Shared utilities
├─ dist/                         # Build output (generated)
├─ firebaseKey.json              # Firebase service account key
├─ firestore.indexes.json        # Firestore indexes
├─ nodemon.json                  # Dev runner config
├─ tsconfig.json                 # TypeScript config
├─ eslint.config.mts             # ESLint config
├─ .env                          # Environment variables (local)
└─ package.json                  # Scripts and dependencies
```

## Prerequisites

- Node.js 18+ (recommended)
- npm (bundled with Node.js)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (if missing) and add required environment variables. This project expects configuration for services like Firebase, SendGrid, and Twilio.

## Development

Run the dev server with nodemon + tsx:

```bash
npm run dev
```

## Build

Compile TypeScript to `dist/` and fix path aliases:

```bash
npm run build
```

## Production

Start the compiled server:

```bash
npm start
```

## Linting and Formatting

```bash
npm run lint
npm run lint:fix
npm run prettier
npm run prettier:fix
```

# Fullstack Todo Application

A modern, TypeScript-based todo application with a Next.js frontend and Express backend.

## Project Structure

```
fullstack-todo-app/
├── packages/              # Monorepo packages
│   ├── api/              # Backend API (Express + TypeScript)
│   │   ├── src/
│   │   │   ├── config/   # Configuration files
│   │   │   ├── controllers/
│   │   │   ├── db/       # Database setup and migrations
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── routes/
│   │   └── tests/
│   ├── web/              # Frontend (Next.js)
│   │   ├── src/
│   │   │   ├── app/      # Next.js app directory
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   └── tests/
│   └── shared/           # Shared code and types
│       ├── src/
│       │   └── types/
│       └── tests/
├── docker/               # Docker configuration
└── docs/                 # Documentation
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development servers:
   ```bash
   npm run dev
   ```

This will start both the API (localhost:8080) and web app (localhost:3000).

## Development

- `npm run dev`: Start all development servers
- `npm run dev:api`: Start API development server
- `npm run dev:web`: Start web development server
- `npm run build`: Build all packages
- `npm run test`: Run all tests
- `npm run lint`: Lint all packages

## Testing

Each package has its own test suite:
- API: Uses Jest with SQLite for testing
- Web: Uses Jest with React Testing Library
- Shared: Uses Jest for type testing

## Docker

To run the application using Docker:

```bash
docker-compose up
```

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

MIT
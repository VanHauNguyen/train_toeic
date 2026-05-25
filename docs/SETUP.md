# Setup

This platform is offline-first for learner features. It uses seeded lessons, database vocabulary, tests, and deterministic question templates.

## Backend

```bash
npm install
npm run db:seed
npm run start:dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Build

```bash
npm run content:validate
npm run build
cd frontend
npm run build
```

## Environment

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/toeic_tw_platform?schema=public"
PORT=3001
JWT_SECRET="change-this-secret"
JWT_EXPIRES_IN="7d"
ENABLE_AI_CONTENT_GENERATION=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Runtime learner content is served by:

- `GET /api/lessons`
- `GET /api/lessons/:id`
- `POST /api/questions/generate`
- `GET /api/vocabulary`
- `GET /api/review`

## Adding Content

- Add lessons in `src/content/data/lessons.ts`.
- Add vocabulary in `src/content/data/vocabulary.ts`.
- Add Part 5 question-bank items in `src/content/data/question-bank.ts`.
- Run `npm run content:validate` before committing changes.

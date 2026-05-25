# TOEIC Traditional Chinese Learning Platform

Offline-first TOEIC learning platform for learners who need simple Traditional Chinese and Vietnamese explanations, beginner-friendly grammar review, workplace vocabulary, practice questions, review guidance, and progress tracking.

The app no longer depends on realtime LLM calls for learner features. It uses deterministic content services, seeded data, local lesson structures, and rule-based TOEIC Part 5 question templates.

## Architecture

- **Backend:** NestJS, Prisma, JWT auth, RBAC, tests, vocabulary, dashboard, review, and offline content APIs.
- **Frontend:** Next.js learner/admin UI with guided lessons, vocabulary, grammar practice, mock tests, review flow, and admin content tools.
- **Content layer:** `ContentService` serves static lesson data and database vocabulary.
- **Question generation:** `QuestionGeneratorService` selects TOEIC Part 5 questions from a local bank and falls back to mixed practice when a topic is too small.
- **Runtime model calls:** Disabled. Learner requests use only local content, database records, and deterministic rules.

## Why This Is Faster And Cheaper

- No model startup time.
- No local model memory cost.
- No per-request API cost.
- No network dependency for learner practice after setup.
- Deterministic lessons and questions make behavior easier to test, cache, and review.

## Offline-First Learning Flow

Learners get:

- TOEIC lessons with Traditional Chinese and Vietnamese explanations.
- Beginner-friendly examples and common traps.
- Workplace vocabulary for email, meetings, customer service, logistics, scheduling, and office communication.
- Part 5 grammar practice from deterministic templates.
- Mock tests, answer review, and progress-friendly 7-day review guidance.

Main content APIs:

- `GET /api/lessons`
- `GET /api/lessons/:id`
- `POST /api/questions/generate`
- `GET /api/vocabulary`
- `GET /api/review`

## Content Library

Current local content includes:

- 28 beginner-friendly lessons with learning goals, examples, common mistakes, TOEIC traps, vocabulary, mini practice, exercises, and answer keys.
- 190 deterministic TOEIC Part 5 questions.
- 50 practical workplace vocabulary items with accented Vietnamese, Traditional Chinese, example meanings, collocations, difficulty, and tags.
- Review guidance based on weak tags, recently wrong questions, daily review sets, vocabulary review, and grammar pattern review.

Lesson data lives in:

- `src/content/data/lessons.ts`

Vocabulary data lives in:

- `src/content/data/vocabulary.ts`

Question bank data lives in:

- `src/content/data/question-bank.ts`

When adding content, keep Vietnamese fully accented and Traditional Chinese free of Simplified Chinese wording. Run the validator before building.

## Rule-Based Part 5 Generator

`POST /api/questions/generate`

Input:

```json
{
  "topic": "prepositions",
  "difficulty": "BEGINNER",
  "count": 5
}
```

Supported topics:

- `prepositions`
- `tense`
- `conjunctions`
- `word forms`
- `vocabulary`
- `conditionals`
- `passive voice`
- `adjective adverb`
- `subject verb agreement`

Output contains A/B/C/D options, correct answer, Traditional Chinese explanation, Vietnamese explanation, and tags.

The generator:

- avoids duplicate question IDs in a single response,
- respects beginner/intermediate/advanced filtering,
- uses mixed fallback questions if a topic has too few items,
- returns stable structured JSON.

## Content Validation

```bash
npm run content:validate
```

The validator checks:

- no empty Vietnamese or Traditional Chinese explanations,
- Vietnamese fields contain accented Vietnamese where appropriate,
- obvious Simplified Chinese words are rejected,
- every question has 4 options,
- every correct answer is A/B/C/D,
- every lesson has at least 3 examples and 5 exercises,
- no duplicate lesson IDs,
- no duplicate question IDs,
- required Part 5 bank minimums are met.

## Optional Admin Content Generation

The codebase includes an `OfflineContentGenerator` interface for future admin-only content drafting.

It is disabled by default:

```env
ENABLE_AI_CONTENT_GENERATION=false
```

There is no startup dependency, no automatic model loading, and the app runs without API keys.

## Setup

```bash
npm install
npm run db:seed
npm run start:dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Build backend:

```bash
npm run build
```

Build frontend:

```bash
cd frontend
npm run build
```

## Environment

Required backend values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/toeic_tw_platform?schema=public"
PORT=3001
JWT_SECRET="change-this-secret"
JWT_EXPIRES_IN="7d"
ENABLE_AI_CONTENT_GENERATION=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

Normal learning requires no provider keys and no local model server.

## Production Notes

This architecture is designed for stable educational delivery first. Content is versionable, reviewable, cacheable, and predictable. AI experimentation can be added later as separate admin tooling, but learner practice remains deterministic and cost-free at runtime.

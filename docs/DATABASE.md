# Database

The database stores users, vocabulary, grammar lessons, questions, options, tests, attempts, answers, progress, mistake analysis records, and skill profiles.

Current learner-facing content is deterministic:

- `Vocabulary` stores bilingual workplace and TOEIC words.
- `GrammarLesson` stores seeded beginner-friendly lesson summaries.
- `Question` and `QuestionOption` store approved practice and test questions.
- `Test`, `TestQuestion`, `TestAttempt`, and `UserAnswer` support mock tests and review.
- `StudyProgress` and `UserSkillProfile` support progress-friendly learning flows.

The runtime content APIs are:

- `GET /api/lessons`
- `GET /api/lessons/:id`
- `POST /api/questions/generate`
- `GET /api/vocabulary`
- `GET /api/review`

The Part 5 generator is rule-based and does not persist generated items unless a future admin workflow explicitly saves them through normal question-bank tooling.

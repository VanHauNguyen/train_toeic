# API

Primary offline content endpoints:

## Lessons

`GET /api/lessons`

Returns deterministic TOEIC lesson objects with:

- `id`
- `title`
- `subtitle`
- `part`
- `level`
- `estimatedMinutes`
- `learningGoalVi`
- `learningGoalZhTW`
- `explanationZhTW`
- `explanationVi`
- `keyPatterns`
- `commonMistakes`
- `toeicTraps`
- `examples`
- `vocabulary`
- `grammarPoint`
- `tips`
- `miniPractice`
- `exercises`
- `answerKey`
- `reviewTags`
- `nextLessonIds`

`GET /api/lessons/:id`

Returns one lesson.

## Question Generation

`POST /api/questions/generate`

Creates TOEIC Part 5 practice from rule-based templates.

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

## Vocabulary

`GET /api/vocabulary`

Returns seeded/database vocabulary. Optional query params: `tag`, `category`, `level`.

## Review

`GET /api/review`

Requires JWT. Returns deterministic review guidance from completed attempts:

- weak parts
- weak tags
- recently wrong questions
- daily review question set
- vocabulary review
- grammar pattern review
- beginner recommendations
- 7-day action plan

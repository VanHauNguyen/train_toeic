-- Add language preferences and multilingual learning content.
CREATE TYPE "UserLanguage" AS ENUM ('EN', 'ZH_TW', 'VI');

ALTER TABLE "User"
  ADD COLUMN "preferredLanguage" "UserLanguage" NOT NULL DEFAULT 'ZH_TW';

ALTER TABLE "Vocabulary"
  ADD COLUMN "meaningVi" TEXT,
  ADD COLUMN "exampleVi" TEXT;

ALTER TABLE "GrammarLesson"
  ADD COLUMN "titleZhTW" TEXT,
  ADD COLUMN "titleVi" TEXT,
  ADD COLUMN "contentZhTW" TEXT,
  ADD COLUMN "contentVi" TEXT;

ALTER TABLE "Question"
  ADD COLUMN "questionTextZhTW" TEXT,
  ADD COLUMN "questionTextVi" TEXT,
  ADD COLUMN "passageZhTW" TEXT,
  ADD COLUMN "passageVi" TEXT,
  ADD COLUMN "explanationZhTW" TEXT,
  ADD COLUMN "explanationVi" TEXT;

ALTER TABLE "QuestionOption"
  ADD COLUMN "textZhTW" TEXT,
  ADD COLUMN "textVi" TEXT;

ALTER TABLE "AiExplanation"
  ADD COLUMN "responseZhTW" TEXT,
  ADD COLUMN "responseVi" TEXT;

ALTER TABLE "AiStudyPlan"
  ADD COLUMN "contentZhTW" TEXT,
  ADD COLUMN "contentVi" TEXT;

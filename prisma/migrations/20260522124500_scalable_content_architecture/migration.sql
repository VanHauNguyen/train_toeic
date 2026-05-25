CREATE TYPE "CefrLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');
CREATE TYPE "ContentSource" AS ENUM ('SEED', 'IMPORTED', 'AI_GENERATED', 'MANUAL');
CREATE TYPE "ApprovalStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

ALTER TABLE "Vocabulary"
  ADD COLUMN "toeicCategory" TEXT,
  ADD COLUMN "cefrLevel" "CefrLevel",
  ADD COLUMN "frequencyScore" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "synonyms" TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "antonyms" TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "collocations" TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "source" "ContentSource" NOT NULL DEFAULT 'SEED',
  ADD COLUMN "sourceRef" TEXT,
  ADD COLUMN "nextReviewAt" TIMESTAMP(3),
  ADD COLUMN "reviewCount" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5;

ALTER TABLE "Question"
  ADD COLUMN "source" "ContentSource" NOT NULL DEFAULT 'SEED',
  ADD COLUMN "sourceRef" TEXT,
  ADD COLUMN "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'APPROVED',
  ADD COLUMN "duplicateKey" TEXT;

ALTER TABLE "AiGeneratedQuestion"
  ADD COLUMN "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
  ADD COLUMN "duplicateKey" TEXT,
  ADD COLUMN "sourceRef" TEXT,
  ADD COLUMN "reviewedAt" TIMESTAMP(3),
  ADD COLUMN "reviewedById" TEXT,
  ADD COLUMN "rejectionReason" TEXT;

CREATE INDEX "Vocabulary_toeicCategory_idx" ON "Vocabulary"("toeicCategory");
CREATE INDEX "Vocabulary_cefrLevel_idx" ON "Vocabulary"("cefrLevel");
CREATE INDEX "Vocabulary_frequencyScore_idx" ON "Vocabulary"("frequencyScore");
CREATE INDEX "Vocabulary_nextReviewAt_idx" ON "Vocabulary"("nextReviewAt");
CREATE INDEX "Question_toeicPart_idx" ON "Question"("toeicPart");
CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty");
CREATE INDEX "Question_approvalStatus_idx" ON "Question"("approvalStatus");
CREATE INDEX "Question_source_idx" ON "Question"("source");
CREATE INDEX "Question_duplicateKey_idx" ON "Question"("duplicateKey");
CREATE INDEX "AiGeneratedQuestion_status_idx" ON "AiGeneratedQuestion"("status");
CREATE INDEX "AiGeneratedQuestion_duplicateKey_idx" ON "AiGeneratedQuestion"("duplicateKey");

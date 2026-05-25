import { ToeicLesson } from '../content.types';

export interface OfflineContentGenerator {
  readonly enabled: boolean;
  draftLesson(input: { topic: string; level: string }): Promise<ToeicLesson>;
}

export function isOfflineContentGenerationEnabled() {
  return process.env.ENABLE_AI_CONTENT_GENERATION === 'true';
}

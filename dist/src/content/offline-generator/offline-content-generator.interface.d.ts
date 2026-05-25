import { ToeicLesson } from '../content.types';
export interface OfflineContentGenerator {
    readonly enabled: boolean;
    draftLesson(input: {
        topic: string;
        level: string;
    }): Promise<ToeicLesson>;
}
export declare function isOfflineContentGenerationEnabled(): boolean;

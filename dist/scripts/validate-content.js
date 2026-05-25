"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lessons_1 = require("../src/content/data/lessons");
const question_bank_1 = require("../src/content/data/question-bank");
const vocabulary_1 = require("../src/content/data/vocabulary");
const errors = [];
const answerLabels = new Set(['A', 'B', 'C', 'D']);
const vietnameseAccentPattern = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const simplifiedChinesePattern = /问题|学习|时态|语法|词|汉|门|这|为|个|会话|练习|发票|时间|地点|负责/;
const cjkPattern = /[\u3400-\u9fff]/;
function assert(condition, message) {
    if (!condition)
        errors.push(message);
}
function hasAccent(value) {
    return vietnameseAccentPattern.test(value);
}
function assertVi(value, path) {
    assert(Boolean(value?.trim()), `${path} is empty`);
    if (value && /[A-Za-zÀ-ỹ]/.test(value))
        assert(hasAccent(value), `${path} should contain accented Vietnamese`);
    if (value)
        assert(!cjkPattern.test(value), `${path} should not contain Chinese characters`);
}
function assertZhTW(value, path) {
    assert(Boolean(value?.trim()), `${path} is empty`);
    if (value)
        assert(!simplifiedChinesePattern.test(value), `${path} contains likely Simplified Chinese: ${value}`);
}
function countByTopic(topic) {
    return question_bank_1.TOEIC_PART5_QUESTION_BANK.filter((question) => question.topic === topic).length;
}
const lessonIds = new Set();
for (const lesson of lessons_1.TOEIC_LESSONS) {
    assert(!lessonIds.has(lesson.id), `Duplicate lesson id: ${lesson.id}`);
    lessonIds.add(lesson.id);
    assert(lesson.examples.length >= 3, `${lesson.id} must have at least 3 examples`);
    assert(lesson.exercises.length >= 5, `${lesson.id} must have at least 5 exercises`);
    assertVi(lesson.learningGoalVi, `${lesson.id}.learningGoalVi`);
    assertVi(lesson.explanationVi, `${lesson.id}.explanationVi`);
    assertZhTW(lesson.learningGoalZhTW, `${lesson.id}.learningGoalZhTW`);
    assertZhTW(lesson.explanationZhTW, `${lesson.id}.explanationZhTW`);
    for (const example of lesson.examples) {
        assertVi(example.meaningVi, `${lesson.id}.example.meaningVi`);
        assertVi(example.grammarNoteVi, `${lesson.id}.example.grammarNoteVi`);
        assertZhTW(example.meaningZhTW, `${lesson.id}.example.meaningZhTW`);
        assertZhTW(example.grammarNoteZhTW, `${lesson.id}.example.grammarNoteZhTW`);
    }
    for (const exercise of lesson.exercises) {
        assert(exercise.options.length === 4, `${lesson.id}.${exercise.id} must have 4 options`);
        assert(answerLabels.has(exercise.correctAnswer), `${lesson.id}.${exercise.id} has invalid correctAnswer`);
        assertVi(exercise.explanationVi, `${lesson.id}.${exercise.id}.explanationVi`);
        assertZhTW(exercise.explanationZhTW, `${lesson.id}.${exercise.id}.explanationZhTW`);
    }
}
const questionIds = new Set();
const questionTexts = new Set();
for (const question of question_bank_1.TOEIC_PART5_QUESTION_BANK) {
    assert(!questionIds.has(question.id), `Duplicate question id: ${question.id}`);
    questionIds.add(question.id);
    assert(!questionTexts.has(question.question), `Duplicate question text: ${question.question}`);
    questionTexts.add(question.question);
    assert(question.options.length === 4, `${question.id} must have 4 options`);
    assert(answerLabels.has(question.correctAnswer), `${question.id} has invalid correctAnswer`);
    assertVi(question.explanationVi, `${question.id}.explanationVi`);
    assertZhTW(question.explanationZhTW, `${question.id}.explanationZhTW`);
}
for (const item of vocabulary_1.TOEIC_VOCABULARY) {
    assertVi(item.meaningVi, `${item.word}.meaningVi`);
    assertVi(item.exampleMeaningVi, `${item.word}.exampleMeaningVi`);
    assertZhTW(item.meaningZhTW, `${item.word}.meaningZhTW`);
    assertZhTW(item.exampleMeaningZhTW, `${item.word}.exampleMeaningZhTW`);
}
const requiredCounts = {
    prepositions: 30,
    tense: 30,
    'word forms': 30,
    conjunctions: 20,
    vocabulary: 20,
    'passive voice': 15,
    conditionals: 15,
    'adjective adverb': 15,
    'subject verb agreement': 15,
};
for (const [topic, minimum] of Object.entries(requiredCounts)) {
    assert(countByTopic(topic) >= minimum, `${topic} must have at least ${minimum} questions`);
}
if (errors.length) {
    console.error(`Content validation failed with ${errors.length} issue(s):`);
    for (const error of errors)
        console.error(`- ${error}`);
    process.exit(1);
}
console.log('Content validation passed:', {
    lessons: lessons_1.TOEIC_LESSONS.length,
    questions: question_bank_1.TOEIC_PART5_QUESTION_BANK.length,
    vocabulary: vocabulary_1.TOEIC_VOCABULARY.length,
});
//# sourceMappingURL=validate-content.js.map
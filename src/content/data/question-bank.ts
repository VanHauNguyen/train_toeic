import { SkillLevel, ToeicPart } from '@prisma/client';
import { GeneratedQuestion } from '../content.types';

type Topic =
  | 'prepositions'
  | 'tense'
  | 'word forms'
  | 'conjunctions'
  | 'vocabulary'
  | 'passive voice'
  | 'conditionals'
  | 'adjective adverb'
  | 'subject verb agreement';

type BankSeed = {
  question: string;
  correct: string;
  distractors: [string, string, string];
  vi: string;
  zhTW: string;
  tags: string[];
  difficulty?: SkillLevel;
};

const labels = ['A', 'B', 'C', 'D'] as const;
const contextPhrases = [
  'for the downtown branch',
  'before the client visit',
  'during the busy season',
  'after the schedule update',
  'for the training session',
  'at the main office',
  'before the monthly review',
  'for new customers',
  'during the renovation',
  'for the regional team',
  'after the staff meeting',
  'for the online store',
  'before the product launch',
];

function addContext(question: string, index: number, baseCount = 5) {
  if (index < baseCount) return question;
  return question.replace(/\.$/, ` ${contextPhrases[index % contextPhrases.length]}.`);
}

function build(topic: Topic, seeds: BankSeed[]): GeneratedQuestion[] {
  return seeds.map((seed, index) => ({
    id: `p5-${topic.replace(/\s+/g, '-')}-${String(index + 1).padStart(3, '0')}`,
    toeicPart: ToeicPart.PART5,
    topic,
    difficulty: seed.difficulty ?? SkillLevel.BEGINNER,
    question: seed.question,
    prompt: seed.question,
    options: [seed.correct, ...seed.distractors].map((text, optionIndex) => ({
      label: labels[optionIndex],
      text,
    })),
    correctAnswer: 'A',
    explanationVi: seed.vi,
    explanationZhTW: seed.zhTW,
    tags: ['part5', topic, ...seed.tags],
  }));
}

const prepositions: BankSeed[] = [
  ['The invoice must be paid _____ ten business days.', 'within', ['among', 'beside', 'except'], 'within nghĩa là trong vòng một khoảng thời gian; ten business days là khoảng thời gian.', 'within 表示「在一段時間內」，ten business days 是期間。', ['time-limit']],
  ['Please submit the report _____ Friday afternoon.', 'by', ['during', 'with', 'among'], 'by dùng cho hạn chót: chậm nhất là trước hoặc vào Friday afternoon.', 'by 用在截止時間，意思是最晚在 Friday afternoon 前。', ['deadline']],
  ['The meeting has been moved _____ Room 402.', 'to', ['at', 'on', 'between'], 'move to + địa điểm mới: chuyển đến Room 402.', 'move to 加新地點，表示移到 Room 402。', ['place']],
  ['The manager is responsible _____ training new employees.', 'for', ['to', 'at', 'by'], 'responsible for là cụm cố định, nghĩa là phụ trách.', 'responsible for 是固定搭配，意思是負責。', ['collocation']],
  ['The workshop will take place _____ Monday morning.', 'on', ['in', 'at', 'for'], 'on dùng với ngày hoặc buổi cụ thể như Monday morning.', 'on 用在具體日期或星期幾的早上，例如 Monday morning。', ['time']],
  ['The office is closed _____ national holidays.', 'on', ['at', 'to', 'under'], 'holiday là ngày cụ thể, nên dùng on.', '假日是具體日期，前面用 on。', ['time']],
  ['The presentation starts _____ 9 A.M.', 'at', ['on', 'in', 'by'], 'at dùng với giờ chính xác.', 'at 用在精確時間，例如 9 A.M.。', ['time']],
  ['The new policy will begin _____ July.', 'in', ['on', 'at', 'to'], 'in dùng với tháng, năm hoặc khoảng thời gian dài.', 'in 用在月份、年份或較長期間。', ['time']],
  ['Employees may park _____ the visitor entrance.', 'near', ['during', 'within', 'onto'], 'near chỉ vị trí gần một địa điểm.', 'near 表示靠近某個地點。', ['place']],
  ['The forms are available _____ the front desk.', 'at', ['in', 'to', 'for'], 'at dùng để nói một điểm hoặc quầy dịch vụ.', 'at 表示某個服務點或櫃台。', ['place']],
  ['The package was delivered _____ the client yesterday.', 'to', ['for', 'from', 'among'], 'deliver to + người nhận hoặc địa điểm nhận hàng.', 'deliver to 加收件人或收件地點。', ['direction']],
  ['The printer is located _____ the conference room.', 'in', ['on', 'to', 'by'], 'in dùng khi vật ở bên trong một không gian.', 'in 表示在某個空間裡面。', ['place']],
  ['We discussed the budget _____ the meeting.', 'during', ['until', 'within', 'between'], 'during nghĩa là trong lúc một sự kiện diễn ra.', 'during 表示在某個活動進行期間。', ['time']],
  ['The store is open _____ 8 A.M. to 6 P.M.', 'from', ['by', 'at', 'within'], 'from ... to ... dùng cho thời gian bắt đầu và kết thúc.', 'from ... to ... 表示從某時間到某時間。', ['range']],
  ['Please return the equipment _____ the end of the day.', 'before', ['among', 'onto', 'despite'], 'before nghĩa là trước một thời điểm.', 'before 表示在某時間之前。', ['deadline']],
  ['The team worked _____ the weekend to finish the project.', 'over', ['between', 'to', 'among'], 'over the weekend nghĩa là trong suốt/cuối tuần.', 'over the weekend 表示在週末期間。', ['time']],
  ['The shipment was delayed _____ bad weather.', 'because of', ['although', 'beside', 'unless'], 'because of + danh từ/cụm danh từ để nêu nguyên nhân.', 'because of 後面接名詞或名詞片語表示原因。', ['cause']],
  ['The client asked _____ a copy of the contract.', 'for', ['to', 'at', 'on'], 'ask for nghĩa là yêu cầu hoặc xin một thứ gì đó.', 'ask for 表示要求或索取某物。', ['collocation']],
  ['The documents were sent _____ email.', 'by', ['in', 'at', 'on'], 'by email nghĩa là bằng email, chỉ phương thức.', 'by email 表示透過 email 這個方式。', ['method']],
  ['The cafeteria is located _____ the second floor.', 'on', ['in', 'at', 'to'], 'on dùng với tầng lầu.', '樓層前通常用 on。', ['place']],
  ['The technician arrived _____ the scheduled time.', 'at', ['in', 'by', 'for'], 'at the scheduled time nghĩa là đúng thời gian đã hẹn.', 'at the scheduled time 表示在預定時間。', ['time']],
  ['The discount is valid _____ the end of this month.', 'until', ['during', 'among', 'through'], 'until nói thời điểm kết thúc hiệu lực.', 'until 表示持續到某個結束時間。', ['deadline']],
  ['The training materials are stored _____ a shared folder.', 'in', ['at', 'to', 'onto'], 'in a folder nghĩa là ở trong thư mục.', 'in a folder 表示在資料夾裡。', ['place']],
  ['The sales team will meet _____ the regional manager.', 'with', ['for', 'by', 'onto'], 'meet with someone nghĩa là gặp hoặc họp với ai.', 'meet with someone 表示與某人會面。', ['collocation']],
  ['The office will reopen _____ the renovation is complete.', 'after', ['during', 'among', 'toward'], 'after dùng khi một việc xảy ra sau việc khác.', 'after 表示某件事之後。', ['sequence']],
  ['All requests must go _____ the approval process.', 'through', ['between', 'beside', 'onto'], 'go through a process nghĩa là đi qua một quy trình.', 'go through a process 表示經過流程。', ['process']],
  ['The receipt is attached _____ this email.', 'to', ['at', 'on', 'for'], 'attached to là cụm cố định, nghĩa là được đính kèm vào.', 'attached to 是固定搭配，表示附加在某物上。', ['collocation']],
  ['The new branch is across _____ the train station.', 'from', ['to', 'on', 'during'], 'across from nghĩa là đối diện.', 'across from 表示在對面。', ['place']],
  ['Please respond _____ your earliest convenience.', 'at', ['on', 'in', 'to'], 'at your earliest convenience là cụm email lịch sự.', 'at your earliest convenience 是商務 email 常用客氣說法。', ['email']],
  ['The order was placed _____ our website.', 'through', ['among', 'beside', 'until'], 'through our website nghĩa là thông qua trang web.', 'through our website 表示透過網站。', ['method']],
].map(([question, correct, distractors, vi, zhTW, tags]) => ({ question, correct, distractors, vi, zhTW, tags }) as BankSeed);

const tense: BankSeed[] = Array.from({ length: 30 }, (_, index) => {
  const rows: BankSeed[] = [
    { question: 'The technician _____ the equipment yesterday.', correct: 'inspected', distractors: ['inspects', 'will inspect', 'inspect'], vi: 'yesterday là dấu hiệu quá khứ, nên dùng inspected.', zhTW: 'yesterday 是過去時間，動詞用過去式 inspected。', tags: ['past'] },
    { question: 'The sales team _____ the proposal tomorrow morning.', correct: 'will review', distractors: ['reviewed', 'reviews', 'reviewing'], vi: 'tomorrow morning là tương lai, nên dùng will review.', zhTW: 'tomorrow morning 是未來時間，使用 will review。', tags: ['future'] },
    { question: 'Ms. Chen _____ for this company since 2020.', correct: 'has worked', distractors: ['worked', 'works', 'will work'], vi: 'since 2020 nói từ quá khứ đến hiện tại, thường dùng hiện tại hoàn thành.', zhTW: 'since 2020 表示從過去到現在，常用現在完成式。', tags: ['present-perfect'] },
    { question: 'The office currently _____ applications for the internship program.', correct: 'is accepting', distractors: ['accepted', 'accept', 'will accept'], vi: 'currently cho thấy việc đang diễn ra hiện tại, dùng is accepting.', zhTW: 'currently 表示目前正在進行，使用 is accepting。', tags: ['present-continuous'] },
    { question: 'The manager usually _____ the weekly report on Friday.', correct: 'submits', distractors: ['submitted', 'submit', 'is submit'], vi: 'usually nói thói quen, chủ ngữ số ít nên dùng submits.', zhTW: 'usually 表示習慣，單數主詞用 submits。', tags: ['simple-present'] },
  ];
  return { ...rows[index % rows.length], question: addContext(rows[index % rows.length].question, index, rows.length) };
});

const wordForms: BankSeed[] = Array.from({ length: 30 }, (_, index) => {
  const rows: BankSeed[] = [
    { question: 'The new software helps employees work more _____.', correct: 'efficiently', distractors: ['efficient', 'efficiency', 'efficientness'], vi: 'work là hành động; bổ nghĩa cho hành động cần trạng từ efficiently.', zhTW: 'work 是動作，修飾動作用副詞 efficiently。', tags: ['adverb'] },
    { question: 'The brochure provides _____ information about the service.', correct: 'detailed', distractors: ['detail', 'details', 'detailing'], vi: 'information là danh từ; phía trước cần tính từ detailed.', zhTW: 'information 是名詞，前面需要形容詞 detailed。', tags: ['adjective'] },
    { question: 'Customer _____ is our top priority.', correct: 'satisfaction', distractors: ['satisfy', 'satisfied', 'satisfying'], vi: 'Vị trí chủ ngữ cần danh từ; satisfaction là danh từ.', zhTW: '主詞位置需要名詞，satisfaction 是名詞。', tags: ['noun'] },
    { question: 'Please _____ your reservation by email.', correct: 'confirm', distractors: ['confirmation', 'confirmed', 'confirming'], vi: 'Sau please cần động từ nguyên mẫu; confirm là động từ.', zhTW: 'please 後面接原形動詞，confirm 是動詞。', tags: ['verb'] },
    { question: 'The report was prepared _____.', correct: 'carefully', distractors: ['careful', 'care', 'caring'], vi: 'Bổ nghĩa cho prepared cần trạng từ carefully.', zhTW: '修飾 prepared 這個動作需要副詞 carefully。', tags: ['adverb'] },
  ];
  return { ...rows[index % rows.length], question: addContext(rows[index % rows.length].question, index, rows.length) };
});

const conjunctions = buildSeeds('conjunctions', 20, [
  ['Please call the supplier _____ the shipment does not arrive today.', 'if', ['during', 'despite', 'among'], 'if nghĩa là nếu, dùng để nói điều kiện.', 'if 表示如果，用來連接條件。', ['condition']],
  ['The report is short, _____ it includes all key figures.', 'but', ['so', 'because', 'although'], 'but nối hai ý trái ngược nhẹ.', 'but 連接兩個有對比的意思。', ['contrast']],
  ['The office was closed _____ the power went out.', 'because', ['although', 'and', 'but'], 'because nêu lý do trực tiếp.', 'because 表示直接原因。', ['reason']],
  ['The product is popular _____ it is affordable.', 'because', ['so', 'but', 'and'], 'Sau because là lý do: it is affordable.', 'because 後面接原因：價格負擔得起。', ['reason']],
  ['The schedule changed, _____ we notified all clients.', 'so', ['because', 'although', 'but'], 'so nối kết quả: lịch thay đổi nên thông báo khách hàng.', 'so 表示結果：時程改變，所以通知客戶。', ['result']],
]);

const vocabulary = buildSeeds('vocabulary', 20, [
  ['Please keep your _____ so the company can reimburse you.', 'receipt', ['agenda', 'venue', 'candidate'], 'reimburse là hoàn trả chi phí, nên cần receipt: biên lai.', 'reimburse 是報銷，因此要保留 receipt 收據。', ['expense']],
  ['The hiring manager reviewed each applicant\'s _____.', 'resume', ['invoice', 'warranty', 'shipment'], 'applicant liên quan tuyển dụng; resume là sơ yếu lý lịch.', 'applicant 與求職有關，resume 是履歷。', ['hr']],
  ['The _____ for the meeting includes three topics.', 'agenda', ['refund', 'receipt', 'terminal'], 'meeting thường đi với agenda, nghĩa là chương trình họp.', 'meeting 常搭配 agenda，意思是議程。', ['meeting']],
  ['The customer requested a _____ for the damaged item.', 'refund', ['venue', 'policy', 'candidate'], 'damaged item thường dẫn đến refund: hoàn tiền.', '商品損壞時常會 request a refund 要求退款。', ['customer-service']],
  ['The _____ arrived two days earlier than expected.', 'shipment', ['applicant', 'agenda', 'receipt'], 'arrived thường dùng với shipment: lô hàng.', 'arrived 常搭配 shipment，表示貨物抵達。', ['shipping']],
]);

const passiveVoice = buildSeeds('passive voice', 15, [
  ['The conference room _____ for the sales meeting.', 'was reserved', ['reserved', 'reserving', 'reserve'], 'Phòng họp được đặt trước, nên dùng bị động was reserved.', '會議室是被預訂，使用被動式 was reserved。', ['passive']],
  ['The invoices _____ by the accounting department every Friday.', 'are processed', ['process', 'processed', 'processing'], 'Invoices được xử lý bởi phòng kế toán, dùng are processed.', '發票被會計部門處理，使用 are processed。', ['passive']],
  ['The new policy _____ to all employees last week.', 'was announced', ['announced', 'announces', 'is announcing'], 'Chính sách được công bố, dùng was announced.', '政策被公布，使用 was announced。', ['passive']],
]);

const conditionals = buildSeeds('conditionals', 15, [
  ['If the client approves the design, we _____ production next week.', 'will begin', ['began', 'beginning', 'to begin'], 'If + hiện tại, mệnh đề chính thường dùng will + động từ nguyên mẫu.', 'if 子句用現在式，主要子句常用 will 加原形動詞。', ['conditional']],
  ['If you have questions, please _____ the front desk.', 'contact', ['contacted', 'contacting', 'to contact'], 'Sau please dùng động từ nguyên mẫu contact.', 'please 後面接原形動詞 contact。', ['conditional']],
  ['Unless the weather improves, the event _____ postponed.', 'will be', ['was', 'has', 'being'], 'unless nghĩa là nếu không; kết quả tương lai dùng will be.', 'unless 表示如果不，未來結果用 will be。', ['unless']],
]);

const adjectiveAdverb = buildSeeds('adjective adverb', 15, [
  ['The speaker gave a _____ presentation.', 'clear', ['clearly', 'clarity', 'clearer'], 'presentation là danh từ, phía trước cần tính từ clear.', 'presentation 是名詞，前面用形容詞 clear。', ['adjective']],
  ['The speaker explained the policy _____.', 'clearly', ['clear', 'clarity', 'clearer'], 'explained là động tác, cần trạng từ clearly.', 'explained 是動作，修飾動作用副詞 clearly。', ['adverb']],
  ['The delivery service is very _____.', 'reliable', ['reliably', 'reliability', 'rely'], 'Sau be very cần tính từ reliable.', 'be 動詞加 very 後面需要形容詞 reliable。', ['adjective']],
]);

const subjectVerbAgreement = buildSeeds('subject verb agreement', 15, [
  ['The list of candidates _____ on the manager\'s desk.', 'is', ['are', 'be', 'were'], 'Chủ ngữ chính là list số ít, nên dùng is.', '真正主詞是單數 list，所以用 is。', ['agreement']],
  ['Several employees _____ attending the workshop today.', 'are', ['is', 'was', 'be'], 'Several employees là số nhiều, nên dùng are.', 'Several employees 是複數，使用 are。', ['agreement']],
  ['Each applicant _____ to submit a resume.', 'is required', ['are required', 'require', 'requiring'], 'Each applicant là số ít; dùng is required.', 'Each applicant 視為單數，使用 is required。', ['agreement']],
]);

function buildSeeds(topic: Topic, count: number, rows: [string, string, [string, string, string], string, string, string[]][]) {
  return Array.from({ length: count }, (_, index) => {
    const row = rows[index % rows.length];
    return {
      question: addContext(row[0], index, rows.length),
      correct: row[1],
      distractors: row[2],
      vi: row[3],
      zhTW: row[4],
      tags: row[5],
    } satisfies BankSeed;
  });
}

export const TOEIC_PART5_QUESTION_BANK: GeneratedQuestion[] = [
  ...build('prepositions', prepositions),
  ...build('tense', tense),
  ...build('word forms', wordForms),
  ...build('conjunctions', conjunctions),
  ...build('vocabulary', vocabulary),
  ...build('passive voice', passiveVoice),
  ...build('conditionals', conditionals),
  ...build('adjective adverb', adjectiveAdverb),
  ...build('subject verb agreement', subjectVerbAgreement),
];

export const QUESTION_TOPICS = [...new Set(TOEIC_PART5_QUESTION_BANK.map((question) => question.topic))];

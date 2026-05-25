# TOEIC TW Platform

台灣繁體中文 TOEIC 學習平台，採用 NestJS 後端、Next.js 前端與 PostgreSQL/Prisma 資料層，提供課程、單字、Part 5 題目練習、模擬測驗、作答紀錄、錯題複習與後台內容管理。

本專案的重點不是宣稱「AI 自動教學」，而是把 TOEIC 學習流程拆成可維護、可驗證、可離線運作的內容服務。學習者端以固定課程、資料庫題庫、規則式題目生成與測驗紀錄為核心，讓輸出品質穩定、部署成本低，也方便教育內容審核。

## 專案簡介

TOEIC TW Platform 是面向台灣學習者的英語檢定學習產品原型，內容以繁體中文輔助說明，並保留越南文欄位支援多語學習情境。

目前已實作：

- 28 份 TOEIC 基礎課程內容
- 190 題規則式 TOEIC Part 5 題庫
- 50 筆商務與職場 TOEIC 單字
- JWT 登入/註冊與角色權限
- 模擬測驗、作答、成績、逐題檢討
- 學習儀表板與 7 天複習建議
- 後台題目、單字、測驗管理
- CSV/JSON 內容匯入
- Swagger API 文件

## 核心功能

- 課程學習：提供文法重點、常見錯誤、TOEIC 陷阱、例句、練習與答案。
- Part 5 規則題目生成：依主題、難度與題數從本地題庫穩定產生練習題。
- 模擬測驗流程：建立作答紀錄、逐題選答、提交答案、計算成績。
- 錯題檢討：顯示正解、使用者答案、英文/繁中/越南文解析與錯誤類型建議。
- 單字管理：支援搜尋、分類、標籤、CEFR、難度、搭配詞、例句與多語解釋。
- 複習計畫：根據已完成測驗的錯題、弱項 Part 與 tags 產生固定規則的 7 天複習建議。
- 學習儀表板：統計測驗次數、平均分數、答對率、弱項 Part 與近期測驗。
- 後台管理：管理題目、單字、測驗，並檢視題目生成結果與平台統計。

## 系統架構

```text
frontend/ Next.js App Router
  -> Axios API client + React Query cache
  -> JWT token storage
  -> Learner UI / Admin UI

src/ NestJS backend
  -> Auth / Users / Dashboard
  -> Tests / Questions / Vocabulary
  -> Offline Content / Content Import
  -> Swagger docs

prisma/
  -> PostgreSQL schema
  -> migrations
  -> seed data

src/content/data/
  -> deterministic lessons
  -> vocabulary seed source
  -> rule-based Part 5 question bank
```

學習者端與管理端共用同一組 API，但透過 JWT 與 RBAC 區分一般使用者與管理者。內容層把課程、單字、題目、測驗與複習建議分開管理，避免把所有學習邏輯綁死在前端。

## 題目生成機制

`QuestionGeneratorService` 使用本地 TOEIC Part 5 題庫與固定規則產生題目，不呼叫外部 LLM，也不在學習者請求時即時生成不可預期內容。

支援主題：

- `prepositions`
- `tense`
- `word forms`
- `conjunctions`
- `vocabulary`
- `passive voice`
- `conditionals`
- `adjective adverb`
- `subject verb agreement`

生成流程：

1. 正規化使用者輸入主題，例如「介系詞」會對應到 `prepositions`。
2. 正規化難度，預設為 `BEGINNER`。
3. 依主題與難度篩選本地題庫。
4. 若指定主題題數不足，使用混合題庫補足。
5. 透過穩定 offset 讓相同條件產生可預期排序。
6. 回傳固定 JSON 結構：題目、選項、正解、繁中解析、越南文解析與 tags。

採用規則式生成的原因：

- 穩定輸出：同樣條件能得到可預期結果，方便測試與除錯。
- 學習品質可控：題目、答案與解析可由人審核，不會產生不確定內容。
- 部署成本低：不需要 GPU、模型伺服器或外部 API key。
- 支援離線優先：完成環境與資料庫建置後，核心學習功能不依賴模型服務。
- 維護容易：新增題型只需擴充題庫、tags 與驗證規則。

## 學習流程

```text
註冊/登入
  -> 查看儀表板
  -> 學習課程與單字
  -> 進行 Part 5 或模擬測驗
  -> 提交答案並取得成績
  -> 逐題檢討答案與解析
  -> 依錯題 tags 取得 7 天複習建議
  -> 回到單字、文法與短練習重複複習
```

平台特別強調 review/repetition flow。測驗完成後，系統會保存答題結果，從錯題抽出 TOEIC Part、tags 與近期弱項，再組合每日短練習、單字複習與文法課程建議。這不是即時 AI 推薦，而是可解釋、可維護的固定規則複習流程。

## 技術架構

| 層級 | 技術 |
| --- | --- |
| Backend | NestJS 10, TypeScript, Prisma, PostgreSQL |
| Auth | JWT, Passport JWT, bcrypt, RBAC |
| API Docs | Swagger / OpenAPI |
| Frontend | Next.js 15, React 19, TypeScript |
| Client State | TanStack React Query, Zustand |
| UI | Tailwind CSS, lucide-react, Recharts, Framer Motion |
| Content | TypeScript static data, Prisma seed, deterministic generator |
| Validation | class-validator, Nest ValidationPipe, content validator script |

## API 設計

主要 API：

| Method | Endpoint | 說明 |
| --- | --- | --- |
| `POST` | `/auth/register` | 註冊並取得 JWT |
| `POST` | `/auth/login` | 登入並取得 JWT |
| `GET` | `/auth/me` | 取得目前使用者 |
| `GET` | `/api/lessons` | 取得固定 TOEIC 課程 |
| `GET` | `/api/lessons/:id` | 取得單一課程 |
| `POST` | `/api/questions/generate` | 規則式產生 Part 5 練習題 |
| `GET` | `/api/vocabulary` | 取得本地/資料庫單字 |
| `GET` | `/api/review` | 依完成測驗取得複習建議 |
| `GET` | `/tests` | 取得已發布測驗 |
| `POST` | `/tests/:id/attempts` | 建立作答紀錄 |
| `POST` | `/tests/attempts/:attemptId/submit` | 提交答案並計分 |
| `GET` | `/tests/attempts/:attemptId/result` | 取得測驗結果 |
| `GET` | `/tests/attempts/:attemptId/review` | 取得逐題檢討 |
| `GET` | `/dashboard/me` | 取得個人學習統計 |
| `GET` | `/docs` | Swagger API 文件 |

管理功能包含題目、單字、測驗 CRUD，以及內容匯入 API。需要 `ADMIN` 角色。

## 前後端架構

前端位於 `frontend/`，使用 Next.js App Router 建構學習者與管理者介面：

- `/dashboard`：學習儀表板
- `/vocabulary`：單字列表與詳情
- `/grammar-practice`：Part 5 練習入口
- `/tests`：模擬測驗列表
- `/tests/[id]/attempt`：作答流程
- `/tests/attempts/[attemptId]/result`：成績頁
- `/tests/attempts/[attemptId]/review`：逐題檢討
- `/study-plan`：7 天複習建議
- `/admin/*`：後台內容管理

後端位於 `src/`，依功能拆分 NestJS module：

- `auth`：註冊、登入、JWT
- `users`：使用者與偏好語言
- `dashboard`：學習統計與後台分析
- `tests`：測驗、作答、計分、檢討
- `questions`：題庫管理
- `vocabulary`：單字管理
- `content`：離線課程、規則題目生成、複習建議
- `content-import`：CSV/JSON 匯入
- `skill-profile`：使用者能力資料

## 資料流程

```text
課程資料
  src/content/data/lessons.ts
  -> ContentService
  -> GET /api/lessons
  -> 前端課程/複習頁

Part 5 題目生成
  src/content/data/question-bank.ts
  -> QuestionGeneratorService
  -> POST /api/questions/generate
  -> 前端後台規則題目產生器

測驗流程
  Prisma Test / Question / QuestionOption
  -> 建立 TestAttempt
  -> UserAnswer 寫入
  -> 計算 score / correctCount
  -> result / review / dashboard / review plan

單字資料
  src/content/data/vocabulary.ts
  -> prisma seed
  -> Vocabulary API
  -> 前端單字列表與後台管理
```

## 專案結構

```text
.
├── src/
│   ├── auth/                 # JWT auth
│   ├── common/               # guards, decorators
│   ├── content/              # offline content service and generator
│   │   └── data/             # lessons, vocabulary, question bank
│   ├── content-import/       # CSV/JSON import
│   ├── dashboard/            # learner/admin analytics
│   ├── questions/            # question CRUD
│   ├── skill-profile/        # skill profile API
│   ├── tests/                # tests, attempts, scoring, review
│   ├── users/                # user profile
│   └── vocabulary/           # vocabulary CRUD
├── frontend/
│   ├── app/                  # Next.js routes
│   ├── components/           # layout and UI components
│   ├── lib/                  # API client, i18n, utils
│   ├── store/                # auth store
│   └── types/                # API types
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── scripts/
│   └── validate-content.ts
└── docs/
    ├── API.md
    ├── DATABASE.md
    └── SETUP.md
```

## 部署方式

後端環境變數範例：

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/toeic_tw_platform?schema=public"
PORT=3001
JWT_SECRET="change-this-secret"
JWT_EXPIRES_IN="7d"
ENABLE_AI_CONTENT_GENERATION=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

本機啟動：

```bash
npm install
npm run db:seed
npm run start:dev
```

前端啟動：

```bash
cd frontend
npm install
npm run dev
```

建置檢查：

```bash
npm run content:validate
npm run build
cd frontend
npm run build
```

正式部署時建議：

- PostgreSQL 使用受管資料庫或獨立資料庫服務。
- 後端部署 NestJS build output，並執行 Prisma migration/seed。
- 前端部署 Next.js，設定 `NEXT_PUBLIC_API_BASE_URL` 指向後端 API。
- 學習者核心功能不需要模型服務或外部 AI API key。

## 畫面展示 placeholder

> 可在此加入實際截圖。建議包含下列畫面：

- `Dashboard`：學習統計、近期成績、弱項 Part、下一步建議
- `Vocabulary`：單字卡、繁中/越南文解釋、tags、例句
- `Grammar Practice`：Part 5 練習入口
- `Test Attempt`：逐題作答與題目導航
- `Test Review`：正解、錯答、三語解析與複習提示
- `Study Plan`：7 天複習路線
- `Admin`：題目、單字、測驗與規則題目產生器

## 技術亮點

- 離線優先內容架構：核心學習內容由本地 TypeScript data、seed data 與資料庫提供。
- Deterministic lesson system：課程內容固定、可版本控管、可審核、可重複測試。
- 規則式題目生成：避免不可預期輸出，適合教育產品初期建立內容品質基準。
- Review/repetition flow：用測驗紀錄與錯題 tags 建立固定規則複習路線。
- 前後端分離：Next.js UI 與 NestJS API 邊界清楚，方便獨立部署與維護。
- RBAC 後台管理：一般學習者與管理者權限分離。
- 可維護內容管線：課程、單字、題庫、測驗與匯入流程各自獨立。
- API 文件化：Swagger 文件可直接檢查與測試主要服務。
- 多語資料模型：繁體中文為主要學習輔助語言，並支援越南文欄位。
- 成本可控：學習者 runtime 不依賴 LLM，適合低成本部署與教育內容驗證。

## 未來擴充方向

- 擴充 TOEIC Part 1-4 聽力題型與音檔管理。
- 增加更完整的 Part 6/Part 7 閱讀題庫與文章管理。
- 建立內容審核工作流，例如草稿、待審、通過、退回。
- 將 spaced repetition 欄位實作成完整複習排程。
- 增加教師端班級、作業與學習成效報表。
- 補強 E2E 測試與 API contract tests。
- 將選用的內容草稿工具限制在後台使用，維持學習者端 deterministic delivery。


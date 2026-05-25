import { SkillLevel } from '@prisma/client';

export type LocalVocabularyItem = {
  word: string;
  partOfSpeech: string;
  meaningVi: string;
  meaningZhTW: string;
  example: string;
  exampleMeaningVi: string;
  exampleMeaningZhTW: string;
  collocations: string[];
  difficulty: SkillLevel;
  tags: string[];
};

const set = (tags: string[], items: Omit<LocalVocabularyItem, 'difficulty' | 'tags'>[]): LocalVocabularyItem[] =>
  items.map((item) => ({ ...item, difficulty: SkillLevel.BEGINNER, tags: ['toeic', 'workplace', ...tags] }));

export const TOEIC_VOCABULARY: LocalVocabularyItem[] = [
  ...set(['business-email'], [
    { word: 'confirm', partOfSpeech: 'v.', meaningVi: 'xác nhận', meaningZhTW: '確認', example: 'Please confirm your reservation by noon.', exampleMeaningVi: 'Vui lòng xác nhận đặt chỗ trước buổi trưa.', exampleMeaningZhTW: '請在中午前確認您的預約。', collocations: ['confirm a reservation', 'confirm availability'] },
    { word: 'attach', partOfSpeech: 'v.', meaningVi: 'đính kèm', meaningZhTW: '附加；附上', example: 'I attached the invoice to this email.', exampleMeaningVi: 'Tôi đã đính kèm hóa đơn trong email này.', exampleMeaningZhTW: '我已將發票附在這封 email 中。', collocations: ['attach a file', 'attached invoice'] },
    { word: 'reply', partOfSpeech: 'v./n.', meaningVi: 'trả lời；phản hồi', meaningZhTW: '回覆', example: 'Please reply by Friday.', exampleMeaningVi: 'Vui lòng trả lời trước thứ Sáu.', exampleMeaningZhTW: '請在星期五前回覆。', collocations: ['reply to an email', 'quick reply'] },
    { word: 'request', partOfSpeech: 'v./n.', meaningVi: 'yêu cầu；đề nghị', meaningZhTW: '要求；請求', example: 'The client requested a copy of the report.', exampleMeaningVi: 'Khách hàng yêu cầu một bản báo cáo.', exampleMeaningZhTW: '客戶要求一份報告副本。', collocations: ['request information', 'special request'] },
    { word: 'notify', partOfSpeech: 'v.', meaningVi: 'thông báo', meaningZhTW: '通知', example: 'Please notify your supervisor of any delay.', exampleMeaningVi: 'Nếu có chậm trễ, vui lòng thông báo cho quản lý của bạn.', exampleMeaningZhTW: '若有任何延誤，請通知您的主管。', collocations: ['notify customers', 'notify a supervisor'] },
  ]),
  ...set(['meeting'], [
    { word: 'agenda', partOfSpeech: 'n.', meaningVi: 'chương trình họp', meaningZhTW: '議程', example: 'The agenda includes three items.', exampleMeaningVi: 'Chương trình họp gồm ba mục.', exampleMeaningZhTW: '議程包含三個項目。', collocations: ['meeting agenda', 'review the agenda'] },
    { word: 'attend', partOfSpeech: 'v.', meaningVi: 'tham dự', meaningZhTW: '參加；出席', example: 'All team leaders must attend the meeting.', exampleMeaningVi: 'Tất cả trưởng nhóm phải tham dự cuộc họp.', exampleMeaningZhTW: '所有組長都必須出席會議。', collocations: ['attend a meeting', 'attend training'] },
    { word: 'reschedule', partOfSpeech: 'v.', meaningVi: 'đổi lịch；sắp xếp lại thời gian', meaningZhTW: '重新安排時間', example: 'We need to reschedule the call.', exampleMeaningVi: 'Chúng ta cần đổi lịch cuộc gọi.', exampleMeaningZhTW: '我們需要重新安排通話時間。', collocations: ['reschedule a meeting', 'reschedule an appointment'] },
    { word: 'minutes', partOfSpeech: 'n.', meaningVi: 'biên bản họp', meaningZhTW: '會議紀錄', example: 'The assistant prepared the meeting minutes.', exampleMeaningVi: 'Trợ lý đã chuẩn bị biên bản cuộc họp.', exampleMeaningZhTW: '助理準備了會議紀錄。', collocations: ['meeting minutes', 'prepare minutes'] },
    { word: 'venue', partOfSpeech: 'n.', meaningVi: 'địa điểm tổ chức', meaningZhTW: '場地', example: 'The venue can hold 300 guests.', exampleMeaningVi: 'Địa điểm có thể chứa 300 khách.', exampleMeaningZhTW: '該場地可容納 300 位來賓。', collocations: ['event venue', 'conference venue'] },
  ]),
  ...set(['schedule', 'office'], [
    { word: 'deadline', partOfSpeech: 'n.', meaningVi: 'hạn chót', meaningZhTW: '截止期限', example: 'The deadline is Friday.', exampleMeaningVi: 'Hạn chót là thứ Sáu.', exampleMeaningZhTW: '截止期限是星期五。', collocations: ['meet a deadline', 'deadline extension'] },
    { word: 'appointment', partOfSpeech: 'n.', meaningVi: 'cuộc hẹn', meaningZhTW: '預約；約定', example: 'She has an appointment at 3 P.M.', exampleMeaningVi: 'Cô ấy có một cuộc hẹn lúc 3 giờ chiều.', exampleMeaningZhTW: '她下午三點有一個預約。', collocations: ['make an appointment', 'confirm an appointment'] },
    { word: 'facility', partOfSpeech: 'n.', meaningVi: 'cơ sở; khu tiện ích', meaningZhTW: '設施；場館', example: 'The facility will be renovated next month.', exampleMeaningVi: 'Cơ sở này sẽ được cải tạo vào tháng tới.', exampleMeaningZhTW: '該設施下個月將整修。', collocations: ['office facility', 'training facility'] },
    { word: 'equipment', partOfSpeech: 'n.', meaningVi: 'thiết bị', meaningZhTW: '設備', example: 'The equipment must be inspected regularly.', exampleMeaningVi: 'Thiết bị phải được kiểm tra định kỳ.', exampleMeaningZhTW: '設備必須定期檢查。', collocations: ['office equipment', 'safety equipment'] },
    { word: 'supplies', partOfSpeech: 'n.', meaningVi: 'vật tư；đồ dùng', meaningZhTW: '用品；物資', example: 'We ordered office supplies yesterday.', exampleMeaningVi: 'Chúng tôi đã đặt đồ dùng văn phòng hôm qua.', exampleMeaningZhTW: '我們昨天訂購了辦公用品。', collocations: ['office supplies', 'medical supplies'] },
  ]),
  ...set(['customer-service'], [
    { word: 'refund', partOfSpeech: 'n./v.', meaningVi: 'hoàn tiền', meaningZhTW: '退款', example: 'Customers may request a refund within 30 days.', exampleMeaningVi: 'Khách hàng có thể yêu cầu hoàn tiền trong vòng 30 ngày.', exampleMeaningZhTW: '客戶可在 30 天內要求退款。', collocations: ['request a refund', 'full refund'] },
    { word: 'complaint', partOfSpeech: 'n.', meaningVi: 'khiếu nại；phàn nàn', meaningZhTW: '抱怨；申訴', example: 'The manager handled the complaint politely.', exampleMeaningVi: 'Quản lý đã xử lý khiếu nại một cách lịch sự.', exampleMeaningZhTW: '經理禮貌地處理了申訴。', collocations: ['customer complaint', 'handle a complaint'] },
    { word: 'inquiry', partOfSpeech: 'n.', meaningVi: 'câu hỏi；yêu cầu thông tin', meaningZhTW: '詢問', example: 'We received several inquiries about the new service.', exampleMeaningVi: 'Chúng tôi nhận được vài câu hỏi về dịch vụ mới.', exampleMeaningZhTW: '我們收到幾則關於新服務的詢問。', collocations: ['customer inquiry', 'inquiry form'] },
    { word: 'representative', partOfSpeech: 'n.', meaningVi: 'đại diện；nhân viên hỗ trợ', meaningZhTW: '代表；客服人員', example: 'A customer service representative will contact you.', exampleMeaningVi: 'Một nhân viên hỗ trợ khách hàng sẽ liên hệ với bạn.', exampleMeaningZhTW: '一位客服人員將與您聯絡。', collocations: ['sales representative', 'service representative'] },
    { word: 'resolve', partOfSpeech: 'v.', meaningVi: 'giải quyết', meaningZhTW: '解決', example: 'The technician resolved the issue quickly.', exampleMeaningVi: 'Kỹ thuật viên đã nhanh chóng giải quyết vấn đề.', exampleMeaningZhTW: '技術人員很快解決了問題。', collocations: ['resolve a problem', 'resolve an issue'] },
  ]),
  ...set(['logistics', 'shipping'], [
    { word: 'shipment', partOfSpeech: 'n.', meaningVi: 'lô hàng', meaningZhTW: '出貨；貨物', example: 'The shipment arrived early.', exampleMeaningVi: 'Lô hàng đến sớm.', exampleMeaningZhTW: '貨物提早抵達。', collocations: ['track a shipment', 'shipment delay'] },
    { word: 'warehouse', partOfSpeech: 'n.', meaningVi: 'nhà kho', meaningZhTW: '倉庫', example: 'The products are stored in a warehouse.', exampleMeaningVi: 'Sản phẩm được lưu trong nhà kho.', exampleMeaningZhTW: '產品存放在倉庫裡。', collocations: ['warehouse staff', 'warehouse inventory'] },
    { word: 'inventory', partOfSpeech: 'n.', meaningVi: 'hàng tồn kho；kho hàng', meaningZhTW: '庫存', example: 'The store checks inventory every week.', exampleMeaningVi: 'Cửa hàng kiểm tra hàng tồn kho mỗi tuần.', exampleMeaningZhTW: '商店每週檢查庫存。', collocations: ['inventory check', 'inventory report'] },
    { word: 'delivery', partOfSpeech: 'n.', meaningVi: 'giao hàng', meaningZhTW: '配送；交貨', example: 'Free delivery is available this week.', exampleMeaningVi: 'Tuần này có giao hàng miễn phí.', exampleMeaningZhTW: '本週提供免費配送。', collocations: ['delivery date', 'delivery service'] },
    { word: 'carrier', partOfSpeech: 'n.', meaningVi: 'hãng vận chuyển', meaningZhTW: '承運商；運輸公司', example: 'The carrier will update the tracking number.', exampleMeaningVi: 'Hãng vận chuyển sẽ cập nhật mã theo dõi.', exampleMeaningZhTW: '承運商會更新追蹤號碼。', collocations: ['shipping carrier', 'air carrier'] },
  ]),
  ...set(['invoice-payment'], [
    { word: 'invoice', partOfSpeech: 'n.', meaningVi: 'hóa đơn', meaningZhTW: '發票；帳單', example: 'The invoice must be paid within ten days.', exampleMeaningVi: 'Hóa đơn phải được thanh toán trong vòng mười ngày.', exampleMeaningZhTW: '發票必須在十天內付款。', collocations: ['pay an invoice', 'send an invoice'] },
    { word: 'payment', partOfSpeech: 'n.', meaningVi: 'thanh toán；khoản thanh toán', meaningZhTW: '付款', example: 'Payment is due on Friday.', exampleMeaningVi: 'Khoản thanh toán đến hạn vào thứ Sáu.', exampleMeaningZhTW: '付款期限是星期五。', collocations: ['make a payment', 'payment due'] },
    { word: 'receipt', partOfSpeech: 'n.', meaningVi: 'biên lai', meaningZhTW: '收據', example: 'Please keep your receipt.', exampleMeaningVi: 'Vui lòng giữ biên lai của bạn.', exampleMeaningZhTW: '請保留您的收據。', collocations: ['original receipt', 'receipt number'] },
    { word: 'reimburse', partOfSpeech: 'v.', meaningVi: 'hoàn trả chi phí', meaningZhTW: '報銷；補償費用', example: 'The company will reimburse travel expenses.', exampleMeaningVi: 'Công ty sẽ hoàn trả chi phí đi lại.', exampleMeaningZhTW: '公司會報銷差旅費。', collocations: ['reimburse expenses', 'fully reimburse'] },
    { word: 'budget', partOfSpeech: 'n.', meaningVi: 'ngân sách', meaningZhTW: '預算', example: 'The marketing budget was increased.', exampleMeaningVi: 'Ngân sách tiếp thị đã được tăng lên.', exampleMeaningZhTW: '行銷預算增加了。', collocations: ['annual budget', 'budget plan'] },
  ]),
  ...set(['recruitment-hr'], [
    { word: 'applicant', partOfSpeech: 'n.', meaningVi: 'ứng viên；người nộp đơn', meaningZhTW: '申請人；應徵者', example: 'Each applicant must submit a resume.', exampleMeaningVi: 'Mỗi ứng viên phải nộp sơ yếu lý lịch.', exampleMeaningZhTW: '每位申請人都必須提交履歷。', collocations: ['job applicant', 'qualified applicant'] },
    { word: 'candidate', partOfSpeech: 'n.', meaningVi: 'ứng viên', meaningZhTW: '候選人；應徵者', example: 'The candidate has strong experience.', exampleMeaningVi: 'Ứng viên này có kinh nghiệm tốt.', exampleMeaningZhTW: '這位候選人有豐富經驗。', collocations: ['strong candidate', 'interview a candidate'] },
    { word: 'resume', partOfSpeech: 'n.', meaningVi: 'sơ yếu lý lịch', meaningZhTW: '履歷', example: 'Please send your resume by email.', exampleMeaningVi: 'Vui lòng gửi sơ yếu lý lịch qua email.', exampleMeaningZhTW: '請透過 email 寄送您的履歷。', collocations: ['submit a resume', 'update a resume'] },
    { word: 'hire', partOfSpeech: 'v.', meaningVi: 'tuyển dụng', meaningZhTW: '雇用；錄用', example: 'The company plans to hire two assistants.', exampleMeaningVi: 'Công ty dự định tuyển hai trợ lý.', exampleMeaningZhTW: '公司計畫雇用兩位助理。', collocations: ['hire staff', 'newly hired'] },
    { word: 'training', partOfSpeech: 'n.', meaningVi: 'đào tạo；huấn luyện', meaningZhTW: '訓練；培訓', example: 'New employees must attend training.', exampleMeaningVi: 'Nhân viên mới phải tham gia đào tạo.', exampleMeaningZhTW: '新員工必須參加訓練。', collocations: ['training session', 'safety training'] },
  ]),
  ...set(['travel-hotel', 'airport'], [
    { word: 'reservation', partOfSpeech: 'n.', meaningVi: 'đặt chỗ', meaningZhTW: '預約；訂位', example: 'Please confirm your hotel reservation.', exampleMeaningVi: 'Vui lòng xác nhận đặt phòng khách sạn.', exampleMeaningZhTW: '請確認您的飯店訂房。', collocations: ['hotel reservation', 'make a reservation'] },
    { word: 'itinerary', partOfSpeech: 'n.', meaningVi: 'lịch trình chuyến đi', meaningZhTW: '行程', example: 'The travel itinerary was emailed yesterday.', exampleMeaningVi: 'Lịch trình chuyến đi đã được gửi qua email hôm qua.', exampleMeaningZhTW: '旅行行程昨天已透過 email 寄出。', collocations: ['travel itinerary', 'updated itinerary'] },
    { word: 'boarding pass', partOfSpeech: 'n.', meaningVi: 'thẻ lên máy bay', meaningZhTW: '登機證', example: 'Please print your boarding pass.', exampleMeaningVi: 'Vui lòng in thẻ lên máy bay.', exampleMeaningZhTW: '請列印您的登機證。', collocations: ['print a boarding pass', 'mobile boarding pass'] },
    { word: 'accommodation', partOfSpeech: 'n.', meaningVi: 'chỗ ở', meaningZhTW: '住宿', example: 'The company will pay for accommodation.', exampleMeaningVi: 'Công ty sẽ trả chi phí chỗ ở.', exampleMeaningZhTW: '公司會支付住宿費。', collocations: ['hotel accommodation', 'provide accommodation'] },
    { word: 'departure', partOfSpeech: 'n.', meaningVi: 'sự khởi hành', meaningZhTW: '出發；起飛', example: 'The departure time has changed.', exampleMeaningVi: 'Giờ khởi hành đã thay đổi.', exampleMeaningZhTW: '出發時間已更改。', collocations: ['departure time', 'departure gate'] },
  ]),
  ...set(['restaurant', 'retail'], [
    { word: 'menu', partOfSpeech: 'n.', meaningVi: 'thực đơn', meaningZhTW: '菜單', example: 'The restaurant updated its menu.', exampleMeaningVi: 'Nhà hàng đã cập nhật thực đơn.', exampleMeaningZhTW: '餐廳更新了菜單。', collocations: ['lunch menu', 'menu item'] },
    { word: 'discount', partOfSpeech: 'n.', meaningVi: 'giảm giá；chiết khấu', meaningZhTW: '折扣', example: 'Members receive a 10 percent discount.', exampleMeaningVi: 'Hội viên được giảm giá 10 phần trăm.', exampleMeaningZhTW: '會員可享九折優惠。', collocations: ['member discount', 'discount coupon'] },
    { word: 'purchase', partOfSpeech: 'v./n.', meaningVi: 'mua；việc mua hàng', meaningZhTW: '購買', example: 'Customers can purchase tickets online.', exampleMeaningVi: 'Khách hàng có thể mua vé trực tuyến.', exampleMeaningZhTW: '顧客可以線上購票。', collocations: ['purchase online', 'proof of purchase'] },
    { word: 'cashier', partOfSpeech: 'n.', meaningVi: 'thu ngân', meaningZhTW: '收銀員', example: 'Please pay the cashier at the front.', exampleMeaningVi: 'Vui lòng thanh toán cho thu ngân ở phía trước.', exampleMeaningZhTW: '請到前方櫃台向收銀員付款。', collocations: ['cashier counter', 'head cashier'] },
    { word: 'stock', partOfSpeech: 'n./v.', meaningVi: 'hàng có sẵn；dự trữ', meaningZhTW: '庫存；備貨', example: 'The item is currently out of stock.', exampleMeaningVi: 'Mặt hàng này hiện đã hết hàng.', exampleMeaningZhTW: '該商品目前缺貨。', collocations: ['out of stock', 'in stock'] },
  ]),
  ...set(['warranty-repair', 'announcement-notice'], [
    { word: 'warranty', partOfSpeech: 'n.', meaningVi: 'bảo hành', meaningZhTW: '保固', example: 'The printer includes a two-year warranty.', exampleMeaningVi: 'Máy in có bảo hành hai năm.', exampleMeaningZhTW: '這台印表機包含兩年保固。', collocations: ['warranty period', 'under warranty'] },
    { word: 'repair', partOfSpeech: 'v./n.', meaningVi: 'sửa chữa', meaningZhTW: '維修；修理', example: 'The repair will take two days.', exampleMeaningVi: 'Việc sửa chữa sẽ mất hai ngày.', exampleMeaningZhTW: '維修需要兩天。', collocations: ['repair service', 'repair cost'] },
    { word: 'maintenance', partOfSpeech: 'n.', meaningVi: 'bảo trì', meaningZhTW: '維護；保養', example: 'Maintenance is scheduled for Monday.', exampleMeaningVi: 'Việc bảo trì được lên lịch vào thứ Hai.', exampleMeaningZhTW: '維護安排在星期一。', collocations: ['regular maintenance', 'maintenance schedule'] },
    { word: 'announcement', partOfSpeech: 'n.', meaningVi: 'thông báo', meaningZhTW: '公告；通知', example: 'The announcement was posted online.', exampleMeaningVi: 'Thông báo đã được đăng lên mạng.', exampleMeaningZhTW: '公告已發布在線上。', collocations: ['make an announcement', 'official announcement'] },
    { word: 'notice', partOfSpeech: 'n.', meaningVi: 'thông báo; bảng thông báo', meaningZhTW: '通知；公告', example: 'Please read the notice at the entrance.', exampleMeaningVi: 'Vui lòng đọc thông báo ở lối vào.', exampleMeaningZhTW: '請閱讀入口處的公告。', collocations: ['public notice', 'notice board'] },
  ]),
];

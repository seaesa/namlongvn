/* News list (/tin-tuc/) + article detail — tabs, pagination, client-side search,
   media gallery modal, share popovers and the "Tin tức khác" slider. */
(function ($) {
  'use strict';

  var UP = 'https://www.namlongvn.com/wp-content/uploads/';
  var PER_PAGE = 6;

  /* Facts captured from the live listing: news [date, headline, thumbnail, slug]; media [date, headline, thumbnail, gallery].
     Detail pages /tin-tuc/<slug>/ are generated from data/news.json (templates/news.mjs). */
  var DATA = {
    general: [
      ["02/10/2026", "Diện mạo các khu đô thị ‘đồng kiến tạo’ giữa Nam Long và đối tác Nhật", "2026/10/dien-mao-cac-khu-do-thi-dong-kien-tao-giua-nam-long-va-doi-tac-nhat-.jpg", "dien-mao-cac-khu-do-thi-dong-kien-tao-giua-nam-long-va-doi-tac-nhat"],
      ["30/09/2026", "Nam Long cập nhật về thông báo kết luận thanh tra số 3451/TB-TTCP", "2025/12/IMG_0749.png", "nam-long-cap-nhat-ve-thong-bao-ket-luan-thanh-tra-so-3451-tb-ttcp"],
      ["23/09/2026", "Dấu ấn giá trị thực tại triển lãm Nam Long Experience 2026", "2026/09/dau-an-gia-tri-thuc-tai-trien-lam-nam-long-experience-2026-11.jpg", "dau-an-gia-tri-thuc-tai-trien-lam-nam-long-experience-2026"],
      ["22/09/2026", "‘Trạm xanh’ hút khách tại Nam Long Experience 2026", "2026/09/tram-xanh-hut-khach-tai-nam-long-experience-2026-1.jpg", "tram-xanh-hut-khach-tai-nam-long-experience-2026"],
      ["21/09/2026", "Triển lãm Nam Long Experience 2026 hút hơn 10.000 lượt khách", "2026/09/trien-lam-nam-long-experience-2026-hut-hon-10-000-luot-khach-3.jpg", "trien-lam-nam-long-experience-2026-hut-hon-10-000-luot-khach"],
      ["20/09/2026", "Từ 1,5 tỷ đến 20 tỷ đồng: Câu chuyện bất động sản giá trị thực tại Nam Long Experience 2026", "2026/09/tu-1-5-ty-den-20-ty-dong-cau-chuyen-bat-dong-san-gia-tri-thuc-tai-nam-long-experience-2026-1.jpg", "tu-15-ty-den-20-ty-dong-cau-chuyen-bat-dong-san-gia-tri-thuc-tai-nam-long-experience-2026"],
      ["19/09/2026", "‘Giá trị thực’ trở thành tiêu chí quan trọng của thị trường bất động sản", "2026/09/gia-tri-thuc-tro-thanh-tieu-chi-quan-trong-cua-thi-truong-bat-dong-san-3.jpg", "gia-tri-thuc-tro-thanh-tieu-chi-quan-trong-cua-thi-truong-bat-dong-san"],
      ["18/09/2026", "Trải nghiệm giá trị thực tại Nam Long Experience 2026", "2026/09/trai-nghiem-gia-tri-thuc-tai-nam-long-experience-2026-18.jpg", "trai-nghiem-gia-tri-thuc-tai-nam-long-experience-2026"],
      ["17/09/2026", "Từ “nhà ở cho số đông” đến đô thị tích hợp: Hành trình 34 năm kiên định với giá trị thực của Nam Long", "2026/09/tu-nha-o-cho-so-dong-den-do-thi-tich-hop-hanh-trinh-34-nam-kien-dinh-voi-gia-tri-thuc-cua-nam-long-8.jpg", "tu-nha-o-cho-so-dong-den-do-thi-tich-hop-hanh-trinh-34-nam-kien-dinh-voi-gia-tri-thuc-cua-nam-long"],
      ["16/09/2026", "Xu hướng BẤT ĐỘNG SẢN GIÁ TRỊ THỰC và cách Nam Long làm điều xã hội cần", "2026/09/xu-huong-bds-gia-tri-thuc-va-cach-nam-long-lam-dieu-xa-hoi-can-1.jpg", "xu-huong-bat-dong-san-gia-tri-thuc-va-cach-nam-long-lam-dieu-xa-hoi-can"],
      ["05/09/2026", "Chủ tịch Nam Long Nguyễn Xuân Quang: Bất động sản giá trị thực phải hướng đến những gì xã hội cần", "2026/09/chu-tich-nam-long-nguyen-xuan-quang-bat-dong-san-gia-tri-thuc-phai-huong-den-nhung-gi-xa-hoi-can-1.jpg", "chu-tich-nam-long-nguyen-xuan-quang-bat-dong-san-gia-tri-thuc-phai-huong-den-nhung-gi-xa-hoi-can"],
      ["04/09/2026", "Nam Long công bố triển lãm “Nam Long Experience 2026 – Bất động sản giá trị thực”: Điểm hẹn đa trải nghiệm dành cho các gia đình, khách hàng và cộng đồng", "2026/09/nam-long-cong-bo-trien-lam-nam-long-experience-2026-bat-dong-san-gia-tri-thuc-diem-hen-da-trai-nghiem-1.png", "nam-long-cong-bo-trien-lam-nam-long-experience-2026-bat-dong-san-gia-tri-thuc-diem-hen-da-trai-nghiem-danh-cho-cac-gia-dinh-khach-hang-va-cong-dong"],
      ["26/08/2026", "Chủ tịch Nam Long: Mỗi dự án đưa ra đều gắn với giá trị thực", "2026/08/chu-tich-nam-long-moi-du-an-dua-ra-deu-gan-voi-gia-tri-thuc-2.jpg", "chu-tich-nam-long-moi-du-an-dua-ra-deu-gan-voi-gia-tri-thuc"],
      ["26/08/2026", "Giá trị thực của bất động sản được Nam Long kiến tạo như thế nào?", "2026/08/gia-tri-thuc-cua-bat-dong-san-duoc-nam-long-kien-tao-nhu-the-nao-1.jpg", "gia-tri-thuc-cua-bat-dong-san-duoc-nam-long-kien-tao-nhu-the-nao"],
      ["26/08/2026", "Giá trị thực của bất động sản được Nam Long kiến tạo như thế nào?", "2026/09/gia-tri-thuc-cua-bat-dong-san-duoc-nam-long-kien-tao-nhu-the-nao-1.jpg", "gia-tri-thuc-cua-bat-dong-san-duoc-nam-long-kien-tao-nhu-the-nao-2"],
      ["26/08/2026", "Nam Long: Đô thị giá trị thực cần tầm nhìn xa đến 50 năm", "2026/09/nam-long-do-thi-gia-tri-thuc-can-tam-nhin-xa-den-50-nam-1.jpg", "nam-long-do-thi-gia-tri-thuc-can-tam-nhin-xa-den-50-nam"],
      ["21/08/2026", "Nam Long phát động cuộc thi ảnh “Sức sống Nam Long”: Lưu giữ những giá trị thực qua từng nhịp sống", "2026/08/CUOC-THI-ANH-KICK-OFF-NAM-LONG_16x9_.png", "nam-long-phat-dong-cuoc-thi-anh-suc-song-nam-long-luu-giu-nhung-gia-tri-thuc-qua-tung-nhip-song"],
      ["07/08/2026", "Nam Long lần thứ 5 đạt Top 50 Công ty Đại chúng uy tín và hiệu quả", "2026/08/Nam-Long-lan-thu-5-dat-Top-50-Cong-ty-Dai-chung-uy-tin-va-hieu-qua-1.png", "nam-long-lan-thu-5-dat-top-50-cong-ty-dai-chung-uy-tin-va-hieu-qua"],
    ],
    press: [
      ["30/09/2026", "Nam Long cập nhật về thông báo kết luận thanh tra số 3451/TB-TTCP", "2025/12/IMG_0749.png", "nam-long-cap-nhat-ve-thong-bao-ket-luan-thanh-tra-so-3451-tb-ttcp"],
      ["04/09/2026", "Nam Long công bố triển lãm “Nam Long Experience 2026 – Bất động sản giá trị thực”: Điểm hẹn đa trải nghiệm dành cho các gia đình, khách hàng và cộng đồng", "2026/09/nam-long-cong-bo-trien-lam-nam-long-experience-2026-bat-dong-san-gia-tri-thuc-diem-hen-da-trai-nghiem-1.png", "nam-long-cong-bo-trien-lam-nam-long-experience-2026-bat-dong-san-gia-tri-thuc-diem-hen-da-trai-nghiem-danh-cho-cac-gia-dinh-khach-hang-va-cong-dong"],
      ["21/08/2026", "Nam Long phát động cuộc thi ảnh “Sức sống Nam Long”: Lưu giữ những giá trị thực qua từng nhịp sống", "2026/08/CUOC-THI-ANH-KICK-OFF-NAM-LONG_16x9_.png", "nam-long-phat-dong-cuoc-thi-anh-suc-song-nam-long-luu-giu-nhung-gia-tri-thuc-qua-tung-nhip-song"],
      ["07/08/2026", "Nam Long lần thứ 5 đạt Top 50 Công ty Đại chúng uy tín và hiệu quả", "2026/08/Nam-Long-lan-thu-5-dat-Top-50-Cong-ty-Dai-chung-uy-tin-va-hieu-qua-1.png", "nam-long-lan-thu-5-dat-top-50-cong-ty-dai-chung-uy-tin-va-hieu-qua"],
      ["04/08/2026", "Chiến lược bất động sản giá trị thực của Nam Long", "2026/08/DJI_20250321155229_0201_D_GOKU-Panorama-1-1.jpg", "chien-luoc-bat-dong-san-gia-tri-thuc-cua-nam-long"],
      ["31/07/2026", "Nam Long được vinh danh giải thưởng đặc biệt tại Dot Property Vietnam Awards 2026", "2026/07/nam-long-duoc-vinh-danh-giai-thuong-dac-biet-tai-dot-property-vietnam-awards-2026-1.jpg", "nam-long-duoc-vinh-danh-giai-thuong-dac-biet-tai-dot-property-vietnam-awards-2026"],
      ["28/07/2026", "Nam Long công bố thay đổi nhân sự cấp cao: Bổ nhiệm Quyền Tổng Giám đốc mới", "2026/07/Ba-Nguyen-Thanh-Huong-2-scaled.jpg", "nam-long-cong-bo-thay-doi-nhan-su-cap-cao-bo-nhiem-quyen-tong-giam-doc-moi"],
      ["08/07/2026", "Tập đoàn Nam Long lần thứ 6 vào Top 100 thương hiệu giá trị nhất Việt Nam 2026", "2026/07/tap-doan-nam-long-lan-thu-6-vao-top-100-thuong-hieu-gia-tri-nhat-viet-nam-2026-banner.jpg", "tap-doan-nam-long-lan-thu-6-vao-top-100-thuong-hieu-gia-tri-nhat-viet-nam-2026"],
      ["30/06/2026", "The Pearl – The Art Of Formation: Hành trình kết tinh di sản bên dòng Vàm Cỏ Đông", "2026/06/the-pearl-the-art-of-formation-hanh-trinh-ket-tinh-di-san-ben-dong-vam-co-dong-7.jpg", "the-pearl-the-art-of-formation-hanh-trinh-ket-tinh-di-san-ben-dong-vam-co-dong"],
      ["17/06/2026", "Nam Long 5 năm liên tiếp vào TOP 50 CSA và dấu ấn bất động sản giá trị thực", "2026/06/nam-long-5-nam-lien-tiep-vao-top-50-csa-va-dau-an-bat-djong-san-gia-tri-thuc-1.jpg", "nam-long-5-nam-lien-tiep-vao-top-50-csa-va-dau-an-bat-dong-san-gia-tri-thuc"],
      ["12/06/2026", "3 dự án của Nam Long được vinh danh tại Giải thưởng Quốc gia Bất động sản Việt Nam 2026", "2026/06/3-du-an-cua-nam-long-djuoc-vinh-danh-tai-giai-thuong-quoc-gia-bat-djong-san-viet-nam-2026-1.jpg", "3-du-an-cua-nam-long-duoc-vinh-danh-tai-giai-thuong-quoc-gia-bat-dong-san-viet-nam-2026"],
      ["25/04/2026", "Nam Long đặt mục tiêu doanh số gấp đôi, công bố Hội đồng quản trị nhiệm kỳ 2026 – 2031", "2026/04/nam-long-dat-muc-tieu-doanh-so-gap-doi-cong-bo-hoi-dong-quan-tri-nhiem-ky-2026-2031-6.jpg", "nam-long-dat-muc-tieu-doanh-so-gap-doi-cong-bo-hoi-dong-quan-tri-nhiem-ky-2026-2031"],
      ["24/04/2026", "Nam Long ADC ký kết hợp tác chiến lược với Nishi-Nippon Railroad, đặt mục tiêu tăng trưởng 80% vào năm 2030", "2026/04/nam-long-adc-ky-ket-hop-tac-chien-luoc-voi-nishi-nippon-railroad-dat-muc-tieu-tang-truong-80-vao-nam-2030-1.jpg", "nam-long-adc-ky-ket-hop-tac-chien-luoc-voi-nishi-nippon-railroad-dat-muc-tieu-tang-truong-80-vao-nam-2030"],
      ["23/04/2026", "Nam Long và Thrive triển khai hệ sinh thái cộng đồng nhà ở cao cấp cho người cao tuổi đầu tiên tại Việt Nam", "2026/04/NL-Thrive-ky-ket-scaled.png", "nam-long-va-thrive-trien-khai-he-sinh-thai-cong-dong-nha-o-cao-cap-cho-nguoi-cao-tuoi-dau-tien-tai-viet-nam"],
      ["19/03/2026", "Nam Long giữ vững vị thế Top 2 chủ đầu tư bất động sản uy tín năm 2026", "2026/03/nam-long-giu-vung-vi-the-top-2-chu-dau-tu-bat-dong-san-uy-tin-nam-2026-3.png", "nam-long-giu-vung-vi-the-top-2-chu-dau-tu-bat-dong-san-uy-tin-nam-2026"],
      ["22/01/2026", "Tập đoàn Nam Long đạt chứng nhận Quốc Tế ISO 27001:2022 – Chuẩn hóa hệ thống quản lý an toàn thông tin", "2026/01/tap-doan-nam-long-dat-chung-nhan-quoc-te-iso-27001-2022-chuan-hoa-he-thong-quan-ly-an-toan-thong-tin-1.jpg", "tap-doan-nam-long-dat-chung-nhan-quoc-te-iso-270012022-chuan-hoa-he-thong-quan-ly-an-toan-thong-tin"],
      ["09/01/2026", "Nam Long tiếp tục vào top 50 Doanh nghiệp xuất sắc Việt Nam 2025", "2026/01/nam-long-lan-thu-7-lien-tiep-vao-top-50-doanh-nghiep-xuat-sac-viet-nam-nam-2025.jpg", "nam-long-tiep-tuc-vao-top-50-doanh-nghiep-xuat-sac-viet-nam-2025"],
      ["31/12/2025", "Nam Long tuân thủ pháp luật về thuế", "2025/12/IMG_0749.png", "nam-long-tuan-thu-phap-luat-ve-thue"],
    ],
    media: [
      ["19/10/2025", "Thủ tướng Phạm Minh Chính ghi nhận Nhà ở xã hội Nam Long là mô hình hiệu quả, đáp ứng nhu cầu an cư của người dân", "2025/10/thu-tuong-pham-minh-chinh-ghi-nhan-nha-o-xa-hoi-nam-long-la-mo-hinh-hieu-qua-dap-ung-nhu-cau-an-cu-cua-nguoi-dan-1.jpg", ["2025/10/thu-tuong-pham-minh-chinh-ghi-nhan-nha-o-xa-hoi-nam-long-la-mo-hinh-hieu-qua-dap-ung-nhu-cau-an-cu-cua-nguoi-dan-1.jpg", "2025/10/thu-tuong-pham-minh-chinh-ghi-nhan-nha-o-xa-hoi-nam-long-la-mo-hinh-hieu-qua-dap-ung-nhu-cau-an-cu-cua-nguoi-dan-2.jpg", "2025/10/thu-tuong-pham-minh-chinh-ghi-nhan-nha-o-xa-hoi-nam-long-la-mo-hinh-hieu-qua-dap-ung-nhu-cau-an-cu-cua-nguoi-dan-3.jpg", "2025/10/thu-tuong-pham-minh-chinh-ghi-nhan-nha-o-xa-hoi-nam-long-la-mo-hinh-hieu-qua-dap-ung-nhu-cau-an-cu-cua-nguoi-dan-4.jpg", "2025/10/thu-tuong-pham-minh-chinh-ghi-nhan-nha-o-xa-hoi-nam-long-la-mo-hinh-hieu-qua-dap-ung-nhu-cau-an-cu-cua-nguoi-dan-5.jpg", "2025/10/thu-tuong-pham-minh-chinh-ghi-nhan-nha-o-xa-hoi-nam-long-la-mo-hinh-hieu-qua-dap-ung-nhu-cau-an-cu-cua-nguoi-dan-6.jpg", "yt:https://www.youtube.com/embed/AhJjXfQy8Ec"]],
      ["08/09/2025", "Lãnh đạo Nam Long và các đối tác Nhật chụp ảnh lưu niệm tại Rừng di sản Waterpoint, biểu trưng cho cam kết đồng hành bền vững và gắn bó lâu dài.", "2025/09/hinh-anh-cong-ty-81.jpg", ["2025/09/hinh-anh-cong-ty-81.jpg"]],
      ["08/09/2025", "Tập đoàn Nam Long kỷ niệm 10 năm hợp tác chiến lược với Hankyu Hanshin Properties và Nishi-Nippon Railroad", "2025/09/hinh-anh-cong-ty-80.jpg", ["2025/09/hinh-anh-cong-ty-80.jpg", "yt:https://www.youtube.com/embed/DQWYMJvbhIo"]],
      ["08/09/2025", "Nam Long ký kết hợp tác chiến lược với hàng loạt nhà cung cấp uy tín nhằm nâng tầm chất lượng sản phẩm", "2025/09/hinh-anh-cong-ty-79.jpg", ["2025/09/hinh-anh-cong-ty-79.jpg"]],
      ["08/09/2025", "Nam Long và ngân hàng VietinBank ký kết hợp tác chiến lược toàn diện", "2025/09/hinh-anh-cong-ty-78.jpg", ["2025/09/hinh-anh-cong-ty-78.jpg"]],
      ["08/09/2025", "Tập đoàn Nam Long tiếp đón Rehda Institute, mở ra cơ hội hợp tác và chia sẻ chuyên môn trong phát triển nhà ở và đô thị", "2025/09/hinh-anh-cong-ty-77.jpg", ["2025/09/hinh-anh-cong-ty-77.jpg"]],
      ["08/09/2025", "Tháng 3/2024, Tập đoàn Nam Long tham dự Hội nghị Tháo gỡ khó khăn, thúc đẩy phát triển nhà ở xã hội", "2025/09/hinh-anh-cong-ty-76.jpg", ["2025/09/hinh-anh-cong-ty-76.jpg"]],
      ["08/09/2025", "Nam Long đón tiếp đại diện Tập đoàn Sembcorp (Singapore) mở ra những cơ hội hợp tác phát triển mới trong tương lai", "2025/09/hinh-anh-cong-ty-75.jpg", ["2025/09/hinh-anh-cong-ty-75.jpg"]],
      ["08/09/2025", "Nam Long (HOSE: NLG) lần thứ 8 liên tiếp có mặt trong top 50 Công ty niêm yết tốt nhất Việt Nam", "2025/09/hinh-anh-cong-ty-74.jpg", ["2025/09/hinh-anh-cong-ty-74.jpg"]],
      ["08/09/2025", "Đoàn đại biểu cấp cao nhà nước tham quan sa bàn và nghe giới thiệu về sản phẩm EHome Southgate tại Hội nghị công bố Quy hoạch và xúc tiến đầu tư tỉnh Long An", "2025/09/hinh-anh-cong-ty-73.png", ["2025/09/hinh-anh-cong-ty-73.png"]],
      ["08/09/2025", "Nam Long Group (HOSE: NLG) tiếp tục là 1 trong 50 Doanh nghiệp phát triển bền vững tiêu biểu Việt Nam 2023", "2025/09/hinh-anh-cong-ty-72.jpg", ["2025/09/hinh-anh-cong-ty-72.jpg"]],
      ["08/09/2025", "Nam Long được BCI Asia Awards xếp hạng là 1 trong 10 chủ đầu tư hàng đầu Việt Nam 2023", "2025/09/hinh-anh-cong-ty-71.jpg", ["2025/09/hinh-anh-cong-ty-71.jpg"]],
      ["08/09/2025", "Mizuki Park được vinh danh trong top 10 khu đô thị đáng sống nhất Việt Nam", "2025/09/hinh-anh-cong-ty-70.jpg", ["2025/09/hinh-anh-cong-ty-70.jpg"]],
      ["08/09/2025", "Nam Long đón tiếp tập đoàn hàng đầu Malaysia – Sunway Berhard với Chủ tịch ông Tan Sri Dato, Dr. Chew Chee Kin – Group President và bà Sarena Cheah – Property Managing Director mở ra những cơ hội hợp tác phát triển mới", "2025/09/hinh-anh-cong-ty-69.jpg", ["2025/09/hinh-anh-cong-ty-69.jpg"]],
    ]
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function img(p) { return /^https?:/.test(p) ? p : UP + p; }
  function url(it) { return '/tin-tuc/' + it[3] + '/'; }

  /* ---------- Markup builders ---------- */
  function newsCard(it) {
    return '<a href="' + url(it) + '" class="news-card">' +
      '<div class="news-card__img"><img src="' + img(it[2]) + '" alt="' + esc(it[1]) + '" loading="lazy"></div>' +
      '<span class="news-card__date">' + it[0] + '</span>' +
      '<h4>' + esc(it[1]) + '</h4></a>';
  }
  function mediaCard(it, idx) {
    return '<button type="button" class="media-item js-media-open" data-index="' + idx + '">' +
      '<div class="media-item__img"><img src="' + img(it[2]) + '" alt="' + esc(it[1]) + '" loading="lazy"></div>' +
      '<div class="media-item__body"><span class="media-item__date">' + it[0] + '</span>' +
      '<h5 class="media-item__title">' + esc(it[1]) + '</h5></div></button>';
  }

  /* Pagination window as on the original: current±2, "…", last page */
  function pager(cur, total) {
    if (total < 2) return '';
    var h = '<div class="news-pager">';
    h += '<button type="button" class="news-pager__btn news-pager__btn--prev" data-page="' + (cur - 1) + '"' + (cur === 1 ? ' disabled' : '') + ' aria-label="Trang trước">&lt;</button>';
    var from = Math.max(1, cur - 2), to = Math.min(total, cur + 2);
    if (from > 1) {
      h += '<button type="button" class="news-pager__btn" data-page="1">1</button>';
      if (from > 2) h += '<button type="button" class="news-pager__btn" disabled>...</button>';
    }
    for (var i = from; i <= to; i++) {
      h += '<button type="button" class="news-pager__btn' + (i === cur ? ' is-active' : '') + '" data-page="' + i + '"' + (i === cur ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }
    if (to < total) {
      if (to < total - 1) h += '<button type="button" class="news-pager__btn" disabled>...</button>';
      h += '<button type="button" class="news-pager__btn" data-page="' + total + '">' + total + '</button>';
    }
    h += '<button type="button" class="news-pager__btn news-pager__btn--next" data-page="' + (cur + 1) + '"' + (cur === total ? ' disabled' : '') + ' aria-label="Trang sau">&gt;</button>';
    return h + '</div>';
  }

  function renderPane(pane, page) {
    var cat = pane.getAttribute('data-cat'), list = DATA[cat];
    var per = cat === 'media' ? PER_PAGE + 1 : PER_PAGE;
    var total = Math.ceil(list.length / per);
    page = Math.min(Math.max(1, page || 1), total);
    pane.setAttribute('data-page', page);
    var start = (page - 1) * per, slice = list.slice(start, start + per), h = '';
    if (cat === 'media') {
      h += '<div class="media-feature">' + mediaCard(slice[0], start) + '</div>';
      h += '<div class="news-grid">' + slice.slice(1).map(function (it, i) { return mediaCard(it, start + 1 + i); }).join('') + '</div>';
    } else {
      h += '<div class="news-grid">' + slice.map(newsCard).join('') + '</div>';
    }
    pane.innerHTML = h + pager(page, total);
  }

  /* ======================================================================
     LIST PAGE
     ====================================================================== */
  var tabsEl = document.getElementById('newsTabs');
  if (tabsEl) {
    var panes = document.querySelectorAll('.news-pane');
    var titleEl = document.getElementById('tabTitle');
    var params = new URLSearchParams(location.search);

    panes.forEach(function (p) { renderPane(p, parseInt(params.get(p.getAttribute('data-param')), 10) || 1); });

    var setUrl = function () {
      var act = document.querySelector('.news-pane.is-active');
      var q = new URLSearchParams();
      var page = act.getAttribute('data-page');
      if (page !== '1') q.set(act.getAttribute('data-param'), page);
      q.set('active_tab', act.id);
      history.replaceState(null, '', location.pathname + '?' + q.toString());
    };

    var activate = function (btn, rotate) {
      var id = btn.getAttribute('data-target'), pane = document.getElementById(id);
      tabsEl.querySelectorAll('.news-tab').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panes.forEach(function (p) { if (p !== pane) p.classList.remove('is-active', 'is-shown'); });
      pane.classList.add('is-active');
      requestAnimationFrame(function () { requestAnimationFrame(function () { pane.classList.add('is-shown'); }); });
      titleEl.textContent = btn.getAttribute('data-title');
      // .js-rotating-tabs: on <=768px the tabs before the clicked one move to the end
      if (rotate && window.innerWidth <= 768) {
        var li = btn.parentNode, prev = [];
        for (var n = li.previousElementSibling; n; n = n.previousElementSibling) prev.unshift(n);
        prev.forEach(function (n) { tabsEl.appendChild(n); });
        tabsEl.parentNode.scrollLeft = 0;
      }
    };

    tabsEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.news-tab');
      if (!btn || btn.classList.contains('is-active')) return;
      activate(btn, true); setUrl();
    });

    var initial = document.querySelector('.news-tab[data-target="' + params.get('active_tab') + '"]');
    if (initial) activate(initial, false);

    // Pagination
    document.querySelector('.news-panes').addEventListener('click', function (e) {
      var b = e.target.closest('.news-pager__btn');
      if (!b || b.disabled || b.classList.contains('is-active')) return;
      var pane = b.closest('.news-pane');
      renderPane(pane, parseInt(b.getAttribute('data-page'), 10));
      setUrl();
      var top = titleEl.getBoundingClientRect().top + window.scrollY - (window.innerWidth < 1200 ? 90 : 20);
      window.scrollTo({ top: top, behavior: 'smooth' });
    });

    /* ---------- Client-side search (#custom-search-input → #custom-search-results) ---------- */
    var norm = function (s) {
      // one output char per input char so match offsets map back onto the title
      return Array.prototype.map.call(s, function (c) {
        return c.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/, 'd').toLowerCase().charAt(0) || c;
      }).join('');
    };
    var INDEX = [];
    ['general', 'press', 'media'].forEach(function (cat) {
      DATA[cat].forEach(function (it, i) {
        if (cat !== 'general' && INDEX.some(function (x) { return x.title === it[1]; })) return;
        INDEX.push({ cat: cat, i: i, title: it[1], key: norm(it[1]) });
      });
    });
    var search = function (q) {
      var k = norm(q.trim());
      if (k.length < 2) return null;
      return INDEX.filter(function (x) { return x.key.indexOf(k) > -1; }).slice(0, 10).map(function (x) {
        var at = x.key.indexOf(k);
        return { x: x, html: esc(x.title.slice(0, at)) + '<strong>' + esc(x.title.slice(at, at + k.length)) + '</strong>' + esc(x.title.slice(at + k.length)) };
      });
    };
    var go = function (x) {
      if (x.cat === 'media') openModal(x.i); else location.href = url(DATA[x.cat][x.i]);
    };

    document.querySelectorAll('.news-search__box').forEach(function (box) {
      var input = box.querySelector('.js-news-search'), out = box.querySelector('.js-news-results');
      var timer, results = [];
      var draw = function () {
        results = search(input.value) || [];
        if (search(input.value) === null) { out.innerHTML = ''; return; }
        out.innerHTML = results.length ? results.map(function (r, i) {
          return '<div class="news-search__item" role="option" data-i="' + i + '"><span>' + r.html + '</span></div>';
        }).join('') : '<div class="news-search__empty">Không tìm thấy kết quả phù hợp</div>';
      };
      input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(draw, 200); });
      input.addEventListener('focus', draw);
      input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { out.innerHTML = ''; input.blur(); } });
      box.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); clearTimeout(timer); draw();
        if (results.length) go(results[0].x);
      });
      out.addEventListener('click', function (e) {
        var it = e.target.closest('.news-search__item');
        if (!it) return;
        go(results[+it.getAttribute('data-i')].x); out.innerHTML = '';
      });
      document.addEventListener('click', function (e) { if (!box.contains(e.target)) out.innerHTML = ''; });
    });

    /* ---------- Media gallery modal (#modal) ---------- */
    var modal = document.getElementById('mediaModal');
    var stage = modal.querySelector('.media-modal__stage'), thumbs = modal.querySelector('.media-modal__thumbs');
    var cur = 0, count = 0, lastFocus = null;

    var show = function (n) {
      cur = (n + count) % count;
      stage.querySelectorAll('.media-modal__slide').forEach(function (s, i) {
        var on = i === cur, f = s.querySelector('iframe');
        s.classList.toggle('is-active', on);
        if (f) f.src = on ? f.getAttribute('data-src') : 'about:blank';
      });
      thumbs.querySelectorAll('.media-modal__thumb').forEach(function (t, i) { t.classList.toggle('is-active', i === cur); });
      var t = thumbs.children[cur];
      if (t) thumbs.scrollTo({ left: t.offsetLeft - thumbs.offsetLeft - (thumbs.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
    };

    function openModal(idx) {
      var it = DATA.media[idx], g = it[3];
      modal.querySelector('.media-modal__date').textContent = it[0];
      modal.querySelector('.media-modal__title').textContent = it[1];
      stage.innerHTML = g.map(function (p) {
        return '<div class="media-modal__slide">' + (p.indexOf('yt:') === 0
          ? '<iframe data-src="' + p.slice(3) + '" src="about:blank" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'
          : '<img src="' + img(p) + '" alt="">') + '</div>';
      }).join('');
      thumbs.innerHTML = g.length > 1 ? g.map(function (p, i) {
        var yt = p.indexOf('yt:') === 0;
        return '<button type="button" class="media-modal__thumb' + (yt ? ' media-modal__thumb--video' : '') + '" data-i="' + i + '" aria-label="Ảnh ' + (i + 1) + '">' +
          (yt ? '' : '<img src="' + img(p) + '" alt="">') + '</button>';
      }).join('') : '';
      count = g.length;
      modal.classList.toggle('is-single', count < 2);
      lastFocus = document.activeElement;
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('media-modal-open');
      show(0);
      modal.querySelector('.js-modal-close').focus();
    }
    function closeModal() {
      modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('media-modal-open');
      stage.querySelectorAll('iframe').forEach(function (f) { f.src = 'about:blank'; });
      if (lastFocus) lastFocus.focus();
    }

    document.querySelector('.news-panes').addEventListener('click', function (e) {
      var b = e.target.closest('.js-media-open');
      if (b) openModal(+b.getAttribute('data-index'));
    });
    thumbs.addEventListener('click', function (e) { var t = e.target.closest('.media-modal__thumb'); if (t) show(+t.getAttribute('data-i')); });
    modal.querySelector('.js-modal-prev').addEventListener('click', function () { show(cur - 1); });
    modal.querySelector('.js-modal-next').addEventListener('click', function () { show(cur + 1); });
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft' && count > 1) show(cur - 1);
      else if (e.key === 'ArrowRight' && count > 1) show(cur + 1);
    });
  }

  /* ======================================================================
     ARTICLE DETAIL
     ====================================================================== */
  var share = document.querySelector('.post-share');
  if (share) {
    var pops = share.querySelectorAll('.post-share__pop');
    share.querySelectorAll('[data-pop]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var pop = document.getElementById(btn.getAttribute('data-pop')), open = !pop.classList.contains('is-open');
        pops.forEach(function (p) { p.classList.remove('is-open'); });
        pop.classList.toggle('is-open', open);
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.post-share__pop')) pops.forEach(function (p) { p.classList.remove('is-open'); });
    });
    var input = share.querySelector('.post-share__input'), copyBtn = share.querySelector('.post-share__copy-btn');
    input.value = location.href;
    copyBtn.addEventListener('click', function () {
      var done = function () {
        copyBtn.textContent = 'Đã sao chép'; copyBtn.classList.add('is-done');
        setTimeout(function () { copyBtn.textContent = 'Sao chép'; copyBtn.classList.remove('is-done'); }, 2000);
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(input.value).then(done, function () { input.select(); document.execCommand('copy'); done(); });
      else { input.select(); document.execCommand('copy'); done(); }
    });
    var u = encodeURIComponent(location.href), t = encodeURIComponent(document.querySelector('.news-post__head h1').textContent.trim());
    share.querySelector('.is-fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + u;
    share.querySelector('.is-in').href = 'https://www.linkedin.com/shareArticle?mini=true&url=' + u + '&title=' + t;
    share.querySelector('.is-zalo').href = 'https://chat.zalo.me/?url=' + u + '&text=' + t;
  }

  /* "Tin tức khác" (.s-news): slick 3/1 (bp 500, dots), autoplay 3s, speed 600 linear */
  var $other = $('.js-news-other');
  if ($other.length) {
    $other.addClass('dots-red').slick({
      slidesToShow: 3, slidesToScroll: 1,
      autoplay: true, autoplaySpeed: 3000, speed: 600, cssEase: 'linear',
      dots: false, arrows: false, infinite: true, pauseOnHover: true,
      responsive: [{ breakpoint: 500, settings: { slidesToShow: 1, dots: true } }]
    });
  }
})(jQuery);

# Job detail — `/vi-tri-tuyen-dung/<slug>/` (36 pages)

Source: `templates/job.mjs` + `data/jobs.json` → `node scripts/generate.mjs job`. Shell: `tuyen-dung/index.html` (header nav "Tuyển dụng").
CSS `assets/css/pages/job-detail.css`, JS `assets/js/pages/job-detail.js`. Measured on chuyen-vien-moi-gioi-bat-dong-san, director-marketing, ke-toan-truong (all share one template: header + 3 accordion sections "Mô tả chung / Nhiệm vụ chính / Yêu cầu công việc").

## Data
Facts verbatim from the original listing (title, company, location, posting date dd/mm/yyyy). The original shows no level / deadline / salary / department, so none are stored. Section bodies are generic filler ("Nội dung minh họa…", "Nhiệm vụ minh họa n…", "Yêu cầu minh họa n…").
Note: some original slugs don't match their titles (e.g. `director-marketing` = "Phó Giám đốc, Pháp lý Dự án"); kept as on the original.

## Layout (1440 / 1280 / 1024 / 768 / 390)
- Back link: shared `.back-link` ("Tuyển dụng" → `/tuyen-dung/`), 20px bold, 66px block, margin-top 10.
- `.job-single` padding 60px 0 (40 ≤767). Header padding-bottom 50.
- Title 37/44.4 bold #181d27, mb 25; ≤991 32/38.4; ≤767 28/46, −0.56px.
- Info lines 20/24 medium, mb 15; date 16/24 #a4a7ae.
- Accordion head: flex, padding 25px 0 (≤991 padding-right 9%), border-top 1px rgba(213,215,218,.8); h2 24/28.8 medium #252b37 (≤767 22/26.4). Arrow 26×17 right 0 top 33px, rotates −90° when open (0.5s ease).
- Body: padding 0 0 20px 28% (≤767 0), 18/24 #535862 (≤767 16px). p/ul mb 16; ul padding-left 25; li padding-left 12, mb 7, red 9px dot at left −7 / top 7.
- Apply button: margin-top 50, centered pill (15px 45px, r30, #98221f, 18/23 medium, 229×53). Hover: arrow fades in at right 15 (padding shifts 30/60).
- CTA `.career-opp`: margin-top 48, height 352, bg #f9f0ef, column flex gap 32, padding 80 (≤1439 60, ≤767 40); title 43.2/60 medium red (≤767 34/44 −0.68); "Xem thêm" → `/tuyen-dung/#position`.

## Behaviors
- Accordion: each head toggles its own body independently (jQuery slideToggle 400ms); all closed on load.
- "Ứng tuyển ngay" opens popup: overlay rgba(0,0,0,.4) z 999; dialog fixed centered 600px, padding 30, r32 (≤767: width calc(100%−20px), padding 20/15, r15; h2 26/31.2). Fields underline style (1px #d5d7da, 35px tall, mb 15), "Tải CV lên" + "Chọn tệp" pill (border #717680, r20, 15px) + file name 13px italic + "Dung lượng tối đa: 5MB" 14.4px, textarea 70px, consent checkbox (checked by default, italic), actions "Bỏ qua" (outline #252b37) / "Ứng tuyển" (red), each flex 1, r999.
- Client-side only (no network request): required name, phone (8–15 digits), valid email, CV file (pdf/doc/docx/jpg/png ≤5MB), consent. Invalid → red underline/border on fields + error notification (top −40px, 90% width, bg #ffeae9, shadow, closable). Valid → success notification (bg #f8fff5), form reset, popup auto-closes after 4s. Close via "Bỏ qua", overlay or Esc; body scroll locked while open.
- Careers listing (`/tuyen-dung/` tab "Cơ hội nghề nghiệp"): each card head is now a link to its detail page; the temporary modal was removed.

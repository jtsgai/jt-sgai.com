/* JT M&C — interactions v4 (EN/中文/BM/தமிழ் · marquee · parallax) */
(function () {
  "use strict";

  /* ---------- i18n ---------- */
  const I18N = {
    en: {
      lt_eyebrow: "A LETTER TO FUTURE FAMILIES",
      lt_h: "To the family we haven't met yet",
      lt_p: "Hello. When you read this letter, AI may not yet have entered your home; but I believe that day is not far away. I founded JT M&C not to build smarter machines, but so that whenever you are in need — a lamp in the late night, a greeting after a long absence, a conversation in solitude — something gentle is present. Technology grows old; companionship does not.",
      lt_sign: "— Jerry · Singapore",
      r_cta: "If your organisation serves elders or anyone in need of company, we'd love to talk →",
      nav_products: "Products", nav_lab: "Film Lab", nav_manifesto: "We Believe", nav_next: "Next Chapter",
      hero_h1: "Let AI <span class=\"kw\">accompany</span><br>everyone in need",
      hero_sub: "We believe intelligence will enter every home — not as a machine, but as a companion.",
      hero_cta1: "Explore Products", hero_cta2: "Enter the Film Lab",
      hud_status: "System online · Generating",
      chip: "Awaiting generation · STANDBY",
      p_eyebrow: "CONCEPT PRODUCTS",
      p_h: "Concept Products",
      p_sub: "Four directions, one purpose: making intelligence part of the home.",
      pd1_t: "Emotional Companion Robot",
      pd1_p: "Understands human emotion, offering warm company and support. Designed for elders and anyone in need of comfort — it replaces no one; it is simply there when you need it.",
      pd2_t: "AI Interactive Assistant",
      pd2_p: "Advanced language understanding that hears complex requests — and what's between the lines. From schedules to sparks of inspiration, the most capable hands in daily life.",
      pd3_t: "Intelligent Data Analysis",
      pd3_p: "Machine learning that distills value from oceans of data, turning uncertainty into confident decisions and lighting the next step for business.",
      pd4_t: "Universe Exploration Simulator",
      pd4_p: "Immersive VR that brings the cosmos into your living room. Among nebulae and planets, we practice awe and curiosity for the unknown.",
      l_h: "Film Lab",
      l_sub: "Five generative film studies on an endless reel — every frame AI-generated.",
      l_hint: "Endless reel · hover to pause",
      f1_t: "Warmth", f1_p: "When a machine learns to gaze at dinner under a lamp.",
      f2_t: "Dialogue", f2_p: "Between human and machine, the shortest distance is understanding.",
      f3_t: "Flow", f3_p: "Invisible data carves rivers of its own.",
      f4_t: "Nebula", f4_p: "In vastness, we practice awe of the unknown.",
      f5_t: "Abstract", f5_p: "The shape of technology is decided by imagination.",
      v_h: "Technology should be warm",
      v_p: "AI for all is not a slogan. We weave intelligence into daily life, making it part of the home — bringing convenience, and the warmth of company.",
      m_h: "Leave the complexity to us<span class=\"sep\"> </span><br class=\"br-wide\">keep the imagination",
      m_p: "Exploring the frontier of AIGC, we turn complex AI into tools that simply work — empowering individuals and industries to co-create an imaginative future.",
      r_h: "Create responsibly",
      r_p: "Ethics and safety first. We use technology to bridge the digital divide — because warmth, in the end, must return to people and society.",
      n_h: "The Era of Household Robots",
      n_p: "Not just a technical shift — a change in how we live. We are building family companions that understand you, making the future home efficient, effortless, and warm.",
      n_cta: "Walk with us →",
      f_tag: "Built with warmth in Singapore",
      f_addr: "Central Business District, Singapore",
      _lang: "en",
      _title: "JT M&C — Let AI Accompany Everyone in Need"
    },
    zh: {
      lt_eyebrow: "给未来家庭的一封信",
      lt_h: "致我们尚未谋面的家庭",
      lt_p: "你好。当你读到这封信时,AI 也许还没有走进你的家;但我相信,那一天不会太远。我创办 JT M&C,不是为了制造更聪明的机器,而是希望在你需要的时候——深夜的一盏灯、久别后的一句问候、独处时的一段对话——总有什么,温柔地在场。<br>技术会过时,陪伴不会。",
      lt_sign: "—— 劲涛 · 于新加坡",
      r_cta: "如果您的机构服务于长者或需要陪伴的人群,欢迎与我们聊聊 →",
      nav_products: "概念产品", nav_lab: "影像实验", nav_manifesto: "我们相信", nav_next: "下一章",
      hero_h1: "让 AI <span class=\"kw\">陪伴</span><br>每一个需要的人",
      hero_sub: "我们相信,智能终将走进每一个家——不是作为机器,而是作为伙伴。",
      hero_cta1: "探索概念产品", hero_cta2: "进入影像实验",
      hud_status: "系统在线 · 生成中",
      chip: "生成排程中 · STANDBY",
      p_eyebrow: "CONCEPT PRODUCTS",
      p_h: "概念产品",
      p_sub: "四个方向,同一个目的:让智能成为家的一部分。",
      pd1_t: "情感陪伴机器人",
      pd1_p: "理解人类情感,提供温暖的陪伴与支持。<br>为长者与需要慰藉的人而设计——它不替代任何人。<br>只是在你需要时,恰好在场。",
      pd2_t: "AI 互动助手",
      pd2_p: "先进的自然语言理解,听懂复杂指令与言外之意。<br>从日程到灵感,成为生活里最顺手的那双手。",
      pd3_t: "智能数据分析",
      pd3_p: "机器学习算法在海量数据中提炼价值,把不确定变成决策的底气。<br>为企业照亮下一步。",
      pd4_t: "宇宙探索模拟",
      pd4_p: "沉浸式虚拟现实,把浩瀚宇宙搬进客厅。<br>在星云与行星之间,练习对未知的敬畏与好奇。",
      l_h: "影像实验",
      l_sub: "五部生成影像习作,循环巡演——每一帧都由 AI 生成。",
      l_hint: "循环巡演 · 悬停暂停",
      f1_t: "温度", f1_p: "当机器学会凝视一盏灯下的晚餐。",
      f2_t: "对话", f2_p: "人与智能之间,最短的距离是理解。",
      f3_t: "流", f3_p: "看不见的数据,有它自己的河道。",
      f4_t: "星云", f4_p: "在浩瀚里,练习对未知的敬畏。",
      f5_t: "抽象", f5_p: "技术的形状,由想象力决定。",
      v_h: "科技,应有温度",
      v_p: "AI 普惠不是口号。<br>我们让智能融入日常,成为家的一部分——带来便捷,也带来陪伴的温暖。",
      m_h: "把复杂留给我们<span class=\"sep\"> </span><br class=\"br-wide\">把想象力还给你",
      m_p: "探索 AIGC 前沿,将复杂的 AI 化为好用的工具。<br>赋能每一个个体与行业,共创充满想象力的未来。",
      r_h: "负责任地创造",
      r_p: "以伦理与安全为先,用技术弥合数字鸿沟。<br>科技的温度,最终要回到人与社会。",
      n_h: "家庭智能机器人时代",
      n_p: "这不只是技术革新,而是生活方式的变革。<br>我们正在打造懂你、陪伴你的家庭伙伴。<br>让未来的家,高效、便捷,并且温暖。",
      n_cta: "与我们同行 →",
      f_tag: "怀着温度,造于新加坡",
      f_addr: "Central Business District, Singapore",
      _lang: "zh-CN",
      _title: "JT M&C — 让 AI 陪伴每一个需要的人"
    },
    ms: {
      lt_eyebrow: "SEPUCUK SURAT UNTUK KELUARGA MASA DEPAN",
      lt_h: "Buat keluarga yang belum kami temui",
      lt_p: "Salam sejahtera. Ketika anda membaca surat ini, mungkin AI belum hadir di rumah anda; tetapi saya percaya hari itu tidak lama lagi. Saya menubuhkan JT M&C bukan untuk membina mesin yang lebih pintar, tetapi supaya setiap kali anda memerlukan — lampu di larut malam, sapaan selepas lama berpisah, perbualan di kala sendirian — ada sesuatu yang lembut hadir di sisi. Teknologi akan lapuk; teman tidak.",
      lt_sign: "— Jerry · Singapura",
      r_cta: "Jika organisasi anda berkhidmat untuk warga emas atau mereka yang memerlukan teman, hubungi kami →",
      nav_products: "Produk Konsep", nav_lab: "Makmal Filem", nav_manifesto: "Keyakinan Kami", nav_next: "Bab Seterusnya",
      hero_h1: "Biar AI <span class=\"kw\">menemani</span><br>setiap insan yang memerlukan",
      hero_sub: "Kami percaya kecerdasan akan hadir di setiap rumah — bukan sebagai mesin, tetapi sebagai teman.",
      hero_cta1: "Teroka Produk", hero_cta2: "Masuk Makmal Filem",
      hud_status: "Sistem dalam talian · Menjana",
      chip: "Menunggu penjanaan · STANDBY",
      p_eyebrow: "PRODUK KONSEP",
      p_h: "Produk Konsep",
      p_sub: "Empat hala tuju, satu tujuan: menjadikan kecerdasan sebahagian daripada rumah.",
      pd1_t: "Robot Teman Emosi",
      pd1_p: "Memahami emosi manusia, memberi teman dan sokongan yang hangat. Direka untuk warga emas dan sesiapa yang memerlukan keselesaan — ia tidak menggantikan sesiapa; ia hadir tepat pada saat anda memerlukannya.",
      pd2_t: "Pembantu Interaktif AI",
      pd2_p: "Pemahaman bahasa yang canggih, memahami arahan kompleks dan maksud tersirat. Daripada jadual harian hingga percikan inspirasi, tangan paling cekap dalam kehidupan anda.",
      pd3_t: "Analisis Data Pintar",
      pd3_p: "Pembelajaran mesin menyaring nilai daripada lautan data, mengubah ketidakpastian menjadi keyakinan dan menerangi langkah seterusnya untuk perniagaan.",
      pd4_t: "Simulator Penjelajahan Semesta",
      pd4_p: "VR imersif membawa kosmos ke ruang tamu anda. Dalam kalangan nebula dan planet, kita belajar kagum dan ingin tahu akan yang belum diketahui.",
      l_h: "Makmal Filem",
      l_sub: "Lima kajian filem generatif dalam tayangan berterusan — setiap bingkai dijana AI.",
      l_hint: "Tayangan berterusan · sentuh untuk jeda",
      f1_t: "Kehangatan", f1_p: "Apabila mesin belajar merenung makan malam di bawah cahaya lampu.",
      f2_t: "Dialog", f2_p: "Antara manusia dan mesin, jarak terdekat ialah pemahaman.",
      f3_t: "Aliran", f3_p: "Data yang tak kelihatan mengukir sungainya sendiri.",
      f4_t: "Nebula", f4_p: "Dalam keluasan, kita belajar kagum akan yang belum diketahui.",
      f5_t: "Abstrak", f5_p: "Bentuk teknologi ditentukan oleh imaginasi.",
      v_h: "Teknologi harus hangat",
      v_p: "AI untuk semua bukan sekadar slogan. Kami menjalin kecerdasan ke dalam kehidupan harian, menjadikannya sebahagian daripada rumah — membawa kemudahan dan kehangatan seorang teman.",
      m_h: "Serahkan kerumitan kepada kami<span class=\"sep\"> </span><br class=\"br-wide\">simpan imaginasi anda",
      m_p: "Meneroka barisan hadapan AIGC, kami mengubah AI yang kompleks menjadi alat yang mudah digunakan — memperkasa individu dan industri untuk mencipta masa depan bersama.",
      r_h: "Mencipta dengan tanggungjawab",
      r_p: "Etika dan keselamatan diutamakan. Kami menggunakan teknologi untuk merapatkan jurang digital — kerana kehangatan akhirnya mesti kembali kepada manusia dan masyarakat.",
      n_h: "Era Robot Rumah Tangga",
      n_p: "Bukan sekadar perubahan teknologi — perubahan cara hidup. Kami membina teman keluarga yang memahami anda, menjadikan rumah masa depan cekap, mudah dan hangat.",
      n_cta: "Melangkah bersama kami →",
      f_tag: "Dibina dengan kehangatan di Singapura",
      f_addr: "Central Business District, Singapura",
      _lang: "ms",
      _title: "JT M&C — Biar AI Menemani Setiap Insan"
    },
    ta: {
      lt_eyebrow: "எதிர்கால குடும்பங்களுக்கு ஒரு கடிதம்",
      lt_h: "இன்னும் சந்திக்காத குடும்பத்திற்கு",
      lt_p: "வணக்கம். இந்தக் கடிதத்தை நீங்கள் படிக்கும் போது, AI இன்னும் உங்கள் வீட்டிற்குள் வந்திருக்காமல் இருக்கலாம்; ஆனால் அந்த நாள் தொலைவில் இல்லை என நம்புகிறேன். புத்திசாலி இயந்திரங்களை உருவாக்க அல்ல — நள்ளிரவின் ஒரு விளக்கு, நீண்ட பிரிவுக்குப் பின் ஒரு வாழ்த்து, தனிமையில் ஒரு உரையாடல் — தேவைப்படும் ஒவ்வொரு தருணத்திலும் மென்மையான ஏதோ ஒன்று அருகில் இருக்க வேண்டும் என்பதற்காகவே JT M&C-ஐ நிறுவினேன். தொழில்நுட்பம் பழையதாகும்; துணை ஆகாது.",
      lt_sign: "— Jerry · சிங்கப்பூர்",
      r_cta: "உங்கள் அமைப்பு முதியவர்களுக்கோ துணை தேவைப்படுவோருக்கோ சேவை செய்கிறதா? எங்களுடன் பேசுங்கள் →",
      nav_products: "தயாரிப்புகள்", nav_lab: "திரை ஆய்வகம்", nav_manifesto: "எங்கள் நம்பிக்கை", nav_next: "அடுத்த அத்தியாயம்",
      hero_h1: "தேவைப்படும் அனைவருக்கும்<br>AI <span class=\"kw\">துணையாகட்டும்</span>",
      hero_sub: "நுண்ணறிவு ஒவ்வொரு வீட்டிற்குள்ளும் வரும் என நம்புகிறோம் — இயந்திரமாக அல்ல, துணையாக.",
      hero_cta1: "தயாரிப்புகளை அறிய", hero_cta2: "ஆய்வகத்திற்குள்",
      hud_status: "அமைப்பு இயக்கத்தில் · உருவாக்கம்",
      chip: "உருவாக்கத்திற்குக் காத்திருக்கிறது · STANDBY",
      p_eyebrow: "கருத்துத் தயாரிப்புகள்",
      p_h: "கருத்துத் தயாரிப்புகள்",
      p_sub: "நான்கு திசைகள், ஒரே நோக்கம்: நுண்ணறிவை வீட்டின் அங்கமாக்குவது.",
      pd1_t: "உணர்வுத் துணை ரோபோ",
      pd1_p: "மனித உணர்வுகளைப் புரிந்து, அன்பான துணையும் ஆதரவும் தருகிறது. முதியவர்களுக்கும் ஆறுதல் தேவைப்படுவோருக்கும் வடிவமைக்கப்பட்டது — யாரையும் மாற்றாது; தேவைப்படும் தருணத்தில் அருகில் இருக்கும்.",
      pd2_t: "AI ஊடாடும் உதவியாளர்",
      pd2_p: "மேம்பட்ட மொழிப் புரிதல் — சிக்கலான கட்டளைகளையும் சொல்லாத பொருளையும் புரிந்துகொள்கிறது. அன்றாட வாழ்வின் மிகத் திறமையான கைகள்.",
      pd3_t: "நுண்ணறிவுத் தரவு பகுப்பாய்வு",
      pd3_p: "இயந்திரக் கற்றல் தரவுக் கடலிலிருந்து மதிப்பை வடிகட்டி, நிச்சயமற்றதை முடிவின் நம்பிக்கையாக மாற்றுகிறது.",
      pd4_t: "பிரபஞ்ச ஆய்வு சிமுலேட்டர்",
      pd4_p: "மூழ்கடிக்கும் VR பிரபஞ்சத்தை உங்கள் வீட்டிற்குள் கொண்டுவருகிறது. நெபுலாக்களுக்கும் கோள்களுக்கும் இடையே, அறியாததை வியக்கக் கற்றுக்கொள்கிறோம்.",
      l_h: "திரை ஆய்வகம்",
      l_sub: "தொடர் காட்சியில் ஐந்து உருவாக்கத் திரைப் பயிற்சிகள் — ஒவ்வொரு சட்டகமும் AI உருவாக்கியது.",
      l_hint: "தொடர் காட்சி · தொட்டால் இடைநிறுத்தம்",
      f1_t: "கதகதப்பு", f1_p: "விளக்கின் கீழ் இரவு உணவை இயந்திரம் பார்க்கக் கற்கும் போது.",
      f2_t: "உரையாடல்", f2_p: "மனிதனுக்கும் இயந்திரத்திற்கும் இடையே, மிகக் குறுகிய தூரம் புரிதல்.",
      f3_t: "ஓட்டம்", f3_p: "கண்ணுக்குத் தெரியாத தரவு தன் ஆற்றைத் தானே செதுக்குகிறது.",
      f4_t: "நெபுலா", f4_p: "பரந்த வெளியில், அறியாததை வியக்கப் பழகுகிறோம்.",
      f5_t: "அருவம்", f5_p: "தொழில்நுட்பத்தின் வடிவம் கற்பனையால் தீர்மானிக்கப்படுகிறது.",
      v_h: "தொழில்நுட்பம் கதகதப்பாக இருக்க வேண்டும்",
      v_p: "அனைவருக்கும் AI என்பது வெறும் முழக்கமல்ல. நுண்ணறிவை அன்றாட வாழ்வில் இழைத்து, வீட்டின் அங்கமாக்குகிறோம் — வசதியுடன், துணையின் கதகதப்பையும் கொண்டுவருகிறோம்.",
      m_h: "சிக்கலை எங்களிடம் விடுங்கள்<span class=\"sep\"> </span><br class=\"br-wide\">கற்பனையை வைத்திருங்கள்",
      m_p: "AIGC-இன் எல்லையை ஆராய்ந்து, சிக்கலான AI-ஐ எளிதில் பயன்படுத்தும் கருவிகளாக மாற்றுகிறோம் — தனிநபர்களுக்கும் தொழில்களுக்கும் ஆற்றல் அளிக்கிறோம்.",
      r_h: "பொறுப்புடன் படைத்தல்",
      r_p: "நெறிமுறையும் பாதுகாப்பும் முதலில். டிஜிட்டல் இடைவெளியைக் குறைக்கத் தொழில்நுட்பத்தைப் பயன்படுத்துகிறோம் — ஏனெனில் கதகதப்பு இறுதியில் மனிதர்களிடமும் சமூகத்திடமும் திரும்ப வேண்டும்.",
      n_h: "வீட்டு ரோபோக்களின் காலம்",
      n_p: "இது வெறும் தொழில்நுட்ப மாற்றமல்ல — வாழ்க்கை முறையின் மாற்றம். உங்களைப் புரிந்துகொள்ளும் குடும்பத் துணைகளை உருவாக்குகிறோம் — வீட்டை திறமையாகவும், எளிதாகவும், கதகதப்பாகவும் மாற்றுகிறோம்.",
      n_cta: "எங்களுடன் நடங்கள் →",
      f_tag: "சிங்கப்பூரில் கதகதப்புடன் உருவாக்கப்பட்டது",
      f_addr: "Central Business District, சிங்கப்பூர்",
      _lang: "ta",
      _title: "JT M&C — தேவையுள்ள ஒவ்வொருவருக்கும் AI துணை"
    }
  };

  let lang = "en";
  try { lang = localStorage.getItem("jtmc-lang") || "en"; } catch (e) {}
  if (!I18N[lang]) lang = "en";

  const langSel = document.getElementById("langSel");

  function applyLang(l) {
    const dict = I18N[l];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.documentElement.lang = dict._lang;
    document.title = dict._title;
    if (langSel) langSel.value = l;
    try { localStorage.setItem("jtmc-lang", l); } catch (e) {}
  }
  if (langSel) langSel.addEventListener("change", () => { lang = langSel.value; applyLang(lang); });
  applyLang(lang);

  /* ---------- fixed year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = "2024";

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- starfield + rising embers ---------- */
  const canvas = document.getElementById("space");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(devicePixelRatio || 1, 2);
    let W, H, stars = [], embers = [];
    function resize() {
      W = canvas.width = canvas.offsetWidth * DPR;
      H = canvas.height = canvas.offsetHeight * DPR;
      stars = Array.from({ length: Math.floor(W * H / 26000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.1 + .2,
        tw: Math.random() * Math.PI * 2,
        sp: .4 + Math.random() * .9
      }));
      embers = Array.from({ length: 26 }, () => spawnEmber(true));
    }
    function spawnEmber(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + 10,
        r: (Math.random() * 1.6 + .6) * DPR,
        vy: (.18 + Math.random() * .5) * DPR,
        vx: (Math.random() - .5) * .22 * DPR,
        a: .12 + Math.random() * .4
      };
    }
    let t = 0;
    function frame() {
      t += .016;
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = .18 + .5 * Math.abs(Math.sin(s.tw + t * s.sp));
        ctx.fillStyle = `rgba(255,232,210,${a})`;
        ctx.fillRect(s.x, s.y, s.r * DPR, s.r * DPR);
      }
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.vy; e.x += e.vx;
        if (e.y < -12) embers[i] = spawnEmber(false);
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 3.2);
        g.addColorStop(0, `rgba(255,168,92,${e.a})`);
        g.addColorStop(1, "rgba(255,90,30,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r * 3.2, 0, 7); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    resize();
    addEventListener("resize", resize);
    requestAnimationFrame(frame);
  }

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---------- hero media: portrait assets on phones, landscape otherwise ---------- */
  const portrait = matchMedia("(orientation: portrait)").matches;

  const heroBg = document.querySelector(".hero-bg");
  if (heroBg && portrait) {
    const probe = new Image();
    probe.onload = () => { heroBg.src = "assets/ph_hero_m.jpg"; };
    probe.src = "assets/ph_hero_m.jpg";   /* fallback: keep landscape if missing */
  }

  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo && !reduced) {
    const sources = portrait ? ["gen/hero_m.mp4", "gen/hero.mp4"] : ["gen/hero.mp4"];
    let si = 0;
    function tryNext() {
      if (si >= sources.length) { heroVideo.remove(); return; }
      heroVideo.src = sources[si++];
      heroVideo.load();
    }
    heroVideo.addEventListener("canplay", () => {
      heroVideo.classList.add("on");
      heroVideo.play().catch(() => {});
    }, { once: true });
    heroVideo.addEventListener("error", tryNext);
    tryNext();
  }

  /* ---------- hover-play media (shared helper) ---------- */
  function attachHoverPlay(host, slot) {
    let video = null, failed = false;
    function play() {
      if (failed || reduced) return;
      if (!video) {
        video = document.createElement("video");
        video.muted = true; video.loop = true; video.playsInline = true;
        video.setAttribute("muted",""); video.setAttribute("playsinline","");
        video.src = host.dataset.video;
        video.addEventListener("error", () => { failed = true; video.remove(); video = null; }, { once: true });
        (slot || host).appendChild(video);
      }
      video.play().then(() => host.classList.add("playing")).catch(() => {});
    }
    function stop() { if (video) { video.pause(); host.classList.remove("playing"); } }
    host.addEventListener("mouseenter", play);
    host.addEventListener("mouseleave", stop);
    host.addEventListener("focus", play, true);
    host.addEventListener("blur", stop, true);
    host.addEventListener("touchstart", () => {
      host.classList.contains("playing") ? stop() : play();
    }, { passive: true });
  }
  document.querySelectorAll("[data-video]").forEach(host =>
    attachHoverPlay(host, host.querySelector(".panel-media")));

  /* ---------- film strip: auto-marquee (left → right) + manual drag ---------- */
  const strip = document.getElementById("strip");
  if (strip) {
    /* duplicate frames for a seamless loop */
    const originals = Array.from(strip.children);
    originals.forEach(f => {
      const c = f.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      c.classList.remove("reveal"); c.classList.add("in");
      c.removeAttribute("data-i18n-done");
      strip.appendChild(c);
      attachHoverPlay(c, null);
    });
    /* re-apply language to clones */
    applyLang(lang);


    /* autoplay reel videos while visible */
    if (!reduced) {
      const vio = new IntersectionObserver(entries => {
        entries.forEach(en => {
          const host = en.target;
          let v = host.querySelector("video");
          if (en.isIntersecting) {
            if (!v) {
              v = document.createElement("video");
              v.muted = true; v.loop = true; v.playsInline = true;
              v.setAttribute("muted",""); v.setAttribute("playsinline","");
              v.src = host.dataset.video;
              v.addEventListener("error", () => { v.remove(); vio.unobserve(host); }, { once: true });
              host.appendChild(v);
            }
            v.play().then(() => host.classList.add("playing")).catch(() => {});
          } else if (v) {
            v.pause(); host.classList.remove("playing");
          }
        });
      }, { threshold: 0.25 });
      const visibleSet = new Set();
      const vio2 = new IntersectionObserver(entries => {
        entries.forEach(en => en.isIntersecting ? visibleSet.add(en.target) : visibleSet.delete(en.target));
      }, { threshold: 0.25 });
      Array.from(strip.children).forEach(f => { vio.observe(f); vio2.observe(f); });
      setInterval(() => {
        visibleSet.forEach(host => {
          const v = host.querySelector("video");
          if (v && v.paused) v.play().then(() => host.classList.add("playing")).catch(() => {});
        });
      }, 2000);
    }

    let paused = false, resumeTimer = null, half = 0;
    function measure() { half = strip.scrollWidth / 2; }
    measure();
    addEventListener("resize", measure);
    requestAnimationFrame(measure);

    const SPEED = 0.6; /* ≈36 px/s */
    let pos = null; /* float accumulator — iOS truncates fractional scrollLeft */
    function tick() {
      if (!paused && !reduced && half > 0) {
        if (pos === null) pos = strip.scrollLeft;
        pos += SPEED;
        if (pos >= half) pos -= half;
        strip.scrollLeft = pos;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    /* resync accumulator after any manual scroll/drag */
    strip.addEventListener("scroll", () => { if (paused) pos = strip.scrollLeft; }, { passive: true });

    function pause() { paused = true; clearTimeout(resumeTimer); }
    function resumeSoon(ms) { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { pos = strip.scrollLeft; paused = false; }, ms); }

    strip.addEventListener("mouseenter", pause);
    strip.addEventListener("mouseleave", () => resumeSoon(400));
    strip.addEventListener("touchstart", pause, { passive: true });
    strip.addEventListener("touchend", () => resumeSoon(3500), { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); else resumeSoon(600); });

    /* manual drag still works */
    let down = false, startX = 0, startScroll = 0, movedFlag = false;
    strip.addEventListener("pointerdown", e => {
      down = true; movedFlag = false; pause();
      startX = e.clientX; startScroll = strip.scrollLeft;
      strip.setPointerCapture(e.pointerId);
    });
    strip.addEventListener("pointermove", e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) movedFlag = true;
      strip.scrollLeft = startScroll - dx;
    });
    ["pointerup", "pointercancel"].forEach(ev =>
      strip.addEventListener(ev, () => { down = false; resumeSoon(2500); })
    );
    strip.addEventListener("click", e => { if (movedFlag) e.preventDefault(); }, true);
  }


  /* ---------- font-size toggle ---------- */
  const fsBtn = document.getElementById("fsToggle");
  if (fsBtn) {
    let lg = false;
    try { lg = localStorage.getItem("jtmc-lg") === "1"; } catch (e) {}
    if (lg) document.documentElement.classList.add("lg");
    fsBtn.addEventListener("click", () => {
      lg = !lg;
      document.documentElement.classList.toggle("lg", lg);
      try { localStorage.setItem("jtmc-lg", lg ? "1" : "0"); } catch (e) {}
    });
  }


  /* ---------- hero mouse parallax ---------- */
  const arcsEl = document.querySelector(".arcs");
  const ghostEl = document.querySelector(".hero-ghost");
  if (arcsEl && !reduced && matchMedia("(pointer:fine)").matches) {
    document.querySelector(".hero").addEventListener("mousemove", e => {
      const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
      arcsEl.style.transform = `translate(${x * 18}px, ${y * 14}px)`;
      if (ghostEl) ghostEl.style.transform = `translate(${x * -10}px, ${y * -8}px)`;
    });
  }
})();

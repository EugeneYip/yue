import React, { useMemo, useState } from "react";

/* ═══════════════════════════════════════════
   TONE COLOR SYSTEM — used everywhere
   ═══════════════════════════════════════════ */
const TONE_COLORS = {
  1: { text: "text-rose-700",   bg: "bg-rose-50",   border: "border-rose-200",   dot: "bg-rose-500",   hex: "#E11D48" },
  2: { text: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200",  dot: "bg-amber-500",  hex: "#D97706" },
  3: { text: "text-emerald-700",bg: "bg-emerald-50", border: "border-emerald-200",dot: "bg-emerald-500",hex: "#059669" },
  4: { text: "text-sky-700",    bg: "bg-sky-50",    border: "border-sky-200",    dot: "bg-sky-500",    hex: "#0284C7" },
  5: { text: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500", hex: "#7C3AED" },
  6: { text: "text-slate-600",  bg: "bg-slate-50",  border: "border-slate-200",  dot: "bg-slate-400",  hex: "#64748B" },
};

/* ═══════════════════════════════════════════
   ICON PATH DICTIONARY
   ═══════════════════════════════════════════ */
const ICON_PATHS = {
  volume: ["M11 5L6 9H3v6h3l5 4z","M15.5 8.5a5 5 0 0 1 0 7","M18 6a8.5 8.5 0 0 1 0 12"],
  chat: ["M21 15a3 3 0 0 1-3 3H8l-5 3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3z","M8 9h8","M8 13h5"],
  book: ["M2 5.5h7a4 4 0 0 1 4 4V21a3 3 0 0 0-3-3H2z","M22 5.5h-7a4 4 0 0 0-4 4V21a3 3 0 0 1 3-3h8z"],
  check: ["M5 13l4 4L19 7"],
  alert: ["M12 9v4","M12 17h.01","M10.3 3.8L2.8 17a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"],
  grid: ["M4 4h6v6H4z","M14 4h6v6h-6z","M4 14h6v6H4z","M14 14h6v6h-6z"],
  layers: ["M12 3l9 5-9 5-9-5 9-5z","M3 12l9 5 9-5","M3 16l9 5 9-5"],
  arrow: ["M5 12h14","M13 6l6 6-6 6"],
  search: ["M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z","M21 21l-4.3-4.3"],
  keyboard: ["M4 7h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z","M6 11h.01","M10 11h.01","M14 11h.01","M18 11h.01","M7 15h10"],
  user: ["M20 21a8 8 0 0 0-16 0","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  clock: ["M12 7v5l3 3","M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"],
  hash: ["M4 9h16","M4 15h16","M10 3v18","M14 3v18"],
  sparkle: ["M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"],
  chevDown: ["M6 9l6 6 6-6"],
  chevRight: ["M9 18l6-6-6-6"],
  mic: ["M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z","M19 10v2a7 7 0 0 1-14 0v-2","M12 19v4","M8 23h8"],
  globe: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z","M3.6 9h16.8","M3.6 15h16.8","M12 3a15.3 15.3 0 0 1 4 18","M12 3a15.3 15.3 0 0 0-4 18"],
  list: ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
  zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8"],
};

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
const NAV_ITEMS = [
  ["start",      "zap",     "先學這些"],
  ["tones",      "volume",  "6 聲調"],
  ["initials",   "layers",  "聲母"],
  ["finals",     "grid",    "韻母"],
  ["phrases",    "book",    "基礎句"],
  ["dialogs",    "chat",    "基礎會話"],
  ["grammar",    "layers",  "核心語法"],
  ["particles",  "sparkle", "語氣詞"],
  ["numbers",    "hash",    "數字與量詞"],
  ["mistakes",   "alert",   "常見錯誤"],
  ["drills",     "keyboard","練習"],
  ["cheatsheet", "grid",    "速查表"],
];

/* ═══════════════════════════════════════════
   CONTENT DATA
   ═══════════════════════════════════════════ */
const QUICK_START = [
  "先練 6 個基本字調：si1 si2 si3 si4 si5 si6",
  "先分清 b/p、d/t、g/k、z/c/s",
  "先背 20 句最常用句",
  "先會 4 組最基本會話：打招呼、點餐、問路、聽不懂",
  "先學 喺、有、冇、緊、咗、過",
  "先認得語氣詞 啊、喎、囉、㗎、咩",
];

const TONES = [
  { tone: 1, contour: "55", label: "高平",   example: "si1 詩", tip: "最高音，保持不動。像國語第一聲但更短促。", start: 5, end: 5 },
  { tone: 2, contour: "25", label: "高升",   example: "si2 史", tip: "從中間往上拉高。很像國語第二聲。", start: 2, end: 5 },
  { tone: 3, contour: "33", label: "中平",   example: "si3 試", tip: "中間音高，平平地走。比第 1 聲低一截。", start: 3, end: 3 },
  { tone: 4, contour: "21", label: "低降",   example: "si4 時", tip: "低低地往下沉。像國語第四聲但起點更低。", start: 2, end: 1 },
  { tone: 5, contour: "23", label: "低升",   example: "si5 市", tip: "從低位微微向上。升幅比第 2 聲小。", start: 2, end: 3 },
  { tone: 6, contour: "22", label: "低平",   example: "si6 事", tip: "低低地平走。和第 3 聲很像，但更低。", start: 2, end: 2 },
];

const TONE_MINIMAL_PAIRS = [
  { pair: "1 vs 3", a: "si1 詩 (高平)", b: "si3 試 (中平)", tip: "差在音高：1 聲最高，3 聲在中間。" },
  { pair: "3 vs 6", a: "si3 試 (中平)", b: "si6 事 (低平)", tip: "都是平的，但 3 聲明顯比 6 聲高。" },
  { pair: "2 vs 5", a: "si2 史 (高升)", b: "si5 市 (低升)", tip: "都在升，但 2 聲升得高，5 聲只微升。" },
  { pair: "4 vs 6", a: "si4 時 (低降)", b: "si6 事 (低平)", tip: "4 聲往下掉，6 聲保持低平。" },
];

const INITIAL_GROUPS = [
  {
    group: "唇音",
    desc: "用嘴唇發出",
    items: [
      ["b","不送氣","baa1 巴","像國語 ㄅ，嘴前沒有強氣流"],
      ["p","送氣","paa3 怕","像國語 ㄆ，嘴前有明顯氣流"],
      ["m","鼻音","maa1 媽","與國語 ㄇ 一樣"],
      ["f","擦音","faa1 花","與國語 ㄈ 一樣"],
    ]
  },
  {
    group: "舌尖音",
    desc: "舌尖碰上齒齦",
    items: [
      ["d","不送氣","daa2 打","像國語 ㄉ"],
      ["t","送氣","taa1 他","像國語 ㄊ，吐氣明顯"],
      ["n","鼻音","naa4 那","注意分清 n 和 l"],
      ["l","邊音","laa1 啦","與國語 ㄌ 一樣"],
    ]
  },
  {
    group: "舌根音",
    desc: "舌根碰軟顎",
    items: [
      ["g","不送氣","gaa1 家","像國語 ㄍ"],
      ["k","送氣","kaa1 卡","像國語 ㄎ，吐氣明顯"],
      ["ng","鼻音","ngaa4 牙","國語沒有的字首鼻音，不能省略"],
      ["h","擦音","haa1 蝦","比國語 ㄏ 更鬆"],
    ]
  },
  {
    group: "圓唇音",
    desc: "嘴唇圓起",
    items: [
      ["gw","圓唇不送氣","gwaa1 瓜","g + 嘴巴圓起來"],
      ["kw","圓唇送氣","kwaa1 誇","k + 嘴巴圓起來 + 氣流"],
    ]
  },
  {
    group: "塞擦 / 擦音",
    desc: "國語背景容易發錯的一組",
    items: [
      ["z","不送氣塞擦","zaa1 渣","像 ts，絕對不是 zh"],
      ["c","送氣塞擦","caa1 叉","像有強氣流的 ts"],
      ["s","擦音","saa1 沙","純 s，絕對不是 sh"],
    ]
  },
  {
    group: "半元音 / 零聲母",
    desc: "過渡音或直接開始",
    items: [
      ["w","半元音","waa1 蛙","像英語 w"],
      ["j","半元音","jaa5 也","像英語 y"],
      ["∅","零聲母","aa3 呀","直接由元音開始"],
    ]
  },
];

const FINAL_GROUPS = [
  {
    group: "單元音",
    items: [
      ["aa","baa1 巴","長 a，嘴張大"],
      ["a","sam1 心","短 a，比 aa 短且嘴小"],
      ["e","se1 些","短 e"],
      ["i","si1 詩","i"],
      ["o","ho2 可","o，嘴圓"],
      ["u","fu1 夫","u"],
      ["yu","syu1 書","圓唇 i，像國語 ü"],
    ]
  },
  {
    group: "複元音（雙母音）",
    items: [
      ["aai","gaai1 街","aa + i"],
      ["aau","gaau2 教","aa + u"],
      ["ai","sai3 世","a + i（短）"],
      ["au","gau1 交","a + u（短）"],
      ["ei","sei2 死","e + i"],
      ["iu","siu1 燒","i + u"],
      ["oi","hoi1 開","o + i"],
      ["ou","sou1 騷","o + u"],
      ["ui","gui6 貴","u + i"],
      ["eoi","ceoi1 催","eo + i"],
    ]
  },
  {
    group: "鼻音韻尾 -m / -n / -ng",
    items: [
      ["aam","naam4 男","aa + m"],
      ["aan","saan1 山","aa + n"],
      ["aang","saang1 生","aa + ng"],
      ["am","sam1 心","a + m"],
      ["an","san1 新","a + n"],
      ["ang","sang1 星","a + ng（短）"],
      ["im","dim2 點","i + m"],
      ["in","sin1 先","i + n"],
      ["ing","sing1 星","i + ng"],
      ["on","gon1 乾","o + n"],
      ["ong","gong2 講","o + ng"],
      ["un","gun1 官","u + n"],
      ["ung","gung1 工","u + ng"],
      ["yun","syun4 船","yu + n"],
      ["eon","ceon1 春","eo + n"],
      ["oeng","soeng1 商","oe + ng"],
    ]
  },
  {
    group: "塞音韻尾 -p / -t / -k（入聲）",
    desc: "嘴巴做收尾動作但不送氣，音節短促。這是國語沒有的特色。",
    items: [
      ["aap","zaap6 集","短促 p 收尾"],
      ["aat","baat3 八","短促 t 收尾"],
      ["aak","baak3 百","短促 k 收尾"],
      ["ap","gap3 急","a + p"],
      ["at","fat3 發","a + t"],
      ["ak","sik1 色","a + k"],
      ["ip","zip3 接","i + p"],
      ["it","sit3 泄","i + t"],
      ["ik","sik1 識","i + k"],
      ["ot","got3 割","o + t"],
      ["ok","hok6 學","o + k"],
      ["ut","fut3 闊","u + t"],
      ["uk","fuk6 福","u + k"],
      ["yut","jyut6 月","yu + t"],
      ["oek","coek3 雀","oe + k"],
    ]
  },
  {
    group: "自成音節",
    items: [
      ["m","m4 唔","鼻音 m 直接當一個字"],
      ["ng","ng5 五","鼻音 ng 直接當一個字"],
    ]
  },
];

const CORE_PHRASES = [
  { cat: "招呼", items: [
    ["你好。","nei5 hou2","你好"],
    ["早晨。","zou2 san4","早安"],
    ["拜拜。","baai1 baai3","再見"],
  ]},
  { cat: "禮貌", items: [
    ["多謝。","do1 ze6","謝謝（收到東西時）"],
    ["唔該。","m4 goi1","勞駕 / 麻煩 / 謝謝（別人幫忙或服務時）"],
    ["對唔住。","deoi3 m4 zyu6","對不起"],
    ["唔緊要。","m4 gan2 jiu3","沒關係"],
  ]},
  { cat: "求助", items: [
    ["我唔明。","ngo5 m4 ming4","我不明白"],
    ["請講慢啲。","cing2 gong2 maan6 di1","請講慢一點"],
    ["請再講一次。","cing2 zoi3 gong2 jat1 ci3","請再說一次"],
    ["可唔可以幫我？","ho2 m4 ho2 ji5 bong1 ngo5","可以幫我嗎"],
  ]},
  { cat: "詢問", items: [
    ["呢個係乜嘢？","ni1 go3 hai6 mat1 je5","這是什麼"],
    ["呢個點講？","ni1 go3 dim2 gong2","這個怎麼說"],
    ["幾多錢？","gei2 do1 cin2","多少錢"],
    ["喺邊度？","hai2 bin1 dou6","在哪裡"],
  ]},
  { cat: "表達", items: [
    ["我要呢個。","ngo5 jiu3 ni1 go3","我要這個"],
    ["我想去……","ngo5 soeng2 heoi3 ...","我想去……"],
    ["我識少少。","ngo5 sik1 siu2 siu2","我懂一點點"],
    ["我學緊粵語。","ngo5 hok6 gan2 jyut6 jyu5","我正在學粵語"],
    ["可唔可以平啲？","ho2 m4 ho2 ji5 peng4 di1","可以便宜一點嗎"],
    ["我知。","ngo5 zi1","我知道"],
  ]},
];

const DIALOGS = [
  {
    level: "starter", title: "打招呼",
    lines: [
      ["A","你好。","nei5 hou2","你好"],
      ["B","你好。","nei5 hou2","你好"],
      ["A","你叫咩名？","nei5 giu3 me1 meng2","你叫什麼名字"],
      ["B","我叫阿明。你呢？","ngo5 giu3 Aa3 Ming4. nei5 ne1","我叫阿明。你呢？"],
      ["A","我叫小芳。","ngo5 giu3 Siu2 Fong1","我叫小芳"],
    ]
  },
  {
    level: "starter", title: "聽不懂",
    lines: [
      ["A","你聽唔聽得明？","nei5 teng1 m4 teng1 dak1 ming4","你聽得懂嗎"],
      ["B","我唔明。","ngo5 m4 ming4","我不明白"],
      ["B","請講慢啲。","cing2 gong2 maan6 di1","請講慢一點"],
      ["A","好，我慢慢講。","hou2, ngo5 maan6 maan6 gong2","好，我慢慢說"],
    ]
  },
  {
    level: "core", title: "茶餐廳點餐",
    lines: [
      ["A","想食乜嘢？","soeng2 sik6 mat1 je5","想吃什麼"],
      ["B","我要一個叉燒飯。","ngo5 jiu3 jat1 go3 caa1 siu1 faan6","我要一份叉燒飯"],
      ["B","再加一杯凍檸茶。","zoi3 gaa1 jat1 bui1 dung3 ning4 caa4","再加一杯冰檸茶"],
      ["A","走冰定少冰？","zau2 bing1 ding6 siu2 bing1","去冰還是少冰"],
      ["B","少冰，唔該。","siu2 bing1, m4 goi1","少冰，謝謝"],
      ["A","好，等陣。","hou2, dang2 zan6","好，稍等"],
    ]
  },
  {
    level: "core", title: "問路",
    lines: [
      ["A","唔該，港鐵站喺邊度？","m4 goi1, gong2 tit3 zaam6 hai2 bin1 dou6","請問，地鐵站在哪裡"],
      ["B","直行，再轉左。","zik6 hang4, zoi3 zyun3 zo2","直走，再左轉"],
      ["A","遠唔遠？","jyun5 m4 jyun5","遠不遠"],
      ["B","唔遠，行五分鐘就到。","m4 jyun5, haang4 ng5 fan1 zung1 zau6 dou3","不遠，走五分鐘就到"],
      ["A","多謝晒。","do1 ze6 saai3","非常感謝"],
    ]
  },
  {
    level: "core", title: "買嘢（購物）",
    lines: [
      ["A","呢件幾多錢？","ni1 gin6 gei2 do1 cin2","這件多少錢"],
      ["B","一百蚊。","jat1 baak3 man1","一百塊"],
      ["A","太貴喇，平啲得唔得？","taai3 gwai3 laa3, peng4 di1 dak1 m4 dak1","太貴了，便宜一點行不行"],
      ["B","最平八十。","zeoi3 peng4 baat3 sap6","最便宜八十"],
      ["A","好，我要。","hou2, ngo5 jiu3","好，我要了"],
    ]
  },
  {
    level: "plus", title: "搭的士（計程車）",
    lines: [
      ["A","去尖沙咀，唔該。","heoi3 Zim1 Saa1 Zeoi2, m4 goi1","去尖沙咀，謝謝"],
      ["B","行邊條路？","haang4 bin1 tiu4 lou6","走哪條路"],
      ["A","你揀，快啲就得。","nei5 gaan2, faai3 di1 zau6 dak1","你選，快一點就行"],
      ["B","知道。","zi1 dou6","知道了"],
      ["A","喺呢度落車。幾多錢？","hai2 ni1 dou6 lok6 ce1. gei2 do1 cin2","在這裡下車。多少錢"],
      ["B","五十二蚊。","ng5 sap6 ji6 man1","五十二塊"],
    ]
  },
];

const GRAMMAR = [
  {
    title: "喺 = 在",
    pattern: "主語 + 喺 + 地點",
    examples: [
      ["我喺屋企。","ngo5 hai2 uk1 kei2","我在家"],
      ["洗手間喺邊度？","sai2 sau2 gaan1 hai2 bin1 dou6","洗手間在哪裡"],
    ]
  },
  {
    title: "係 = 是",
    pattern: "A + 係 + B",
    examples: [
      ["我係學生。","ngo5 hai6 hok6 saang1","我是學生"],
      ["呢個唔係我嘅。","ni1 go3 m4 hai6 ngo5 ge3","這不是我的"],
    ]
  },
  {
    title: "有 / 冇 = 有 / 沒有",
    pattern: "有冇 + 名詞 / 動作",
    examples: [
      ["呢度有冇位？","ni1 dou6 jau5 mou5 wai2","這裡有沒有位子"],
      ["你有冇時間？","nei5 jau5 mou5 si4 gaan3","你有沒有時間"],
    ]
  },
  {
    title: "A-唔-A 問句",
    pattern: "動詞 + 唔 + 動詞",
    examples: [
      ["你識唔識講粵語？","nei5 sik1 m4 sik1 gong2 jyut6 jyu5","你會不會說粵語"],
      ["去唔去？","heoi3 m4 heoi3","去不去"],
      ["得唔得？","dak1 m4 dak1","行不行"],
    ]
  },
  {
    title: "緊 = 正在（進行中）",
    pattern: "動詞 + 緊",
    examples: [
      ["我食緊飯。","ngo5 sik6 gan2 faan6","我正在吃飯"],
      ["佢做緊功課。","keoi5 zou6 gan2 gung1 fo3","他正在做功課"],
    ]
  },
  {
    title: "咗 = 了（已完成）",
    pattern: "動詞 + 咗",
    examples: [
      ["我買咗。","ngo5 maai5 zo2","我買了"],
      ["佢返咗屋企。","keoi5 faan1 zo2 uk1 kei2","他回家了"],
    ]
  },
  {
    title: "過 = 曾經（經驗）",
    pattern: "動詞 + 過",
    examples: [
      ["我去過香港。","ngo5 heoi3 gwo3 Hoeng1 Gong2","我去過香港"],
      ["你食過未？","nei5 sik6 gwo3 mei6","你吃過了沒"],
    ]
  },
  {
    title: "嘅 = 的",
    pattern: "名詞 / 代詞 + 嘅 + 名詞",
    examples: [
      ["我嘅電話。","ngo5 ge3 din6 waa2","我的電話"],
      ["呢個係邊個嘅？","ni1 go3 hai6 bin1 go3 ge3","這是誰的"],
    ]
  },
];

const PARTICLES = [
  { word: "呀", jyutping: "aa3", usage: "句尾柔化，讓語氣更自然、不生硬",
    ex: [["你好呀。","nei5 hou2 aa3","比「你好。」自然"],["幾好呀。","gei2 hou2 aa3","挺好的"]]},
  { word: "啦", jyutping: "laa1", usage: "表示「就是這樣」、催促、建議",
    ex: [["走啦。","zau2 laa1","走吧"],["好啦好啦。","hou2 laa1 hou2 laa1","好了好了"]]},
  { word: "喎", jyutping: "wo3", usage: "表示驚訝、提醒對方注意",
    ex: [["好靚喎。","hou2 leng3 wo3","好漂亮耶"],["落雨喎。","lok6 jyu5 wo3","下雨了耶"]]},
  { word: "囉", jyutping: "lo1", usage: "表示理所當然",
    ex: [["係囉。","hai6 lo1","就是嘛"],["咁就去囉。","gam2 zau6 heoi3 lo1","那就去囉"]]},
  { word: "㗎", jyutping: "gaa3", usage: "加強語氣、確認事實",
    ex: [["係㗎。","hai6 gaa3","是的（確定語氣）"],["佢好叻㗎。","keoi5 hou2 lek1 gaa3","他很厲害的"]]},
  { word: "咩", jyutping: "me1", usage: "表示疑問「嗎」，帶輕微意外",
    ex: [["係咩？","hai6 me1","是嗎？"],["你識咩？","nei5 sik1 me1","你懂嗎？"]]},
  { word: "嘞", jyutping: "laak3", usage: "表示變化、完成（＝「了」）",
    ex: [["夠嘞。","gau3 laak3","夠了"],["知道嘞。","zi1 dou6 laak3","知道了"]]},
];

const NUMBERS = [
  ["〇","零","ling4"],["一","壹","jat1"],["二","貳","ji6"],["三","參","saam1"],
  ["四","肆","sei3"],["五","伍","ng5"],["六","陸","luk6"],["七","柒","cat1"],
  ["八","捌","baat3"],["九","玖","gau2"],["十","拾","sap6"],
  ["百","佰","baak3"],["千","仟","cin1"],["萬","萬","maan6"],
];

const CLASSIFIERS = [
  ["個","go3","最常用，通用量詞","一個人 jat1 go3 jan4"],
  ["杯","bui1","杯裝飲料","一杯茶 jat1 bui1 caa4"],
  ["件","gin6","衣服、事情","一件衫 jat1 gin6 saam1"],
  ["隻","zek3","動物、手、腳","一隻狗 jat1 zek3 gau2"],
  ["架","gaa3","車輛、飛機","一架車 jat1 gaa3 ce1"],
  ["間","gaan1","房間、店鋪","一間舖 jat1 gaan1 pou3"],
  ["張","zoeng1","紙、桌子、椅子","一張紙 jat1 zoeng1 zi2"],
  ["碟","dip2","一碟（一盤）","一碟炒飯 jat1 dip2 caau2 faan6"],
  ["條","tiu4","路、河、長形物","一條路 jat1 tiu4 lou6"],
  ["本","bun2","書","一本書 jat1 bun2 syu1"],
];

const MISTAKES = [
  { err: "把 z / c / s 念成 zh / ch / sh", fix: "粵語完全沒有捲舌音。z = ts，c = tsh，s = s。", icon: "mic" },
  { err: "把 b / d / g 念成英語濁音", fix: "重點在不送氣，但聲帶不需要振動。和英語 b / d / g 不同。", icon: "volume" },
  { err: "第 3 聲和第 6 聲分不清", fix: "3 是中平（33），6 是低平（22）。差一個音階。刻意壓低就是第 6 聲。", icon: "volume" },
  { err: "不管量詞，直接說數字加名詞", fix: "粵語量詞非常頻繁：一個人、一杯茶、一件衫。不能省略。", icon: "list" },
  { err: "直接用書面中文來說話", fix: "口語和書面差異大。你在哪裡 → 你喺邊度。沒有 → 冇。", icon: "book" },
  { err: "句尾完全沒有語氣詞", fix: "自然的粵語句子幾乎都有語氣詞：呀、啦、喎、囉。完全不加會聽起來很僵硬。", icon: "sparkle" },
  { err: "入聲韻尾 -p / -t / -k 漏掉", fix: "這些收尾音嘴巴要做動作但不發聲。「學 hok6」結尾嘴巴要有 k 的姿勢。", icon: "alert" },
  { err: "ng- 字首鼻音吃掉不發", fix: "「牙 ngaa4」「我 ngo5」的 ng 不能省。先練習哼鼻音再接元音。", icon: "mic" },
];

const DRILLS = [
  { title: "聲調跟讀", icon: "volume", items: [
    "si1 si2 si3 si4 si5 si6 — 連續唸，注意音高差異",
    "maa1 maa2 maa3 maa4 maa5 maa6 — 同上",
    "go1 go2 go3 go4 go5 go6 — 每個字停一拍再接下一個",
    "fu1 fu2 fu3 fu4 fu5 fu6 — 錄音比對自己的音高",
  ]},
  { title: "送氣 vs 不送氣", icon: "mic", items: [
    "baa1 / paa3 — 手放嘴前，感受 p 的氣流",
    "daa2 / taa1 — 同上",
    "gaa1 / kaa1 — 同上",
    "zaa1 / caa1 — 注意 c 有強氣流，z 沒有",
  ]},
  { title: "入聲練習", icon: "keyboard", items: [
    "sap6（十）、baat3（八）、luk6（六）— 體會短促收尾",
    "sik1（識）、hok6（學）、jyut6（月）— k 和 t 收尾的差別",
    "zip3（接）、gap3（急）— p 收尾嘴唇要合起來",
  ]},
  { title: "句型替換練習", icon: "keyboard", items: [
    "我喺 ___。（屋企 / 公司 / 學校 / 港鐵站）",
    "我要一 ___。（杯茶 / 個叉燒飯 / 碟炒飯）",
    "有冇 ___？（位 / 時間 / 紙巾 / Wi-Fi）",
    "可唔可以 ___？（幫我 / 平啲 / 講慢啲）",
    "我 ___ 緊。（食飯 / 做嘢 / 學粵語 / 等人）",
  ]},
];

const CHEATSHEET = [
  { cat: "人稱", items: [["我","ngo5","我"],["你","nei5","你"],["佢","keoi5","他/她"],["我哋","ngo5 dei6","我們"],["你哋","nei5 dei6","你們"],["佢哋","keoi5 dei6","他們"]]},
  { cat: "指示", items: [["呢個","ni1 go3","這個"],["嗰個","go2 go3","那個"],["呢度","ni1 dou6","這裡"],["嗰度","go2 dou6","那裡"],["邊個","bin1 go3","誰"],["邊度","bin1 dou6","哪裡"]]},
  { cat: "核心動詞", items: [["喺","hai2","在"],["係","hai6","是"],["有","jau5","有"],["冇","mou5","沒有"],["去","heoi3","去"],["嚟","lai4","來"],["食","sik6","吃"],["飲","jam2","喝"],["睇","tai2","看"],["聽","teng1","聽"],["講","gong2","說"],["做","zou6","做"],["買","maai5","買"],["識","sik1","會/認識"]]},
  { cat: "時間", items: [["而家","ji4 gaa1","現在"],["今日","gam1 jat6","今天"],["聽日","ting1 jat6","明天"],["尋日","cam4 jat6","昨天"],["琴晚","kam4 maan5","昨晚"],["朝早","ziu1 zou2","早上"],["晏晝","aan3 zau3","下午"],["夜晚","je6 maan5","晚上"]]},
  { cat: "常用形容詞", items: [["好","hou2","好"],["靚","leng3","漂亮/好看"],["大","daai6","大"],["細","sai3","小"],["多","do1","多"],["少","siu2","少"],["快","faai3","快"],["慢","maan6","慢"],["貴","gwai3","貴"],["平","peng4","便宜"]]},
  { cat: "常用副詞 / 連接", items: [["好","hou2","很（好靚＝很漂亮）"],["都","dou1","也"],["仲","zung6","還"],["先","sin1","先"],["再","zoi3","再"],["同","tung4","和/跟"],["定","ding6","還是（A 定 B？）"],["因為","jan1 wai6","因為"],["所以","so2 ji5","所以"]]},
];

/* ═══════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════ */
function Icon({ name, className = "h-5 w-5" }) {
  const paths = ICON_PATHS[name] || ICON_PATHS.book;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function SectionHeader({ id, icon, title, subtitle }) {
  return (
    <section id={id} className="scroll-mt-20 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Icon name={icon} className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border border-stone-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function CardHeader({ title, subtitle }) {
  return (
    <div className="border-b border-stone-100 px-5 py-4">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

function Collapse({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-bold text-slate-900 hover:bg-stone-50 transition">
        <span>{title}</span>
        <Icon name={open ? "chevDown" : "chevRight"} className="h-4 w-4 text-slate-400 shrink-0" />
      </button>
      {open && <div className="border-t border-stone-100">{children}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TONE CONTOUR SVG DIAGRAM
   ═══════════════════════════════════════════ */
function ToneContourDiagram({ activeTone }) {
  const W = 500, H = 280;
  const pad = { t: 30, r: 24, b: 46, l: 48 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;
  const py = (lv) => pad.t + cH - ((lv - 1) / 4) * cH;
  const labels = ["低","","中","","高"];
  // Stagger each tone into its own horizontal lane to avoid overlap
  const laneW = cW / 6;
  const toneLayout = [
    { tone: 1, col: 0 }, { tone: 2, col: 1 }, { tone: 3, col: 2 },
    { tone: 4, col: 3 }, { tone: 5, col: 4 }, { tone: 6, col: 5 },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: 540 }}>
      <defs>
        {TONES.map(t => (
          <linearGradient key={`g${t.tone}`} id={`tg${t.tone}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={TONE_COLORS[t.tone].hex} stopOpacity="0.55" />
            <stop offset="100%" stopColor={TONE_COLORS[t.tone].hex} stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>
      {/* grid lines */}
      {[1,2,3,4,5].map((lv,i) => (
        <g key={lv}>
          <line x1={pad.l} y1={py(lv)} x2={pad.l + cW} y2={py(lv)}
            stroke="#e7e5e4" strokeWidth="1" strokeDasharray={lv%2===0?"4 4":"0"} />
          <text x={pad.l - 10} y={py(lv) + 4} textAnchor="end" fontSize="11" fill="#a8a29e"
            style={{ fontFamily: "system-ui, sans-serif" }}>{labels[i]}</text>
        </g>
      ))}
      <text x={pad.l + cW/2} y={H - 6} textAnchor="middle" fontSize="11" fill="#a8a29e"
        style={{ fontFamily: "system-ui, sans-serif" }}>時間 →</text>
      {/* tone lines — each tone in its own column */}
      {toneLayout.map(({ tone, col }) => {
        const t = TONES[tone - 1];
        const x1 = pad.l + col * laneW + laneW * 0.15;
        const x2 = pad.l + col * laneW + laneW * 0.85;
        const y1 = py(t.start);
        const y2 = py(t.end);
        const mx = (x1 + x2) / 2;
        const isActive = activeTone === t.tone;
        const opacity = activeTone == null ? 1 : isActive ? 1 : 0.15;
        return (
          <g key={t.tone} style={{ transition: "opacity 0.3s", opacity }}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={`url(#tg${t.tone})`} strokeWidth={isActive ? 4.5 : 3}
              strokeLinecap="round" />
            <circle cx={x1} cy={y1} r={isActive ? 4.5 : 3} fill={TONE_COLORS[t.tone].hex} />
            <circle cx={x2} cy={y2} r={isActive ? 4.5 : 3} fill={TONE_COLORS[t.tone].hex} />
            {/* label below each lane */}
            <text x={mx} y={py(1) + 24} textAnchor="middle" fontSize="11" fontWeight="700"
              fill={TONE_COLORS[t.tone].hex} style={{ fontFamily: "system-ui, sans-serif" }}>
              T{t.tone} {t.contour}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function CantoneseGuide() {
  const [level, setLevel] = useState("all");
  const [query, setQuery] = useState("");
  const [activeTone, setActiveTone] = useState(null);
  const [phraseTab, setPhraseTab] = useState(0);

  const filteredDialogs = useMemo(() => {
    const kw = query.trim().toLowerCase();
    return DIALOGS.filter(d => {
      const lvOk = level === "all" || d.level === level;
      const txt = `${d.title} ${d.lines.map(l => l.join(" ")).join(" ")}`.toLowerCase();
      return lvOk && (!kw || txt.includes(kw));
    });
  }, [level, query]);

  const phraseCats = CORE_PHRASES.map(c => c.cat);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800" style={{ fontFamily: "'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', system-ui, sans-serif" }}>
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">

          {/* ─── MAIN COLUMN ─── */}
          <main className="space-y-5">

            {/* ══ HERO ══ */}
            <section className="overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-emerald-50/60 shadow-sm">
              <div className="border-b border-stone-200 px-5 py-3 sm:px-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    <Icon name="volume" className="h-3.5 w-3.5" /> 國語背景學習者版本
                  </span>
                  <span className="inline-flex rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                    粵拼 Jyutping
                  </span>
                </div>
              </div>
              <div className="px-5 py-7 sm:px-6 sm:py-8">
                <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_340px]">
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl leading-tight">
                      粵語教學<br />
                      <span className="text-emerald-700">先學發音，再學會話</span>
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                      這份教材專為國語背景的學習者設計。所有解釋都以國語為參照，讓你用最熟悉的方式理解粵語發音、句型和用語的差異。先把最核心的內容學會，再慢慢加深。
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {[{k:"all",l:"全部"},{k:"starter",l:"基礎"},{k:"core",l:"常用"},{k:"plus",l:"加強"}].map(f => (
                        <button key={f.k} onClick={() => setLevel(f.k)}
                          className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${level===f.k ? "border-emerald-600 bg-emerald-600 text-white" : "border-stone-300 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-700"}`}>
                          {f.l}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div id="start" className="rounded-xl border border-stone-200 bg-white/90 p-4 shadow-sm backdrop-blur">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                        <Icon name="zap" className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">第一次看只做這些</h3>
                        <p className="text-xs text-slate-500">照順序走，最快進入狀況。</p>
                      </div>
                    </div>
                    <ol className="mt-3 space-y-2 text-sm text-slate-700">
                      {QUICK_START.map((s, i) => (
                        <li key={i} className="rounded-lg bg-stone-50 px-3 py-2 leading-relaxed">
                          <span className="mr-1.5 font-bold text-emerald-700">{i + 1}.</span>{s}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            {/* ══ TONES ══ */}
            <SectionHeader id="tones" icon="volume" title="聲調：粵語的靈魂" subtitle="粵語有 6 個聲調，念錯聲調意思就完全不同。先把音高差異聽出來、念出來。" />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
              <Card>
                <CardHeader title="聲調圖：一次看懂 6 聲" subtitle="點選任一聲調可以單獨高亮顯示。再點一次恢復全部。" />
                <div className="p-4 sm:p-5">
                  <ToneContourDiagram activeTone={activeTone} />
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {TONES.map(t => {
                      const c = TONE_COLORS[t.tone];
                      const isOn = activeTone === t.tone;
                      return (
                        <button key={t.tone} onClick={() => setActiveTone(isOn ? null : t.tone)}
                          className={`rounded-lg border p-2 text-center text-xs font-semibold transition ${isOn ? `${c.border} ${c.bg} ${c.text}` : "border-stone-200 bg-stone-50 text-slate-600 hover:border-stone-300"}`}>
                          <div className="text-base font-extrabold">T{t.tone}</div>
                          <div className="mt-0.5">{t.contour} {t.label}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader title="si 六聲跟讀" />
                  <div className="p-4 space-y-2">
                    {TONES.map(t => {
                      const c = TONE_COLORS[t.tone];
                      return (
                        <div key={t.tone} className={`rounded-lg border px-3 py-2.5 ${c.border} ${c.bg}`}>
                          <div className={`font-mono text-base font-bold ${c.text}`}>{t.example}</div>
                          <div className="mt-0.5 text-xs text-slate-600">{t.tip}</div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>

            <Collapse title="易混淆聲調對比" defaultOpen={false}>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {TONE_MINIMAL_PAIRS.map(p => (
                  <div key={p.pair} className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                    <div className="font-bold text-slate-900 text-sm">{p.pair}</div>
                    <div className="mt-2 space-y-1 text-sm text-slate-700">
                      <div>{p.a}</div>
                      <div>{p.b}</div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">{p.tip}</p>
                  </div>
                ))}
              </div>
            </Collapse>

            {/* ══ INITIALS ══ */}
            <SectionHeader id="initials" icon="layers" title="聲母：20 個子音" subtitle="按發音部位分組。國語背景最常卡在送氣 vs 不送氣，以及 z/c/s 不是捲舌音。" />

            <div className="space-y-4">
              {INITIAL_GROUPS.map(g => (
                <Card key={g.group}>
                  <div className="border-b border-stone-100 px-5 py-3 flex items-baseline gap-3">
                    <h3 className="font-bold text-slate-900">{g.group}</h3>
                    <span className="text-xs text-slate-500">{g.desc}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-stone-50 text-slate-500">
                        <tr>
                          <th className="px-5 py-2.5 text-left font-semibold w-16">聲母</th>
                          <th className="px-5 py-2.5 text-left font-semibold w-24">類型</th>
                          <th className="px-5 py-2.5 text-left font-semibold">例子</th>
                          <th className="px-5 py-2.5 text-left font-semibold">提醒</th>
                        </tr>
                      </thead>
                      <tbody>
                        {g.items.map(r => (
                          <tr key={r[0]} className="border-t border-stone-100">
                            <td className="px-5 py-3 font-mono font-bold text-emerald-700 text-base">{r[0]}</td>
                            <td className="px-5 py-3 text-slate-600">{r[1]}</td>
                            <td className="px-5 py-3 text-slate-800">{r[2]}</td>
                            <td className="px-5 py-3 text-slate-500 text-xs">{r[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>

            {/* ══ FINALS ══ */}
            <SectionHeader id="finals" icon="grid" title="韻母：粵語的元音與韻尾" subtitle="粵語韻母比國語豐富很多，特別是 -p / -t / -k 入聲韻尾是國語完全沒有的。" />

            {FINAL_GROUPS.map(g => (
              <Collapse key={g.group} title={`${g.group}（${g.items.length}）`} defaultOpen={g.group === "單元音"}>
                {g.desc && <p className="px-5 pt-3 text-sm text-slate-500">{g.desc}</p>}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-stone-50 text-slate-500">
                      <tr>
                        <th className="px-5 py-2.5 text-left font-semibold w-20">韻母</th>
                        <th className="px-5 py-2.5 text-left font-semibold">例子</th>
                        <th className="px-5 py-2.5 text-left font-semibold">說明</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.items.map(r => (
                        <tr key={r[0]} className="border-t border-stone-100">
                          <td className="px-5 py-3 font-mono font-bold text-emerald-700">{r[0]}</td>
                          <td className="px-5 py-3 text-slate-800">{r[1]}</td>
                          <td className="px-5 py-3 text-slate-500 text-xs">{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Collapse>
            ))}

            {/* ══ PHRASES ══ */}
            <SectionHeader id="phrases" icon="book" title="基礎句：先背這些" subtitle="有了句子才有實戰。按情境分類，直接拿去用。" />

            <Card>
              <div className="border-b border-stone-100 px-5 py-3 flex flex-wrap gap-2">
                {phraseCats.map((cat, i) => (
                  <button key={cat} onClick={() => setPhraseTab(i)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${phraseTab === i ? "bg-emerald-600 text-white" : "bg-stone-100 text-slate-600 hover:bg-stone-200"}`}>
                    {cat}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-stone-50 text-slate-500">
                    <tr>
                      <th className="px-5 py-2.5 text-left font-semibold">粵語</th>
                      <th className="px-5 py-2.5 text-left font-semibold">粵拼</th>
                      <th className="px-5 py-2.5 text-left font-semibold">國語意思</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CORE_PHRASES[phraseTab].items.map(r => (
                      <tr key={r[0]} className="border-t border-stone-100">
                        <td className="px-5 py-3 font-semibold text-slate-900">{r[0]}</td>
                        <td className="px-5 py-3 font-mono text-[13px] text-emerald-700">{r[1]}</td>
                        <td className="px-5 py-3 text-slate-500">{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* ══ DIALOGS ══ */}
            <SectionHeader id="dialogs" icon="chat" title="基礎會話" subtitle="真實場景，先整組背，再替換成自己的內容。" />

            <Card className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-slate-500">輸入關鍵字搜尋：點餐、問路、名字……</p>
                <div className="relative w-full max-w-sm">
                  <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜尋會話"
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:bg-white transition" />
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              {filteredDialogs.length === 0 && (
                <p className="py-8 text-center text-sm text-slate-400">沒有找到符合的會話。</p>
              )}
              {filteredDialogs.map(d => (
                <Card key={d.title}>
                  <div className="border-b border-stone-100 px-5 py-3 flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{d.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${d.level==="starter"?"bg-emerald-100 text-emerald-700":d.level==="core"?"bg-amber-100 text-amber-700":"bg-violet-100 text-violet-700"}`}>
                      {d.level==="starter"?"基礎":d.level==="core"?"常用":"加強"}
                    </span>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {d.lines.map((l, i) => (
                      <div key={i} className={`grid grid-cols-[40px_1fr] gap-0 ${l[0]==="A"?"bg-white":"bg-stone-50"}`}>
                        <div className={`flex items-center justify-center text-xs font-bold py-3 ${l[0]==="A"?"text-emerald-600":"text-sky-600"}`}>{l[0]}</div>
                        <div className="px-4 py-3">
                          <div className="font-semibold text-slate-900 text-sm">{l[1]}</div>
                          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-xs">
                            <span className="font-mono text-emerald-600 break-all">{l[2]}</span>
                            <span className="text-slate-400">{l[3]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* ══ GRAMMAR ══ */}
            <SectionHeader id="grammar" icon="layers" title="核心語法" subtitle="先學這幾個結構，就能組出大部分日常句子。" />

            <div className="space-y-4">
              {GRAMMAR.map(g => (
                <Card key={g.title} className="p-5">
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{g.title}</h3>
                    <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-mono font-bold text-emerald-700">{g.pattern}</span>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-stone-200">
                    <table className="min-w-full text-sm">
                      <tbody>
                        {g.examples.map(r => (
                          <tr key={r[0]} className="border-t border-stone-100 first:border-t-0">
                            <td className="px-4 py-3 font-semibold text-slate-900">{r[0]}</td>
                            <td className="px-4 py-3 font-mono text-[13px] text-emerald-700">{r[1]}</td>
                            <td className="px-4 py-3 text-slate-500 text-xs">{r[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </div>

            {/* ══ PARTICLES ══ */}
            <SectionHeader id="particles" icon="sparkle" title="語氣詞：讓你的粵語活起來" subtitle="粵語幾乎每句話都會加語氣詞。不加的話聽起來像在念書面文。" />

            <div className="grid gap-4 sm:grid-cols-2">
              {PARTICLES.map(p => (
                <Card key={p.word} className="p-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-emerald-700">{p.word}</span>
                    <span className="font-mono text-xs text-slate-500">{p.jyutping}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{p.usage}</p>
                  <div className="mt-3 space-y-1.5">
                    {p.ex.map(e => (
                      <div key={e[0]} className="rounded-lg bg-stone-50 px-3 py-2 text-sm">
                        <span className="font-semibold text-slate-800">{e[0]}</span>
                        <span className="ml-2 font-mono text-xs text-emerald-600">{e[1]}</span>
                        <div className="text-xs text-slate-400 mt-0.5">{e[2]}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* ══ NUMBERS & CLASSIFIERS ══ */}
            <SectionHeader id="numbers" icon="hash" title="數字與量詞" subtitle="數字天天用。量詞則是粵語不能省略的基本功。" />

            <div className="grid gap-5 xl:grid-cols-2">
              <Card>
                <CardHeader title="數字" subtitle="0～10 先背熟，百千萬照規律接。" />
                <div className="p-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {NUMBERS.map((n, i) => (
                    <div key={i} className="rounded-lg bg-stone-50 px-3 py-3 text-center">
                      <div className="text-lg font-extrabold text-slate-900">{n[0]}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{n[1]}</div>
                      <div className="font-mono text-xs text-emerald-700 mt-0.5">{n[2]}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <CardHeader title="常用量詞" subtitle="粵語量詞不能省，和國語有些不一樣。" />
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-stone-50 text-slate-500">
                      <tr>
                        <th className="px-4 py-2.5 text-left font-semibold">量詞</th>
                        <th className="px-4 py-2.5 text-left font-semibold">用途</th>
                        <th className="px-4 py-2.5 text-left font-semibold">例句</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CLASSIFIERS.map(c => (
                        <tr key={c[0]} className="border-t border-stone-100">
                          <td className="px-4 py-3 font-bold text-emerald-700">
                            {c[0]} <span className="font-mono text-xs font-normal text-slate-400">{c[1]}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-600 text-xs">{c[2]}</td>
                          <td className="px-4 py-3 text-slate-800 text-xs">{c[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* ══ MISTAKES ══ */}
            <SectionHeader id="mistakes" icon="alert" title="常見錯誤" subtitle="很多人不是不努力，而是一直在練錯的東西。先避開這些。" />

            <div className="grid gap-4 sm:grid-cols-2">
              {MISTAKES.map(m => (
                <Card key={m.err} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <Icon name={m.icon} className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-relaxed">{m.err}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{m.fix}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* ══ DRILLS ══ */}
            <SectionHeader id="drills" icon="keyboard" title="練習" subtitle="不要只看。跟讀、對讀、替換，這樣才會真的記住。" />

            <div className="grid gap-4 xl:grid-cols-2">
              {DRILLS.map(d => (
                <Card key={d.title} className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                      <Icon name={d.icon} className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-slate-900">{d.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {d.items.map(line => (
                      <li key={line} className="flex items-start gap-2 rounded-lg bg-stone-50 px-3 py-2.5 text-sm leading-relaxed text-slate-700">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            {/* ══ CHEATSHEET ══ */}
            <SectionHeader id="cheatsheet" icon="grid" title="速查表" subtitle="分類整理的高頻詞，供隨時回來查閱。" />

            <div className="space-y-4">
              {CHEATSHEET.map(cat => (
                <Collapse key={cat.cat} title={`${cat.cat}（${cat.items.length} 詞）`} defaultOpen={cat.cat === "核心動詞" || cat.cat === "人稱"}>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <tbody>
                        {cat.items.map(r => (
                          <tr key={r[0]+r[1]} className="border-t border-stone-100">
                            <td className="px-5 py-2.5 font-semibold text-slate-900 w-20">{r[0]}</td>
                            <td className="px-5 py-2.5 font-mono text-xs text-emerald-700 w-28">{r[1]}</td>
                            <td className="px-5 py-2.5 text-slate-500 text-xs">{r[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Collapse>
              ))}
            </div>

            {/* ── Footer ── */}
            <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center text-xs text-slate-400 shadow-sm">
              粵語教學<br />
              © 2026 EugeneYip.com All Rights Reserved.
            </div>

          </main>

          {/* ─── SIDEBAR NAV ─── */}
          <aside className="hidden lg:block">
            <div className="sticky top-5 space-y-4">
              <Card className="p-4">
                <h3 className="font-bold text-slate-900 text-sm">頁面導航</h3>
                <nav className="mt-3 space-y-1">
                  {NAV_ITEMS.map(n => (
                    <a key={n[0]} href={`#${n[0]}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700">
                      <Icon name={n[1]} className="h-3.5 w-3.5 shrink-0" />
                      <span>{n[2]}</span>
                    </a>
                  ))}
                </nav>
              </Card>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
                <h3 className="font-bold text-emerald-900 text-sm">生存句</h3>
                <div className="mt-2 space-y-1.5 text-sm text-emerald-900">
                  {["你好","唔該","我唔明","請講慢啲","喺邊度","幾多錢"].map(s => (
                    <div key={s} className="rounded-lg bg-white/70 px-3 py-1.5">{s}</div>
                  ))}
                </div>
              </div>
              <Card className="p-4">
                <h3 className="font-bold text-slate-900 text-sm">聲調顏色對照</h3>
                <div className="mt-2 space-y-1">
                  {TONES.map(t => {
                    const c = TONE_COLORS[t.tone];
                    return (
                      <div key={t.tone} className="flex items-center gap-2 text-xs">
                        <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
                        <span className="font-bold">T{t.tone}</span>
                        <span className="text-slate-500">{t.contour} {t.label}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

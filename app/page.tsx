"use client";
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, User, Mail, Sparkles, ArrowRight, ArrowUpRight,
  ChevronDown, ChevronUp, Image as ImageIcon, BarChart2, TrendingUp,
  MapPin, Monitor, Target, Video, ShoppingBag, Cpu, PieChart, Filter, Layers, FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

export default function PortfolioPage() {
  // === SPLASH SCREEN STATES ===
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "PORTFOLIO";

  // === INTERACTIVE STATES ===
  const [openExp, setOpenExp] = useState<number | null>(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [openKPI, setOpenKPI] = useState(false);
  const [openGallery2, setOpenGallery2] = useState(false);
  const [openKPI2, setOpenKPI2] = useState(false);
  const [openGallery3, setOpenGallery3] = useState(true);
  const [openKPI3, setOpenKPI3] = useState(false);
  const [openGallery4, setOpenGallery4] = useState(false);
  const [openKPI4, setOpenKPI4] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 90);

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1300);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // === HERO TYPEWRITER LOOP STATES ===
  const heroPhrases = [
    { line1: "FACEBOOK", line2: "ADS." },
    { line1: "ADS", line2: "CHUYỂN ĐỔI." },
    { line1: "MARKETING", line2: "ADS." },
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isLoading && !isFadingOut) return; // Đợi màn hình chờ mở ra mới bắt đầu gõ

    const currentPhrase = heroPhrases[phraseIdx];
    const totalLength = currentPhrase.line1.length + currentPhrase.line2.length;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIdx < totalLength) {
          setCharIdx((prev) => prev + 1);
        } else {
          // Gõ xong -> dừng lại 1.5s cho người xem đọc rồi mới xoá
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((prev) => prev - 1);
        } else {
          // Xoá xong -> chuyển sang cụm từ tiếp theo
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % heroPhrases.length);
        }
      }
    }, isDeleting ? 45 : 85); // Tốc độ gõ 85ms, tốc độ xoá 45ms

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx, isLoading, isFadingOut]);

  const currentHero = heroPhrases[phraseIdx];
  const typedLine1 = currentHero.line1.slice(0, Math.min(charIdx, currentHero.line1.length));
  const typedLine2 = charIdx > currentHero.line1.length 
    ? currentHero.line2.slice(0, charIdx - currentHero.line1.length) 
    : "";

  const mainSkills = [
    {
      num: "01",
      name: "Meta / Facebook Ads",
      desc: "Tối ưu quảng cáo theo mục tiêu chuyển đổi.",
      icon: Target
    },
    {
      num: "02",
      name: "TikTok Ads & TikTok Shop",
      desc: "Quảng cáo TikTok, giỏ hàng & livestream.",
      icon: Video
    },
    {
      num: "03",
      name: "Shopee Ads / Sàn TMĐT",
      desc: "Quảng cáo nội sàn, tối ưu ROAS gian hàng.",
      icon: ShoppingBag
    },
    {
      num: "04",
      name: "Pixel & Conversions API",
      desc: "Setup tracking & đo lường sự kiện chuẩn.",
      icon: Cpu
    },
    {
      num: "05",
      name: "Phân tích & Tối ưu KPI",
      desc: "Đọc CPL • CTR • ROAS, cắt lỗ & scale.",
      icon: TrendingUp
    },
    {
      num: "06",
      name: "Phễu & Retargeting",
      desc: "Dựng phễu TOFU • MOFU • BOFU.",
      icon: Filter
    },
    {
      num: "07",
      name: "Test Creative & Video",
      desc: "Canva • CapCut, A/B test mẫu quảng cáo.",
      icon: Layers
    },
    {
      num: "08",
      name: "Báo cáo & Đo lường",
      desc: "GA4 • Sheets • Excel, báo cáo theo tuần.",
      icon: BarChart2
    }
  ];

  const subSkills = [
    "AI hỗ trợ công việc",
    "Làm việc đội nhóm",
    "Giao tiếp & Trình bày",
    "Quản lý thời gian & KPI",
    "Giải quyết vấn đề",
    "Chủ động học hỏi"
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-zinc-900 selection:bg-lime-400 selection:text-zinc-900 font-sans relative overflow-x-hidden">
      
      {/* ================= HIỆU ỨNG MỞ ĐẦU (SPLASH SCREEN) ================= */}
      {isLoading && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-400/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
              Marketing Ads Specialist
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-widest text-white mb-3 flex items-center">
              {typedText}
              <span className="w-2 h-10 md:h-16 bg-lime-400 ml-2 animate-pulse"></span>
            </h1>
            <div className={`h-0.5 bg-linear-to-r from-lime-400 to-emerald-400 mt-2 transition-all duration-700 ease-out ${typedText === fullText ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}></div>
          </div>
        </div>
      )}

      {/* ================= BACKGROUND GLOW DECORATIONS ================= */}
      <div className="fixed top-0 right-0 w-125 h-125 bg-lime-300/35 blur-3xl rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4 z-0"></div>
      <div className="fixed bottom-1/3 left-0 w-96 h-96 bg-lime-300/20 blur-3xl rounded-full pointer-events-none -translate-x-1/3 z-0"></div>

      {/* ================= TOP HEADER ================= */}
      <header className="relative z-20 max-w-5xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-lime-400 text-zinc-950 font-black text-sm flex items-center justify-center shadow-xs">
            T
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-800">
            MARKETING ADS SPECIALIST
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <span>2026 PORTFOLIO</span>
          <span className="w-2 h-2 rounded-full bg-lime-500"></span>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
          
          {/* CỘT TRÁI: TEXT & INFO PILLS */}
          <div className="md:col-span-7 flex flex-col items-start">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 min-h-28 sm:min-h-32 md:min-h-36 flex flex-col justify-center">
              {/* Dòng 1: Màu Đen */}
              <span className="block text-zinc-900">
                {typedLine1}
                {charIdx <= currentHero.line1.length && (
                  <span className="inline-block w-1.5 h-10 sm:h-12 md:h-14 bg-lime-500 ml-1 align-middle animate-pulse" />
                )}
              </span>

              {/* Dòng 2: Màu Xanh Lime */}
              <span className="block text-lime-500 mt-1">
                {typedLine2}
                {charIdx > currentHero.line1.length && (
                  <span className="inline-block w-1.5 h-10 sm:h-12 md:h-14 bg-zinc-900 ml-1 align-middle animate-pulse" />
                )}
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-zinc-800 max-w-md leading-relaxed mb-8">
              TÔI LÀ TRUNG TIẾN — CHUYÊN VIÊN MARKETING ADS, GIÚP DOANH NGHIỆP RA CHUYỂN ĐỔI &amp; DOANH THU THẬT.
            </p>

            {/* 2 Info Pills */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-xl px-4 py-3 flex items-center gap-3 shadow-xs">
                <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-zinc-700 shrink-0">
                  <MapPin size={12} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Làm việc</div>
                  <div className="text-xs font-extrabold uppercase text-zinc-900">Hồ Chí Minh</div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-xl px-4 py-3 flex items-center gap-3 shadow-xs">
                <div className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-zinc-700 shrink-0">
                  <Monitor size={12} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">HÌNH THỨC</div>
                  <div className="text-xs font-extrabold uppercase text-zinc-900">ONLINE / ONSITE</div>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: PORTRAIT IMAGE & FLOATING BADGE */}
          <div className="md:col-span-5 relative flex justify-center md:justify-end">
            {/* Decorative radar circles behind portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 rounded-full border border-lime-500/25 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-88 h-88 md:w-96 md:h-96 rounded-full border border-lime-500/15 pointer-events-none"></div>

            {/* Khung ảnh trong suốt (Xoá phông) & Giữ màu gốc */}
            <div className="relative w-64 sm:w-72 md:w-80 aspect-4/5 rounded-b-2xl overflow-hidden z-10 flex items-end justify-center">
              <img 
                src="/maincv-s.png" 
                alt="Trung Tiến" 
                className="w-full h-full object-contain object-bottom drop-shadow-2xl"
              />
            </div>

            {/* Floating Badge: AVAILABLE FOR FREELANCE PROJECTS */}
            <div className="absolute -bottom-3 left-2 sm:left-0 md:-left-6 bg-white rounded-2xl px-5 py-3.5 shadow-lg border border-slate-100 flex items-center justify-between gap-6 z-20 min-w-48">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Chuyên viên MKT ADS</div>
                <div className="text-sm font-black uppercase leading-tight">
                  <span className="block text-lime-600">Trung Tiến</span>
                  <span className="block text-zinc-900">Trương Nguyễn</span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse shrink-0"></span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= MAIN WHITE SHEET CONTAINER ================= */}
      <main className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8 md:p-10 space-y-14">
          
          {/* ================= 1. VỀ BẢN THÂN TÔI ================= */}
          <section id="about">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-lime-400 rounded-xs shrink-0"></span>
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">VỀ BẢN THÂN TÔI</h2>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                GIỚI THIỆU <ArrowRight size={12} className="text-lime-600" />
              </span>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 sm:p-6 space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
              <p>
                Tôi là <strong className="text-zinc-900 font-semibold">Trung Tiến</strong>, chuyên viên Marketing Ads với 2 năm kinh nghiệm chạy Facebook Ads, tập trung tối ưu chiến dịch theo dữ liệu để mang lại chuyển đổi và doanh thu thực tế cho doanh nghiệp.
              </p>
              <p>
                Định hướng của tôi là phát triển thành <strong className="text-zinc-900 font-semibold">Performance Marketer toàn diện</strong>, mở rộng đa kênh và đồng hành cùng doanh nghiệp tăng trưởng bền vững.
              </p>
            </div>

            {/* 4 KPI Summary Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-b border-slate-100 pb-8">
              
              {/* Cột 1: 02+ Năm kinh nghiệm */}
              <div className="md:border-r border-slate-200 pr-4 group">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-lime-500">
                    0<CountUp end={2} duration={2.5} enableScrollSpy scrollSpyOnce />+
                  </div>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-lime-500"
                  >
                    <TrendingUp size={16} strokeWidth={2.5} />
                  </motion.div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">NĂM KINH NGHIỆM</div>
              </div>

              {/* Cột 2: Icon Vô Cực chuyển động - Chiến dịch đã chạy */}
              <div className="md:border-r border-slate-200 md:px-4 group">
                <div className="flex items-center gap-1.5 mb-1 h-8 sm:h-9">
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 sm:w-11 sm:h-11 -ml-1 overflow-visible"
                    fill="none"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <defs>
                      <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="50%" stopColor="#65a30d" />
                        <stop offset="100%" stopColor="#84cc16" />
                      </linearGradient>
                    </defs>
                    {/* Đường viền vô cực nền mờ */}
                    <path
                      d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"
                      stroke="#d9f99d"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Dòng sáng chạy liên tục quanh vòng vô cực */}
                    <motion.path
                      d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z"
                      stroke="url(#infinityGrad)"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0.35, pathOffset: 0 }}
                      animate={{ pathOffset: [0, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.svg>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    className="text-lime-500"
                  >
                    <TrendingUp size={16} strokeWidth={2.5} />
                  </motion.div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CHIẾN DỊCH ĐÃ CHẠY</div>
              </div>

              {/* Cột 3: 05+ Ngành hàng */}
              <div className="md:border-r border-slate-200 pr-4 md:px-4 group">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-lime-500">
                    0<CountUp end={5} duration={2.5} enableScrollSpy scrollSpyOnce />+
                  </div>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="text-lime-500"
                  >
                    <TrendingUp size={16} strokeWidth={2.5} />
                  </motion.div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">NGÀNH HÀNG</div>
              </div>

              {/* Cột 4: 99.9% Báo cáo minh bạch */}
              <div className="md:pl-4 group">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-lime-500">
                    <CountUp end={99.9} decimals={1} duration={2.5} enableScrollSpy scrollSpyOnce />%
                  </div>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                    className="text-lime-500"
                  >
                    <TrendingUp size={16} strokeWidth={2.5} />
                  </motion.div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">BÁO CÁO MINH BẠCH</div>
              </div>

            </div>
          </section>

          {/* ================= 2. CHUYÊN MÔN & KỸ NĂNG ADS ================= */}
          <section id="skills" className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-900">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-lime-400 rounded-xs shrink-0"></span>
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-white">
                  CHUYÊN MÔN &amp; KỸ NĂNG ADS
                </h2>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                8 CHÍNH • 6 PHỤ
              </span>
            </div>

            {/* 8 Main Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {mainSkills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div 
                    key={skill.num} 
                    className="bg-zinc-900/90 border border-zinc-800 hover:border-lime-500/60 rounded-2xl p-5 flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-9 h-9 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-zinc-950 transition-colors">
                          <IconComponent size={16} />
                        </div>
                        <span className="text-xs font-extrabold text-lime-400">{skill.num}</span>
                      </div>
                      <h3 className="font-extrabold text-white text-sm sm:text-[15px] mb-1.5">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 6 Sub Skills Row */}
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 mb-3">
                KỸ NĂNG PHỤ
              </div>
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 sm:py-5 sm:px-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 lg:gap-y-0 lg:divide-x lg:divide-zinc-800">
                  {subSkills.map((sub, i) => (
                    <div key={i} className="px-4 flex flex-col justify-center">
                      <span className="text-[11px] font-extrabold text-lime-400 mb-1">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-extrabold text-white leading-snug">
                        {sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>

          {/* ================= 3. KINH NGHIỆM LÀM VIỆC ================= */}
          <section id="experience" className="border-b border-slate-100 pb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-lime-400 rounded-xs shrink-0"></span>
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">KINH NGHIỆM LÀM VIỆC</h2>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                4 NƠI LÀM VIỆC <ArrowRight size={12} className="text-lime-600" />
              </span>
            </div>

            {/* Grid Layout cho các thẻ Đóng */}
            {!openExp ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                
                {/* ITEM 1: DN Group */}
                <div 
                  onClick={() => setOpenExp(1)}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">1</div>
                    <div className="text-slate-400 text-xs font-medium">05/2025 — x/x</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <img src="/dn-logo.png" alt="DN Group Logo" className="h-16 md:h-20 object-contain mb-5 group-hover/card:scale-105 transition-transform duration-300" />
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900 mb-1">Tập đoàn Điểm Nhấn (DN Group)</h3>
                    <div className="text-xs font-medium text-slate-500">Chuyên viên Marketing Ads</div>
                  </div>
                </div>

                {/* ITEM 2: KENZE */}
                <div 
                  onClick={() => setOpenExp(2)}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">2</div>
                    <div className="text-slate-400 text-xs font-medium">x/x — x/x</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-5 group-hover/card:scale-105 transition-transform duration-300 shadow-xs border border-slate-100">
                      <img src="/logo-kenze.png" alt="KENZE Logo" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900 mb-1 uppercase">KENZE</h3>
                    <div className="text-xs font-medium text-slate-500">Chuyên viên Marketing Ads</div>
                  </div>
                </div>

                {/* ITEM 3: Miss Áo Dài */}
                <div 
                  onClick={() => setOpenExp(3)}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">3</div>
                    <div className="text-slate-400 text-xs font-medium">x/x — x/x</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-5 group-hover/card:scale-105 transition-transform duration-300 shadow-xs border border-slate-100">
                      <img src="/logo-missaodai.png" alt="Miss Áo Dài Logo" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900 mb-1">Miss Áo Dài</h3>
                    <div className="text-xs font-medium text-slate-500">Chuyên viên Marketing Ads</div>
                  </div>
                </div>

                {/* ITEM 4: Phan Trần */}
                <div 
                  onClick={() => setOpenExp(4)}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">4</div>
                    <div className="text-slate-400 text-xs font-medium">x/x — x/x</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-5 group-hover/card:scale-105 transition-transform duration-300 shadow-xs border border-slate-100 bg-white p-1.5">
                      <img src="/logo-phantran.png" alt="Phan Trần Logo" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900 mb-1 uppercase">PHAN TRAN</h3>
                    <div className="text-xs font-medium text-slate-500">Chuyên viên Marketing Ads</div>
                  </div>
                </div>

              </div>
            ) : (
              /* Hiển thị Card Mở khi click vào một công ty */
              <div className="relative pl-10 md:pl-14">
                <div className="absolute left-3.75 md:left-5.75 top-8 bottom-0 w-0.5 bg-lime-300"></div>

                {/* Mở ITEM 1: DN Group */}
                {openExp === 1 && (
                  <div className="relative mb-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-zinc-900 text-lime-400 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white z-10">1</div>
                    <div className="bg-white border border-lime-500 p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                      <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">Thẩm mỹ • Chuỗi thương hiệu • Quy mô &gt;1.200 nhân sự</span>
                        <span className="inline-flex items-center bg-zinc-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">05/2025 — x/x</span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">Tập đoàn Điểm Nhấn (DN Group)</h3>
                      <div className="text-base font-bold text-lime-600 mb-5">Chuyên viên Marketing Ads</div>
                      <div className="mt-6">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><img src="/logo-sc.png" alt="Seoul Center" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Seoul Center</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Triển khai và tối ưu Facebook Ads trong lĩnh vực thẩm mỹ / làm đẹp, tập trung tạo khách hàng tiềm năng và đặt lịch.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Lên kế hoạch chiến dịch theo phễu, test creative và audience, tối ưu CPL, CTR, ROAS theo KPI được giao.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Phối hợp với Content, Design và Sales / chi nhánh, theo dõi Pixel &amp; CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, Google Sheets.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><img src="/logo-scclinic.png" alt="Seoul Center Clinic" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Seoul Center Clinic</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Triển khai và tối ưu Facebook Ads cho phòng khám Seoul Center Clinic, tập trung tạo khách hàng tiềm năng và đặt lịch tư vấn / thăm khám qua tin nhắn.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Lên kế hoạch chiến dịch theo dịch vụ và chương trình ưu đãi, test creative và audience, tối ưu CPL, CTR theo KPI; phối hợp đội ngũ tư vấn và báo cáo hiệu quả định kỳ.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><img src="/logo-dnhome.png" alt="DN Home" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">DN Home</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><img src="/logo-sacademy.png" alt="Sacademy" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">S Academy</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                         <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><img src="/shark-dental.png" alt="Sacademy" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Shark Dental</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mở ITEM 2: KENZE */}
                {openExp === 2 && (
                  <div className="relative mb-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-zinc-900 text-lime-400 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white z-10">2</div>
                    <div className="bg-white border border-lime-500 p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                      <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">Nội thất xuất dư • Tồn kho • Rời công • Trưng bày</span>
                        <span className="inline-flex items-center bg-zinc-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">x/x — x/x</span>
                      </div>
                      <div className="mb-6">
                        <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">KENZE</h3>
                        <div className="text-base font-bold text-lime-600">Nhân viên quản lý kho - Vận hành sàn TMĐT</div>
                      </div>
                      <div className="mt-6">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shadow-xs shrink-0"><img src="/logo-kenze.png" alt="KENZE Logo" className="h-full w-full object-cover" /></div>
                            <span className="font-bold text-zinc-900 text-lg">KENZE</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Quản lý tồn kho nội thất xuất dư / tồn kho: theo dõi nhập – xuất – tồn, kiểm kê định kỳ và cập nhật số liệu tồn kho chính xác cho bộ phận bán hàng.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Vận hành gian hàng trên sàn TMĐT: đăng và cập nhật sản phẩm, giá bán, chương trình xả kho / khuyến mãi; xử lý đơn hàng và phối hợp giao vận.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Phối hợp với Sales xử lý đơn qua tin nhắn, báo cáo tồn kho và doanh số định kỳ bằng Google Sheets, Excel.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><img src="/logo-yamado.png" alt="Yamado Logo" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg uppercase">YAMADO</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ vận hành gian hàng Yamado Viet Nam Store: cập nhật sản phẩm, tồn kho và giá bán trên sàn, đảm bảo thông tin đồng bộ với kho thực tế.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Theo dõi và xử lý đơn hàng phát sinh qua sàn / tin nhắn / điện thoại, phối hợp giao hàng và báo cáo doanh số định kỳ.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-auto min-w-20 px-2 border border-slate-200 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 py-1"><img src="/logo-lazybag.png" alt="Lazybag Logo" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Lazybag</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Quản lý tồn kho sản phẩm ghế lười Lazybag: theo dõi số lượng theo mẫu và màu, cập nhật tồn kho cho các kênh bán hàng.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Vận hành bán hàng trên sàn TMĐT và mạng xã hội: đăng sản phẩm, lên chương trình ưu đãi, xử lý đơn và hỗ trợ chốt đơn qua tin nhắn.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-auto min-w-20 px-2 border border-slate-200 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 py-1"><img src="/logo-kensonic.png" alt="Kensonic Logo" className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg uppercase">KENSONIC</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mở ITEM 3: Miss Áo Dài */}
                {openExp === 3 && (
                  <div className="relative mb-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-zinc-900 text-lime-400 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white z-10">3</div>
                    <div className="bg-white border border-lime-500 p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                      <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">Dịch vụ chụp ảnh • Áo dài • Gói trải nghiệm 2 in 1</span>
                        <span className="inline-flex items-center bg-zinc-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">x/x — x/x</span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">Miss Áo Dài</h3>
                      <div className="text-base font-bold text-lime-600 mb-5">Chuyên viên Marketing Ads</div>
                      <div className="mt-6">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0"><img src="/logo-missaodai.png" alt="Miss Áo Dài" className="h-full w-full object-cover" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Miss Áo Dài</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Triển khai và tối ưu Facebook Ads cho dịch vụ chụp ảnh áo dài và các gói trải nghiệm, tập trung tạo khách hàng tiềm năng và đặt lịch chụp qua tin nhắn.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Lên kế hoạch chiến dịch theo concept và mùa vụ (Liên Hoa, Xe Hoa, mùa sen, lễ Tết), test creative hình ảnh / video và audience, tối ưu chi phí trên mỗi tin nhắn và lượt đặt lịch.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Phối hợp với ekip chụp và Sales tư vấn gói dịch vụ, lịch chụp; theo dõi Pixel &amp; CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, Google Sheets.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0"><img src="/logo-mentorclub.png" alt="Mentor Club" className="h-full w-full object-cover" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Mentor Club</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0"><img src="/logo-misspersonal.png" alt="Miss Personal Makeup" className="h-full w-full object-cover" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Miss Personal Makeup</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mở ITEM 4: Phan Trần */}
                {openExp === 4 && (
                  <div className="relative mb-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-zinc-900 text-lime-400 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white z-10">4</div>
                    <div className="bg-white border border-lime-500 p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                      <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">In vải • In ấn &amp; gia công trên vải</span>
                        <span className="inline-flex items-center bg-zinc-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">x/x — x/x</span>
                      </div>
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-16 h-16 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-white flex items-center justify-center shadow-xs p-1"><img src="/logo-phantran.png" alt="Phan Trần Logo" className="w-full h-full object-contain" /></div>
                        <div>
                          <h3 className="text-2xl font-extrabold text-zinc-900">PHAN TRAN</h3>
                          <div className="text-base font-bold text-lime-600">Chuyên viên Marketing Ads</div>
                        </div>
                      </div>
                      <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                        <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Triển khai và tối ưu Facebook Ads cho dịch vụ in vải, tập trung tạo khách hàng tiềm năng là chủ xưởng may, shop thời trang và nhận đơn đặt in qua tin nhắn.</li>
                        <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Lên kế hoạch chiến dịch theo nhóm dịch vụ in và mùa vụ thời trang, test creative hình ảnh / video mẫu in thực tế và audience, tối ưu chi phí trên mỗi tin nhắn và khách hàng tiềm năng.</li>
                        <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Phối hợp với bộ phận sản xuất và Sales để báo giá, chốt đơn; theo dõi Pixel &amp; CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, Google Sheets.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ================= 4. DỰ ÁN TIÊU BIỂU ================= */}
          <section id="projects" className="border-b border-slate-100 pb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-lime-400 rounded-xs shrink-0"></span>
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">DỰ ÁN TIÊU BIỂU</h2>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                KHỐI DN GROUP <ArrowRight size={12} className="text-lime-600" />
              </span>
            </div>

            {/* Khối Tập đoàn Điểm Nhấn (Chứa 4 dự án) */}
            <div className="bg-slate-50/60 border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-5">
              
              {/* Header của Khối DN Group */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-3">
                  <img src="/dn-logo.png" alt="DN Group" className="h-6 w-auto object-contain shrink-0" />
                  <h3 className="text-sm sm:text-base font-extrabold text-zinc-900">Tập đoàn Điểm Nhấn</h3>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">4 DỰ ÁN</span>
              </div>

              {/* ================= DỰ ÁN 1: VẼ LẠI THANH XUÂN ================= */}
              <div className="bg-white border border-slate-200/90 hover:border-lime-500 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  {/* Thumbnail Trái */}
                  <div 
                    onClick={() => setOpenGallery(!openGallery)}
                    className="md:col-span-5 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 cursor-pointer group relative"
                  >
                    <img 
                      src="/VLTX/project-ve-lai-thanh-xuan-cover.jpg" 
                      alt="Vẽ Lại Thanh Xuân Cover" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Nội dung Phải */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-lime-600 mb-1">
                        SEOUL CENTER • CHIẾN DỊCH TRUYỀN THÔNG
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-zinc-900 mb-1">Vẽ Lại Thanh Xuân</h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Tham gia đề xuất và nhận nhiệm vụ truyền thông qua MXH.
                      </p>

                      {/* Inline KPI Row */}
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-4 mb-3 border-b border-slate-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">
                            <CountUp end={900} duration={2} enableScrollSpy scrollSpyOnce />+
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">Data khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">
                            <CountUp end={48} duration={2} enableScrollSpy scrollSpyOnce />%
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">Lịch khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">
                            <CountUp end={78} duration={2} enableScrollSpy scrollSpyOnce />%
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">Khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">
                            <CountUp end={2.6} decimals={1} duration={2} enableScrollSpy scrollSpyOnce />x
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">ROAS</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Row: Click để Đóng/Mở Bộ ảnh & KPI chi tiết */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button 
                        type="button"
                        onClick={() => setOpenGallery(!openGallery)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <ImageIcon size={13} className="text-lime-600" />
                        <span>8 ẢNH • COLLAGE DỌC</span>
                        {openGallery ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>

                      <button 
                        type="button"
                        onClick={() => setOpenKPI(!openKPI)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <BarChart2 size={12} className="text-lime-600" />
                        <span>CHI TIẾT KPI</span>
                        {openKPI ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bộ hình ảnh chiến dịch 1 (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openGallery && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-7 flex flex-col gap-4">
                          <div className="w-full rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VLTX/project-ve-lai-thanh-xuan-cover.jpg" alt="Campaign Image 1" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <img src="/VLTX/project-ve-lai-thanh-xuan-2.jpg" alt="Campaign Image 2" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col gap-4">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <img src="/VLTX/project-ve-lai-thanh-xuan-3.jpg" alt="Campaign Image 3" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <img src="/VLTX/project-ve-lai-thanh-xuan-4.PNG" alt="Campaign Image 4" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-5 flex flex-col gap-4">
                          <div className="w-full rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VLTX/project-ve-lai-thanh-xuan-5.png" alt="Campaign Image 5" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>
                        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VLTX/project-ve-lai-thanh-xuan-6.png" alt="Campaign Image 6" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VLTX/project-ve-lai-thanh-xuan-7.png" alt="Campaign Image 7" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VLTX/project-ve-lai-thanh-xuan-8.png" alt="Campaign Image 8" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Khối KPI Thực Đạt Dự án 1 (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openKPI && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={900} duration={2.5} />+
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={48} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lịch khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={78} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={2.6} decimals={1} duration={2.5} />x
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ROAS</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ================= DỰ ÁN 2: MEGA LIVE TRUNG THU ================= */}
              <div className="bg-white border border-slate-200/90 hover:border-lime-500 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  {/* Thumbnail Trái */}
                  <div 
                    onClick={() => setOpenGallery2(!openGallery2)}
                    className="md:col-span-5 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 cursor-pointer group relative"
                  >
                    <img 
                      src="/megalive/project-mega-live-trung-thu-cover.png" 
                      alt="Mega Live Trung Thu Cover" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Nội dung Phải */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-lime-600 mb-1">
                        SEOUL CENTER • SỰ KIỆN MEGA LIVE
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-zinc-900 mb-1">Mega Live Trung Thu</h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Tham gia đề xuất và truyền thông cho sự kiện Mega Live — Đêm Trăng Ngọt Sắc qua MXH.
                      </p>

                      {/* Inline KPI Row */}
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-4 mb-3 border-b border-slate-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Data khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Lịch khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">ROAS</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Row: Click để Đóng/Mở Bộ ảnh & KPI chi tiết */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button 
                        type="button"
                        onClick={() => setOpenGallery2(!openGallery2)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <ImageIcon size={13} className="text-lime-600" />
                        <span>10 ẢNH • LƯỚI MỚI</span>
                        {openGallery2 ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>

                      <button 
                        type="button"
                        onClick={() => setOpenKPI2(!openKPI2)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <BarChart2 size={12} className="text-lime-600" />
                        <span>CHI TIẾT KPI</span>
                        {openKPI2 ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bộ hình ảnh chiến dịch 2 (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openGallery2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-1.png" alt="Mega Live Image 1" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-2.png" alt="Mega Live Image 2" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-3.png" alt="Mega Live Image 3" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-4.png" alt="Mega Live Image 4" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-5.png" alt="Mega Live Image 5" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-6.png" alt="Mega Live Image 6" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-7.png" alt="Mega Live Image 7" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-8.png" alt="Mega Live Image 8" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-9.png" alt="Mega Live Image 9" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/megalive/project-mega-live-10.png" alt="Mega Live Image 10" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Khối KPI Thực Đạt Dự án 2 (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openKPI2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={900} duration={2.5} />+
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={48} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lịch khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={78} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={2.6} decimals={1} duration={2.5} />x
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ROAS</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ================= DỰ ÁN 3: SINH NHẬT 16 NĂM ================= */}
              <div className="bg-white border border-slate-200/90 hover:border-lime-500 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  {/* Thumbnail Trái */}
                  <div 
                    onClick={() => setOpenGallery3(!openGallery3)}
                    className="md:col-span-5 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 cursor-pointer group relative"
                  >
                    <img 
                      src="/16nam/project-sinh-nhat-16-nam-cover.png" 
                      alt="Sinh Nhật 16 Năm Cover" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Nội dung Phải */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-lime-600 mb-1">
                        SEOUL CENTER • SỰ KIỆN SINH NHẬT
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-zinc-900 mb-1">Sinh Nhật 16 Năm</h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Tham gia đề xuất và truyền thông cho sự kiện Sinh Nhật 16 Năm — Hành Trình Tỏa Sắc của Seoul Center qua MXH.
                      </p>

                      {/* Inline KPI Row */}
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-4 mb-3 border-b border-slate-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Data khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Lịch khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">ROAS</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Row: Click để Đóng/Mở Bộ ảnh & KPI chi tiết */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button 
                        type="button"
                        onClick={() => setOpenGallery3(!openGallery3)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <ImageIcon size={13} className="text-lime-600" />
                        <span>20 ẢNH • LƯỚI MỚI</span>
                        {openGallery3 ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>

                      <button 
                        type="button"
                        onClick={() => setOpenKPI3(!openKPI3)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <BarChart2 size={12} className="text-lime-600" />
                        <span>CHI TIẾT KPI</span>
                        {openKPI3 ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bộ hình ảnh chiến dịch Sinh Nhật 16 Năm (20 ảnh - Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openGallery3 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="flex flex-col gap-4">
                        
                        {/* Hàng 1: 3 Banner dọc dài (Tall Vertical) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-1.png" alt="Sinh Nhật 16 Năm 1" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-2.jpg" alt="Sinh Nhật 16 Năm 2" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-3.png" alt="Sinh Nhật 16 Năm 3" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Hàng 2: 3 Poster dọc (Portrait 4:5) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-4.png" alt="Sinh Nhật 16 Năm 4" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-5.png" alt="Sinh Nhật 16 Năm 5" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-6.png" alt="Sinh Nhật 16 Năm 6" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Hàng 3: 3 Poster dọc (Portrait 4:5) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-7.png" alt="Sinh Nhật 16 Năm 7" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-8.png" alt="Sinh Nhật 16 Năm 8" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/16nam/project-sinh-nhat-9.png" alt="Sinh Nhật 16 Năm 9" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Khu vực dưới: Chia 2 khối (Cột Trái 8 phần - Cột Phải 4 phần) để khớp bố cục bất đối xứng */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                          
                          {/* Khối Trái (Chiếm 2/3): 2 Poster 4:5 + 2 Ảnh vuông + (1 Ảnh vuông & 3 Voucher ngang xếp chồng) */}
                          <div className="md:col-span-8 flex flex-col gap-4">
                            
                            {/* Cặp Poster Dịch vụ công nghệ độc quyền (4:5) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <img src="/16nam/project-sinh-nhat-10.png" alt="Sinh Nhật 16 Năm 10" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <img src="/16nam/project-sinh-nhat-11.png" alt="Sinh Nhật 16 Năm 11" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            </div>

                            {/* Cặp Ảnh vuông: Thẻ hoàn tiền 500K & Check-in có quà (1:1) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <img src="/16nam/project-sinh-nhat-12.jpeg" alt="Sinh Nhật 16 Năm 12" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <img src="/16nam/project-sinh-nhat-13.jpeg" alt="Sinh Nhật 16 Năm 13" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            </div>

                            {/* Hàng cuối bên trái: Ảnh vuông Mua 1 Được 3 + Cột 3 Voucher ngang */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <img src="/16nam/project-sinh-nhat-14.jpeg" alt="Sinh Nhật 16 Năm 14" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="flex flex-col gap-3">
                                <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                  <img src="/16nam/project-sinh-nhat-15.png" alt="Sinh Nhật 16 Năm 15" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                  <img src="/16nam/project-sinh-nhat-16.png" alt="Sinh Nhật 16 Năm 16" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                  <img src="/16nam/project-sinh-nhat-17.png" alt="Sinh Nhật 16 Năm 17" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Khối Phải (Chiếm 1/3): Banner dài 220K + Ảnh vuông Combo + Voucher ngang 700K */}
                          <div className="md:col-span-4 flex flex-col gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <img src="/16nam/project-sinh-nhat-18.png" alt="Sinh Nhật 16 Năm 18" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <img src="/16nam/project-sinh-nhat-19.png" alt="Sinh Nhật 16 Năm 19" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <img src="/16nam/project-sinh-nhat-20.png" alt="Sinh Nhật 16 Năm 20" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Khối KPI Thực Đạt Dự án 3 (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openKPI3 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={900} duration={2.5} />+
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={48} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lịch khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={78} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={2.6} decimals={1} duration={2.5} />x
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ROAS</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ================= DỰ ÁN 4: VÒNG XOAY MAY MẮN ================= */}
              <div className="bg-white border border-slate-200/90 hover:border-lime-500 rounded-2xl p-4 sm:p-5 transition-all shadow-2xs">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  
                  {/* Thumbnail Trái */}
                  <div 
                    onClick={() => setOpenGallery4(!openGallery4)}
                    className="md:col-span-5 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 cursor-pointer group relative"
                  >
                    <img 
                      src="/VXMM/project-vong-xoay-may-man-cover.png" 
                      alt="Vòng Xoay May Mắn Cover" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Nội dung Phải */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-lime-600 mb-1">
                        SEOUL CENTER • CHIẾN DỊCH GAMIFICATION
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-zinc-900 mb-1">Vòng Xoay May Mắn</h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Tham gia đề xuất và triển khai chuỗi ấn phẩm truyền thông Minigame Vòng Xoay May Mắn thu hút khách hàng tương tác &amp; nhận ưu đãi qua MXH.
                      </p>

                      {/* Inline KPI Row */}
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-4 mb-3 border-b border-slate-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Data khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Lịch khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">Khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">—</span>
                          <span className="text-[11px] text-slate-400 font-medium">ROAS</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Row: Click để Đóng/Mở Bộ ảnh & KPI chi tiết */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <button 
                        type="button"
                        onClick={() => setOpenGallery4(!openGallery4)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <ImageIcon size={13} className="text-lime-600" />
                        <span>7 ẢNH • LƯỚI MỚI</span>
                        {openGallery4 ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>

                      <button 
                        type="button"
                        onClick={() => setOpenKPI4(!openKPI4)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-lime-600 transition-colors cursor-pointer"
                      >
                        <BarChart2 size={12} className="text-lime-600" />
                        <span>CHI TIẾT KPI</span>
                        {openKPI4 ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bộ hình ảnh chiến dịch Vòng Xoay May Mắn (7 ảnh - Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openGallery4 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="flex flex-col gap-4">
                        
                        {/* Hàng 1: 3 Ảnh vuông (1:1) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VXMM/project-vong-xoay-1.jpg" alt="Vòng Xoay May Mắn 1" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VXMM/project-vong-xoay-2.png" alt="Vòng Xoay May Mắn 2" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <img src="/VXMM/project-vong-xoay-3.png" alt="Vòng Xoay May Mắn 3" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Hàng 2: Cột Trái (Chiếm 8/12 = 2/3) chứa Poster dọc lớn + Cột Phải (Chiếm 4/12 = 1/3) chứa 3 ảnh vuông xếp chồng */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                          
                          {/* Cột Trái: 1 Poster dọc lớn (Tết Rồi Làm Đẹp Thôi - Đồng Giá 79K) */}
                          <div className="md:col-span-8 rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group flex">
                            <img src="/VXMM/project-vong-xoay-4.png" alt="Vòng Xoay May Mắn 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>

                          {/* Cột Phải: 3 Ảnh vuông xếp chồng dọc */}
                          <div className="md:col-span-4 flex flex-col justify-between gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <img src="/VXMM/project-vong-xoay-5.png" alt="Vòng Xoay May Mắn 5" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <img src="/VXMM/project-vong-xoay-6.png" alt="Vòng Xoay May Mắn 6" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <img src="/VXMM/project-vong-xoay-7.jpeg" alt="Vòng Xoay May Mắn 7" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                          </div>

                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Khối KPI Thực Đạt Dự án 4 (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openKPI4 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-slate-100 pt-4"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={900} duration={2.5} />+
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={48} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lịch khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={78} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={2.6} decimals={1} duration={2.5} />x
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ROAS</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </section>

          {/* ================= 5. LIÊN HỆ ================= */}
          <section id="contact" className="pb-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 bg-lime-400 rounded-xs shrink-0"></span>
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">LIÊN HỆ</h2>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                SẴN SÀNG NHẬN VIỆC / DỰ ÁN MỚI <ArrowRight size={12} className="text-lime-600" />
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Cột Trái: Call to Action */}
              <div className="md:col-span-5 flex flex-col items-start">
                <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                  <span className="block text-zinc-900">CÓ DỰ ÁN</span>
                  <span className="block text-lime-500">TRONG ĐẦU?</span>
                </h3>

                <a 
                  href="mailto:contact@example.com" 
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 rounded-full bg-lime-400 group-hover:bg-lime-500 text-zinc-950 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
                    <ArrowUpRight size={18} strokeWidth={2.5} />
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-900 group-hover:text-lime-600 transition-colors">
                    LIÊN HỆ NGAY
                  </span>
                </a>
              </div>

              {/* Cột Phải: 3 Thẻ Thông tin liên hệ */}
              <div className="md:col-span-7 space-y-3">
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl px-5 py-3.5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">EMAIL</span>
                  <span className="text-xs sm:text-sm font-extrabold text-zinc-900">[ ĐIỀN ]</span>
                </div>

                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl px-5 py-3.5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">ZALO</span>
                  <span className="text-xs sm:text-sm font-extrabold text-zinc-900">[ ĐIỀN ]</span>
                </div>

                <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl px-5 py-3.5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">FACEBOOK</span>
                  <span className="text-xs sm:text-sm font-extrabold text-zinc-900">Trung Tiến</span>
                </div>
              </div>

            </div>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <div>© 2026 TRUNG TIẾN</div>
            <div>PORTFOLIO — MARKETING ADS</div>
          </footer>

        </div>
      </main>

    </div>
  );
}
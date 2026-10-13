"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Code2, Briefcase, User, Mail, 
  ExternalLink, Sparkles, Terminal, ArrowRight, Layers, ChevronDown, ChevronUp, Image as ImageIcon, BarChart2, TrendingUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

export default function PortfolioPage() {
  // === SPLASH SCREEN STATES ===
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "PORTFOLIO";
  const [openExp, setOpenExp] = useState<number | null>(null);
  const [openGallery, setOpenGallery] = useState(false);
  const [openKPI, setOpenKPI] = useState(false);

  useEffect(() => {
    // 1. Hiệu ứng gõ chữ (Typing effect)
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100); // Tốc độ gõ: 100ms/ký tự -> Xong chữ PORTFOLIO mất 900ms

    // 2. Bắt đầu hiệu ứng mờ dần (Fade out) ở giây thứ 1.5
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // 3. Tắt hẳn splash screen ở giây thứ 2
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-[#2D99AE] selection:text-white font-sans relative overflow-x-hidden">
      
      {/* ================= HIỆU ỨNG MỞ ĐẦU GIỐNG VIDEO ================= */}
      {isLoading && (
        <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Lớp sóng trên cùng (Top Waves) */}
          <svg className="absolute top-0 left-0 w-full transform rotate-180 opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#BCFEFE" fillOpacity="0.6" d="M0,160L80,170.7C160,181,320,203,480,186.7C640,171,800,117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            <path fill="#2D99AE" fillOpacity="0.3" d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,128C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>

          {/* Nội dung trung tâm */}
          <div className="z-10 flex flex-col items-center mt-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-[0.1em] md:tracking-[0.2em] text-[#0C5776] mb-3 flex items-center">
              {typedText}
              <span className={`w-1.5 md:w-2 h-10 md:h-16 bg-[#2D99AE] ml-2 ${typedText === fullText ? 'animate-pulse opacity-50' : 'opacity-100'}`}></span>
            </h1>
            
            <div className={`flex items-center gap-3 text-[#2D99AE] text-[10px] md:text-xs font-bold tracking-[0.3em] transition-opacity duration-700 ${typedText === fullText ? 'opacity-100' : 'opacity-0'}`}>
              <span>WEBSITE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C5776]"></span>
              <span>LOADING</span>
            </div>
            
            <div className={`h-[2px] bg-gradient-to-r from-[#2D99AE] to-[#BCFEFE] mt-4 transition-all duration-700 ease-out ${typedText === fullText ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}></div>
          </div>

          {/* Lớp sóng dưới cùng (Bottom Waves) */}
          <svg className="absolute bottom-0 left-0 w-full opacity-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#BCFEFE" fillOpacity="0.5" d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,218.7C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            <path fill="#2D99AE" fillOpacity="0.7" d="M0,288L80,272C160,256,320,224,480,213.3C640,203,800,213,960,218.7C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            <path fill="#0C5776" d="M0,192L80,192C160,192,320,192,480,208C640,224,800,256,960,250.7C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      )}

      {/* ================= HEADER / NAVBAR ================= */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0C5776] to-[#2D99AE] flex items-center justify-center text-white font-bold shadow-md shadow-[#2D99AE]/20">
              <Terminal size={18} />
            </div>
            <span className="font-bold text-lg text-[#001C44] tracking-wide">Portfolio.<span className="text-[#2D99AE]">dev</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-slate-600 hover:text-[#0C5776] transition-colors">Giới thiệu</a>
            <a href="#skills" className="text-slate-600 hover:text-[#0C5776] transition-colors">Kỹ năng</a>
            <a href="#projects" className="text-slate-600 hover:text-[#0C5776] transition-colors">Dự án</a>
            <a href="#contact" className="text-slate-600 hover:text-[#0C5776] transition-colors">Liên hệ</a>
          </nav>

          <a 
            href="#contact" 
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#0C5776] text-white rounded-md hover:bg-[#2D99AE] transition-all shadow-md shadow-[#0C5776]/20"
          >
            Kết nối ngay
          </a>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 relative overflow-hidden bg-white">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#F8DADO]/40 blur-[80px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#BCFEFE]/40 blur-[100px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* CỘT TRÁI: TEXT */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D99AE]/10 border border-[#2D99AE]/20 text-[#0C5776] text-xs font-bold mb-6">
              <Sparkles size={14} className="text-[#2D99AE]" /> Sẵn sàng cho các dự án và cơ hội mới
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#001C44] leading-tight">
              Chào mừng<br />đến với <span className="text-[#2D99AE]">Portfolio</span>
            </h1>

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#001C44] uppercase tracking-wide mb-1">TRUNG TIẾN</h2>
              <p className="text-slate-600 font-medium text-sm md:text-base">
                Marketing Ads <span className="mx-2 text-slate-300">•</span> Facebook Ads Specialist
              </p>
            </div>

            <p className="text-base text-slate-600 mb-8 max-w-md leading-relaxed">
              Giúp thương hiệu biến quảng cáo thành đơn hàng, tối ưu ROAS và giảm chi phí mỗi khách hàng.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-lg bg-[#0C5776] text-white font-bold text-sm hover:bg-[#2D99AE] transition-all flex items-center gap-2 shadow-lg shadow-[#0C5776]/20"
              >
                Xem dự án tiêu biểu <ArrowRight size={16} />
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-lg bg-white border border-slate-300 text-[#0C5776] font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
              >
                Liên hệ
              </a>
            </div>
          </div>

          {/* CỘT PHẢI: IMAGE */}
          <div className="relative mx-auto w-72 h-72 md:w-[400px] md:h-[400px] mt-10 md:mt-0 flex items-center justify-center">
            {/* Vòng viền ngoài cùng (Xanh nhạt) */}
            <div className="absolute inset-0 rounded-full border-[3px] border-[#BCFEFE] scale-[1.03]"></div>
            {/* Vòng viền giữa (Xanh đậm) */}
            <div className="absolute inset-3 rounded-full border-[4px] border-[#0C5776]"></div>
            
            {/* Avatar */}
            <div className="absolute inset-5 rounded-full overflow-hidden bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                alt="Trung Tiến" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Badge (ROAS) */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-5 py-2.5 rounded-full shadow-xl border border-slate-100 flex items-center gap-1.5 z-20">
              <span className="text-sm font-extrabold text-[#0C5776] tracking-wide">ROAS 4.2x</span>
              <svg className="w-4 h-4 text-[#0C5776] stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            </div>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ME ================= */}
      <section id="about" className="py-20 px-6 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2.5 rounded-lg bg-[#0C5776] text-white shadow-md">
              <User size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#001C44]">Về bản thân tôi</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* CỘT TRÁI: TEXT GIỚI THIỆU */}
            <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>
                Tôi là Trung Tiến, chuyên viên Marketing Ads với 2 năm kinh nghiệm chạy Facebook Ads, tập trung tối ưu chiến dịch theo dữ liệu để mang lại chuyển đổi và doanh thu thực tế cho doanh nghiệp.
              </p>
              <p>
                Định hướng của tôi là phát triển thành Performance Marketer toàn diện, mở rộng đa kênh và đồng hành cùng doanh nghiệp tăng trưởng bền vững.
              </p>
            </div>

            {/* CỘT PHẢI: THỐNG KÊ & STATUS */}
            <div className="flex flex-col gap-4">
              
              {/* Grid 4 thẻ */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 p-6 rounded-xl text-center shadow-sm hover:border-[#2D99AE] transition-colors">
                  <div className="text-4xl font-black text-[#0C5776] mb-2">02+</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Năm kinh nghiệm Ads</div>
                </div>
                
                <div className="bg-white border border-slate-200 p-6 rounded-xl text-center shadow-sm hover:border-[#2D99AE] transition-colors">
                  <div className="text-4xl font-black text-[#0C5776] mb-2">15+</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Chiến dịch đã triển<br className="hidden md:block"/> khai</div>
                </div>
                
                <div className="bg-white border border-slate-200 p-6 rounded-xl text-center shadow-sm hover:border-[#2D99AE] transition-colors">
                  <div className="text-4xl font-black text-[#0C5776] mb-2">03+</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Ngành hàng đã làm</div>
                </div>
                
                <div className="bg-white border border-slate-200 p-6 rounded-xl text-center shadow-sm hover:border-[#2D99AE] transition-colors">
                  <div className="text-4xl font-black text-[#0C5776] mb-2">100%</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Báo cáo minh bạch</div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-2 bg-[#ecfdf5] border border-[#a7f3d0] py-4 rounded-xl flex items-center justify-center gap-3 shadow-sm">
                <div className="w-3.5 h-3.5 rounded-full bg-[#10b981] animate-pulse"></div>
                <span className="font-bold text-[#065f46] text-sm md:text-base tracking-wide">Sẵn sàng nhận việc / dự án mới</span>
              </div>
              
            </div>
            
          </div>
        </div>
      </section>

      {/* ================= SKILLS & TECH STACK ================= */}
      <section id="skills" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Phần 1: Chuyên môn & Kỹ năng Ads */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-lg bg-[#001C44] text-white shadow-md">
                <Layers size={24} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-extrabold text-[#001C44]">Chuyên môn & Kỹ năng Ads</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Meta / Facebook Ads", desc: "Thành thạo" },
                { name: "TikTok Ads & TikTok Shop", desc: "Khá tốt" },
                { name: "Shopee Ads / Sàn TMĐT", desc: "Quảng cáo nội sàn" },
                { name: "Pixel & Conversions API", desc: "Setup & Tracking" },
                { name: "Phân tích & Tối ưu KPI", desc: "CPL • CTR • ROAS" },
                { name: "Phễu & Retargeting", desc: "TOFU • MOFU • BOFU" },
                { name: "Test Creative & Video", desc: "Canva • CapCut • A/B Test" },
                { name: "Báo cáo & Đo lường", desc: "GA4 • Sheets • Excel" }
              ].map((skill, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 hover:border-[#2D99AE] p-5 rounded-xl transition-all shadow-sm flex flex-col justify-center"
                >
                  <div className="font-bold text-[#001C44] text-[15px] mb-1.5">{skill.name}</div>
                  <div className="text-[13px] text-slate-500 font-medium">{skill.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phần 2: Kỹ năng phụ & Kỹ năng mềm */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-extrabold text-[#001C44] mb-2">Kỹ năng phụ & Kỹ năng mềm</h3>
              <p className="text-slate-500 text-sm md:text-base">Hỗ trợ làm việc hiệu quả trong môi trường agency / doanh nghiệp Việt Nam</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { name: "AI hỗ trợ công việc", desc: "ChatGPT • Gemini • Ý tưởng & Content" },
                { name: "Làm việc đội nhóm", desc: "Content • Design • Sales • Vận hành" },
                { name: "Giao tiếp & Trình bày", desc: "Báo cáo • Thuyết trình kết quả" },
                { name: "Quản lý thời gian & KPI", desc: "Đúng deadline • Chịu áp lực ngân sách" },
                { name: "Giải quyết vấn đề", desc: "Camp lỗi • Tài khoản • Chi phí tăng" },
                { name: "Chủ động học hỏi", desc: "Cập nhật thuật toán & chính sách mới" }
              ].map((skill, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#f0fdf4] border border-[#bbf7d0] hover:border-[#4ade80] p-6 rounded-xl transition-all shadow-sm flex flex-col justify-center"
                >
                  <div className="font-bold text-[#064e3b] text-base mb-2">{skill.name}</div>
                  <div className="text-[13px] text-[#475569] font-medium">{skill.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= WORK EXPERIENCE ================= */}
      <section id="experience" className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 rounded-lg bg-[#0C5776] text-white shadow-md">
              <Briefcase size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#001C44]">Kinh nghiệm làm việc</h2>
          </div>

          {/* Grid Layout cho các thẻ Đóng */}
          {!openExp ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* ITEM 1: DN Group (Card Đóng) */}
              <div 
                onClick={() => setOpenExp(1)}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#2D99AE] hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
              >
                {/* Số thứ tự và Thời gian */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-sm">1</div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    05/2025 — x/x
                  </div>
                </div>
                {/* Nội dung căn giữa */}
                <div className="flex-1 flex flex-col items-center justify-center text-center mt-2">
                  <img src="/dn-logo.png" alt="DN Group Logo" className="h-24 md:h-28 object-contain mb-8 group-hover/card:scale-105 transition-transform duration-300" />
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#001C44] mb-2">Tập đoàn Điểm Nhấn (DN Group)</h3>
                  <div className="text-sm font-bold text-[#0C5776]">Chuyên viên Marketing Ads</div>
                </div>
              </div>

              {/* ITEM 2: KENZE (Card Đóng) */}
              <div 
                onClick={() => setOpenExp(2)}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#2D99AE] hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
              >
                {/* Số thứ tự và Thời gian */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-sm">2</div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    x/x — x/x
                  </div>
                </div>
                {/* Nội dung căn giữa */}
                <div className="flex-1 flex flex-col items-center justify-center text-center mt-2">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 group-hover/card:scale-105 transition-transform duration-300 shadow-sm border border-slate-100">
                    <img src="/kz-logo.png" alt="KENZE Logo" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#001C44] mb-2 uppercase">KENZE</h3>
                  <div className="text-sm font-bold text-[#0C5776]">Chuyên viên Marketing Ads</div>
                </div>
              </div>

              {/* ITEM 3: Miss Áo Dài (Card Đóng) */}
              <div 
                onClick={() => setOpenExp(3)}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#2D99AE] hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
              >
                {/* Số thứ tự và Thời gian */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-sm">3</div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    x/x — x/x
                  </div>
                </div>
                {/* Nội dung căn giữa */}
                <div className="flex-1 flex flex-col items-center justify-center text-center mt-2">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 group-hover/card:scale-105 transition-transform duration-300 shadow-sm border border-slate-100">
                    <img src="/mad-logo.png" alt="Miss Áo Dài Logo" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#001C44] mb-2">Miss Áo Dài</h3>
                  <div className="text-sm font-bold text-[#0C5776]">Chuyên viên Marketing Ads</div>
                </div>
              </div>

              {/* ITEM 4: Phan Trần (Card Đóng) */}
              <div 
                onClick={() => setOpenExp(4)}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#2D99AE] hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
              >
                {/* Số thứ tự và Thời gian */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-sm">4</div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    x/x — x/x
                  </div>
                </div>
                {/* Nội dung căn giữa */}
                <div className="flex-1 flex flex-col items-center justify-center text-center mt-2">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 group-hover/card:scale-105 transition-transform duration-300 shadow-sm border border-slate-100 bg-white p-2 md:p-3">
                    <img src="/pt-logo.png" alt="Phan Trần Logo" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#001C44] mb-2 uppercase">PHAN TRAN</h3>
                  <div className="text-sm font-bold text-[#0C5776]">Chuyên viên Marketing Ads</div>
                </div>
              </div>
            </div>
          ) : (
            /* Hiển thị Card Mở khi click vào một công ty */
            <div className="relative pl-10 md:pl-14">
              {/* Đường dọc Timeline */}
              <div className="absolute left-[15px] md:left-[23px] top-8 bottom-0 w-[2px] bg-[#BCFEFE]"></div>

              {/* Mở ITEM 1: DN Group */}
              {openExp === 1 && (
                <div className="relative mb-12 animate-in fade-in zoom-in-95 duration-300">
                  <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-slate-50 z-10">1</div>
                  <div className="bg-white border border-[#2D99AE] p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                    <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0C5776] bg-slate-50 hover:bg-slate-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                      <span className="inline-flex items-center bg-[#BCFEFE]/40 text-[#0C5776] px-3.5 py-1 rounded-full text-[11px] md:text-xs font-bold tracking-wide">Thẩm mỹ • Chuỗi thương hiệu • Quy mô &gt;1.200 nhân sự</span>
                      <span className="inline-flex items-center bg-[#0C5776] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">05/2025 — x/x</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#001C44] mb-1">Tập đoàn Điểm Nhấn (DN Group)</h3>
                    <div className="text-lg font-bold text-[#0C5776] mb-5">Chuyên viên Marketing Ads</div>
                    <div className="mt-6">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0 p-1"><img src="/sc-logo.png" alt="Seoul Center" className="h-full w-full object-contain" /></div>
                          <span className="font-bold text-[#001C44] text-lg">Seoul Center</span>
                          <span className="bg-[#0C5776] text-white px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Triển khai và tối ưu Facebook Ads trong lĩnh vực thẩm mỹ / làm đẹp, tập trung tạo khách hàng tiềm năng và đặt lịch.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Lên kế hoạch chiến dịch theo phễu, test creative và audience, tối ưu CPL, CTR, ROAS theo KPI được giao.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Phối hợp với Content, Design và Sales / chi nhánh, theo dõi Pixel & CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, GA4, Google Sheets.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0 p-1"><img src="/scc-logo.png" alt="Seoul Center Clinic" className="h-full w-full object-contain" /></div>
                          <span className="font-bold text-[#001C44] text-lg">Seoul Center Clinic</span>
                          <span className="bg-[#0C5776] text-white px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Triển khai và tối ưu Facebook Ads cho phòng khám Seoul Center Clinic, tập trung tạo khách hàng tiềm năng và đặt lịch tư vấn / thăm khám qua tin nhắn.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Lên kế hoạch chiến dịch theo dịch vụ và chương trình ưu đãi, test creative và audience, tối ưu CPL, CTR theo KPI; phối hợp đội ngũ tư vấn và báo cáo hiệu quả định kỳ.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0 p-1"><img src="/sd-logo.png" alt="DN Home" className="h-full w-full object-contain" /></div>
                          <span className="font-bold text-[#001C44] text-lg">DN Home</span>
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0 p-1"><img src="/sa-logo.png" alt="Sacademy" className="h-full w-full object-contain" /></div>
                          <span className="font-bold text-[#001C44] text-lg">Sacademy</span>
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Mở ITEM 2: KENZE */}
              {openExp === 2 && (
                <div className="relative mb-12 animate-in fade-in zoom-in-95 duration-300">
                  <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-slate-50 z-10">2</div>
                  <div className="bg-white border border-[#2D99AE] p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                    <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0C5776] bg-slate-50 hover:bg-slate-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                      <span className="inline-flex items-center bg-[#BCFEFE]/40 text-[#0C5776] px-3.5 py-1 rounded-full text-[11px] md:text-xs font-bold tracking-wide">Nội thất xuất dư • Tồn kho • Rời công • Trưng bày</span>
                      <span className="inline-flex items-center bg-[#0C5776] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">x/x — x/x</span>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#001C44] mb-1">KENZE</h3>
                      <div className="text-lg font-bold text-[#0C5776]">Chuyên viên Marketing Ads</div>
                    </div>
                    <div className="mt-6">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0"><img src="/kz-logo.png" alt="KENZE Logo" className="h-full w-full object-cover" /></div>
                          <span className="font-bold text-[#001C44] text-lg">KENZE</span>
                          <span className="bg-[#0C5776] text-white px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Triển khai và tối ưu Facebook Ads cho sản phẩm nội thất xuất dư / tồn kho, tập trung tạo khách hàng tiềm năng và hỗ trợ chốt đơn qua tin nhắn.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Lên kế hoạch chiến dịch theo nhóm sản phẩm và chương trình xả kho, test creative và audience, tối ưu chi phí trên mỗi tin nhắn và khách hàng tiềm năng.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Phối hợp với bộ phận kho và Sales cập nhật tồn kho, giá bán; theo dõi Pixel & CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, Google Sheets.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0 p-1"><img src="/ymd-logo.png" alt="Yamado Logo" className="h-full w-full object-contain" /></div>
                          <span className="font-bold text-[#001C44] text-lg uppercase">YAMADO</span>
                          <span className="bg-[#0C5776] text-white px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Triển khai và tối ưu Facebook Ads cho Yamado Viet Nam Store, tập trung tạo khách hàng tiềm năng và doanh thu bán hàng qua tin nhắn / điện thoại.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Lên kế hoạch chiến dịch theo nhóm sản phẩm, test creative và audience, tối ưu CPL, CTR, ROAS theo KPI; phối hợp Sales xử lý đơn và báo cáo hiệu quả định kỳ.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-auto min-w-[80px] px-2 border border-slate-200 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0 py-1"><img src="/lzb-logo.png" alt="Lazybag Logo" className="h-full w-full object-contain" /></div>
                          <span className="font-bold text-[#001C44] text-lg">Lazybag</span>
                          <span className="bg-[#0C5776] text-white px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Triển khai và tối ưu Facebook Ads cho sản phẩm ghế lười Lazybag, tập trung tạo khách hàng tiềm năng và hỗ trợ chốt đơn qua tin nhắn.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Lên kế hoạch chiến dịch theo mẫu sản phẩm và chương trình ưu đãi, test creative hình ảnh / video và audience, tối ưu chi phí trên mỗi tin nhắn và khách hàng tiềm năng.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-auto min-w-[80px] px-2 border border-slate-200 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0 py-1"><img src="/ks-logo.png" alt="Kensonic Logo" className="h-full w-full object-contain" /></div>
                          <span className="font-bold text-[#001C44] text-lg uppercase">KENSONIC</span>
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mở ITEM 3: Miss Áo Dài */}
              {openExp === 3 && (
                <div className="relative mb-12 animate-in fade-in zoom-in-95 duration-300">
                  <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-slate-50 z-10">3</div>
                  <div className="bg-white border border-[#2D99AE] p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                    <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0C5776] bg-slate-50 hover:bg-slate-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                      <span className="inline-flex items-center bg-[#BCFEFE]/40 text-[#0C5776] px-3.5 py-1 rounded-full text-[11px] md:text-xs font-bold tracking-wide">Dịch vụ chụp ảnh • Áo dài • Gói trải nghiệm 2 in 1</span>
                      <span className="inline-flex items-center bg-[#0C5776] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">x/x — x/x</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#001C44] mb-1">Miss Áo Dài</h3>
                    <div className="text-lg font-bold text-[#0C5776] mb-5">Chuyên viên Marketing Ads</div>
                    <div className="mt-6">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0"><img src="/mad-logo.png" alt="Miss Áo Dài" className="h-full w-full object-cover" /></div>
                          <span className="font-bold text-[#001C44] text-lg">Miss Áo Dài</span>
                          <span className="bg-[#0C5776] text-white px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Triển khai và tối ưu Facebook Ads cho dịch vụ chụp ảnh áo dài và các gói trải nghiệm, tập trung tạo khách hàng tiềm năng và đặt lịch chụp qua tin nhắn.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Lên kế hoạch chiến dịch theo concept và mùa vụ (Liên Hoa, Xe Hoa, mùa sen, lễ Tết), test creative hình ảnh / video và audience, tối ưu chi phí trên mỗi tin nhắn và lượt đặt lịch.</li>
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Phối hợp với ekip chụp và Sales tư vấn gói dịch vụ, lịch chụp; theo dõi Pixel & CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, Google Sheets.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0"><img src="/mt-logo.png" alt="Mentor Club" className="h-full w-full object-cover" /></div>
                          <span className="font-bold text-[#001C44] text-lg">Mentor Club</span>
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                        </ul>
                      </div>
                      <hr className="border-slate-200 my-6" />
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-sm flex-shrink-0"><img src="/mp-logo.png" alt="Miss Personal Makeup" className="h-full w-full object-cover" /></div>
                          <span className="font-bold text-[#001C44] text-lg">Miss Personal Makeup</span>
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                        </div>
                        <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                          <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mở ITEM 4: Phan Trần */}
              {openExp === 4 && (
                <div className="relative mb-12 animate-in fade-in zoom-in-95 duration-300">
                  <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-[#0C5776] text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-slate-50 z-10">4</div>
                  <div className="bg-white border border-[#2D99AE] p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                    <button onClick={() => setOpenExp(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#0C5776] bg-slate-50 hover:bg-slate-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                      <span className="inline-flex items-center bg-[#BCFEFE]/40 text-[#0C5776] px-3.5 py-1 rounded-full text-[11px] md:text-xs font-bold tracking-wide">In vải • In ấn & gia công trên vải</span>
                      <span className="inline-flex items-center bg-[#0C5776] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">x/x — x/x</span>
                    </div>
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div className="w-16 h-16 rounded-full border border-slate-200 overflow-hidden flex-shrink-0 bg-white flex items-center justify-center shadow-sm p-1"><img src="/pt-logo.png" alt="Phan Trần Logo" className="w-full h-full object-contain" /></div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-[#001C44]">PHAN TRAN</h3>
                        <div className="text-base font-bold text-[#0C5776]">Chuyên viên Marketing Ads</div>
                      </div>
                    </div>
                    <ul className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                      <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Triển khai và tối ưu Facebook Ads cho dịch vụ in vải, tập trung tạo khách hàng tiềm năng là chủ xưởng may, shop thời trang và nhận đơn đặt in qua tin nhắn.</li>
                      <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Lên kế hoạch chiến dịch theo nhóm dịch vụ in và mùa vụ thời trang, test creative hình ảnh / video mẫu in thực tế và audience, tối ưu chi phí trên mỗi tin nhắn và khách hàng tiềm năng.</li>
                      <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-[#0C5776]"></div>Phối hợp với bộ phận sản xuất và Sales để báo giá, chốt đơn; theo dõi Pixel & CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, Google Sheets.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================= FEATURED PROJECTS ================= */}
      <section id="projects" className="py-20 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 rounded-lg bg-[#0C5776] text-white shadow-md">
              <Briefcase size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#001C44]">Dự án tiêu biểu</h2>
          </div>

          <div className="space-y-12">
            {/* Project: Tập đoàn Điểm Nhấn (DN Group) */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              
              {/* Card Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-auto flex-shrink-0">
                    <img src="/dn-logo.png" alt="DN Group" className="h-full object-contain" />
                  </div>
                  <h3 className="text-[17px] font-extrabold text-[#001C44]">Tập đoàn Điểm Nhấn</h3>
                </div>
                <div className="text-xs font-bold text-slate-400 tracking-wider uppercase">Khối Dự Án</div>
              </div>

              {/* Cover Image */}
              <div className="w-full h-48 md:h-80 bg-slate-100 overflow-hidden relative">
                <img src="/VLTX/vltx-cv.jpg" alt="Vẽ Lại Thanh Xuân Cover" className="w-full h-full object-cover" />
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-8">
                <div className="inline-block px-3 py-1 rounded-full bg-[#BCFEFE]/30 text-[#0C5776] text-[11px] font-bold mb-4 border border-[#BCFEFE]/50">
                  Seoul Center • Chiến dịch truyền thông
                </div>
                
                <h4 className="text-2xl font-extrabold text-[#001C44] mb-2">Vẽ Lại Thanh Xuân</h4>
                <p className="text-slate-600 text-sm md:text-base mb-6">
                  Tham gia đề xuất và nhận nhiệm vụ truyền thông qua MXH.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs text-slate-500 font-medium px-3 py-1 bg-slate-50 border border-slate-200 rounded-md">Cà Mau — 26/09/2026</span>
                  <span className="text-xs text-slate-500 font-medium px-3 py-1 bg-slate-50 border border-slate-200 rounded-md">+10 chi nhánh khác</span>
                  <span className="text-xs text-slate-500 font-medium px-3 py-1 bg-slate-50 border border-slate-200 rounded-md">Truyền thông MXH</span>
                </div>

                {/* Nút Toggle Bộ hình ảnh chiến dịch */}
                <div 
                  className="mb-4 flex items-center justify-between cursor-pointer group/gallery bg-slate-50 hover:bg-slate-100 p-3.5 rounded-xl border border-slate-200 transition-all shadow-sm"
                  onClick={() => setOpenGallery(!openGallery)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#0C5776] text-white p-1.5 rounded-lg shadow-sm">
                      <ImageIcon size={18} />
                    </div>
                    <h5 className="font-extrabold text-[#001C44] text-sm uppercase tracking-wide">Bộ hình ảnh chiến dịch</h5>
                    <span className="bg-white text-slate-500 px-2 py-0.5 rounded text-xs font-bold border border-slate-200 shadow-sm">8 ảnh</span>
                  </div>
                  <div className="text-slate-400 group-hover/gallery:text-[#0C5776] transition-colors bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
                    {openGallery ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Masonry-style Grid cho hình ảnh chiến dịch (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openGallery && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                      animate={{ height: "auto", opacity: 1, marginBottom: 24 }}
                      exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                      transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Cột trái (Chiếm 7 phần trên Desktop) */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    {/* Hàng trên cùng: Hình banner ngang lớn */}
                    <div className="w-full rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                      <img src="/VLTX/vltx-cv.jpg" alt="Campaign Image 1" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    {/* Hàng dưới chia 2 cột */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Hình dọc cao (Bên trái) */}
                      <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                        <img src="/VLTX/vltx-stendee1.jpg" alt="Campaign Image 2" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      
                      {/* Hình chia 2 nhỏ (Bên phải) */}
                      <div className="flex flex-col gap-4">
                        {/* Hình chữ nhật ngang nhỏ */}
                        <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                          <img src="/VLTX/vltx-bn.jpg" alt="Campaign Image 3" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        {/* Hình vuông/chữ nhật lớn hơn ở dưới */}
                        <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                          <img src="/VLTX/MB.PNG" alt="Campaign Image 4" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cột phải (Chiếm 5 phần trên Desktop) */}
                  <div className="md:col-span-5 flex flex-col gap-4">
                    {/* Hình dọc lớn */}
                    <div className="w-full rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                      <img src="/VLTX/vltx-stendee.png" alt="Campaign Image 5" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  
                  {/* Hàng dưới cùng: 3 hình bằng nhau */}
                  <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                     <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                        <img src="/VLTX/vltx-bttt.png" alt="Campaign Image 6" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                        <img src="/VLTX/vltx-mt.png" alt="Campaign Image 7" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
                        <img src="/VLTX/vltx-mt1.png" alt="Campaign Image 8" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                     </div>
                  </div>

                  </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Nút Toggle KPI Thực Đạt */}
                <div 
                  className="mb-2 flex items-center justify-between cursor-pointer group/kpi bg-slate-50 hover:bg-slate-100 p-3.5 rounded-xl border border-slate-200 transition-all shadow-sm"
                  onClick={() => setOpenKPI(!openKPI)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="bg-[#0C5776] text-white p-1.5 rounded-lg shadow-sm">
                      <BarChart2 size={18} />
                    </div>
                    <h5 className="font-extrabold text-[#001C44] text-sm uppercase tracking-wide">KPI Thực Đạt</h5>
                    <span className="bg-white text-slate-500 px-2 py-0.5 rounded text-xs font-bold border border-slate-200 shadow-sm">Số liệu chiến dịch</span>
                  </div>
                  <div className="text-slate-400 group-hover/kpi:text-[#0C5776] transition-colors bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
                    {openKPI ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Khối KPI (Đóng/Mở với Framer Motion) */}
                <AnimatePresence initial={false}>
                  {openKPI && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    
                    {/* KPI 1 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:border-emerald-400 hover:shadow-emerald-50 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                      <div className="absolute -bottom-3 -right-3 opacity-[0.03] group-hover/item:opacity-10 transition-opacity duration-500 group-hover/item:-translate-y-2 group-hover/item:scale-110">
                        <TrendingUp size={80} className="text-emerald-500" />
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2 relative z-10">
                        <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 drop-shadow-sm">
                          <CountUp end={900} duration={2.5} enableScrollSpy scrollSpyOnce />+
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider relative z-10">Data khách mới</div>
                    </div>

                    {/* KPI 2 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:border-emerald-400 hover:shadow-emerald-50 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                      <div className="absolute -bottom-3 -right-3 opacity-[0.03] group-hover/item:opacity-10 transition-opacity duration-500 group-hover/item:-translate-y-2 group-hover/item:scale-110">
                        <TrendingUp size={80} className="text-emerald-500" />
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2 relative z-10">
                        <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 drop-shadow-sm">
                          <CountUp end={48} duration={2.5} enableScrollSpy scrollSpyOnce />%
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider relative z-10">Lịch khách mới</div>
                    </div>

                    {/* KPI 3 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:border-emerald-400 hover:shadow-emerald-50 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                      <div className="absolute -bottom-3 -right-3 opacity-[0.03] group-hover/item:opacity-10 transition-opacity duration-500 group-hover/item:-translate-y-2 group-hover/item:scale-110">
                        <TrendingUp size={80} className="text-emerald-500" />
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2 relative z-10">
                        <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 drop-shadow-sm">
                          <CountUp end={78} duration={2.5} enableScrollSpy scrollSpyOnce />%
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider relative z-10">Khách mới</div>
                    </div>

                    {/* KPI 4 */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:border-emerald-400 hover:shadow-emerald-50 transition-all flex flex-col justify-center group/item relative overflow-hidden">
                      <div className="absolute -bottom-3 -right-3 opacity-[0.03] group-hover/item:opacity-10 transition-opacity duration-500 group-hover/item:-translate-y-2 group-hover/item:scale-110">
                        <TrendingUp size={80} className="text-emerald-500" />
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2 relative z-10">
                        <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 drop-shadow-sm">
                          <CountUp end={2.6} decimals={1} duration={2.5} enableScrollSpy scrollSpyOnce />x
                        </div>
                      </div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider relative z-10">ROAS</div>
                    </div>

                  </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Có thể thêm các khối dự án khác ở đây bằng cách copy/paste cấu trúc của thẻ div ở trên */}

          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex p-2 rounded bg-[#0C5776] text-white mb-4 shadow-sm">
            <Mail size={24} />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[#001C44] mb-4">Hãy kết nối với tôi</h2>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-lg mx-auto">
            Bạn có dự án cần hợp tác hoặc muốn trao đổi thêm về công nghệ? Hãy gửi tin nhắn cho tôi ngay nhé!
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-left max-w-lg mx-auto">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ tên</label>
              <input 
                type="text" 
                placeholder="Nhập tên của bạn..." 
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0C5776] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0C5776] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nội dung</label>
              <textarea 
                rows={4} 
                placeholder="Nhập nội dung tin nhắn..." 
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0C5776] focus:bg-white transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-[#0C5776] text-white font-bold text-sm rounded-lg hover:bg-[#2D99AE] transition-all shadow-lg shadow-[#0C5776]/20 flex items-center justify-center gap-2"
            >
              Gửi tin nhắn <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 border-t border-slate-200 text-center text-xs text-slate-500 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Portfolio. Designed & Built with passion.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#0C5776] transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02_0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#0C5776] transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
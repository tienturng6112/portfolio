"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { 
  Briefcase, User, Mail, Sparkles, ArrowRight, ArrowUpRight,
  ChevronDown, ChevronUp, Image as ImageIcon, BarChart2, TrendingUp, TrendingDown,
  MapPin, Monitor, Target, Video, ShoppingBag, Cpu, PieChart, Filter, Layers, FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const ProductCoverflowCarousel = dynamic(
  () => import("@/components/ProductCoverflowCarousel"),
  { 
    ssr: false,
    loading: () => <div className="w-full h-72 bg-slate-100 animate-pulse rounded-2xl mt-5"></div>
  }
);

function MagnifierImage({
  src,
  alt,
  zoom = 2.6,
  lensSize = 180,
}: {
  src: string;
  alt: string;
  zoom?: number;
  lensSize?: number;
}) {
  const [showLens, setShowLens] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y, w: rect.width, h: rect.height });
  };

  return (
    <>
      <div
        className="relative w-full overflow-hidden rounded-xl cursor-zoom-in select-none group"
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-auto object-contain rounded-xl block transition-transform duration-300 group-hover:scale-[1.01]"
        />

        {/* Nhãn gợi ý nhấn để phóng to trên Mobile */}
        <div className="md:hidden absolute bottom-2 right-2 bg-zinc-900/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 pointer-events-none shadow-sm z-10">
          <span>🔍 Chạm để phóng to</span>
        </div>

        {/* Kính lúp hình tròn chỉ hiển thị khi rê chuột trên Desktop (md trở lên) */}
        {showLens && pos.w > 0 && (
          <div
            className="hidden md:block pointer-events-none absolute rounded-full border-2 border-lime-400 shadow-2xl ring-4 ring-zinc-900/10 z-30 bg-white bg-no-repeat"
            style={{
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              left: `${pos.x - lensSize / 2}px`,
              top: `${pos.y - lensSize / 2}px`,
              backgroundImage: `url("${src}")`,
              backgroundSize: `${pos.w * zoom}px ${pos.h * zoom}px`,
              backgroundPositionX: `${-pos.x * zoom + lensSize / 2}px`,
              backgroundPositionY: `${-pos.y * zoom + lensSize / 2}px`,
            }}
          />
        )}
      </div>

      {/* Modal Lightbox phóng to ảnh khi nhấn vào (Hỗ trợ cả Mobile & Desktop) */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "opacity" }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 cursor-zoom-out"
          >
            {/* Nút Đóng góc trên bên phải */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="fixed top-4 right-4 z-50 bg-white/15 hover:bg-white/25 text-white rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md transition-colors cursor-pointer"
            >
              ✕ Đóng
            </button>

            {/* Khung cuộn xem ảnh phóng to sắc nét */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white p-1.5 sm:p-2 shadow-2xl"
            >
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1200}
                className="w-full min-w-[680px] sm:min-w-0 h-auto object-contain rounded-xl block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PreviewPopupImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative w-full h-full overflow-hidden rounded-xl cursor-zoom-in select-none group"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto object-contain rounded-xl block transition-transform duration-300 group-hover:scale-[1.01]"
        />

        {/* Nhãn gợi ý nhấn để phóng to (Trên PC hiện khi di chuột vào, trên Mobile hiện sẵn) */}
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 absolute bottom-2.5 right-2.5 bg-zinc-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none shadow-md z-10">
          <span>🔍 Nhấn để phóng to</span>
        </div>
      </div>

      {/* Modal Lightbox chỉ hiện khi nhấn vào ảnh */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "opacity" }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 cursor-zoom-out"
          >
            {/* Nút Đóng góc trên bên phải */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="fixed top-4 right-4 z-50 bg-white/15 hover:bg-white/25 text-white rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md transition-colors cursor-pointer"
            >
              ✕ Đóng
            </button>

            {/* Khung ảnh phóng to sắc nét */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[94vw] xl:max-w-7xl max-h-[90vh] overflow-auto rounded-2xl bg-white p-2 shadow-2xl border-2 border-lime-400 cursor-default"
            >
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1200}
                className="w-full min-w-[720px] sm:min-w-0 h-auto object-contain rounded-xl block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AnimatedCounter({ 
  value, 
  suffix = "%", 
  isText = false,
  decimals
}: { 
  value: number | string; 
  suffix?: string; 
  isText?: boolean;
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isText) return;
    const end = typeof value === 'string' ? parseFloat(value.toString().replace(',', '.')) : value;
    if (isNaN(end)) return;

    const duration = 1200; // Thời gian chạy hiệu ứng (1.2 giây)
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Hiệu ứng Ease-out Expo giúp số chạy nhanh lúc đầu và chậm dần về cuối
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(end * easeOut);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };
    requestAnimationFrame(updateCounter);
  }, [value, isText]);

  if (isText || (typeof value === 'string' && isNaN(parseFloat(value.toString().replace(',', '.'))))) {
    return <>{value}</>;
  }

  const numVal = typeof value === 'string' ? parseFloat(value.toString().replace(',', '.')) : value;
  const isInteger = Number.isInteger(numVal);
  const defaultDecimals = typeof value === 'string' && value.includes(',') 
    ? value.split(',')[1].length 
    : (value.toString().includes('.') ? value.toString().split('.')[1].length : 1);
  const numDecimals = decimals !== undefined ? decimals : defaultDecimals;
  const formatted = isInteger
    ? Math.round(displayValue).toString()
    : displayValue.toFixed(numDecimals).replace('.', ',');

  return <>{formatted}{suffix}</>;
}

function FloatingBotMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const menuItems = [
    { id: "about", label: "Về bản thân tôi", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /> },
    { id: "projects", label: "Dự án đã thực hiện", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.118v0H5.622c-1.085-.082-1.872-1.024-1.872-2.118v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /> },
    { id: "skills", label: "Năng lực Marketing Ads", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /> },
    { id: "cv", label: "Xem CV của tôi", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> },
    { id: "contact", label: "Liên hệ hợp tác", icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /> }
  ];

  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[100] flex items-center gap-4">
      {/* Khối Menu trượt ra (Giữ nguyên) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, scale: 0.95, filter: "blur(2px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-[110px] w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden"
          >
            <div className="flex justify-end p-2 pb-0">
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex flex-col px-4 pb-4">
              {menuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between py-3.5 text-sm font-semibold text-slate-600 hover:text-lime-600 transition-colors group ${index !== menuItems.length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{item.icon}</svg>
                    {item.label}
                  </div>
                  <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LỚP 1: HIỆU ỨNG BAY 1 VÒNG KHI VỪA LOAD TRANG */}
      <motion.div
        initial={{ x: "20vw", y: "50vh", scale: 0.2, opacity: 0, rotate: -45 }}
        animate={{
          x: ["20vw", "-50vw", "-35vw", "-10vw", "0vw"], 
          y: ["50vh", "10vh", "-35vh", "-10vh", "0vh"],
          scale: [0.2, 1.2, 0.8, 1.1, 1],
          opacity: [0, 1, 1, 1, 1],
          rotate: [-45, 15, 45, -10, 0] // Nghiêng theo hướng bay
        }}
        transition={{
          duration: 2.2, // Thời gian bay lượn (2.2 giây)
          ease: "easeInOut",
          times: [0, 0.4, 0.7, 0.9, 1] // Canh thời điểm tại 5 mốc tọa độ
        }}
        className="relative flex items-center justify-center"
      >
        {/* Vòng hào quang nhấp nháy */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute w-16 h-16 bg-lime-400 rounded-full blur-xl z-0 pointer-events-none"
        />

        {/* LỚP 2: HIỆU ỨNG LƠ LỬNG TẠI CHỖ (Hoạt động sau khi hạ cánh) */}
        <motion.div
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, -3, 3, 0] // Nghiêng nhẹ qua lại như lơ lửng trên nước
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut" 
          }}
          whileHover={{ scale: 1.1, rotate: 0 }}
          whileTap={{ scale: 0.9 }}
          className="relative z-10 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_15px_20px_rgba(132,204,22,0.4)]">
            <img src="/bot-mascot.webp" alt="Trung Tiến AI Bot" className="w-full h-full object-contain" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PortfolioPage() {
  // === SPLASH SCREEN STATES ===
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "PORTFOLIO";

  // === INTERACTIVE STATES ===
  const [openExp, setOpenExp] = useState<number | null>(null);
  const [openExpKPI, setOpenExpKPI] = useState(false);
  // Cho phép mở Facebook, mở TikTok, mở Google hoặc thu gọn (null)
  const [activeAdPlatform, setActiveAdPlatform] = useState<"facebook" | "tiktok" | "google" | null>("facebook");

  const fbSectionRef = useRef<HTMLDivElement>(null);
  const tiktokSectionRef = useRef<HTMLDivElement>(null);
  const googleSectionRef = useRef<HTMLDivElement>(null);

  const handleTogglePlatform = (
    platform: "facebook" | "tiktok" | "google",
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    const nextState = activeAdPlatform === platform ? null : platform;
    setActiveAdPlatform(nextState);

    // Nếu mở một khối mới, giữ vị trí khung nhìn neo chuẩn tại đầu khối đó sau khi animation bắt đầu
    if (nextState !== null) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 150);
    }
  };
  const [expMonthIdx, setExpMonthIdx] = useState(0); // Mặc định ở Tháng 8/2026
  const expMonths = [
    { 
      month: "Tháng 5/2026", 
      img: "/t5-report-m.png", 
      revenue: "101,8%", 
      revenueVal: 101.8,
      totalData: "110,9%", 
      totalDataVal: 110.9,
      avgData: "109,1%", 
      khachMoiVal: 109.1,
      avgNewCust: "98,6%", 
      tbKhachVal: 98.6
    },
    { 
      month: "Tháng 4/2026", 
      img: "/t4-report-m.png", 
      revenue: "86,4%", 
      revenueVal: 86.4,
      totalData: "100%", 
      totalDataVal: 100.0,
      avgData: "100%", 
      khachMoiVal: 100.0,
      avgNewCust: "145,8%", 
      tbKhachVal: 145.8
    },
    { 
      month: "Tháng 7/2026", 
      img: "/t7-report-m.png", 
      revenue: "92,2%", 
      revenueVal: 92.2,
      totalData: "130,9%", 
      totalDataVal: 130.9,
      avgData: "100%", 
      khachMoiVal: 100.0,
      avgNewCust: "92,6%", 
      tbKhachVal: 92.6
    },
  ];
  const [expConvIdx, setExpConvIdx] = useState(0);

  // Slide 1: Nguồn-kênh và nguồn Data mới (Cột chồng: Xanh lá + Xanh dương)
  const convChartSlide1 = [
    { name: "FACEBOOK ADS", khachMoi: 250, dataMoi: 1380 },
    { name: "CHI NHÁNH", khachMoi: 110, dataMoi: 540 },
    { name: "GOOGLE", khachMoi: 60, dataMoi: 370 },
    { name: "TIKTOK", khachMoi: 15, dataMoi: 85 },
    { name: "TỔNG ĐÀI", khachMoi: 30, dataMoi: 145 },
    { name: "OFFLINE", khachMoi: 10, dataMoi: 55 },
    { name: "NV KINH DOANH", khachMoi: 25, dataMoi: 195 },
    { name: "WEB", khachMoi: 20, dataMoi: 125 },
    { name: "ZALO", khachMoi: 8, dataMoi: 42 },
    { name: "CỘNG TÁC VIÊN", khachMoi: 22, dataMoi: 98 },
    { name: "PARTNERSHIP", khachMoi: 5, dataMoi: 18 },
    { name: "CALLBOT", khachMoi: 2, dataMoi: 8 },
  ];

  // Slide 2: Chi phí - Doanh thu - ROAS theo kênh (Cột đôi: Cam + Xanh dương, đơn vị: Triệu đồng)
  const convChartSlide2 = [
    { name: "FACEBOOK ADS", chiPhi: 620, doanhThu: 2280 },
    { name: "CHI NHÁNH", chiPhi: 0, doanhThu: 1100 },
    { name: "GOOGLE", chiPhi: 240, doanhThu: 560 },
    { name: "CỘNG TÁC VIÊN", chiPhi: 0, doanhThu: 350 },
    { name: "WEB", chiPhi: 0, doanhThu: 200 },
    { name: "TỔNG ĐÀI", chiPhi: 0, doanhThu: 140 },
    { name: "TIKTOK", chiPhi: 240, doanhThu: 100 },
    { name: "NV KINH DOANH", chiPhi: 0, doanhThu: 80 },
    { name: "CHƯA XÁC ĐỊNH", chiPhi: 0, doanhThu: 65 },
    { name: "OFFLINE", chiPhi: 0, doanhThu: 55 },
    { name: "ZALO", chiPhi: 0, doanhThu: 35 },
    { name: "PARTNERSHIP", chiPhi: 0, doanhThu: 15 },
  ];

  // Slide 3: Khách mới & Chi phí/khách mới theo kênh (Cột đơn: Xanh lá)
  const convChartSlide3 = [
    { name: "FACEBOOK ADS", khachMoi: 220 },
    { name: "CHI NHÁNH", khachMoi: 96 },
    { name: "GOOGLE", khachMoi: 48 },
    { name: "TỔNG ĐÀI", khachMoi: 28 },
    { name: "TIKTOK", khachMoi: 25 },
    { name: "CỘNG TÁC VIÊN", khachMoi: 20 },
    { name: "NV KINH DOANH", khachMoi: 17 },
    { name: "WEB", khachMoi: 10 },
    { name: "OFFLINE", khachMoi: 5 },
    { name: "ZALO", khachMoi: 3 },
    { name: "CHƯA XÁC ĐỊNH", khachMoi: 1 },
    { name: "PARTNERSHIP", khachMoi: 1 },
  ];

  const expConversions = [
    {
      title: "Nguồn-kênh và nguồn Data mới",
      subtitle: "SL Data mới theo Nguồn - Kênh (top 12 nguồn-kênh theo SL Data mới)",
    },
    {
      title: "Chi phí - Doanh thu - ROAS theo kênh (ROAS = DT KM ÷ chi phí)",
      subtitle: "top 12 nguồn-kênh theo doanh thu",
    },
    {
      title: "Khách mới & Chi phí/khách mới theo kênh (CP/khách = chi phí ÷ khách mới)",
      subtitle: "top 12 nguồn-kênh theo số khách mới",
    },
  ];

  const [openGallery, setOpenGallery] = useState(false);
  const [openKPI, setOpenKPI] = useState(false);
  const [openGallery2, setOpenGallery2] = useState(false);
  const [openKPI2, setOpenKPI2] = useState(false);
  const [openGallery3, setOpenGallery3] = useState(false);
  const [openKPI3, setOpenKPI3] = useState(false);
  const [openGallery4, setOpenGallery4] = useState(false);
  const [openKPI4, setOpenKPI4] = useState(false);
  const [showCuaThienGallery, setShowCuaThienGallery] = useState(false);
  const [showTetXuaGallery, setShowTetXuaGallery] = useState(false);
  const [showSanDinhGallery, setShowSanDinhGallery] = useState(false);
  const [showFbAdsCuaThien, setShowFbAdsCuaThien] = useState(false);
  const [showFbAdsTetXua, setShowFbAdsTetXua] = useState(false);
  const [showFbAdsSanDinh, setShowFbAdsSanDinh] = useState(false);

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
      <section id="cv" className="relative z-10 max-w-5xl mx-auto px-6 pt-6 pb-12 md:pt-10 md:pb-16">
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
              <Image 
                src="/maincv-s.png" 
                alt="Trung Tiến" 
                fill
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                className="object-contain object-bottom drop-shadow-2xl"
                priority
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
                  onClick={() => { setOpenExp(1); setOpenExpKPI(false); }}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">1</div>
                    <div className="text-slate-400 text-xs font-medium">Xem thêm</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <Image src="/dn-logo.png" alt="DN Group Logo" width={160} height={80} className="h-16 md:h-20 w-auto object-contain mb-5 group-hover/card:scale-105 transition-transform duration-300" />
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900 mb-1">Tập đoàn Điểm Nhấn (DN Group)</h3>
                    <div className="text-xs font-medium text-slate-500">Chuyên viên Marketing Ads</div>
                  </div>
                </div>

                {/* ITEM 2: KENZE */}
                <div 
                  onClick={() => { setOpenExp(2); setOpenExpKPI(false); }}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">2</div>
                    <div className="text-slate-400 text-xs font-medium">Xem thêm</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-5 group-hover/card:scale-105 transition-transform duration-300 shadow-xs border border-slate-100">
                      <Image src="/logo-kenze.png" alt="KENZE Logo" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900 mb-1 uppercase">NỘI THẤT XUẤT DƯ - KENZE</h3>
                    <div className="text-xs font-medium text-slate-500">Nhân viên kho - Vận hành sàn TMĐT</div>
                  </div>
                </div>

                {/* ITEM 3: Miss Áo Dài */}
                <div 
                  onClick={() => { setOpenExp(3); setOpenExpKPI(false); }}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">3</div>
                    <div className="text-slate-400 text-xs font-medium">Xem thêm</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-5 group-hover/card:scale-105 transition-transform duration-300 shadow-xs border border-slate-100">
                      <Image src="/logo-missaodai.png" alt="Miss Áo Dài Logo" width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-base md:text-lg font-extrabold text-zinc-900 mb-1">Miss Áo Dài</h3>
                    <div className="text-xs font-medium text-slate-500">Chuyên viên Marketing Ads</div>
                  </div>
                </div>

                {/* ITEM 4: Phan Trần */}
                <div 
                  onClick={() => { setOpenExp(4); setOpenExpKPI(false); }}
                  className="bg-white border border-slate-200 rounded-2xl hover:border-lime-500 hover:shadow-md transition-all cursor-pointer flex flex-col p-6 group/card relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">4</div>
                    <div className="text-slate-400 text-xs font-medium">Xem thêm</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-2">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-5 group-hover/card:scale-105 transition-transform duration-300 shadow-xs border border-slate-100 bg-white p-1.5">
                      <Image src="/logo-phantran.png" alt="Phan Trần Logo" width={96} height={96} className="w-full h-full object-contain" />
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
                      <button onClick={() => { setOpenExp(null); setOpenExpKPI(false); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">Thẩm mỹ • Chuỗi thương hiệu • Quy mô &gt;1.200 nhân sự</span>
                        
                      </div>
                      <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">Tập đoàn Điểm Nhấn (DN Group)</h3>
                      <div className="text-base font-bold text-lime-600 mb-5">Chuyên viên Marketing Ads</div>
                      <div className="mt-6">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><Image src="/logo-sc.png" alt="Seoul Center" width={40} height={40} className="h-full w-full object-contain" /></div>
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
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><Image src="/logo-scclinic.png" alt="Seoul Center Clinic" width={40} height={40} className="h-full w-full object-contain" /></div>
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
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><Image src="/logo-dnhome.png" alt="DN Home" width={40} height={40} className="h-full w-full object-contain" /></div>
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
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><Image src="/logo-sacademy.png" alt="Sacademy" width={40} height={40} className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">S Academy</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>
                        {/* Thương hiệu phụ Shark Dental (Chỉ thêm vào cuối openExp === 1) */}
                        <hr className="border-slate-200 my-6" />
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 text-xs font-extrabold text-blue-700">SD</div>
                            <span className="font-bold text-zinc-900 text-lg">Shark Dental</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>
                        </div>

{/* Nút XEM SỐ LIỆU THỰC TẾ */}
                        <hr className="border-slate-200 my-6" />
                        <button
                          type="button"
                          onClick={() => setOpenExpKPI(!openExpKPI)}
                          className="w-full bg-lime-400 hover:bg-lime-500 text-zinc-950 rounded-xl px-5 py-3.5 flex items-center justify-between transition-all shadow-xs cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <BarChart2 size={18} strokeWidth={2.5} />
                            <span className="text-xs font-black uppercase tracking-widest">XEM SỐ LIỆU THỰC TẾ</span>
                          </div>
                          {openExpKPI ? <ChevronUp size={18} strokeWidth={2.5} /> : <ChevronDown size={18} strokeWidth={2.5} />}
                        </button>

                        {/* Khối Số liệu thực tế (Facebook Ads + Chuyển đổi nổi bật) */}
                        <AnimatePresence initial={false}>
                          {openExpKPI && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-1 [overflow-anchor:none]">
                                
                                {/* ================= KHỐI 1: SỐ LIỆU FACEBOOK ADS (Bấm vào để thu gọn / mở rộng) ================= */}
        <div ref={fbSectionRef} className="border border-slate-200/90 rounded-2xl p-4 sm:p-6 bg-white/90 mt-3.5 transition-all shadow-2xs [overflow-anchor:none] scroll-mt-24">
          {/* Header bấm đóng/mở Facebook Ads */}
          <div
            onClick={() => handleTogglePlatform("facebook", fbSectionRef)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-lime-400 text-zinc-950 flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V6.65c0-1.05.29-1.73 1.76-1.73Z" />
                </svg>
              </div>
              <div>
                <div className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900">
                  SỐ LIỆU FACEBOOK ADS
                </div>
                <div className="h-1 w-full bg-lime-400 rounded-full mt-1"></div>
              </div>
            </div>
            <div className="text-slate-400">
              {activeAdPlatform === "facebook" ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
            </div>
          </div>

          {/* Nội dung thu gọn/mở rộng của SỐ LIỆU FACEBOOK ADS */}
          <AnimatePresence initial={false}>
            {activeAdPlatform === "facebook" && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* 1.1 Khung xanh lá: THÁNG NỔI BẬT + ẢNH BÁO CÁO + 4 THẺ CHỈ SỐ % */}
                <div className="bg-lime-50/70 border border-lime-200/60 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-lime-700 mb-1">
                        THÁNG NỔI BẬT
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={expMonthIdx}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-2xl sm:text-3xl font-black text-zinc-900 leading-none mb-2"
                        >
                          {expMonths[expMonthIdx].month}
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex items-center gap-1.5">
                        {expMonths.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setExpMonthIdx(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                              expMonthIdx === idx ? "bg-zinc-900" : "bg-zinc-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpMonthIdx((prev) => (prev - 1 + expMonths.length) % expMonths.length)}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-lime-500 flex items-center justify-center text-zinc-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpMonthIdx((prev) => (prev + 1) % expMonths.length)}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-lime-500 flex items-center justify-center text-zinc-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-white border border-slate-200/80 rounded-xl p-2 overflow-hidden shadow-2xs">
                    <MagnifierImage
                      src={expMonths[expMonthIdx].img}
                      alt={`Báo cáo ${expMonths[expMonthIdx].month}`}
                      zoom={2.6}
                      lensSize={180}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">DOANH THU</div>
                      <div className={`text-xl sm:text-2xl font-black ${
                        (expMonths[expMonthIdx].revenueVal ?? 0) > 100 ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" : "text-emerald-600"
                      }`}>
                        <AnimatedCounter value={expMonths[expMonthIdx].revenueVal ?? 101.8} />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">TỔNG DATA</div>
                      <div className={`text-xl sm:text-2xl font-black ${
                        (expMonths[expMonthIdx].totalDataVal ?? 0) > 100 ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" : "text-emerald-600"
                      }`}>
                        <AnimatedCounter value={expMonths[expMonthIdx].totalDataVal ?? 110.9} />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">KHÁCH MỚI</div>
                      <div className={`text-xl sm:text-2xl font-black ${
                        (expMonths[expMonthIdx].khachMoiVal ?? 0) > 100 ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" : "text-emerald-600"
                      }`}>
                        <AnimatedCounter value={expMonths[expMonthIdx].khachMoiVal ?? 109.1} />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">TB KHÁCH MỚI</div>
                      <div className={`text-xl sm:text-2xl font-black ${
                        (expMonths[expMonthIdx].tbKhachVal ?? 0) > 100 ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]" : "text-emerald-600"
                      }`}>
                        <AnimatedCounter value={expMonths[expMonthIdx].tbKhachVal ?? 98.6} />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200/80 my-7" />

                {/* 1.2 Khối con: SỐ LIỆU CHUYỂN ĐỔI NỔI BẬT */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="inline-flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                        <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900">
                          SỐ LIỆU CHUYỂN ĐỔI NỔI BẬT
                        </div>
                        <div className="h-1 w-full bg-lime-400 rounded-full mt-1 mb-2"></div>
                        <div className="flex items-center gap-1.5">
                          {expConversions.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setExpConvIdx(idx)}
                              className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                                expConvIdx === idx ? "bg-zinc-900" : "bg-zinc-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpConvIdx((prev) => (prev - 1 + expConversions.length) % expConversions.length)}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-lime-500 flex items-center justify-center text-zinc-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpConvIdx((prev) => (prev + 1) % expConversions.length)}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-lime-500 flex items-center justify-center text-zinc-800 transition-colors shadow-2xs cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Giữ nguyên khung Biểu đồ động 3 Slide với Recharts của SỐ LIỆU CHUYỂN ĐỔI NỔI BẬT ở đây */}
                  <div className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-6 relative overflow-hidden">
                    <div className="w-full bg-white rounded-xl p-4 sm:p-5 border border-slate-100 shadow-2xs">
                      <div className="text-left mb-4">
                        <div className="text-xs sm:text-sm font-extrabold text-zinc-900 transition-all duration-150">
                          {expConversions[expConvIdx].title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium mt-0.5 transition-all duration-150">
                          {expConversions[expConvIdx].subtitle}
                        </div>
                      </div>
                      <div className="w-full h-64 sm:h-72">
                        <ResponsiveContainer width="100%" height="100%" debounce={1}>
                          {expConvIdx === 0 ? (
                            /* SLIDE 1: Biểu đồ cột chồng Nguồn-kênh & Data mới */
                            <BarChart key="chart-slide-0" data={convChartSlide1} margin={{ top: 10, right: 10, left: -15, bottom: 35 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis
                                dataKey="name"
                                tick={{ fontSize: 9, fill: "#64748b", fontWeight: 600 }}
                                interval={0}
                                angle={-28}
                                textAnchor="end"
                              />
                              <YAxis
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                domain={[0, 1800]}
                                ticks={[0, 450, 900, 1350, 1800]}
                              />
                              <Tooltip
                                cursor={{ fill: "#f8fafc" }}
                                contentStyle={{ backgroundColor: "#18181b", borderRadius: "10px", border: "none", color: "#fff", fontSize: "12px" }}
                                labelStyle={{ color: "#a3e635", fontWeight: "bold", marginBottom: "4px" }}
                              />
                              <Bar
                                dataKey="khachMoi"
                                name="Khách mới"
                                stackId="a"
                                fill="#16a34a"
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={450}
                                animationEasing="ease-out"
                              />
                              <Bar
                                dataKey="dataMoi"
                                name="Data mới"
                                stackId="a"
                                fill="#2563eb"
                                radius={[4, 4, 0, 0]}
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={450}
                                animationEasing="ease-out"
                              />
                            </BarChart>
                          ) : expConvIdx === 1 ? (
                            /* SLIDE 2: Biểu đồ cột đôi Chi phí - Doanh thu */
                            <BarChart key="chart-slide-1" data={convChartSlide2} margin={{ top: 10, right: 10, left: -5, bottom: 35 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis
                                dataKey="name"
                                tick={{ fontSize: 9, fill: "#64748b", fontWeight: 600 }}
                                interval={0}
                                angle={-28}
                                textAnchor="end"
                              />
                              <YAxis
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                domain={[0, 2400]}
                                ticks={[0, 600, 1200, 1800, 2400]}
                                tickFormatter={(val) => (val === 0 ? "0 đ" : val >= 1200 ? `${(val / 1000).toFixed(1).replace(".", ",")} tỷ` : `${val} tr`)}
                              />
                              <Tooltip
                                cursor={{ fill: "#f8fafc" }}
                                contentStyle={{ backgroundColor: "#18181b", borderRadius: "10px", border: "none", color: "#fff", fontSize: "12px" }}
                                labelStyle={{ color: "#a3e635", fontWeight: "bold", marginBottom: "4px" }}
                                formatter={(value: any) => [`${value} triệu`, ""]}
                              />
                              <Bar
                                dataKey="chiPhi"
                                name="Chi phí"
                                fill="#f97316"
                                radius={[3, 3, 0, 0]}
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={450}
                                animationEasing="ease-out"
                              />
                              <Bar
                                dataKey="doanhThu"
                                name="Doanh thu"
                                fill="#2563eb"
                                radius={[3, 3, 0, 0]}
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={450}
                                animationEasing="ease-out"
                              />
                            </BarChart>
                          ) : (
                            /* SLIDE 3: Biểu đồ cột đơn Khách mới theo kênh */
                            <BarChart key="chart-slide-2" data={convChartSlide3} margin={{ top: 10, right: 10, left: -15, bottom: 35 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis
                                dataKey="name"
                                tick={{ fontSize: 9, fill: "#64748b", fontWeight: 600 }}
                                interval={0}
                                angle={-28}
                                textAnchor="end"
                              />
                              <YAxis
                                tick={{ fontSize: 10, fill: "#64748b" }}
                                domain={[0, 220]}
                                ticks={[0, 55, 110, 165, 220]}
                              />
                              <Tooltip
                                cursor={{ fill: "#f8fafc" }}
                                contentStyle={{ backgroundColor: "#18181b", borderRadius: "10px", border: "none", color: "#fff", fontSize: "12px" }}
                                labelStyle={{ color: "#a3e635", fontWeight: "bold", marginBottom: "4px" }}
                                formatter={(value: any) => [`${value} khách`, "Khách mới"]}
                              />
                              <Bar
                                dataKey="khachMoi"
                                name="Khách mới"
                                fill="#10b981"
                                radius={[4, 4, 0, 0]}
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={450}
                                animationEasing="ease-out"
                              />
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200/80 my-7" />

                {/* 1.3 Khối con: TỐI ƯU ADS CỦA FACEBOOK */}
                <div>
                  {/* Header TỐI ƯU ADS + Sub-title */}
                  <div className="inline-flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                      <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900">
                        TỐI ƯU ADS
                      </div>
                      <div className="h-1 w-28 bg-lime-400 rounded-full mt-1 mb-1.5"></div>
                      <p className="text-xs font-semibold text-slate-500">
                        Hiệu quả tối ưu chi phí chuyển đổi ngành Thẩm mỹ viện (TMV)
                      </p>
                    </div>
                  </div>

                  {/* 4 Thẻ chỉ số Tối ưu Ads theo thiết kế mới */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
                    
                    {/* Thẻ 1: CHI PHÍ MESS (TMV) */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2.5 h-2.5 rounded-[3px] bg-lime-400 shrink-0"></span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                          CHI PHÍ MESS (TMV)
                        </span>
                      </div>
                      <div>
                        <div className="text-lg xl:text-xl font-black text-zinc-900 tracking-tight whitespace-nowrap">
                          150K – 300K <span className="text-xs font-bold text-lime-600">/mess</span>
                        </div>
                        <div className="h-1 w-9 bg-lime-400 rounded-full mt-2.5"></div>
                      </div>
                    </div>

                    {/* Thẻ 2: CHI PHÍ LEAD (TMV) */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2.5 h-2.5 rounded-[3px] bg-lime-400 shrink-0"></span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                          CHI PHÍ LEAD (TMV)
                        </span>
                      </div>
                      <div>
                        <div className="text-lg xl:text-xl font-black text-zinc-900 tracking-tight whitespace-nowrap">
                          350K – 550K <span className="text-xs font-bold text-lime-600">/lead</span>
                        </div>
                        <div className="h-1 w-9 bg-lime-400 rounded-full mt-2.5"></div>
                      </div>
                    </div>

                    {/* Thẻ 3: CHỈ SỐ CPM */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2.5 h-2.5 rounded-[3px] bg-lime-400 shrink-0"></span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                          CHỈ SỐ CPM
                        </span>
                      </div>
                      <div>
                        <div className="text-lg xl:text-xl font-black text-zinc-900 tracking-tight whitespace-nowrap">
                          150K – 400K
                        </div>
                        <div className="h-1 w-9 bg-lime-400 rounded-full mt-2.5"></div>
                      </div>
                    </div>

                    {/* Thẻ 4: CHỈ SỐ CPA */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2.5 h-2.5 rounded-[3px] bg-lime-400 shrink-0"></span>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                          CHỈ SỐ CPA
                        </span>
                      </div>
                      <div>
                        <div className="text-lg xl:text-xl font-black text-zinc-900 tracking-tight whitespace-nowrap">
                          5K – 15K
                        </div>
                        <div className="h-1 w-9 bg-lime-400 rounded-full mt-2.5"></div>
                      </div>
                    </div>

                  </div>

                  <div className="flex flex-col gap-4">
                    {[
                      { src: "/fb-toi-uu-1.jpg", alt: "Tối ưu Ads 1" },
                      { src: "/fb-toi-uu-2.jpg", alt: "Tối ưu Ads 2" },
                      { src: "/fb-toi-uu-3.jpg", alt: "Tối ưu Ads 3" },
                      { src: "/fb-toi-uu-4-m.png", alt: "Tối ưu Ads 4" },
                      { src: "/fb-toi-uu-5-m.png", alt: "Tối ưu Ads 5" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="w-full bg-slate-50/70 border border-slate-200/90 hover:border-lime-400 rounded-2xl p-2 sm:p-3 flex items-center justify-center overflow-hidden shadow-2xs transition-colors"
                      >
                        <PreviewPopupImage src={item.src} alt={item.alt} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= KHỐI 2: SỐ LIỆU TIKTOK ADS (Nằm giữa Facebook Ads và Google Ads) ================= */}
        <div ref={tiktokSectionRef} className="border border-slate-200/90 rounded-2xl p-4 sm:p-6 bg-white/90 mt-3.5 transition-all shadow-2xs [overflow-anchor:none] scroll-mt-24">
          {/* Header bấm đóng/mở TikTok Ads */}
          <div
            onClick={() => handleTogglePlatform("tiktok", tiktokSectionRef)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
                </svg>
              </div>
              <div>
                <div className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900">
                  SỐ LIỆU TIKTOK ADS
                </div>
                <div className="h-1 w-full bg-lime-400 rounded-full mt-1"></div>
              </div>
            </div>
            <div className="text-slate-400">
              {activeAdPlatform === "tiktok" ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
            </div>
          </div>

          {/* Nội dung thu gọn/mở rộng của SỐ LIỆU TIKTOK ADS */}
          <AnimatePresence initial={false}>
            {activeAdPlatform === "tiktok" && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* 2.1 Khung xanh lá: 1 ảnh báo cáo + 4 thẻ chỉ số */}
                <div className="bg-lime-50/70 border border-lime-200/60 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="w-full bg-white border border-slate-200/80 rounded-xl p-2 overflow-hidden shadow-2xs">
                    <MagnifierImage
                      src="/tiktok-report-thang-5.jpg"
                      alt="Báo cáo TikTok Ads"
                      zoom={2.6}
                      lensSize={180}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white flex flex-col justify-between min-h-[96px]">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">CHI PHÍ GIẢM</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                        <AnimatedCounter value={41.3} />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white flex flex-col justify-between min-h-[96px]">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">CPL GIẢM</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                        <AnimatedCounter value={33.4} />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white flex flex-col justify-between min-h-[96px]">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">ROAS TĂNG</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                        <AnimatedCounter value={63} />
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-2xs border border-white flex flex-col justify-between min-h-[96px]">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">HIỆU SUẤT</div>
                      <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight uppercase">
                        <AnimatedCounter value="TỐT" isText={true} />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200/80 my-7" />

                {/* 2.2 Khối riêng: TỐI ƯU TIKTOK ADS (1 hình ảnh duy nhất) */}
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="inline-flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                        <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900">
                          TỐI ƯU ADS
                        </div>
                        <div className="h-1 w-28 bg-lime-400 rounded-full mt-1 mb-1.5"></div>
                        <p className="text-xs font-semibold text-slate-500">
                          Hiệu quả tối ưu chi phí chuyển đổi chiến dịch TikTok Ads ngành Thẩm mỹ viện (TMV)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Duy nhất 1 hình ảnh tối ưu TikTok Ads */}
                  <div className="w-full bg-slate-50/70 border border-slate-200/90 hover:border-lime-400 rounded-2xl p-2 sm:p-3 flex items-center justify-center overflow-hidden shadow-2xs transition-colors">
                    <PreviewPopupImage
                      src="/tiktok-toi-uu-1.jpg"
                      alt="Tối ưu TikTok Ads"
                    />
                  </div>

                  {/* THÊM MỚI: Khối Đánh giá Toàn cảnh Khu vực (Thiết kế Điểm nhấn) */}
                  <div className="mt-8">
                    {/* Header: Đánh giá toàn cảnh */}
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <span className="text-cyan-600 bg-cyan-50 p-1.5 rounded-full border border-cyan-100 shadow-2xs">
                        <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                        Đánh giá Toàn cảnh 6 Khu Vực & Các Mạng Phễu Dịch Vụ Hệ Thống
                      </h3>
                    </div>

                    {/* Khung nội dung chính (Border top xanh lá dày) */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
                      {/* Viền xanh lá trên cùng */}
                      <div className="h-1.5 w-full bg-emerald-600"></div>

                      <div className="p-4 sm:p-5">
                        {/* Subtitle */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-base drop-shadow-sm">🏆</span>
                          <span className="text-[13px] font-extrabold text-emerald-700 uppercase tracking-wider">
                            Top Khu Vực Hoạt Động Tốt Nhất
                          </span>
                        </div>

                        {/* Danh sách các khu vực */}
                        <div className="flex flex-col gap-3.5">
                          {[
                            { name: "HỒ CHÍ MINH", roas: "1,2", cp: "420.000.000 đ", data: "962", lich: "421", km: "256", dt: "504.000.000 đ", barWidth: "w-48 sm:w-64" },
                            { name: "ĐÔNG NAM BỘ", roas: "1,13", cp: "360.000.000 đ", data: "512", lich: "265", km: "166", dt: "406.800.000 đ", barWidth: "w-40 sm:w-56" },
                            { name: "MIỀN TÂY", roas: "0,89", cp: "280.000.000 đ", data: "345", lich: "175", km: "95", dt: "249.200.000 đ", barWidth: "w-32 sm:w-48" },
                          ].map((item, idx) => (
                            <div key={idx} className="border border-slate-200/80 rounded-xl p-4 sm:p-5 bg-slate-50/40 hover:bg-slate-50 hover:border-blue-200/60 transition-colors shadow-2xs">
                              {/* Dòng 1: Tên khu vực & ROAS */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-sm sm:text-base font-black text-slate-800 uppercase flex items-center gap-1.5 tracking-tight">
                                  <span className="text-red-500 drop-shadow-sm text-lg">📍</span> {item.name}
                                </div>
                                <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight">ROAS {item.roas}</div>
                              </div>

                              {/* Dòng 2: Chỉ số chi tiết */}
                              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-[11px] sm:text-xs text-slate-500 mb-3">
                                <span>CP: <strong className="text-slate-800 font-bold">{item.cp}</strong></span>
                                <span>Data: <strong className="text-slate-800 font-bold">{item.data}</strong></span>
                                <span>Lịch: <strong className="text-blue-600 font-bold">{item.lich}</strong></span>
                                <span>KM: <strong className="text-slate-800 font-bold">{item.km}</strong></span>
                                <span>DT: <strong className="text-slate-800 font-bold">{item.dt}</strong></span>
                              </div>

                              {/* Dòng 3: Khối xám che mờ */}
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-3">
                                <span className="font-medium">Khu vực dẫn đầu doanh thu,</span>
                                <div className={`h-3.5 ${item.barWidth} bg-slate-200/80 rounded-sm`}></div>
                                <span>.</span>
                              </div>

                              {/* Dòng 4: Link action */}
                              <button type="button" className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer transition-colors">
                                <span className="text-sm">👉</span> Click để đi sâu vào các chi nhánh thuộc {item.name}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= KHỐI 3: SỐ LIỆU GOOGLE ADS — TẬP ĐOÀN (Giữ nguyên ở dưới cùng) ================= */}

                                <div ref={googleSectionRef} className="border border-slate-200/90 rounded-2xl p-4 sm:p-6 bg-white/90 mt-3.5 transition-all shadow-2xs [overflow-anchor:none] scroll-mt-24">
                                  {/* Header bấm đóng/mở Google Ads */}
                                  <div
                                    onClick={() => handleTogglePlatform("google", googleSectionRef)}
                                    className="flex items-center justify-between cursor-pointer select-none"
                                  >
                                    <div className="inline-flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-sm">
                                        G
                                      </div>
                                      <div>
                                        <div className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900">
                                          SỐ LIỆU GOOGLE ADS
                                        </div>
                                        <div className="h-1 w-full bg-lime-400 rounded-full mt-1"></div>
                                      </div>
                                    </div>
                                    <div className="text-slate-400">
                                      {activeAdPlatform === "google" ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
                                    </div>
                                  </div>

                                  {/* Nội dung bên trong SỐ LIỆU GOOGLE ADS */}
                                  <AnimatePresence initial={false}>
                                    {activeAdPlatform === "google" && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                        animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                        className="overflow-hidden space-y-6"
                                      >
                                        {/* PHẦN 1: LƯỚI 4 THẺ KPI ĐIỂM NHẤN TẬP ĐOÀN (Thẳng hàng ngang 100%, không cắt chữ) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-stretch">
                          
                          {/* Thẻ 1: Chi phí */}
                          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between min-w-0">
                            <div>
                              {/* Header cố định chiều cao để 4 thẻ luôn thẳng hàng */}
                              <div className="flex items-center justify-between gap-1.5 min-h-[24px] mb-2.5">
                                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-tight whitespace-nowrap">
                                  CHI PHÍ
                                </span>
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ĐẠT
                                </span>
                              </div>

                              {/* Số chính: Dùng cỡ chữ vừa khít 100% không bị dấu ... */}
                              <div className="text-[17px] xl:text-lg font-black text-zinc-900 tracking-tighter leading-7 whitespace-nowrap">
                                1.672.169.080đ
                              </div>
                              <div className="text-[11px] font-semibold text-slate-400 mt-1 pb-3 border-b border-slate-100 whitespace-nowrap">
                                KPI 1.693.640.150đ
                              </div>
                            </div>

                            <div className="pt-3">
                              <div className="flex items-baseline gap-1 mb-1.5">
                                <span className="text-sm font-black text-emerald-600">98,7%</span>
                                <span className="text-[11px] font-semibold text-slate-500">ngân sách</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "98.7%" }}></div>
                              </div>
                              <div className="text-[11px] font-semibold text-slate-400">
                                Còn lại 1,3% ngân sách
                              </div>
                            </div>
                          </div>

                          {/* Thẻ 2: Data */}
                          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-center justify-between gap-1.5 min-h-[24px] mb-2.5">
                                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-tight whitespace-nowrap">
                                  DATA
                                </span>
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ĐẠT
                                </span>
                              </div>

                              <div className="text-xl font-black text-zinc-900 tracking-tight leading-7">
                                5.262
                              </div>
                              <div className="text-[11px] font-semibold text-slate-400 mt-1 pb-3 border-b border-slate-100">
                                KPI 3.170
                              </div>
                            </div>

                            <div className="pt-3">
                              <div className="flex items-baseline gap-1 mb-1.5">
                                <span className="text-sm font-black text-emerald-600">166,0%</span>
                                <span className="text-[11px] font-semibold text-slate-500">KPI</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }}></div>
                              </div>
                              <div className="text-[11px] font-bold text-emerald-600">
                                Vượt mục tiêu +66,0%
                              </div>
                            </div>
                          </div>

                          {/* Thẻ 3: SL khách mới */}
                          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-center justify-between gap-1.5 min-h-[24px] mb-2.5">
                                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-tight whitespace-nowrap">
                                  SL KHÁCH MỚI
                                </span>
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ĐẠT
                                </span>
                              </div>

                              <div className="text-xl font-black text-zinc-900 tracking-tight leading-7">
                                289
                              </div>
                              <div className="text-[11px] font-semibold text-slate-400 mt-1 pb-3 border-b border-slate-100">
                                KPI 458
                              </div>
                            </div>

                            <div className="pt-3">
                              <div className="flex items-baseline gap-1 mb-1.5">
                                <span className="text-sm font-black text-emerald-600">96,0%</span>
                                <span className="text-[11px] font-semibold text-slate-500">KPI</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "96%" }}></div>
                              </div>
                              <div className="text-[11px] font-semibold text-slate-400">
                                Còn 4,0% để đạt KPI
                              </div>
                            </div>
                          </div>

                          {/* Thẻ 4: ROAS (Mới/Tổng) */}
                          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-center justify-between gap-1 min-h-[24px] mb-2.5">
                                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-tighter whitespace-nowrap">
                                  ROAS (MỚI/TỔNG)
                                </span>
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> THEO DÕI
                                </span>
                              </div>

                              <div className="text-xl font-black text-zinc-900 tracking-tight leading-7">
                                1,13
                              </div>
                              <div className="text-[11px] font-semibold text-slate-400 mt-1 pb-3 border-b border-slate-100">
                                KPI 1,5
                              </div>
                            </div>

                            <div className="pt-3">
                              <div className="flex items-baseline gap-1 mb-1.5">
                                <span className="text-sm font-black text-amber-600">75,4%</span>
                                <span className="text-[11px] font-semibold text-slate-500">KPI</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-amber-500 h-full rounded-full" style={{ width: "75.4%" }}></div>
                              </div>
                              <div className="text-[11px] font-semibold text-slate-400">
                                Còn 24,6% để đạt KPI
                              </div>
                            </div>
                          </div>

                        </div>

                                        {/* PHẦN 2: BẢNG TOP NGÀY TẠO DATA VÀ PHÂN BỔ KHU VỰC (Đã cân đối padding và chiều cao) */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                                          
                                          {/* Bảng 1: Top Ngày Tạo Data */}
                                          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                                            <div>
                                              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                                                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">TOP NGÀY TẠO DATA</div>
                                                </div>
                                                <div className="text-[11px] font-bold text-slate-400">Ranking theo ngày</div>
                                              </div>

                                              <div className="space-y-3">
                                                {[
                                                  { date: "28/07/2026", data: "175 Data", percent: "4,9%", width: "95%" },
                                                  { date: "30/07/2026", data: "166 Data", percent: "4,7%", width: "90%" },
                                                  { date: "29/07/2026", data: "158 Data", percent: "4,5%", width: "85%" },
                                                  { date: "19/07/2026", data: "131 Data", percent: "3,7%", width: "70%" },
                                                  { date: "06/07/2026", data: "126 Data", percent: "3,6%", width: "66%" },
                                                ].map((item, idx) => (
                                                  <div key={idx} className="flex items-center justify-between text-xs font-bold py-1.5 border-b border-slate-50">
                                                    <span className="w-24 text-zinc-800">{item.date}</span>
                                                    <div className="flex-1 mx-3 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-full rounded-full" style={{ width: item.width }}></div>
                                                    </div>
                                                    <span className="w-20 text-right text-zinc-900">{item.data}</span>
                                                    <span className="w-12 text-right text-slate-500 font-semibold">{item.percent}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
                                              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase">Ngày cao nhất</div>
                                                <div className="text-sm font-black text-blue-600 mt-0.5">28/07/2026</div>
                                                <div className="text-[11px] text-slate-500 font-semibold">175 Data • 4,9%</div>
                                              </div>
                                              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase">Tổng Data Top 3</div>
                                                <div className="text-sm font-black text-emerald-600 mt-0.5">3.546 Data</div>
                                                <div className="text-[11px] text-slate-500 font-semibold">Top 3 chiếm 14,1%</div>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Bảng 2: Phân Bổ Chi Phí Theo Khu Vực */}
                                          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                                            <div>
                                              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                                                  <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">PHÂN BỔ CHI PHÍ THEO KHU VỰC</div>
                                                </div>
                                                <div className="text-[11px] font-bold text-slate-400">Ranking theo khu vực</div>
                                              </div>

                                              <div className="space-y-3">
                                                {[
                                                  { area: "ĐÔNG NAM BỘ/HCM", cost: "275.887.269đ", percent: "24,7%", width: "95%" },
                                                  { area: "MIỀN TRUNG", cost: "265.416.227đ", percent: "23,8%", width: "90%" },
                                                  { area: "MIỀN TÂY", cost: "208.035.254đ", percent: "18,6%", width: "75%" },
                                                  { area: "HỒ CHÍ MINH", cost: "195.562.995đ", percent: "17,5%", width: "70%" },
                                                  { area: "TÂY NGUYÊN", cost: "145.862.539đ", percent: "13,1%", width: "55%" },
                                                ].map((item, idx) => (
                                                  <div key={idx} className="flex items-center justify-between text-xs font-bold py-1.5 border-b border-slate-50">
                                                    <span className="w-32 text-zinc-800 truncate">{item.area}</span>
                                                    <div className="flex-1 mx-3 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-full rounded-full" style={{ width: item.width }}></div>
                                                    </div>
                                                    <span className="w-28 text-right text-zinc-900">{item.cost}</span>
                                                    <span className="w-12 text-right text-slate-500 font-semibold">{item.percent}</span>
                                                  </div>
                                                ))}
                                              </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100">
                                              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase">Khu vực cao nhất</div>
                                                <div className="text-xs font-black text-blue-600 mt-0.5">ĐÔNG NAM BỘ/HCM</div>
                                                <div className="text-[11px] text-slate-500 font-semibold">275.887.269đ • 24,7%</div>
                                              </div>
                                              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase">Top 3 Chi phí</div>
                                                <div className="text-sm font-black text-emerald-600 mt-0.5">749.338.750đ</div>
                                                <div className="text-[11px] text-slate-500 font-semibold">Top 3 chiếm 67,1%</div>
                                              </div>
                                            </div>
                                          </div>

                                        </div>

                                        {/* Khối Tối ưu Google Ads (1 hình ảnh nhấn để phóng to) */}
                                        <hr className="border-slate-200/80 my-7" />
                                        <div>
                                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                            <div className="inline-flex items-start gap-3">
                                              <div className="w-9 h-9 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                                                <svg className="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                </svg>
                                              </div>
                                              <div>
                                                <div className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-900">
                                                  TỐI ƯU GOOGLE ADS — TẬP ĐOÀN
                                                </div>
                                                <div className="h-1 w-28 bg-lime-400 rounded-full mt-1 mb-1.5"></div>
                                                <p className="text-xs font-semibold text-slate-500">
                                                  Hiệu quả tối ưu chiến dịch Google Ads cấp tập đoàn
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="w-full bg-slate-50/70 border border-slate-200/90 hover:border-lime-400 rounded-2xl p-2 sm:p-3 flex items-center justify-center overflow-hidden shadow-2xs transition-colors">
                                            <PreviewPopupImage
                                              src="/google-toi-uu-1-m.png"
                                              alt="Tối ưu Google Ads Tập Đoàn"
                                            />
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mở ITEM 2: KENZE */}
                {openExp === 2 && (
                  <div className="relative mb-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-zinc-900 text-lime-400 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white z-10">2</div>
                    <div className="bg-white border border-lime-500 p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                      <button onClick={() => { setOpenExp(null); setOpenExpKPI(false); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">Nội thất xuất dư • Tồn kho • Rời công • Trưng bày</span>
                        
                      </div>
                      <div className="mb-6">
                        <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">NỘI THẤT XUẤT DƯ - KENZE</h3>
                        <div className="text-base font-bold text-lime-600">Nhân viên kho - Vận hành sàn TMĐT</div>
                      </div>
                      <div className="mt-6">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shadow-xs shrink-0"><Image src="/logo-kenze.png" alt="KENZE Logo" width={40} height={40} className="h-full w-full object-cover" /></div>
                            <span className="font-bold text-zinc-900 text-lg">KENZE</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Quản lý tồn kho nội thất xuất dư / tồn kho: theo dõi nhập – xuất – tồn, kiểm kê định kỳ và cập nhật số liệu tồn kho chính xác cho bộ phận bán hàng.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Vận hành gian hàng trên sàn TMĐT: đăng và cập nhật sản phẩm, giá bán, chương trình xả kho / khuyến mãi; xử lý đơn hàng và phối hợp giao vận.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Phối hợp với Sales xử lý đơn qua tin nhắn, báo cáo tồn kho và doanh số định kỳ bằng Google Sheets, Excel.</li>
                          </ul>

                          <hr className="border-slate-100 my-6" />

                          {/* SẢN PHẨM NỔI BẬT */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-4 bg-zinc-900 rounded-full"></div>
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
                                SẢN PHẨM NỔI BẬT
                              </div>
                            </div>
                            
                            {/* Render Carousel 3D */}
                            <ProductCoverflowCarousel />
                          </div>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 p-1"><Image src="/logo-yamado.png" alt="Yamado Logo" width={40} height={40} className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg uppercase">YAMADO</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ vận hành gian hàng Yamado Viet Nam Store: cập nhật sản phẩm, tồn kho và giá bán trên sàn, đảm bảo thông tin đồng bộ với kho thực tế.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Theo dõi và xử lý đơn hàng phát sinh qua sàn / tin nhắn / điện thoại, phối hợp giao hàng và báo cáo doanh số định kỳ.</li>
                          </ul>

                          <hr className="border-slate-100 my-6" />
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-4 bg-zinc-900 rounded-full"></div>
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
                                SẢN PHẨM NỔI BẬT
                              </div>
                            </div>
                            <ProductCoverflowCarousel 
                              images={[
                                { id: 1, src: "/yamado-sp-1.png", alt: "Yamado SP 1" },
                                { id: 2, src: "/yamado-sp-2.png", alt: "Yamado SP 2" },
                                { id: 3, src: "/yamado-sp-3.png", alt: "Yamado SP 3" },
                                { id: 4, src: "/yamado-sp-4.png", alt: "Yamado SP 4" },
                                { id: 5, src: "/yamado-sp-5.png", alt: "Yamado SP 5" },
                              ]} 
                            />
                          </div>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-auto min-w-20 px-2 border border-slate-200 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 py-1"><Image src="/logo-lazybag.png" alt="Lazybag Logo" width={60} height={30} className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Lazybag</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Quản lý tồn kho sản phẩm ghế lười Lazybag: theo dõi số lượng theo mẫu và màu, cập nhật tồn kho cho các kênh bán hàng.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Vận hành bán hàng trên sàn TMĐT và mạng xã hội: đăng sản phẩm, lên chương trình ưu đãi, xử lý đơn và hỗ trợ chốt đơn qua tin nhắn.</li>
                          </ul>

                          <hr className="border-slate-100 my-6" />
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-4 bg-zinc-900 rounded-full"></div>
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
                                SẢN PHẨM NỔI BẬT
                              </div>
                            </div>
                            <ProductCoverflowCarousel 
                              images={[
                                { id: 1, src: "/lazybag-sp-1.png", alt: "Lazybag SP 1" },
                                { id: 2, src: "/lazybag-sp-2.png", alt: "Lazybag SP 2" },
                                { id: 3, src: "/lazybag-sp-3.png", alt: "Lazybag SP 3" },
                                { id: 4, src: "/lazybag-sp-4.png", alt: "Lazybag SP 4" },
                                { id: 5, src: "/lazybag-sp-5.png", alt: "Lazybag SP 5" },
                              ]} 
                            />
                          </div>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-auto min-w-20 px-2 border border-slate-200 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0 py-1"><Image src="/logo-kensonic.png" alt="Kensonic Logo" width={60} height={30} className="h-full w-full object-contain" /></div>
                            <span className="font-bold text-zinc-900 text-lg uppercase">KENSONIC</span>
                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">Phụ</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.</li>
                          </ul>

                          <hr className="border-slate-100 my-6" />
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-4 bg-zinc-900 rounded-full"></div>
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
                                SẢN PHẨM NỔI BẬT
                              </div>
                            </div>
                            <ProductCoverflowCarousel 
                              images={[
                                { id: 1, src: "/kensonic-sp-1.png", alt: "Kensonic SP 1" },
                                { id: 2, src: "/kensonic-sp-2.png", alt: "Kensonic SP 2" },
                                { id: 3, src: "/kensonic-sp-3.png", alt: "Kensonic SP 3" },
                                { id: 4, src: "/kensonic-sp-4.png", alt: "Kensonic SP 4" },
                                { id: 5, src: "/kensonic-sp-5.png", alt: "Kensonic SP 5" },
                              ]} 
                            />
                          </div>
                        </div>

                        {/* ================= THÀNH TỰU CHỈ SỐ ROAS ================= */}
                        <hr className="border-slate-100 my-8" />
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          style={{ willChange: "transform, opacity" }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-4 bg-orange-500 rounded-full"></div>
                            <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
                              THÀNH TỰU CHỈ SỐ ROAS
                            </div>
                            <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ml-2 shadow-xs">
                              ROAS <AnimatedCounter value={16.11} suffix="" />
                            </span>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                            Tối ưu hiệu suất quảng cáo vượt trội với tỷ lệ lợi nhuận trên chi phí (ROAS) đạt 16,11. Chi phí tối ưu, tỷ lệ chuyển đổi đơn hàng và doanh thu ổn định.
                          </p>

                          {/* Khối bọc sơ đồ có hiệu ứng zoom mượt */}
                          <motion.div 
                            className="w-full bg-slate-50/70 border border-slate-200/90 hover:border-orange-300 rounded-2xl p-2 sm:p-3 flex items-center justify-center overflow-hidden shadow-2xs transition-colors"
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            style={{ willChange: "transform, opacity" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <PreviewPopupImage
                              src="/kenze-roas.png"
                              alt="Thành tựu chỉ số ROAS Kenze"
                            />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mở ITEM 3: Miss Áo Dài */}
                {openExp === 3 && (
                  <div className="relative mb-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full bg-zinc-900 text-lime-400 flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-white z-10">3</div>
                    <div className="bg-white border border-lime-500 p-6 md:p-8 rounded-2xl shadow-md transition-all relative">
                      <button onClick={() => { setOpenExp(null); setOpenExpKPI(false); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">Dịch vụ chụp ảnh • Áo dài • Gói trải nghiệm 2 in 1</span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">Miss Áo Dài</h3>
                      <div className="text-base font-bold text-lime-600 mb-5">Chuyên viên Marketing Ads</div>
                      <div className="mt-6">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0"><Image src="/logo-missaodai.png" alt="Miss Áo Dài" width={40} height={40} className="h-full w-full object-cover" /></div>
                            <span className="font-bold text-zinc-900 text-lg">Miss Áo Dài</span>
                            <span className="bg-zinc-900 text-lime-400 px-3 py-1 rounded-full text-xs font-bold">Chính</span>
                          </div>
                          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Triển khai và tối ưu Facebook Ads cho dịch vụ chụp ảnh áo dài và các gói trải nghiệm, tập trung tạo khách hàng tiềm năng và đặt lịch chụp qua tin nhắn.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Lên kế hoạch chiến dịch theo concept và mùa vụ (Liên Hoa, Xe Hoa, mùa sen, lễ Tết), test creative hình ảnh / video và audience, tối ưu chi phí trên mỗi tin nhắn và lượt đặt lịch.</li>
                            <li className="relative pl-5"><div className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-lime-500"></div>Phối hợp với ekip chụp và Sales tư vấn gói dịch vụ, lịch chụp; theo dõi Pixel &amp; CAPI và báo cáo hiệu quả định kỳ bằng Ads Manager, Google Sheets.</li>
                          </ul>

                          <hr className="border-slate-100 my-6" />

                          {/* === KHỐI CON: ĐỀ XUẤT CONCEPT - ĐẨY PERFORMANCE === */}
                          <div className="mt-2">
                            {/* Header mục */}
                            <div className="flex items-center gap-2 mb-2.5">
                              <div className="w-1.5 h-4 bg-pink-500 rounded-full"></div>
                              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900">
                                ĐỀ XUẤT CONCEPT - ĐẨY PERFORMANCE
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                              Trong quá trình làm việc, tôi chủ động đề xuất thêm các giải pháp và chương trình mới, tối ưu liên tục nhằm giảm chi phí quảng cáo và gia tăng ROAS cho doanh nghiệp
                            </p>

                            {/* KHỐI BANNER 2 CỘT "CỬA THIỀN" (Chuẩn thiết kế Hình 1) */}
                            <div className="w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-[#FAF4EB]">
                              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                                
                                {/* Cột trái: Hình ảnh cô gái áo dài */}
                                <div className="w-full h-full min-h-[300px] sm:min-h-[380px] bg-stone-200 overflow-hidden relative flex items-center justify-center [&>div]:w-full [&>div]:h-full [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                                  <PreviewPopupImage
                                    src="/miss-ao-dai-concept.jpg"
                                    alt="Concept Miss Áo Dài - Cửa Thiền"
                                  />
                                </div>

                                {/* Cột phải: Nền kem #FAF4EB + Typography nghệ thuật có hiệu ứng text */}
                                <motion.div
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: "-40px" }}
                                  style={{ willChange: "transform, opacity" }}
                                  variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                                  }}
                                  className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-[#FAF4EB] text-left"
                                >
                                  {/* Tiêu đề lớn: Cửa thiền */}
                                  <motion.h3
                                    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                    className="font-serif italic font-bold text-4xl sm:text-5xl text-[#6E1423] tracking-tight leading-tight mb-3"
                                  >
                                    Cửa thiền
                                  </motion.h3>

                                  {/* 2 câu thơ nghiêng */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                                    className="font-serif italic text-base sm:text-lg text-[#7A5C3E] leading-relaxed mb-5"
                                  >
                                    <p>Mái chùa cong bóng chiều rơi</p>
                                    <p>Sen tay ai giữ, một thời an nhiên</p>
                                  </motion.div>

                                  {/* Đường kẻ trang trí có hình thoi ở giữa */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, scaleX: 0.8 }, visible: { opacity: 1, scaleX: 1 } }}
                                    className="flex items-center w-44 mb-5 origin-left"
                                  >
                                    <div className="flex-1 h-[1px] bg-[#B69874]"></div>
                                    <div className="w-2 h-2 rotate-45 bg-[#B69874] mx-1.5 shrink-0"></div>
                                    <div className="flex-1 h-[1px] bg-[#B69874]"></div>
                                  </motion.div>

                                  {/* Tiêu đề phụ in đậm */}
                                  <motion.h4
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-sm sm:text-base font-extrabold text-[#2B2623] mb-2.5"
                                  >
                                    Chụp ảnh áo dài tại Tu viện Vĩnh Nghiêm
                                  </motion.h4>

                                  {/* Đoạn văn mô tả bối cảnh */}
                                  <motion.p
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-xs sm:text-[13px] text-[#5C5349] leading-relaxed mb-6"
                                  >
                                    Điện gỗ lớn với hoành phi chữ vàng, lan can đá chạm rồng và mái ngói đỏ — bối cảnh trang nghiêm, bề thế bậc nhất trong các concept chùa.
                                  </motion.p>

                                  {/* CỤM NÚT BẤM VÀ ẢNH FB ADS */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="flex flex-col items-start gap-3"
                                  >
                                    {/* Nút 1: Xem bộ ảnh */}
                                    <button
                                      type="button"
                                      onClick={() => setShowCuaThienGallery(!showCuaThienGallery)}
                                      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#6E1423] hover:bg-[#540F1B] text-[#FAF4EB] text-[13px] font-bold tracking-wide transition-all shadow-xs cursor-pointer select-none"
                                    >
                                      <span>{showCuaThienGallery ? "Thu gọn bộ ảnh Concept" : "Xem trọn bộ 8 ảnh Concept Cửa Thiền"}</span>
                                      <svg className={`w-4 h-4 transition-transform duration-300 ${showCuaThienGallery ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>

                                    {/* Nút 2: Xem số liệu FB Ads */}
                                    <button
                                      type="button"
                                      onClick={() => setShowFbAdsCuaThien(!showFbAdsCuaThien)}
                                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-[2.5px] border-[#2B2623] bg-[#6E1423] hover:bg-[#540F1B] text-[#FAF4EB] text-[13px] font-bold tracking-wide transition-all shadow-sm cursor-pointer select-none"
                                    >
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                      </svg>
                                      <span>{showFbAdsCuaThien ? "Thu gọn số liệu FB Ads" : "Xem số liệu FB Ads"}</span>
                                    </button>

                                    {/* Khối trượt hiển thị ảnh FB Ads */}
                                    <AnimatePresence initial={false}>
                                      {showFbAdsCuaThien && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.35, ease: "easeInOut" }}
                                          className="overflow-hidden w-full mt-2"
                                        >
                                          <div className="w-full bg-white border border-[#E6DBC8] rounded-xl p-1.5 shadow-sm">
                                            <PreviewPopupImage
                                              src="/fb-ads-cua-thien.png"
                                              alt="Số liệu FB Ads Cửa Thiền"
                                            />
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                </motion.div>

                              </div>

                              {/* DANH SÁCH 8 HÌNH ẢNH BỐ CỤC 2-2-2-2 XẾP DỌC KHI BẤM MỞ */}
                              <AnimatePresence initial={false}>
                                {showCuaThienGallery && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="overflow-hidden border-t border-[#E6DBC8] bg-[#FAF4EB]/60"
                                  >
                                    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <div
                                          key={num}
                                          className="w-full bg-white border border-stone-200/80 hover:border-[#6E1423]/40 rounded-xl p-1.5 shadow-2xs overflow-hidden flex items-center justify-center transition-colors"
                                        >
                                          <PreviewPopupImage
                                            src={`/miss-ao-dai-cua-thien-${num}.jpg`}
                                            alt={`Concept Cửa Thiền ${num}`}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* KHỐI BANNER 2 CỘT THỨ 2: "TẾT XƯA GỌI VỀ" */}
                            <div className="w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-[#FAF4EB] mt-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                                
                                {/* Cột trái: Hình ảnh áo dài Tết xưa */}
                                <div className="w-full h-full min-h-[300px] sm:min-h-[380px] bg-stone-200 overflow-hidden relative flex items-center justify-center [&>div]:w-full [&>div]:h-full [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                                  <PreviewPopupImage
                                    src="/miss-ao-dai-tet-xua.png"
                                    alt="Concept Miss Áo Dài - Tết xưa gọi về"
                                  />
                                </div>

                                {/* Cột phải: Nền kem #FAF4EB + Typography nghệ thuật có hiệu ứng text */}
                                <motion.div
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: "-40px" }}
                                  style={{ willChange: "transform, opacity" }}
                                  variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                                  }}
                                  className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-[#FAF4EB] text-left"
                                >
                                  {/* Tiêu đề lớn: Tết xưa gọi về */}
                                  <motion.h3
                                    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                    className="font-serif italic font-bold text-4xl sm:text-5xl text-[#6E1423] tracking-tight leading-tight mb-3"
                                  >
                                    Tết xưa gọi về
                                  </motion.h3>

                                  {/* 2 câu thơ nghiêng */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                                    className="font-serif italic text-base sm:text-lg text-[#7A5C3E] leading-relaxed mb-5"
                                  >
                                    <p>Đèn lồng đỏ, pháo đào phai</p>
                                    <p>Xuân về trong áo, ai hoài cố hương</p>
                                  </motion.div>

                                  {/* Đường kẻ trang trí có hình thoi ở giữa */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, scaleX: 0.8 }, visible: { opacity: 1, scaleX: 1 } }}
                                    className="flex items-center w-44 mb-5 origin-left"
                                  >
                                    <div className="flex-1 h-[1px] bg-[#B69874]"></div>
                                    <div className="w-2 h-2 rotate-45 bg-[#B69874] mx-1.5 shrink-0"></div>
                                    <div className="flex-1 h-[1px] bg-[#B69874]"></div>
                                  </motion.div>

                                  {/* Tiêu đề phụ in đậm */}
                                  <motion.h4
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-sm sm:text-base font-extrabold text-[#2B2623] mb-2.5"
                                  >
                                    Chụp ảnh áo dài Tết tại phim trường Anna
                                  </motion.h4>

                                  {/* Đoạn văn mô tả bối cảnh */}
                                  <motion.p
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-xs sm:text-[13px] text-[#5C5349] leading-relaxed mb-6"
                                  >
                                    Bối cảnh Tết dựng sẵn: đèn lồng đỏ, nón lá treo tường, hoa đỏ rực, rèm nhung xanh thẫm và đồ gốm cổ — không khí Tết trọn vẹn ngay giữa mùa nào trong năm.
                                  </motion.p>

                                  {/* CỤM NÚT BẤM VÀ ẢNH FB ADS */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="flex flex-col items-start gap-3"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => setShowTetXuaGallery(!showTetXuaGallery)}
                                      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#6E1423] hover:bg-[#540F1B] text-[#FAF4EB] text-[13px] font-bold tracking-wide transition-all shadow-xs cursor-pointer select-none"
                                    >
                                      <span>{showTetXuaGallery ? "Thu gọn bộ ảnh Concept" : "Xem trọn bộ 8 ảnh Concept Tết Xưa"}</span>
                                      <svg className={`w-4 h-4 transition-transform duration-300 ${showTetXuaGallery ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setShowFbAdsTetXua(!showFbAdsTetXua)}
                                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-[2.5px] border-[#2B2623] bg-[#6E1423] hover:bg-[#540F1B] text-[#FAF4EB] text-[13px] font-bold tracking-wide transition-all shadow-sm cursor-pointer select-none"
                                    >
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                      </svg>
                                      <span>{showFbAdsTetXua ? "Thu gọn số liệu FB Ads" : "Xem số liệu FB Ads"}</span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                      {showFbAdsTetXua && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.35, ease: "easeInOut" }}
                                          className="overflow-hidden w-full mt-2"
                                        >
                                          <div className="w-full bg-white border border-[#E6DBC8] rounded-xl p-1.5 shadow-sm">
                                            <PreviewPopupImage
                                              src="/fb-ads-tet-xua.png"
                                              alt="Số liệu FB Ads Tết Xưa"
                                            />
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                </motion.div>

                              </div>

                              {/* DANH SÁCH 8 HÌNH ẢNH BỐ CỤC 2-2-2-2 XẾP DỌC KHI BẤM MỞ */}
                              <AnimatePresence initial={false}>
                                {showTetXuaGallery && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="overflow-hidden border-t border-[#E6DBC8] bg-[#FAF4EB]/60"
                                  >
                                    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <div
                                          key={num}
                                          className="w-full bg-white border border-stone-200/80 hover:border-[#6E1423]/40 rounded-xl p-1.5 shadow-2xs overflow-hidden flex items-center justify-center transition-colors"
                                        >
                                          <PreviewPopupImage
                                            src={`/miss-ao-dai-tet-xua-${num}.jpg`}
                                            alt={`Concept Tết xưa gọi về ${num}`}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* KHỐI BANNER 2 CỘT THỨ 3: "SÂN ĐÌNH XƯA" */}
                            <div className="w-full rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-[#FAF4EB] mt-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
                                
                                {/* Cột trái: Hình ảnh áo dài Sân đình xưa */}
                                <div className="w-full h-full min-h-[300px] sm:min-h-[380px] bg-stone-200 overflow-hidden relative flex items-center justify-center [&>div]:w-full [&>div]:h-full [&_img]:w-full [&_img]:h-full [&_img]:object-cover">
                                  <PreviewPopupImage
                                    src="/miss-ao-dai-san-dinh.jpg"
                                    alt="Concept Miss Áo Dài - Sân đình xưa"
                                  />
                                </div>

                                {/* Cột phải: Nền kem #FAF4EB + Typography nghệ thuật có hiệu ứng text */}
                                <motion.div
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: "-40px" }}
                                  style={{ willChange: "transform, opacity" }}
                                  variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                                  }}
                                  className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-[#FAF4EB] text-left"
                                >
                                  {/* Tiêu đề lớn: Sân đình xưa */}
                                  <motion.h3
                                    variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                    className="font-serif italic font-bold text-4xl sm:text-5xl text-[#6E1423] tracking-tight leading-tight mb-3"
                                  >
                                    Sân đình xưa
                                  </motion.h3>

                                  {/* 2 câu thơ nghiêng */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                                    className="font-serif italic text-base sm:text-lg text-[#7A5C3E] leading-relaxed mb-5"
                                  >
                                    <p>Nắng chiều rơi xuống sân đình</p>
                                    <p>Áo dài ngồi đó, lặng nhìn thời gian</p>
                                  </motion.div>

                                  {/* Đường kẻ trang trí có hình thoi ở giữa */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, scaleX: 0.8 }, visible: { opacity: 1, scaleX: 1 } }}
                                    className="flex items-center w-44 mb-5 origin-left"
                                  >
                                    <div className="flex-1 h-[1px] bg-[#B69874]"></div>
                                    <div className="w-2 h-2 rotate-45 bg-[#B69874] mx-1.5 shrink-0"></div>
                                    <div className="flex-1 h-[1px] bg-[#B69874]"></div>
                                  </motion.div>

                                  {/* Tiêu đề phụ in đậm */}
                                  <motion.h4
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-sm sm:text-base font-extrabold text-[#2B2623] mb-2.5"
                                  >
                                    Chụp ảnh áo dài tại Đình Thông Tây Hội
                                  </motion.h4>

                                  {/* Đoạn văn mô tả bối cảnh */}
                                  <motion.p
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="text-xs sm:text-[13px] text-[#5C5349] leading-relaxed mb-6"
                                  >
                                    Mái ngói rêu phong, ghế đá cũ và nắng xiên qua tán cây — ngôi đình cổ mộc mạc cho những khung hình dịu dàng, gần gũi.
                                  </motion.p>

                                  {/* CỤM NÚT BẤM VÀ ẢNH FB ADS */}
                                  <motion.div
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    className="flex flex-col items-start gap-3"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => setShowSanDinhGallery(!showSanDinhGallery)}
                                      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#6E1423] hover:bg-[#540F1B] text-[#FAF4EB] text-[13px] font-bold tracking-wide transition-all shadow-xs cursor-pointer select-none"
                                    >
                                      <span>{showSanDinhGallery ? "Thu gọn bộ ảnh Concept" : "Xem trọn bộ 8 ảnh Concept Sân Đình Xưa"}</span>
                                      <svg className={`w-4 h-4 transition-transform duration-300 ${showSanDinhGallery ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setShowFbAdsSanDinh(!showFbAdsSanDinh)}
                                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-[2.5px] border-[#2B2623] bg-[#6E1423] hover:bg-[#540F1B] text-[#FAF4EB] text-[13px] font-bold tracking-wide transition-all shadow-sm cursor-pointer select-none"
                                    >
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                      </svg>
                                      <span>{showFbAdsSanDinh ? "Thu gọn số liệu FB Ads" : "Xem số liệu FB Ads"}</span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                      {showFbAdsSanDinh && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.35, ease: "easeInOut" }}
                                          className="overflow-hidden w-full mt-2"
                                        >
                                          <div className="w-full bg-white border border-[#E6DBC8] rounded-xl p-1.5 shadow-sm">
                                            <PreviewPopupImage
                                              src="/fb-ads-san-dinh.jpg"
                                              alt="Số liệu FB Ads Sân Đình"
                                            />
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </motion.div>
                                </motion.div>

                              </div>

                              {/* DANH SÁCH 8 HÌNH ẢNH BỐ CỤC 2-2-2-2 XẾP DỌC KHI BẤM MỞ */}
                              <AnimatePresence initial={false}>
                                {showSanDinhGallery && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="overflow-hidden border-t border-[#E6DBC8] bg-[#FAF4EB]/60"
                                  >
                                    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <div
                                          key={num}
                                          className="w-full bg-white border border-stone-200/80 hover:border-[#6E1423]/40 rounded-xl p-1.5 shadow-2xs overflow-hidden flex items-center justify-center transition-colors"
                                        >
                                          <PreviewPopupImage
                                            src={`/miss-ao-dai-san-dinh-${num}.jpg`}
                                            alt={`Concept Sân đình xưa ${num}`}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                        <hr className="border-slate-200 my-6" />
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0"><Image src="/logo-mentorclub.png" alt="Mentor Club" width={40} height={40} className="h-full w-full object-cover" /></div>
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
                            <div className="h-10 w-10 border border-slate-200 rounded-full flex items-center justify-center bg-white overflow-hidden shadow-xs shrink-0"><Image src="/logo-misspersonal.png" alt="Miss Personal Makeup" width={40} height={40} className="h-full w-full object-cover" /></div>
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
                      <button onClick={() => { setOpenExp(null); setOpenExpKPI(false); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-zinc-900 bg-slate-50 hover:bg-lime-100 rounded-full transition-colors" title="Thu gọn"><ChevronUp size={20} /></button>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-5 pr-10">
                        <span className="inline-flex items-center bg-lime-100 text-lime-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">In vải • In ấn &amp; gia công trên vải</span>
                      </div>
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                        <div className="w-16 h-16 rounded-full border border-slate-200 overflow-hidden shrink-0 bg-white flex items-center justify-center shadow-xs p-1"><Image src="/logo-phantran.png" alt="Phan Trần Logo" width={64} height={64} className="w-full h-full object-contain" /></div>
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
                  <Image src="/dn-logo.png" alt="DN Group" width={100} height={30} className="h-6 w-auto object-contain shrink-0" />
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
                    <Image 
                      src="/VLTX/project-ve-lai-thanh-xuan-cover.jpg" 
                      alt="Vẽ Lại Thanh Xuân Cover" 
                      width={800}
                      height={500}
                      sizes="(max-width: 768px) 100vw, 40vw"
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
                            <Image src="/VLTX/project-ve-lai-thanh-xuan-cover.jpg" alt="Campaign Image 1" width={800} height={600} sizes="(max-width: 768px) 100vw, 50vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <Image src="/VLTX/project-ve-lai-thanh-xuan-2.jpg" alt="Campaign Image 2" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex flex-col gap-4">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <Image src="/VLTX/project-ve-lai-thanh-xuan-3.jpg" alt="Campaign Image 3" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <Image src="/VLTX/project-ve-lai-thanh-xuan-4.PNG" alt="Campaign Image 4" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-5 flex flex-col gap-4">
                          <div className="w-full rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/VLTX/project-ve-lai-thanh-xuan-5.png" alt="Campaign Image 5" width={700} height={900} sizes="(max-width: 768px) 100vw, 40vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>
                        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/VLTX/project-ve-lai-thanh-xuan-6.png" alt="Campaign Image 6" width={600} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/VLTX/project-ve-lai-thanh-xuan-7.png" alt="Campaign Image 7" width={600} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/VLTX/project-ve-lai-thanh-xuan-8.png" alt="Campaign Image 8" width={600} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <Image 
                      src="/megalive/project-mega-live-trung-thu-cover.png" 
                      alt="Mega Live Trung Thu Cover" 
                      width={800}
                      height={500}
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 40vw"
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
                          <span className="text-sm sm:text-base font-black text-zinc-900">900+</span>
                          <span className="text-[11px] text-slate-400 font-medium">Data khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">52%</span>
                          <span className="text-[11px] text-slate-400 font-medium">Lịch khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">62%</span>
                          <span className="text-[11px] text-slate-400 font-medium">Khách mới</span>
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
                            <Image src="/megalive/project-mega-live-1.png" alt="Mega Live Image 1" width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-2.png" alt="Mega Live Image 2" width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-3.png" alt="Mega Live Image 3" width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-4.png" alt="Mega Live Image 4" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-5.png" alt="Mega Live Image 5" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-6.png" alt="Mega Live Image 6" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-7.png" alt="Mega Live Image 7" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-8.png" alt="Mega Live Image 8" width={800} height={600} unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-9.png" alt="Mega Live Image 9" width={800} height={600} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/megalive/project-mega-live-10.png" alt="Mega Live Image 10" width={800} height={600} unoptimized sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={900} duration={2.5} />+
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={52} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lịch khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={62} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khách mới</div>
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
                    <Image 
                      src="/16nam/project-sinh-nhat-16-nam-cover.png" 
                      alt="Sinh Nhật 16 Năm Cover" 
                      width={800}
                      height={500}
                      sizes="(max-width: 768px) 100vw, 40vw"
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
                          <span className="text-sm sm:text-base font-black text-zinc-900">2000+</span>
                          <span className="text-[11px] text-slate-400 font-medium">Data khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">37%</span>
                          <span className="text-[11px] text-slate-400 font-medium">Lịch khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">49%</span>
                          <span className="text-[11px] text-slate-400 font-medium">Khách mới</span>
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
                            <Image src="/16nam/project-sinh-nhat-1.png" alt="Sinh Nhật 16 Năm 1" width={600} height={900} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-2.jpg" alt="Sinh Nhật 16 Năm 2" width={600} height={900} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-3.png" alt="Sinh Nhật 16 Năm 3" width={600} height={900} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Hàng 2: 3 Poster dọc (Portrait 4:5) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-4.png" alt="Sinh Nhật 16 Năm 4" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-5.png" alt="Sinh Nhật 16 Năm 5" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-6.png" alt="Sinh Nhật 16 Năm 6" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Hàng 3: 3 Poster dọc (Portrait 4:5) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-7.png" alt="Sinh Nhật 16 Năm 7" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-8.png" alt="Sinh Nhật 16 Năm 8" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/16nam/project-sinh-nhat-9.png" alt="Sinh Nhật 16 Năm 9" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Khu vực dưới: Chia 2 khối (Cột Trái 8 phần - Cột Phải 4 phần) để khớp bố cục bất đối xứng */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                          
                          {/* Khối Trái (Chiếm 2/3): 2 Poster 4:5 + 2 Ảnh vuông + (1 Ảnh vuông & 3 Voucher ngang xếp chồng) */}
                          <div className="md:col-span-8 flex flex-col gap-4">
                            
                            {/* Cặp Poster Dịch vụ công nghệ độc quyền (4:5) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <Image src="/16nam/project-sinh-nhat-10.png" alt="Sinh Nhật 16 Năm 10" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <Image src="/16nam/project-sinh-nhat-11.png" alt="Sinh Nhật 16 Năm 11" width={600} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            </div>

                            {/* Cặp Ảnh vuông: Thẻ hoàn tiền 500K & Check-in có quà (1:1) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <Image src="/16nam/project-sinh-nhat-12.jpeg" alt="Sinh Nhật 16 Năm 12" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <Image src="/16nam/project-sinh-nhat-13.jpeg" alt="Sinh Nhật 16 Năm 13" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                            </div>

                            {/* Hàng cuối bên trái: Ảnh vuông Mua 1 Được 3 + Cột 3 Voucher ngang */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                <Image src="/16nam/project-sinh-nhat-14.jpeg" alt="Sinh Nhật 16 Năm 14" width={500} height={500} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="flex flex-col gap-3">
                                <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                  <Image src="/16nam/project-sinh-nhat-15.png" alt="Sinh Nhật 16 Năm 15" width={500} height={250} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                  <Image src="/16nam/project-sinh-nhat-16.png" alt="Sinh Nhật 16 Năm 16" width={500} height={250} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                                  <Image src="/16nam/project-sinh-nhat-17.png" alt="Sinh Nhật 16 Năm 17" width={500} height={250} sizes="(max-width: 768px) 50vw, 25vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Khối Phải (Chiếm 1/3): Banner dài 220K + Ảnh vuông Combo + Voucher ngang 700K */}
                          <div className="md:col-span-4 flex flex-col gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <Image src="/16nam/project-sinh-nhat-18.png" alt="Sinh Nhật 16 Năm 18" width={500} height={750} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <Image src="/16nam/project-sinh-nhat-19.png" alt="Sinh Nhật 16 Năm 19" width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <Image src="/16nam/project-sinh-nhat-20.png" alt="Sinh Nhật 16 Năm 20" width={500} height={250} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={2000} duration={2.5} />+
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={37} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lịch khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={49} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khách mới</div>
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
                    <Image 
                      src="/VXMM/project-vong-xoay-may-man-cover.png" 
                      alt="Vòng Xoay May Mắn Cover" 
                      width={800}
                      height={500}
                      sizes="(max-width: 768px) 100vw, 40vw"
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
                          <span className="text-sm sm:text-base font-black text-zinc-900">5000+</span>
                          <span className="text-[11px] text-slate-400 font-medium">Data</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">12%</span>
                          <span className="text-[11px] text-slate-400 font-medium">Lịch khách mới</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-black text-zinc-900">34%</span>
                          <span className="text-[11px] text-slate-400 font-medium">Khách mới</span>
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
                            <Image src="/VXMM/project-vong-xoay-1.jpg" alt="Vòng Xoay May Mắn 1" width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/VXMM/project-vong-xoay-2.png" alt="Vòng Xoay May Mắn 2" width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                            <Image src="/VXMM/project-vong-xoay-3.png" alt="Vòng Xoay May Mắn 3" width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        </div>

                        {/* Hàng 2: Cột Trái (Chiếm 8/12 = 2/3) chứa Poster dọc lớn + Cột Phải (Chiếm 4/12 = 1/3) chứa 3 ảnh vuông xếp chồng */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                          
                          {/* Cột Trái: 1 Poster dọc lớn (Tết Rồi Làm Đẹp Thôi - Đồng Giá 79K) */}
                          <div className="md:col-span-8 rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group flex">
                            <Image src="/VXMM/project-vong-xoay-4.png" alt="Vòng Xoay May Mắn 4" width={800} height={1000} sizes="(max-width: 768px) 100vw, 66vw" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>

                          {/* Cột Phải: 3 Ảnh vuông xếp chồng dọc */}
                          <div className="md:col-span-4 flex flex-col justify-between gap-4">
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <Image src="/VXMM/project-vong-xoay-5.png" alt="Vòng Xoay May Mắn 5" width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <Image src="/VXMM/project-vong-xoay-6.png" alt="Vòng Xoay May Mắn 6" width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="rounded-xl overflow-hidden border border-slate-100 shadow-2xs bg-slate-50 relative group">
                              <Image src="/VXMM/project-vong-xoay-7.jpeg" alt="Vòng Xoay May Mắn 7" width={500} height={500} sizes="(max-width: 768px) 100vw, 33vw" className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500" />
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={5000} duration={2.5} />+
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={12} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lịch khách mới</div>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-lime-500 transition-all flex flex-col justify-center">
                          <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-lime-600 to-emerald-600 mb-1">
                            <CountUp end={34} duration={2.5} />%
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Khách mới</div>
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
                  <span className="block text-zinc-900">performance ADS</span>
                  <span className="block text-lime-500">HIỆU QUẢ?</span>
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
                  <span className="text-xs sm:text-sm font-extrabold text-zinc-900">tientrung6112@gmail.com</span>
                </div>
                            <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl px-5 py-3.5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">PHONE</span>
                  <span className="text-xs sm:text-sm font-extrabold text-zinc-900">0347330641</span>
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

        {/* Bot Menu Lơ lửng */}
        <FloatingBotMenu />
      </main>

    </div>
  );
}
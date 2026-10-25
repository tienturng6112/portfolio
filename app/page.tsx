"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { 
  Briefcase, User, Mail, Sparkles, ArrowRight, ArrowUpRight,
  ChevronDown, ChevronUp, Image as ImageIcon, BarChart2, TrendingUp, TrendingDown,
  MapPin, Monitor, Target, Video, ShoppingBag, Cpu, PieChart, Filter, Layers, FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type BotEmotion = "normal" | "happy" | "wink" | "surprised";
type BotAction = "idle" | "wave" | "nod" | "look_around";

function SmartBot3D({
  emotion,
  action,
  isHovered,
}: {
  emotion: BotEmotion;
  action: BotAction;
  isHovered: boolean;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const isBlinking = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const blinkTimer = setInterval(() => {
      isBlinking.current = true;
      setTimeout(() => {
        isBlinking.current = false;
      }, 160);
    }, 3200);
    return () => clearInterval(blinkTimer);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!rootRef.current || !headRef.current || !leftArmRef.current || !rightArmRef.current) return;

    // Cơ thể lơ lửng
    rootRef.current.position.y = -0.35 + Math.sin(t * 2.2) * 0.12;
    rootRef.current.rotation.z = Math.sin(t * 1.5) * 0.03;

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.2;
      ringRef.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 2) * 0.08;
    }

    leftArmRef.current.rotation.z = -0.25 + Math.sin(t * 2.2) * 0.08;
    leftArmRef.current.rotation.x = Math.cos(t * 1.8) * 0.08;

    if (action === "wave" || isHovered) {
      const targetWaveZ = 2.35 + Math.sin(t * 12) * 0.35;
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, targetWaveZ, 0.12);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.2, 0.12);
    } else {
      const idleRightZ = 0.25 - Math.sin(t * 2.2) * 0.08;
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, idleRightZ, 0.08);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.08);
    }

    // ... code phía trên giữ nguyên ...

    // --- B. XOAY ĐẦU THEO CHUỘT (CHỈNH LẠI HƯỚNG NHÌN) ---
    let targetHeadY = THREE.MathUtils.clamp(mouse.current.x * 0.8, -0.8, 0.8);
    let targetHeadX = THREE.MathUtils.clamp(-mouse.current.y * 0.4, -0.4, 0.4);

    if (action === "nod") {
      targetHeadX += Math.sin(t * 10) * 0.25;
    } else if (action === "look_around") {
      targetHeadY += Math.sin(t * 3.5) * 0.45;
    }

    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, 0.08);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, 0.08);

    // ... code phía dưới giữ nguyên ...

    const activeEmotion: BotEmotion = isHovered ? "happy" : emotion;

    if (leftEyeRef.current && rightEyeRef.current && mouthRef.current) {
      const leScaleY = isBlinking.current ? 0.12 : activeEmotion === "happy" ? 0.45 : activeEmotion === "surprised" ? 1.35 : 1.0;
      const leRotZ = activeEmotion === "happy" || activeEmotion === "wink" ? 0.22 : 0;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, leScaleY, 0.18);
      leftEyeRef.current.rotation.z = THREE.MathUtils.lerp(leftEyeRef.current.rotation.z, leRotZ, 0.18);

      const reScaleY = isBlinking.current || activeEmotion === "wink" ? 0.12 : activeEmotion === "happy" ? 0.45 : activeEmotion === "surprised" ? 1.35 : 1.0;
      const reRotZ = activeEmotion === "happy" ? -0.22 : activeEmotion === "wink" ? 0.15 : 0;
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, reScaleY, 0.18);
      rightEyeRef.current.rotation.z = THREE.MathUtils.lerp(rightEyeRef.current.rotation.z, reRotZ, 0.18);

      const mScaleX = activeEmotion === "happy" ? 1.35 : activeEmotion === "surprised" ? 0.55 : 1.0;
      const mScaleY = activeEmotion === "happy" ? 1.4 : activeEmotion === "surprised" ? 1.6 : 0.8;
      mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, mScaleX, 0.15);
      mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, mScaleY, 0.15);
    }
  });

  return (
    // ĐÃ FIX: Giảm scale từ 1.35 xuống 1.15 để lọt thỏm vào Canvas, không bị viền cắt đầu
    <group ref={rootRef} scale={0.7}>
      {/* ================= CỤM ĐẦU BOT ================= */}
      <group ref={headRef} position={[0, 0.72, 0]}>
        <mesh scale={[1.18, 0.92, 0.88]}>
          <sphereGeometry args={[0.72, 36, 36]} />
          <meshStandardMaterial color="#ffffff" roughness={0.18} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.0, 0.46]} scale={[0.96, 0.68, 0.35]}>
          <sphereGeometry args={[0.62, 32, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.25} />
        </mesh>
        <mesh ref={leftEyeRef} position={[-0.24, 0.06, 0.69]}>
          <capsuleGeometry args={[0.055, 0.05, 16, 16]} />
          <meshStandardMaterial color="#a3e635" emissive="#84cc16" emissiveIntensity={1.6} />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.24, 0.06, 0.69]}>
          <capsuleGeometry args={[0.055, 0.05, 16, 16]} />
          <meshStandardMaterial color="#a3e635" emissive="#84cc16" emissiveIntensity={1.6} />
        </mesh>
        <mesh ref={mouthRef} position={[0, -0.12, 0.68]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.085, 0.026, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#a3e635" emissive="#84cc16" emissiveIntensity={1.5} />
        </mesh>
        {[-0.86, 0.86].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <cylinderGeometry args={[0.24, 0.24, 0.14, 28]} />
              <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.3} />
            </mesh>
            <mesh position={[0, idx === 0 ? 0.07 : -0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.19, 0.03, 16, 32]} />
              <meshStandardMaterial color="#84cc16" emissive="#65a30d" emissiveIntensity={1.2} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.025, 0.04, 0.22, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.86, 0]}>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshStandardMaterial color="#a3e635" emissive="#84cc16" emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* ================= CỤM THÂN BOT ================= */}
      <group position={[0, -0.25, 0]}>
        <mesh scale={[0.95, 0.88, 0.85]}>
          <sphereGeometry args={[0.56, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.18} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.04, 0.45]} scale={[1.1, 1.0, 0.3]}>
          <sphereGeometry args={[0.17, 24, 24]} />
          <meshStandardMaterial color="#0f172a" roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.09, 0.51]}>
          <boxGeometry args={[0.14, 0.035, 0.02]} />
          <meshStandardMaterial color="#a3e635" emissive="#84cc16" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, 0.02, 0.51]}>
          <boxGeometry args={[0.04, 0.12, 0.02]} />
          <meshStandardMaterial color="#a3e635" emissive="#84cc16" emissiveIntensity={1.5} />
        </mesh>
        <group ref={leftArmRef} position={[-0.64, 0.15, 0]}>
          <mesh position={[-0.04, -0.16, 0]}>
            <capsuleGeometry args={[0.11, 0.22, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>
        <group ref={rightArmRef} position={[0.64, 0.15, 0]}>
          <mesh position={[0.04, -0.16, 0]}>
            <capsuleGeometry args={[0.11, 0.22, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>
        <mesh ref={ringRef} position={[0, 0.05, 0]} rotation={[Math.PI / 2.2, 0.2, 0]}>
          <torusGeometry args={[0.88, 0.018, 16, 64]} />
          <meshStandardMaterial color="#a3e635" emissive="#84cc16" emissiveIntensity={1.4} />
        </mesh>
      </group>
    </group>
  );
}

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
  const [isHovered, setIsHovered] = useState(false);
  const [emotion, setEmotion] = useState<BotEmotion>("normal");
  const [action, setAction] = useState<BotAction>("idle");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const aiBrain = setInterval(() => {
      const emotions: BotEmotion[] = ["normal", "happy", "wink", "surprised"];
      const actions: BotAction[] = ["idle", "wave", "nod", "look_around"];
      setEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
      setAction(actions[Math.floor(Math.random() * actions.length)]);
    }, 5000);
    return () => clearInterval(aiBrain);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const menuItems = [
    { id: "about", label: "Về bản thân tôi" },
    { id: "projects", label: "Dự án đã thực hiện" },
    { id: "skills", label: "Năng lực Marketing Ads" },
    { id: "cv", label: "Xem CV của tôi" },
    { id: "contact", label: "Liên hệ hợp tác" },
  ];

  return (
    <div className="fixed right-0 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 25, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 25 }}
            // ĐÃ FIX: Cho menu nhỏ gọn lại trên Mobile (w-52)
            className="mr-1 sm:mr-2 w-52 sm:w-60 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_15px_45px_-10px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-lime-600">
                Trợ lý AI Trung Tiến
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col px-4 pb-3">
              {menuItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between py-3 text-xs sm:text-sm font-bold text-slate-700 hover:text-lime-600 transition-colors cursor-pointer ${
                    idx !== menuItems.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <span>{item.label}</span>
                  <span>›</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ĐÃ FIX: Reponsive kích thước khung chứa 
          Mobile: w-28 h-28 (rất nhỏ gọn) 
          Tablet: w-40 h-40 
          PC: w-52 h-52 */}
      <div
        className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsOpen(!isOpen);
          setEmotion("happy");
          setAction("wave");
        }}
      >
        <div className="absolute inset-2 sm:inset-6 bg-lime-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* ĐÃ FIX: Lùi camera ra xa (Z=4.2), kéo lên xíu (Y=0.15) để lấy trọn không gian */}
        {isMounted && (
          <Canvas camera={{ position: [0, 0.15, 4.2], fov: 42 }}>
            <ambientLight intensity={0.85} />
            <directionalLight position={[5, 8, 5]} intensity={1.4} />
            <Environment preset="city" />
            <SmartBot3D emotion={emotion} action={action} isHovered={isHovered} />
            
            {/* ĐÃ FIX: Tăng scale của bóng lên 5 và tăng độ mờ blur=3. 
                Điều này giúp bóng tràn đều ra hai bên và mờ đi một cách siêu tự nhiên */}
            <ContactShadows position={[0, -1.1, 0]} opacity={0.4} scale={5} blur={3} resolution={256} />
          </Canvas>
        )}
      </div>
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
  const [openExpKPI, setOpenExpKPI] = useState(true);
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
    { name: "FACEBOOK ADS", khachMoi: 250 },
    { name: "CHI NHÁNH", khachMoi: 110 },
    { name: "GOOGLE", khachMoi: 60 },
    { name: "TỔNG ĐÀI", khachMoi: 30 },
    { name: "TIKTOK", khachMoi: 25 },
    { name: "CỘNG TÁC VIÊN", khachMoi: 22 },
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
  // State quản lý Tab Kinh nghiệm làm việc
  const [activeCompany, setActiveCompany] = useState('DN_GROUP');
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

            {/* DẢI THẺ KỸ NĂNG CỐT LÕI */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-2.5 mt-6 max-w-[600px]"
            >
              {[
                "Google Ads",
                "Facebook Ads",
                "TikTok Ads",
                "ChatGPT Ads",
                "Looker Studio",
                "Landing page"
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className="px-4 py-2 bg-slate-100 border border-slate-200/80 rounded-full text-[13px] sm:text-sm font-semibold text-slate-700 shadow-xs hover:bg-white hover:border-lime-400 hover:text-lime-600 hover:shadow-sm transition-all cursor-default select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
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

        {/* === KHỐI THỐNG KÊ NỔI BẬT (4 CỘT) === */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="w-full mt-16 md:mt-24 pt-8 md:pt-12 border-t border-slate-200"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
            {[
              {
                val: "~10 tỷ",
                desc: "Tổng ngân sách Facebook Ads Seoul Center đã nắm"
              },
              {
                val: "15+",
                desc: "9 chi nhánh ĐNB, 11 chi nhánh Miền Tây, 4 chi nhánh Tây nguyên"
              },
              {
                val: "~5,4 tỷ",
                desc: "KPI từng đạt được trong năm 2026 chiếm 14% tổng KPI "
              },
              {
                val: "10.000+",
                desc: "Data khách hàng tiềm năng từ các dự án đề xuất được chuyển khai"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`flex flex-col px-4 sm:px-6 lg:px-8 border-slate-200
                  ${index === 0 ? 'sm:border-r lg:border-r' : ''}
                  ${index === 1 ? 'lg:border-r' : ''}
                  ${index === 2 ? 'sm:border-r lg:border-r' : ''}
                `}
              >
                <div className="text-[40px] md:text-[46px] font-black text-[#1b75ff] tracking-tighter mb-3 leading-none">
                  {stat.val}
                </div>
                <div className="text-[13px] md:text-sm text-slate-500 leading-relaxed font-medium">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
                Tôi là <strong className="text-zinc-900 font-semibold">Trung Tiến</strong>, chuyên viên Marketing Ads với hơn 2 năm kinh nghiệm chạy Facebook Ads, tập trung tối ưu chiến dịch theo dữ liệu để mang lại chuyển đổi và doanh thu thực tế cho doanh nghiệp.
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

        {/* ================= KHỐI KINH NGHIỆM LÀM VIỆC (MỚI - DẠNG TABS) ================= */}
        <div id="experience" className="mt-16 md:mt-24 scroll-mt-24">
          
          {/* Tiêu đề & Subtitle */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2.5 h-2.5 bg-lime-400 rounded-sm"></div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
                KINH NGHIỆM LÀM VIỆC
              </h2>
            </div>
            
          </div>

          {/* Dải Nút bấm chuyển Tab */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
            {[
              { id: 'DN_GROUP', name: 'Tập đoàn Điểm Nhấn' },
              { id: 'KENZE', name: 'KENZE' },
              { id: 'MISS_AO_DAI', name: 'Miss Áo Dài' },
              { id: 'PHAN_TRAN', name: 'PHAN TRAN' }
            ].map((company) => (
              <button
                key={company.id}
                onClick={() => setActiveCompany(company.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-sm cursor-pointer ${
                  activeCompany === company.id
                    ? "bg-lime-400 text-slate-900 border-none scale-105"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-lime-300 hover:text-lime-600"
                }`}
              >
                {company.name}
              </button>
            ))}
          </div>

          {/* Vùng Hiển thị Nội dung Tab (Giữ nguyên 100% data cũ) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 sm:p-8">
            
            {/* 1. NỘI DUNG: TẬP ĐOÀN ĐIỂM NHẤN */}
            {activeCompany === 'DN_GROUP' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                      {/* CỤM TAG METADATA PHÂN TÁCH TINH TẾ */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
                          Thẩm mỹ
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                          Chuỗi thương hiệu
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-[#1b75ff] text-xs font-extrabold">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Quy mô &gt;1.200 nhân sự
                        </span>
                      </div>
                      <h3 className="text-2xl font-extrabold text-zinc-900 mb-1">Tập đoàn Điểm Nhấn (DN Group)</h3>
                      <div className="text-base font-bold text-lime-600 mb-5">Chuyên viên Marketing Ads</div>
                      <div className="mt-6">
                {/* --- 1. SEOUL CENTER (GIAO DIỆN CASE STUDY CHI TIẾT) --- */}
                <div className="mb-8 bg-[#f8fafc] border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8">
                  {/* Hàng trên: Chia 2 cột */}
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
                    {/* CỘT TRÁI: THÔNG TIN DỰ ÁN */}
                  <div className="flex-1">
                    {/* Badge Case Study */}
                    <div className="inline-block px-3.5 py-1.5 bg-[#005cff] text-white text-[10px] sm:text-[11px] font-black tracking-[0.15em] uppercase rounded-md mb-6 shadow-sm">
                     
                    </div>

                    {/* Tiêu đề tách 2 màu ép sát dòng */}
                    <h3 className="text-[64px] md:text-[80px] font-black uppercase tracking-tighter leading-[0.85] mb-5">
                      <span className="text-[#0a1128] block">SEOUL</span>
                      <span className="text-[#005cff] block">CENTER</span>
                    </h3>

                    {/* Mô tả phụ */}
                    <p className="text-[16px] md:text-[18px] font-bold text-[#1e293b] leading-snug mb-2">
                      Hệ thống thẩm mỹ viện & phòng khám da liễu nhiều chi nhánh (Việt Nam, Campuchia)
                    </p>

                    {/* Vai trò */}
                    <div className="text-[14px] md:text-[15px] text-slate-400 font-medium mb-5">
                      Vai trò: <span className="text-[#005cff] font-bold">Chuyên viên Facebook Ads</span>
                    </div>

                    {/* Các thẻ Tags */}
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { label: "Facebook Ads (Chính)", active: true },
                        { label: "Google Ads", active: false },
                        { label: "TikTok Ads", active: false },
                        { label: "ChatGPT Ads", active: false }
                      ].map(tag => (
                        <span
                          key={tag.label}
                          className={`px-4 py-1.5 rounded-full text-[13px] transition-colors ${
                            tag.active
                              ? 'bg-[#eef4ff] text-[#005cff] font-bold'
                              : 'bg-white border border-slate-200/80 text-[#334155] font-semibold hover:border-slate-300'
                          }`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cột phải: Challenge / Approach / Result */}
                    <div className="flex-1 flex flex-col gap-2 lg:pt-1">
                      {[
                        {
                          title: "CÔNG VIỆC CHÍNH",
                          text: "Triển khai chiến dịch Facebook Ads nhằm tạo lead và đặt lịch thăm khám cho hệ thống nhiều chi nhánh.Xây dựng và test nhiều nhóm quảng cáo, tối ưu target, creative, ngân sách theo từng khu vực.Phối hợp với đội ngũ Content và CSKH để cải thiện tỷ lệ chuyển đổi từ lead sang đặt lịch.",
                        },
                        {
                          title: "APPROACH",
                          text: "Phân bổ ngân sách theo 10+ khu vực địa lý,Liên tục test creative, audience, remarketing và tối ưu CPL, CTR, tỷ lệ chuyển đổi,Theo dõi và báo cáo dữ liệu hằng ngày, đề xuất điều chỉnh ngân sách và chiến lược dựa trên hiệu quả thực tế.",
                        },
                        {
                          title: "RESULT",
                          text: "Data đạt 130–176% KPI trong T3–T5/2026 (theo báo cáo tháng),CIR toàn hệ thống giảm từ 4,2% (T3) xuống 2,2% (T9/2026),Đảm bảo nguồn lead ổn định và chi phí tối ưu theo từng giai đoạn.",
                        },
                      ].map((item) => (
                        <div key={item.title} className="border-l-2 border-[#1b75ff] pl-4">
                          <div className="text-[12px] font-black text-[#1b75ff] tracking-wider uppercase mb-1">
                            {item.title}
                          </div>
                          <p className="text-[13px] sm:text-[14px] text-slate-600 font-medium leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --- HÀNG DƯỚI: 4 KHỐI SỐ LIỆU CHUẨN KPI DASHBOARD --- */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    {[
                      {
                        tag: "TỔNG NGÂN SÁCH",
                        val: "~10 TỶ",
                        desc: "Tổng ngân sách Facebook Ads Seoul Center đã nắm)",
                        highlight: false,
                      },
                      {
                        tag: "CHI NHÁNH",
                        val: "15+",
                        desc: "9 chi nhánh ĐNB, 11 chi nhánh Miền Tây, 4 chi nhánh Tây nguyên",
                        highlight: false,
                      },
                      {
                        tag: "HIỆU SUẤT KPI",
                        val: "~5,4 tỷ",
                        desc: "KPI từng đạt được trong năm 2026 chiếm 14% tổng KPI",
                        highlight: true,
                      },
                      {
                        tag: "DATA KHÁCH HÀNG",
                        val: "10.000+",
                        desc: "Data khách hàng tiềm năng từ các dự án đề xuất được chuyển khai",
                        highlight: true,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="group relative bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-[#1b75ff]/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      >
                        {/* Thanh chỉ số màu nhỏ trên đầu card */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase group-hover:text-[#1b75ff] transition-colors">
                            {item.tag}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1b75ff]/60 group-hover:bg-[#1b75ff] group-hover:scale-125 transition-all" />
                        </div>

                        {/* Con số chính: Luôn trên 1 hàng, không bị gãy */}
                        <div className="text-2xl sm:text-[28px] xl:text-[32px] font-black text-[#1b75ff] tracking-tight leading-none mb-2.5 whitespace-nowrap">
                          {item.val}
                        </div>

                        {/* Mô tả giải thích */}
                        <div className="text-[12px] text-slate-500 font-medium leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* ================= CỤM CÁC THƯƠNG HIỆU HỆ SINH THÁI ================= */}
                <div className="mt-8 space-y-5">
                  
                  {/* 1. THƯƠNG HIỆU CHÍNH CÓ HÌNH ẢNH MÔ TẢ CHIẾN DỊCH */}
                  <div className="p-6 sm:p-7 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xs hover:border-slate-300 transition-all">
                    
                    {/* Header Card */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-black text-xs text-[#1b75ff]">
                          SCC
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                              Seoul Center Clinic
                            </h4>
                            
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            Phòng khám chuyên khoa da liễu thẩm mỹ
                          </p>
                        </div>
                      </div>
                      
                    </div>

                    {/* Nội dung: Chia 2 cột (Trái: Nhiệm vụ - Phải: Hình ảnh mô tả) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      
                      {/* Cột trái: 2 Hộp nhiệm vụ (7 phần) */}
                      <div className="lg:col-span-7 flex flex-col gap-3.5 justify-between">
                        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 h-full">
                          <div className="flex items-center gap-2 mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-800">
                            <span className="w-2 h-2 rounded-full bg-lime-500 shrink-0"></span>
                            Triển khai & Chuyển đổi đặt lịch
                          </div>
                          <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                            Triển khai và tối ưu Facebook Ads cho phòng khám Seoul Center Clinic, tập trung tạo khách hàng tiềm năng và đặt lịch tư vấn / thăm khám qua tin nhắn.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 h-full">
                          <div className="flex items-center gap-2 mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-800">
                            <span className="w-2 h-2 rounded-full bg-lime-500 shrink-0"></span>
                            Kế hoạch phễu & Đo lường KPI
                          </div>
                          <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                            Lên kế hoạch chiến dịch theo dịch vụ và chương trình ưu đãi, test creative và audience, tối ưu CPL, CTR theo KPI; phối hợp đội ngũ tư vấn và báo cáo định kỳ.
                          </p>
                        </div>
                      </div>

                      {/* Cột phải: KHUNG HÌNH ẢNH MÔ TẢ CHIẾN DỊCH (5 phần) */}
                      <div className="lg:col-span-5 relative group overflow-hidden rounded-xl border border-slate-200 bg-slate-100 min-h-[180px] flex items-center justify-center">
                        {/* Nhãn tag nổi trên ảnh */}
                        <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded-md">
                          Báo cáo / Creative Ads
                        </div>

                        {/* Thẻ hình ảnh: Anh thay src="/anh-chien-dich.png" vào đây */}
                        <img 
                          src="/anh-chien-dich-sc.webp" 
                          alt="Chiến dịch Seoul Center Clinic"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            // Tự động hiện khung placeholder nếu anh chưa kịp bỏ file ảnh
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />

                        {/* Khung dự phòng (Placeholder) khi chưa có file ảnh thật */}
                        <div className="hidden absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-50 border-2 border-dashed border-slate-200">
                          <svg className="w-8 h-8 text-slate-300 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs font-bold text-slate-400">Hình ảnh mô tả chiến dịch</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">(Thả ảnh vào /public/anh-chien-dich-sc.webp)</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 2. CỤM CÁC THƯƠNG HIỆU HỆ SINH THÁI (GRID 3 CỘT GỌN GÀNG) */}
                  <div className="p-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl sm:rounded-3xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h5 className="text-sm font-black uppercase tracking-wider text-slate-900">
                          Thương hiệu bổ trợ trực thuộc hệ sinh thái
                        </h5>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Hỗ trợ phụ các chiến dịch quảng cáo khi có nhu cầu, đảm bảo hình ảnh và thông điệp nhất quán theo thương hiệu.
                        </p>
                      </div>
                      <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                        3 Dự án
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { code: "DH", name: "DN Home", role: "Nội thất & Gia dụng", bg: "bg-slate-100 text-slate-700" },
                        { code: "SA", name: "S Academy", role: "Đào tạo nghề thẩm mỹ", bg: "bg-amber-50 text-amber-600 border border-amber-100" },
                        { code: "SD", name: "Shark Dental", role: "Nha khoa công nghệ", bg: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
                      ].map((subBrand) => (
                        <div
                          key={subBrand.name}
                          className="p-4 bg-white border border-slate-200/70 rounded-xl flex items-center justify-between hover:shadow-xs transition-shadow"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs ${subBrand.bg}`}>
                              {subBrand.code}
                            </div>
                            <div>
                              <div className="text-[14px] font-extrabold text-slate-900">
                                {subBrand.name}
                              </div>
                              <div className="text-[11px] font-medium text-slate-500">
                                {subBrand.role}
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md">
                            Phụ
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

{/* ================= KHỐI SỐ LIỆU THỰC TẾ: HIỂN THỊ MỞ TOÀN BỘ 3 KÊNH ================= */}
                <div className="mt-8 space-y-6">

                  {/* 1. SỐ LIỆU FACEBOOK ADS (MỞ SẴN TOÀN BỘ) */}
                  <div ref={fbSectionRef} className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
                    {/* Header Facebook */}
                    <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-black text-sm shrink-0">
                        f
                      </div>
                      <h4 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-wide border-b-2 border-lime-400 pb-0.5">
                        SỐ LIỆU FACEBOOK ADS
                      </h4>
                    </div>

                    <div className="space-y-6">
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

                  {/* --- BIỂU ĐỒ CỘT: KPI FACEBOOK ADS (CHUẨN SAAS DASHBOARD) --- */}
                    <div className="mt-5 p-6 sm:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                      
                      {/* Header Biểu đồ & Chú thích */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-slate-100 gap-4">
                        <div>
                          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[#005cff] uppercase tracking-wider mb-1">
                            <span className="w-2 h-2 rounded-full bg-[#005cff]"></span>
                            Mức độ hoàn thành KPI
                          </div>
                          <AnimatePresence mode="wait">
                            <motion.h5
                              key={expMonthIdx}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -3 }}
                              transition={{ duration: 0.2 }}
                              className="text-lg sm:text-xl font-black text-slate-900 tracking-tight"
                            >
                              Biểu đồ tỷ lệ đạt KPI {expMonths[expMonthIdx].month}
                            </motion.h5>
                          </AnimatePresence>
                        </div>

                        {/* Legend tinh gọn */}
                        <div className="flex flex-wrap items-center gap-4 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/60">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-[#005cff] to-[#60a5fa]"></span>
                            Vượt KPI (&ge;100%)
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-amber-500 to-amber-300"></span>
                            Sát mục tiêu (&lt;100%)
                          </div>
                        </div>
                      </div>

                      {/* Khu vực Đồ thị (Scale từ 70% đến 120% để thấy rõ độ chênh lệch) */}
                      <div className="relative pt-8 pb-2">
                        
                        {/* Vùng Canvas cố định chiều cao 190px cho các cột */}
                        <div className="relative h-[190px] w-full pl-12 sm:pl-16 pr-2 sm:pr-6">
                          
                          {/* Đường lưới 110% */}
                          <div className="absolute bottom-[80%] left-0 right-0 flex items-center pointer-events-none">
                            <span className="w-10 sm:w-12 text-[10px] font-bold text-slate-300 text-right pr-3">
                              110%
                            </span>
                            <div className="flex-1 border-t border-slate-100"></div>
                          </div>

                          {/* ĐƯỜNG MỤC TIÊU: 100% KPI (Nằm ở đúng 60% chiều cao khung) */}
                          <div className="absolute bottom-[60%] left-0 right-0 flex items-center z-20 pointer-events-none">
                            <span className="w-10 sm:w-12 text-[11px] font-black text-emerald-600 text-right pr-2 flex items-center justify-end gap-0.5">
                              100%
                            </span>
                            <div className="flex-1 border-t-2 border-dashed border-emerald-400/90 relative">
                              <span className="absolute -top-2.5 right-0 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider shadow-2xs">
                                Mục tiêu chuẩn
                              </span>
                            </div>
                          </div>

                          {/* Đường lưới 90% */}
                          <div className="absolute bottom-[40%] left-0 right-0 flex items-center pointer-events-none">
                            <span className="w-10 sm:w-12 text-[10px] font-bold text-slate-300 text-right pr-3">
                              90%
                            </span>
                            <div className="flex-1 border-t border-slate-100"></div>
                          </div>

                          {/* Đường đáy (Baseline) */}
                          <div className="absolute bottom-0 left-12 sm:left-16 right-0 border-t border-slate-200"></div>

                          {/* 4 Cột Biểu đồ (Luôn căn đáy cùng 1 hàng, đồng bộ với tháng đang chọn) */}
                          <div key={expMonthIdx} className="relative z-10 grid grid-cols-4 gap-3 sm:gap-8 h-full items-end">
                            {[
                              { label: "DOANH THU", val: expMonths[expMonthIdx].revenue, num: expMonths[expMonthIdx].revenueVal },
                              { label: "TỔNG DATA", val: expMonths[expMonthIdx].totalData, num: expMonths[expMonthIdx].totalDataVal },
                              { label: "KHÁCH MỚI", val: expMonths[expMonthIdx].avgData, num: expMonths[expMonthIdx].khachMoiVal },
                              { label: "TB KHÁCH MỚI", val: expMonths[expMonthIdx].avgNewCust, num: expMonths[expMonthIdx].tbKhachVal },
                            ].map((item, idx) => {
                              // Tự tính lại mức chênh lệch (+/- so với 100%)
                              const diffVal = Math.round((item.num - 100) * 10) / 10;
                              const diff =
                                diffVal > 0
                                  ? `+${diffVal.toString().replace(".", ",") }%`
                                  : diffVal < 0
                                    ? `${diffVal.toString().replace(".", ",") }%`
                                    : "0%";
                              const pass = item.num >= 100;

                              // Công thức quy đổi chiều cao theo yêu cầu:
                              const barHeightPercent = Math.min(Math.max(((item.num - 70) / 50) * 100, 12), 100);

                              return (
                                <div key={idx} className="h-full flex flex-col justify-end items-center group">
                                  {/* Khu vực Cột + Số liệu nổi trên đỉnh cột */}
                                  <div className="w-full max-w-[68px] h-full flex items-end justify-center relative">
                                    
                                    {/* Cột nền xám mờ dẫn hướng */}
                                    <div className="absolute inset-0 bg-slate-50/70 rounded-t-2xl border-x border-t border-slate-100/80 pointer-events-none" />

                                    {/* Cột dữ liệu động */}
                                    <motion.div
                                      initial={{ height: 0 }}
                                      whileInView={{ height: `${barHeightPercent}%` }}
                                      viewport={{ once: true, margin: "-40px" }}
                                      transition={{ duration: 0.75, delay: 0.05 + idx * 0.1, ease: "easeOut" }}
                                      className={`relative w-full rounded-t-2xl transition-all duration-300 group-hover:brightness-105 ${
                                        pass
                                          ? "bg-gradient-to-t from-[#005cff] via-[#2575fc] to-[#60a5fa] shadow-[0_4px_20px_-4px_rgba(0,92,255,0.4)]"
                                          : "bg-gradient-to-t from-amber-500 via-amber-400 to-[#fde047] shadow-[0_4px_20px_-4px_rgba(245,158,11,0.35)]"
                                      }`}
                                    >
                                      {/* Nhãn % & Badge chênh lệch neo trực tiếp trên đỉnh cột */}
                                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                                        <span
                                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full mb-0.5 ${
                                            pass
                                              ? "bg-blue-50 text-[#005cff]"
                                              : "bg-amber-50 text-amber-600"
                                          }`}
                                        >
                                          {diff}
                                        </span>
                                        <span
                                          className={`text-sm sm:text-base font-black tracking-tight ${
                                            pass ? "text-slate-900" : "text-amber-600"
                                          }`}
                                        >
                                          {item.val}
                                        </span>
                                      </div>

                                      {/* Vạch sáng bóng trên đỉnh cột */}
                                      <div className="w-full h-1.5 bg-white/30 rounded-t-2xl" />
                                    </motion.div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Hàng Nhãn Trục X (Tách biệt hoàn toàn bên dưới đáy để không làm lệch chiều cao cột) */}
                        <div className="grid grid-cols-4 gap-3 sm:gap-8 pl-12 sm:pl-16 pr-2 sm:pr-6 pt-3.5">
                          {["DOANH THU", "TỔNG DATA", "KHÁCH MỚI", "TB KHÁCH MỚI"].map((label, i) => (
                            <div
                              key={i}
                              className="text-center text-[10px] sm:text-xs font-extrabold text-slate-600 uppercase tracking-wide whitespace-nowrap"
                            >
                              {label}
                            </div>
                          ))}
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

                  {/* --- PHƯƠNG ÁN 1: CLEAN SAAS BENCHMARK CARDS (CHUẨN DASHBOARD QUỐC TẾ) --- */}
                  <div className="mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        label: "CHI PHÍ MESS",
                        val: "150K – 300K",
                        unit: "VNĐ / tin nhắn đặt lịch",
                        badge: "Phễu Mess",
                        accent: "bg-[#005cff]",
                        softBg: "bg-blue-50 text-[#005cff] border-blue-100",
                        barWidth: "w-[72%]",
                        icon: (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        ),
                      },
                      {
                        label: "CHI PHÍ LEAD",
                        val: "350K – 550K",
                        unit: "VNĐ / data chất lượng",
                        badge: "Form / SĐT",
                        accent: "bg-indigo-600",
                        softBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
                        barWidth: "w-[82%]",
                        icon: (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        ),
                      },
                      {
                        label: "CHỈ SỐ CPM",
                        val: "150K – 400K",
                        unit: "VNĐ / 1.000 hiển thị",
                        badge: "Tệp thẩm mỹ",
                        accent: "bg-cyan-500",
                        softBg: "bg-cyan-50 text-cyan-600 border-cyan-100",
                        barWidth: "w-[65%]",
                        icon: (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ),
                      },
                      {
                        label: "CHỈ SỐ CPA",
                        val: "5K – 15K",
                        unit: "VNĐ / tương tác mục tiêu",
                        badge: "Tối ưu sâu",
                        accent: "bg-emerald-500",
                        softBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
                        barWidth: "w-[88%]",
                        icon: (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ),
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="group relative bg-white border border-slate-200/90 rounded-2xl p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-8px_rgba(0,92,255,0.12)] hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Hàng trên: Icon + Nhãn phụ */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${item.softBg}`}>
                              {item.icon}
                            </div>
                            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                              {item.label}
                            </span>
                          </div>
                        </div>

                        {/* Con số chính sắc nét */}
                        <div className="mb-4">
                          <div className="text-[22px] xl:text-[25px] font-black text-slate-900 tracking-tight leading-none mb-1.5 whitespace-nowrap">
                            {item.val}
                          </div>
                          <div className="text-[12px] text-slate-500 font-medium whitespace-nowrap">
                            {item.unit}
                          </div>
                        </div>

                        {/* Thước đo ngưỡng KPI ở đáy */}
                        <div className="pt-3 border-t border-slate-100">
                          <div className="flex items-center justify-between text-[10px] font-bold mb-1.5">
                            <span className="text-slate-400 uppercase tracking-wider">{item.badge}</span>
                            <span className="text-emerald-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Trong ngưỡng KPI
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.accent} ${item.barWidth} group-hover:w-full transition-all duration-500`} />
                          </div>
                        </div>
                      </div>
                    ))}
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
                    </div>
                  </div>

                  {/* 2. SỐ LIỆU TIKTOK ADS (MỞ SẴN TOÀN BỘ) */}
                  <div ref={tiktokSectionRef} className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
                    {/* Header TikTok */}
                    <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black text-sm shrink-0">
                        d
                      </div>
                      <h4 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-wide border-b-2 border-lime-400 pb-0.5">
                        SỐ LIỆU TIKTOK ADS
                      </h4>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-lime-50/70 border border-lime-200/60 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="w-full bg-white border border-slate-200/80 rounded-xl p-2 overflow-hidden shadow-2xs">
                    <MagnifierImage
                      src="/tiktok-report-thang-5.jpg"
                      alt="Báo cáo TikTok Ads"
                      zoom={2.6}
                      lensSize={180}
                    />
                  </div>

                  {/* --- BIỂU ĐỒ CỘT & THẺ ĐÁNH GIÁ: SỐ LIỆU TIKTOK ADS --- */}
                    <div className="mt-5 p-6 sm:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                      
                      {/* Header Biểu đồ */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-slate-100 gap-4">
                        <div>
                          <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Biến động chỉ số tối ưu
                          </div>
                          <h5 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            Biểu đồ hiệu quả tối ưu TikTok Ads
                          </h5>
                        </div>

                        {/* Chú thích (Legend) */}
                        <div className="flex flex-wrap items-center gap-4 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/60">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            Tối ưu giảm chi phí (↓)
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#005cff]"></span>
                            Tăng trưởng lợi nhuận (↑)
                          </div>
                        </div>
                      </div>

                      {/* Nội dung chính: Trái (Biểu đồ 3 cột %) - Phải (Card Đánh giá Hiệu suất TỐT) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        
                        {/* CỘT TRÁI (8 PHẦN): BIỂU ĐỒ 3 CỘT % */}
                        <div className="lg:col-span-8 flex flex-col justify-between pt-6">
                          <div className="relative h-[180px] w-full pl-10 sm:pl-12 pr-2 sm:pr-4">
                            
                            {/* Đường lưới 60% */}
                            <div className="absolute bottom-[75%] left-0 right-0 flex items-center pointer-events-none">
                              <span className="w-8 sm:w-10 text-[10px] font-bold text-slate-300 text-right pr-2.5">60%</span>
                              <div className="flex-1 border-t border-dashed border-slate-100"></div>
                            </div>

                            {/* Đường lưới 40% */}
                            <div className="absolute bottom-[50%] left-0 right-0 flex items-center pointer-events-none">
                              <span className="w-8 sm:w-10 text-[10px] font-bold text-slate-300 text-right pr-2.5">40%</span>
                              <div className="flex-1 border-t border-dashed border-slate-100"></div>
                            </div>

                            {/* Đường lưới 20% */}
                            <div className="absolute bottom-[25%] left-0 right-0 flex items-center pointer-events-none">
                              <span className="w-8 sm:w-10 text-[10px] font-bold text-slate-300 text-right pr-2.5">20%</span>
                              <div className="flex-1 border-t border-dashed border-slate-100"></div>
                            </div>

                            {/* Đường đáy (0%) */}
                            <div className="absolute bottom-0 left-10 sm:left-12 right-0 border-t border-slate-200"></div>

                            {/* 3 Cột Biểu đồ */}
                            <div className="relative z-10 grid grid-cols-3 gap-4 sm:gap-8 h-full items-end">
                              {[
                                {
                                  label: "CHI PHÍ GIẢM",
                                  val: "41,3%",
                                  num: 41.3,
                                  badge: "↓ Tiết kiệm",
                                  type: "cost_down",
                                },
                                {
                                  label: "CPL GIẢM",
                                  val: "33,4%",
                                  num: 33.4,
                                  badge: "↓ Giá Lead rẻ",
                                  type: "cost_down",
                                },
                                {
                                  label: "ROAS TĂNG",
                                  val: "63%",
                                  num: 63.0,
                                  badge: "↑ Bứt phá",
                                  type: "roas_up",
                                },
                              ].map((item, idx) => {
                                // Thang đo max = 80% để cột 63% đạt độ cao đẹp nhất (~78.75%)
                                const barHeightPercent = (item.num / 80) * 100;
                                const isRoas = item.type === "roas_up";

                                return (
                                  <div key={idx} className="h-full flex flex-col justify-end items-center group">
                                    <div className="w-full max-w-[72px] h-full flex items-end justify-center relative">
                                      {/* Khung nền mờ dẫn hướng */}
                                      <div className="absolute inset-0 bg-slate-50/70 rounded-t-2xl border-x border-t border-slate-100/80 pointer-events-none" />

                                      {/* Cột dữ liệu động */}
                                      <motion.div
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${barHeightPercent}%` }}
                                        transition={{ duration: 0.8, delay: 0.1 + idx * 0.15, ease: "easeOut" }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        className={`relative w-full rounded-t-2xl transition-all duration-300 group-hover:brightness-105 ${
                                          isRoas
                                            ? "bg-gradient-to-t from-[#005cff] via-[#2575fc] to-[#60a5fa] shadow-[0_4px_20px_-4px_rgba(0,92,255,0.4)]"
                                            : "bg-gradient-to-t from-emerald-600 via-emerald-500 to-teal-400 shadow-[0_4px_20px_-4px_rgba(16,185,129,0.35)]"
                                        }`}
                                      >
                                        {/* Nhãn nổi trên đỉnh cột */}
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                                          <span
                                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full mb-0.5 ${
                                              isRoas
                                                ? "bg-blue-50 text-[#005cff]"
                                                : "bg-emerald-50 text-emerald-600"
                                            }`}
                                          >
                                            {item.badge}
                                          </span>
                                          <span className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                                            {item.val}
                                          </span>
                                        </div>

                                        <div className="w-full h-1.5 bg-white/30 rounded-t-2xl" />
                                      </motion.div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Nhãn trục X */}
                          <div className="grid grid-cols-3 gap-4 sm:gap-8 pl-10 sm:pl-12 pr-2 sm:pr-4 pt-3.5">
                            {["CHI PHÍ GIẢM", "CPL GIẢM", "ROAS TĂNG"].map((label, i) => (
                              <div
                                key={i}
                                className="text-center text-[10px] sm:text-xs font-extrabold text-slate-600 uppercase tracking-wide whitespace-nowrap"
                              >
                                {label}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CỘT PHẢI (4 PHẦN): CARD ĐÁNH GIÁ TỔNG QUAN "HIỆU SUẤT TỐT" */}
                        <div className="lg:col-span-4 bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border border-emerald-200/70 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                          {/* Vòng sáng trang trí góc */}
                          <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-emerald-400/15 rounded-full blur-xl pointer-events-none" />

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                              ĐÁNH GIÁ HIỆU SUẤT
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-2xs">
                              Verified
                            </span>
                          </div>

                          {/* Huy hiệu TỐT nổi bật ở trung tâm */}
                          <div className="my-2 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(16,185,129,0.5)] shrink-0">
                              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight leading-none">
                                TỐT
                              </div>
                              <div className="text-xs font-semibold text-slate-500 mt-1">
                                Vượt chuẩn KPI toàn hệ thống
                              </div>
                            </div>
                          </div>

                          {/* Tóm tắt kết quả */}
                          <div className="mt-4 pt-3.5 border-t border-emerald-200/60 space-y-1.5 text-[12px] font-medium text-slate-600">
                            <div className="flex items-center justify-between">
                              <span>Tối ưu ngân sách:</span>
                              <span className="font-bold text-emerald-700">-41,3% chi phí</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Hiệu quả sinh lời:</span>
                              <span className="font-bold text-[#005cff]">+63,0% ROAS</span>
                            </div>
                          </div>
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
                    </div>
                  </div>

                  {/* 3. SỐ LIỆU GOOGLE ADS (MỞ SẴN TOÀN BỘ) */}
                  <div ref={googleSectionRef} className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs">
                    {/* Header Google */}
                    <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-[#1b75ff] text-white flex items-center justify-center font-black text-sm shrink-0">
                        G
                      </div>
                      <h4 className="text-base sm:text-lg font-black uppercase text-slate-900 tracking-wide border-b-2 border-lime-400 pb-0.5">
                        SỐ LIỆU GOOGLE ADS
                      </h4>
                    </div>

                    <div className="space-y-6">
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
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}

          {/* 2. NỘI DUNG: KENZE */}
            {activeCompany === 'KENZE' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        {/* --- TAG METADATA KENZE --- */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
                    Nội thất xuất dư
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    Tồn kho
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    Rời công
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    Trưng bày
                  </span>
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
              </motion.div>
            )}

            {/* 3. NỘI DUNG: MISS ÁO DÀI */}
            {activeCompany === 'MISS_AO_DAI' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        {/* --- TAG METADATA MISS ÁO DÀI --- */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
                    Dịch vụ chụp ảnh
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    Áo dài
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-[#1b75ff] text-xs font-extrabold shadow-2xs">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Gói trải nghiệm 2 in 1
                  </span>
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
              </motion.div>
            )}

            {/* 4. NỘI DUNG: PHAN TRAN */}
            {activeCompany === 'PHAN_TRAN' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        {/* --- TAG METADATA PHAN TRAN --- */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500"></span>
                    In vải
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-700 text-xs font-semibold">
                    In ấn & gia công trên vải
                  </span>
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
              </motion.div>
            )}

          </div>
        </div>

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
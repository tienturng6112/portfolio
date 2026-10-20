"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

export default function ProductCoverflowCarousel({ images }: { images?: CarouselImage[] }) {
  const [activeIndex, setActiveIndex] = useState(2);
  const items = images && images.length > 0 ? images : [
    { id: 1, src: "/kenze-sp-1.png", alt: "Sản phẩm 1" },
    { id: 2, src: "/kenze-sp-2.png", alt: "Sản phẩm 2" },
    { id: 3, src: "/kenze-sp-3.png", alt: "Sản phẩm 3" },
    { id: 4, src: "/kenze-sp-4.png", alt: "Sản phẩm 4" },
    { id: 5, src: "/kenze-sp-5.png", alt: "Sản phẩm 5" },
  ];

  // Tính toán vòng lặp vô tận (Infinite Loop)
  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset < -2) offset += items.length;
    if (offset > 2) offset -= items.length;
    return offset;
  };

  // Xác định vị trí, kích thước và độ mờ tương đối
  const getMotionStyles = (offset: number) => {
    if (offset === 0) return { x: "0%", scale: 1, zIndex: 50, opacity: 1 };
    if (offset === 1) return { x: "70%", scale: 0.75, zIndex: 40, opacity: 0.8 };
    if (offset === -1) return { x: "-70%", scale: 0.75, zIndex: 40, opacity: 0.8 };
    if (offset === 2) return { x: "120%", scale: 0.55, zIndex: 30, opacity: 0.5 };
    if (offset === -2) return { x: "-120%", scale: 0.55, zIndex: 30, opacity: 0.5 };
    return { x: "0%", scale: 0, zIndex: 0, opacity: 0 }; // Dự phòng
  };

  return (
    <div className="relative w-full h-48 sm:h-72 lg:h-80 flex items-center justify-center overflow-hidden bg-zinc-950 rounded-2xl mt-5 shadow-inner select-none">
      {items.map((item, index) => {
        const offset = getOffset(index);
        const styles = getMotionStyles(offset);

        return (
          <motion.div
            key={item.id}
            className="absolute w-40 sm:w-64 lg:w-80 aspect-video flex items-center justify-center cursor-pointer"
            initial={false}
            animate={styles}
            style={{ willChange: "transform, opacity" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() => setActiveIndex(index)}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={item.src}
                alt={item.alt}
                width={500}
                height={350}
                sizes="(max-width: 768px) 160px, (max-width: 1024px) 256px, 320px"
                className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
              />
            </div>
          </motion.div>
        );
      })}

      {/* Nút điều hướng */}
      <div className="absolute bottom-3 flex gap-6 z-50">
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
          aria-label="Previous"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
          aria-label="Next"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

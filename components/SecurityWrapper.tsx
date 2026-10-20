"use client";

import { useEffect } from "react";

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Chặn Click chuột phải
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Chặn các phím tắt F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I và PrintScreen
    const handleKeyDown = (e: KeyboardEvent) => {
      // Chặn F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Chặn Ctrl+Shift+I / Cmd+Option+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
      }
      // Chặn Ctrl+U / Cmd+U (Xem Source Code)
      if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
      // Chặn Ctrl+S / Cmd+S (Lưu trang web)
      if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
      }
      // Chặn phím PrintScreen (Chụp màn hình cơ bản)
      if (e.key === "PrintScreen") {
        navigator.clipboard?.writeText("Hình ảnh và nội dung đã được bảo vệ bản quyền!").catch(() => {});
        alert("Chức năng chụp màn hình đã bị vô hiệu hóa trên trang web này.");
      }
    };

    // 3. Chặn kéo thả hình ảnh ra ngoài
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    // Chống bôi đen text toàn trang
    <div className="select-none pointer-events-auto">
      {children}
    </div>
  );
}

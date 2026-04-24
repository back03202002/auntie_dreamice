/**
 * 評價輪播元件 - 精品玻璃卡片版
 * 功能：
 * - 流暢 CSS transition 滑入/滑出動畫
 * - 桌面：3 卡並排 | 平板：2 卡 | 手機：1 卡全寬
 * - 自動輪播（5 秒）+ 懸停暫停
 * - 進度條顯示自動輪播倒數
 * - 左右箭頭 + 分頁指示點手動切換
 * - 觸控/滑鼠拖曳滑動支援
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Review } from "@/lib/reviews";

interface ReviewCarouselProps {
  reviews: Review[];
  itemsPerView?: number;
  autoPlayInterval?: number;
}

// 星星評分
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 transition-colors ${i < rating ? "text-[#FFD700]" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// 頭像漸層色
const avatarColors = [
  ["#FF6B6B", "#FF8E53"],
  ["#FF9A3C", "#FFD166"],
  ["#06D6A0", "#1B9AAA"],
  ["#7B2FBE", "#A855F7"],
  ["#3B82F6", "#06B6D4"],
  ["#EC4899", "#F43F5E"],
  ["#F59E0B", "#EF4444"],
  ["#14B8A6", "#06B6D4"],
];

// Google 圖示
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// 單張評價卡片 - 精品玻璃風格
function ReviewCard({ review, isActive }: { review: Review; isActive: boolean }) {
  const colors = avatarColors[review.id % avatarColors.length];
  return (
    <div
      className="group relative rounded-2xl p-6 overflow-hidden flex flex-col h-full cursor-default transition-all duration-500"
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,248,240,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,248,240,0.85) 100%)',
        border: isActive
          ? '1px solid rgba(212,168,85,0.45)'
          : '1px solid rgba(237,213,192,0.7)',
        boxShadow: isActive
          ? '0 16px 48px rgba(74,46,26,0.14), 0 0 0 1px rgba(212,168,85,0.15)'
          : '0 4px 20px rgba(74,46,26,0.07)',
        backdropFilter: 'blur(12px)',
        transform: isActive ? 'translateY(-2px)' : undefined,
      }}
    >
      {/* 頂部金色線 */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,85,0.5), transparent)' }}
      />
      {/* 角落裝飾 */}
      <div
        className="absolute top-0 right-0 w-28 h-28 rounded-bl-full pointer-events-none"
        style={{ background: 'linear-gradient(225deg, rgba(212,168,85,0.08), transparent)' }}
      />

      {/* 大引號裝飾 */}
      <div className="absolute top-3 right-4 pointer-events-none select-none">
        <span style={{ fontSize: '4rem', lineHeight: 1, color: 'rgba(212,168,85,0.15)', fontFamily: 'Georgia, serif' }}>"</span>
      </div>

      {/* 星評 */}
      <div className="mb-3 flex items-center gap-2">
        <StarRating rating={review.rating} />
        <span className="text-xs font-bold" style={{ color: '#D4A855' }}>{review.rating}.0</span>
      </div>

      {/* 評價內容 */}
      <p className="text-sm leading-relaxed flex-1 relative z-10 mb-5 italic" style={{ color: 'rgba(44,24,16,0.75)' }}>
        <span className="text-2xl font-serif mr-1 leading-none align-top not-italic" style={{ color: '#D4A855' }}>"</span>
        {review.content}
        <span className="text-2xl font-serif ml-1 leading-none align-bottom not-italic" style={{ color: '#D4A855' }}>"</span>
      </p>

      {/* 評價者資訊 */}
      <div className="pt-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(212,168,85,0.2)' }}>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md"
          style={{
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            boxShadow: `0 4px 12px ${colors[0]}40`,
          }}
        >
          {review.author.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate" style={{ color: 'rgba(44,24,16,0.85)' }}>{review.author}</p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            {review.badge && (
              <span className="inline-block px-2 py-0.5 text-xs rounded-full font-medium" style={{ background: 'rgba(232,137,106,0.12)', color: '#C0623A' }}>
                {review.badge}
              </span>
            )}
            <p className="text-xs" style={{ color: 'rgba(44,24,16,0.4)' }}>{review.date}</p>
          </div>
        </div>
        <div className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity">
          <GoogleIcon />
        </div>
      </div>

      {/* 懸停光效 */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: 'linear-gradient(to top, rgba(212,168,85,0.05), transparent)' }}
      />
      {/* 底部金色線 */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,168,85,0.35), transparent)' }}
      />
    </div>
  );
}

export function ReviewCarousel({
  reviews,
  itemsPerView = 3,
  autoPlayInterval = 5000,
}: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleItems, setVisibleItems] = useState(itemsPerView);

  // 拖曳狀態（觸控 + 滑鼠）
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const mouseStartX = useRef<number | null>(null);
  const isMouseDragging = useRef(false);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  // 響應式卡片數量
  const getVisibleItems = useCallback(() => {
    if (typeof window === "undefined") return itemsPerView;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return itemsPerView;
  }, [itemsPerView]);

  useEffect(() => {
    setVisibleItems(getVisibleItems());
    const handleResize = () => setVisibleItems(getVisibleItems());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getVisibleItems]);

  const maxIndex = Math.max(0, reviews.length - visibleItems);
  const totalDots = maxIndex + 1;

  // 切換到指定頁
  const goTo = useCallback(
    (index: number, direction: "left" | "right" = "right") => {
      if (isAnimating) return;
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setSlideDirection(direction);
      setIsAnimating(true);
      setCurrentIndex(clamped);
      progressRef.current = 0;
      setProgress(0);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, maxIndex]
  );

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    goTo(currentIndex === 0 ? maxIndex : currentIndex - 1, "left");
  }, [currentIndex, maxIndex, goTo]);

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1, "right");
  }, [currentIndex, maxIndex, goTo]);

  const handleDotClick = useCallback(
    (index: number) => {
      setIsPlaying(false);
      goTo(index, index > currentIndex ? "right" : "left");
    },
    [currentIndex, goTo]
  );

  // 自動輪播 + 進度條
  useEffect(() => {
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (!isPlaying || isHovered) return;

    const step = 100 / (autoPlayInterval / 50);
    progressTimerRef.current = setInterval(() => {
      progressRef.current = Math.min(progressRef.current + step, 100);
      setProgress(progressRef.current);

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setCurrentIndex((prev) => {
          const next = prev >= maxIndex ? 0 : prev + 1;
          setSlideDirection("right");
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 400);
          return next;
        });
      }
    }, 50);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, isHovered, autoPlayInterval, maxIndex]);

  // 滑鼠拖曳事件
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    if (Math.abs(e.clientX - mouseStartX.current) > 8) {
      isMouseDragging.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDragging.current || mouseStartX.current === null) {
      mouseStartX.current = null;
      isMouseDragging.current = false;
      return;
    }
    const dx = e.clientX - mouseStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
    mouseStartX.current = null;
    isMouseDragging.current = false;
  };

  // 觸控事件
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  // 鍵盤支援
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  const visibleReviews = reviews.slice(currentIndex, currentIndex + visibleItems);

  return (
    <div
      className="w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 進度條 */}
      <div className="relative h-1 rounded-full mb-8 overflow-hidden" style={{ background: 'rgba(212,168,85,0.15)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-none"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #D4A855, #F0C878)',
          }}
        />
      </div>

      {/* 輪播主體 */}
      <div className="relative px-0 lg:px-16">
        {/* 卡片容器 */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className={`grid gap-5 md:gap-6 transition-all duration-400 ease-out ${
              visibleItems === 1
                ? "grid-cols-1"
                : visibleItems === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            } ${
              isAnimating
                ? slideDirection === "right"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
                : ""
            }`}
          >
            {visibleReviews.map((review, idx) => (
              <ReviewCard key={`${review.id}-${currentIndex}`} review={review} isActive={idx === 0} />
            ))}
          </div>
        </div>

        {/* 左右箭頭（桌面） */}
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="absolute -left-2 lg:-left-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex group"
          style={{ background: 'white', border: '2px solid rgba(237,213,192,0.8)' }}
          aria-label="上一則評價"
        >
          <ChevronLeft className="w-5 h-5 text-foreground/50 group-hover:text-primary transition-colors" />
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute -right-2 lg:-right-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hidden lg:flex group"
          style={{ background: 'white', border: '2px solid rgba(237,213,192,0.8)' }}
          aria-label="下一則評價"
        >
          <ChevronRight className="w-5 h-5 text-foreground/50 group-hover:text-primary transition-colors" />
        </button>
      </div>

      {/* 手機版箭頭 */}
      <div className="flex justify-center gap-4 mt-6 lg:hidden">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-all active:scale-95"
          style={{ background: 'white', border: '1px solid rgba(237,213,192,0.8)' }}
          aria-label="上一則評價"
        >
          <ChevronLeft className="w-4 h-4 text-foreground/60" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-all active:scale-95"
          style={{ background: 'white', border: '1px solid rgba(237,213,192,0.8)' }}
          aria-label="下一則評價"
        >
          <ChevronRight className="w-4 h-4 text-foreground/60" />
        </button>
      </div>

      {/* 分頁指示點 + 播放控制 */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* 播放/暫停按鈕 */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: 'white', border: '1px solid rgba(237,213,192,0.8)' }}
          aria-label={isPlaying ? "暫停輪播" : "繼續輪播"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Play className="w-3.5 h-3.5 text-primary ml-0.5" />
          )}
        </button>

        {/* 分頁指示點 */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? '2rem' : '0.625rem',
                height: '0.625rem',
                background: index === currentIndex
                  ? 'linear-gradient(90deg, #D4A855, #F0C878)'
                  : 'rgba(212,168,85,0.25)',
              }}
              aria-label={`前往第 ${index + 1} 組評價`}
            />
          ))}
        </div>

        {/* 計數 */}
        <span className="text-xs tabular-nums" style={{ color: 'rgba(44,24,16,0.4)' }}>
          {currentIndex + 1} / {totalDots}
        </span>
      </div>
    </div>
  );
}

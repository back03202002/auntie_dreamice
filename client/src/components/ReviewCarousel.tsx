/**
 * 評價輪播元件 - 升級版
 * 展示顧客評價並支援自動輪播和手動導航
 * 加入溫暖視覺設計和豐富互動效果
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review } from '@/lib/reviews';

interface ReviewCarouselProps {
  reviews: Review[];
  itemsPerView?: number;
  autoPlayInterval?: number;
}

// 星星評分元件
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-[#FFD700]" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// 頭像顏色對應
const avatarColors = [
  "from-rose-400 to-pink-500",
  "from-orange-400 to-amber-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-sky-400 to-blue-500",
  "from-fuchsia-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-teal-400 to-cyan-500",
];

export function ReviewCarousel({ 
  reviews, 
  itemsPerView = 3,
  autoPlayInterval = 5000 
}: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
    }
    return itemsPerView;
  };

  const [visibleItems, setVisibleItems] = useState(itemsPerView);

  useEffect(() => {
    setVisibleItems(getVisibleItems());
    const handleResize = () => setVisibleItems(getVisibleItems());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, reviews.length - visibleItems);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isAutoPlay, reviews.length, visibleItems, autoPlayInterval]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, reviews.length - visibleItems) : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    const maxIndex = Math.max(0, reviews.length - visibleItems);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  const maxDots = Math.max(1, reviews.length - visibleItems + 1);
  const visibleReviews = reviews.slice(currentIndex, currentIndex + visibleItems);

  return (
    <div className="w-full">
      <div className="relative px-0 lg:px-16">
        {/* 評價卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {visibleReviews.map((review, idx) => (
            <div
              key={review.id}
              className="group relative bg-white rounded-2xl p-6 border border-[#EDD5C0] hover:border-primary/40 transition-all duration-400 hover:-translate-y-2 overflow-hidden"
              style={{
                boxShadow: "0 4px 20px rgba(74, 46, 26, 0.06), 0 1px 4px rgba(74, 46, 26, 0.04)",
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              {/* 裝飾背景 */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
              
              {/* 引號裝飾 */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-10 h-10 text-primary fill-primary" />
              </div>

              {/* 星評 */}
              <div className="mb-4">
                <StarRating rating={review.rating} />
              </div>

              {/* 評價內容 */}
              <p className="text-foreground/70 text-sm leading-relaxed mb-5 min-h-[60px] relative z-10">
                <span className="text-primary/40 text-lg font-serif mr-1">"</span>
                {review.content}
                <span className="text-primary/40 text-lg font-serif ml-1">"</span>
              </p>

              {/* 評價者資訊 */}
              <div className="border-t border-[#EDD5C0] pt-4 flex items-center gap-3">
                {/* 頭像 */}
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[review.id % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}
                >
                  {review.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{review.author}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {review.badge && (
                      <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        {review.badge}
                      </span>
                    )}
                    <p className="text-xs text-foreground/45">{review.date}</p>
                  </div>
                </div>
                {/* Google 圖示 */}
                <div className="flex-shrink-0 w-6 h-6 opacity-30">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>

              {/* 懸停光效 */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
            </div>
          ))}
        </div>

        {/* 導航箭頭 */}
        {reviews.length > visibleItems && (
          <>
            <button
              onClick={handlePrev}
              className="absolute -left-2 lg:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#EDD5C0] hover:border-primary hover:bg-primary/5 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hidden lg:flex"
              aria-label="上一頁評價"
            >
              <ChevronLeft className="w-5 h-5 text-foreground/60" />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-2 lg:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#EDD5C0] hover:border-primary hover:bg-primary/5 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hidden lg:flex"
              aria-label="下一頁評價"
            >
              <ChevronRight className="w-5 h-5 text-foreground/60" />
            </button>
          </>
        )}
      </div>

      {/* 手機版導航按鈕 */}
      {reviews.length > visibleItems && (
        <div className="flex justify-center gap-4 mt-6 lg:hidden">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-[#EDD5C0] hover:border-primary shadow-sm flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-foreground/60" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-[#EDD5C0] hover:border-primary shadow-sm flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-4 h-4 text-foreground/60" />
          </button>
        </div>
      )}

      {/* 分頁指示點 */}
      {reviews.length > visibleItems && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-[#EDD5C0] hover:bg-primary/50'
              }`}
              aria-label={`前往評價第 ${index + 1} 頁`}
            />
          ))}
        </div>
      )}

      {/* 自動播放控制 */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="text-xs text-foreground/40 hover:text-primary transition-colors px-3 py-1 rounded-full hover:bg-primary/5"
        >
          {isAutoPlay ? "⏸ 暫停輪播" : "▶ 繼續輪播"}
        </button>
      </div>
    </div>
  );
}

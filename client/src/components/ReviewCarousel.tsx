/**
 * 評價輪播元件
 * 展示顧客評價並支援自動輪播和手動導航
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Review } from '@/lib/reviews';

interface ReviewCarouselProps {
  reviews: Review[];
  itemsPerView?: number;
  autoPlayInterval?: number;
}

export function ReviewCarousel({ 
  reviews, 
  itemsPerView = 3,
  autoPlayInterval = 5000 
}: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 計算可顯示的卡片數量（考慮響應式設計）
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // mobile
      if (window.innerWidth < 1024) return 2; // tablet
    }
    return itemsPerView; // desktop
  };

  const [visibleItems, setVisibleItems] = useState(itemsPerView);

  useEffect(() => {
    setVisibleItems(getVisibleItems());
    
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  // 自動輪播
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
      {/* 評價卡片容器 */}
      <div className="relative">
        {/* 卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <Card
              key={review.id}
              className="p-6 bg-white border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            >
              {/* 星評 */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>

              {/* 評價內容 */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-4 min-h-12">
                "{review.content}"
              </p>

              {/* 評價者資訊 */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground text-sm">{review.author}</p>
                <div className="flex items-center gap-2 mt-1">
                  {review.badge && (
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {review.badge}
                    </span>
                  )}
                  <p className="text-xs text-foreground/60">{review.date}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 導航箭頭 - 僅在非 mobile 顯示 */}
        {reviews.length > visibleItems && (
          <>
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="absolute -left-14 top-1/2 -translate-y-1/2 hidden lg:flex bg-white border-border hover:bg-primary/10 hover:border-primary"
              aria-label="上一頁評價"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="absolute -right-14 top-1/2 -translate-y-1/2 hidden lg:flex bg-white border-border hover:bg-primary/10 hover:border-primary"
              aria-label="下一頁評價"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* 指示點 - 分頁指示器 */}
      {reviews.length > visibleItems && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-border hover:bg-primary/50'
              }`}
              aria-label={`前往評價第 ${index + 1} 頁`}
            />
          ))}
        </div>
      )}

      {/* 自動播放控制提示 */}
      <div className="text-center mt-6">
        <p className="text-xs text-foreground/50">
          {isAutoPlay ? '⏱️ 自動輪播中' : '👆 手動模式'}
          {reviews.length > visibleItems && (
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="ml-3 text-primary hover:underline font-medium"
            >
              {isAutoPlay ? '暫停' : '繼續'}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

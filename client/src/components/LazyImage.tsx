/**
 * LazyImage — 懶加載圖片組件
 *
 * 功能：
 * - IntersectionObserver：圖片進入視窗才開始加載
 * - 骨架屏（Skeleton）：加載前顯示奶油色脈衝動畫
 * - 模糊淡入轉場：從 blur(12px) + opacity(0) 漸變為清晰
 * - 加載失敗：顯示精緻的錯誤佔位符
 * - 支援所有原生 img 屬性（className、style、alt、onClick 等）
 * - 支援 objectFit、objectPosition 控制圖片裁切
 */

import { useState, useRef, useEffect, ImgHTMLAttributes } from "react";

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** 圖片來源 URL */
  src: string;
  /** 無障礙替代文字 */
  alt: string;
  /** 額外套用到 img 元素的 className */
  className?: string;
  /** 骨架屏的 className（覆蓋預設奶油色） */
  skeletonClassName?: string;
  /** 是否為背景用途（全版覆蓋，不顯示骨架屏動畫） */
  isCover?: boolean;
  /** 轉場動畫時長（ms），預設 600 */
  transitionDuration?: number;
  /** rootMargin for IntersectionObserver，預設 "200px" */
  rootMargin?: string;
}

export function LazyImage({
  src,
  alt,
  className = "",
  skeletonClassName,
  isCover = false,
  transitionDuration = 600,
  rootMargin = "200px",
  style,
  ...rest
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver：進入視窗才觸發加載
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  // 若圖片已在瀏覽器快取中，complete 為 true，直接標記已加載
  useEffect(() => {
    if (imgRef.current?.complete && isInView) {
      setIsLoaded(true);
    }
  }, [isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // 停止骨架屏
  };

  // 骨架屏預設樣式
  const defaultSkeletonClass = isCover
    ? "absolute inset-0 bg-gradient-to-br from-[#FFF5EE] to-[#F5E6D3]"
    : "absolute inset-0 bg-gradient-to-br from-[#FFF5EE] to-[#F5E6D3] animate-pulse";

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ width: "100%", height: "100%" }}
    >
      {/* 骨架屏：圖片加載前顯示 */}
      <div
        className={skeletonClassName ?? defaultSkeletonClass}
        style={{
          opacity: isLoaded ? 0 : 1,
          transition: `opacity ${transitionDuration}ms ease`,
          pointerEvents: "none",
        }}
      >
        {/* 骨架屏內部光掃動畫 */}
        {!isCover && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
              animation: "skeleton-shimmer 1.6s infinite",
            }}
          />
        )}
        {/* 骨架屏圖示 */}
        {!isCover && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 opacity-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "#C0623A" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 實際圖片：進入視窗後才設定 src */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...style,
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? "blur(0px)" : "blur(12px)",
            transform: isLoaded
              ? "scale(1)"
              : "scale(1.04)",
            transition: `opacity ${transitionDuration}ms ease, filter ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`,
            willChange: "opacity, filter, transform",
          }}
          {...rest}
        />
      )}

      {/* 加載失敗佔位符 */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF5EE] to-[#F5E6D3]">
          <svg
            className="w-8 h-8 mb-2 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: "#C0623A" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs opacity-40" style={{ color: "#C0623A" }}>
            圖片載入失敗
          </span>
        </div>
      )}
    </div>
  );
}

export default LazyImage;

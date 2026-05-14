import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Facebook, Heart, MessageCircle, Instagram, Star, ChevronUp, ChevronDown, Clock, Calendar, ArrowRight, Sparkles, X, Leaf, Flame, Info } from "lucide-react";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { reviews } from "@/lib/reviews";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";

/**
 * Home Page - 小阿姨雪花冰官方網站
 * 溫暖懷舊風格設計 - 升級版
 * 色彩系統：奶油色背景 + 深蜜桃橘強調 + 深可可棕文字
 * 字體系統：Noto Serif TC (標題) + Noto Sans TC (正文) + Ma Shan Zheng (裝飾)
 */

// 浮動裝飾粒子元件
function FloatingParticles() {
  const particles = [
    { emoji: "🍧", size: "text-2xl", top: "10%", left: "5%", delay: "0s", duration: "5s" },
    { emoji: "❄️", size: "text-xl", top: "20%", right: "8%", delay: "1s", duration: "6s" },
    { emoji: "🌸", size: "text-lg", top: "60%", left: "3%", delay: "2s", duration: "7s" },
    { emoji: "✨", size: "text-base", top: "40%", right: "5%", delay: "0.5s", duration: "4s" },
    { emoji: "🍓", size: "text-xl", top: "75%", left: "7%", delay: "1.5s", duration: "5.5s" },
    { emoji: "💝", size: "text-lg", top: "85%", right: "10%", delay: "3s", duration: "6.5s" },
    { emoji: "🥭", size: "text-xl", top: "30%", left: "92%", delay: "2.5s", duration: "5s" },
    { emoji: "🌟", size: "text-base", top: "50%", left: "95%", delay: "1s", duration: "7s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.size} opacity-20 select-none`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
// 波浪分隔線元件件
function WaveDivider({ color = "#FDF6F0", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className={`relative h-16 overflow-hidden ${flip ? "rotate-180" : ""}`} style={{ marginBottom: flip ? "-2px" : "0", marginTop: flip ? "0" : "-2px" }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// 區段標題元件
function SectionHeader({ tag, title, subtitle, center = true, iconImg }: { tag?: string; title: string; subtitle?: string; center?: boolean; iconImg?: string }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
      {tag && (
        <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
          <span className="section-tag">
            <Sparkles className="w-3 h-3" />
            {tag}
          </span>
        </div>
      )}
      <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
        {iconImg && (
          <img
            src={iconImg}
            alt="section icon"
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md flex-shrink-0"
          />
        )}
        <h2 className="text-4xl md:text-5xl font-bold mb-0 font-display text-gradient-gold leading-tight">
          {title}
        </h2>
        {iconImg && (
          <img
            src={iconImg}
            alt="section icon"
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md flex-shrink-0 scale-x-[-1]"
          />
        )}
      </div>
      {subtitle && (
        <p className="text-lg text-body-secondary leading-relaxed max-w-2xl mx-auto mt-4">
          {subtitle}
        </p>
      )}
      <div className={`mt-5 h-0.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

// 統計數字元件
function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <div className="text-center group">
      <div className="text-4xl mb-2 group-hover:animate-bounce transition-all duration-300">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-gradient-gold font-display mb-1">{number}</div>
      <div className="text-sm text-body-muted font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);   // 向上捲動時顯示
  const [navMounted, setNavMounted] = useState(false);  // 進場動畫觸發
  const lastScrollY = useRef(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [typedText, setTypedText] = useState("");
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any | null>(null);

  const toggleFeature = (idx: number) => {
    setExpandedFeature(prev => (prev === idx ? null : idx));
  };
  const heroSubtitles = ["一口綿密，一點療癒", "午後的甜品時光", "彰化線西的幸福滋味"];
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 打字機效果
  useEffect(() => {
    const target = heroSubtitles[subtitleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && typedText.length < target.length) {
      timeout = setTimeout(() => setTypedText(target.slice(0, typedText.length + 1)), 80);
    } else if (!isDeleting && typedText.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => setTypedText(target.slice(0, typedText.length - 1)), 40);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setSubtitleIdx((prev) => (prev + 1) % heroSubtitles.length);
    }
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, subtitleIdx]);

  // 進場動畫：組件載入後 80ms 觸發
  useEffect(() => {
    const timer = setTimeout(() => setNavMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowScrollTop(currentY > 500);
      // 向下滞動超過 80px 且不在頂部時隱藏導覽列
      if (currentY > lastScrollY.current + 8 && currentY > 80) {
        setNavVisible(false);
      } else if (currentY < lastScrollY.current - 4 || currentY <= 80) {
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => { const next = new Set(prev); next.add(entry.target.id); return next; });
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll Reveal - 監聽 .reveal 元素
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  const pizzaItems = [
    {
      id: 1,
      name: "海鮮總匯披薩",
      description: "新鮮蝦仁、透抽搭配濃郁起司，海味十足的經典組合",
      image: "/images/seafood_combo_pizza.jpg",
      tag: "人氣首選",
      color: "from-blue-50 to-cyan-50",
      ingredients: ["新鮮蝦仁", "透抽", "蟹肉棒", "濃郁起司", "番茄醬底"],
      features: ["海鮮新鮮現點現做", "起司拉絲濃郁", "6吋手工薄脆餅皮"],
      pairing: "搭配檸檬汽水，清爽解膩最佳",
      allergens: "甲殼類（蝦仁）、頭足類（透抽）、乳製品（起司）、麥麩（餅皮）",
    },
    {
      id: 2,
      name: "費城牛肉披薩",
      description: "嫩牛肉搭配起司和洋蔥、青椒、洋菇，咬下去香氣四溢的美味",
      image: "/images/philadelphia_beef_pizza.jpg",
      tag: "招牌必點",
      color: "from-amber-50 to-yellow-50",
      ingredients: ["嫩切牛肉", "融化起司", "洋蔥", "青椒", "洋菇"],
      features: ["牛肉嫩滑多汁", "費城風味獨特", "蔬菜鮮甜爽口"],
      pairing: "搭配可樂或黑啤，肉食控最愛",
      allergens: "牛肉、乳製品（起司）、麥麩（餅皮）",
    },
    {
      id: 3,
      name: "瑪格麗特披薩",
      description: "經典義式披薩，番茄、起司、羅勒的完美組合",
      image: "/images/margherita_pizza.webp",
      tag: "經典口味",
      color: "from-red-50 to-rose-50",
      ingredients: ["新鮮番茄醬", "莫扎瑞拉起司", "新鮮羅勒葉", "橄欖油", "手工薄脆餅皮"],
      features: ["義式正宗風味", "起司濃郁拉絲", "羅勒清香提味"],
      pairing: "搭配紅茶或義式咖啡，品味義大利風情",
      allergens: "乳製品（起司）、麥麩（餅皮）",
    },
    {
      id: 4,
      name: "蜂蜜麻吉披薩",
      description: "甜蜜蜂蜜搭配Q彈麻吉，甜鹹交織的獨特風味",
      image: "/images/honey_mochi_pizza.jpg",
      tag: "創意特色",
      color: "from-yellow-50 to-amber-50",
      ingredients: ["天然蜂蜜", "Q彈麻吉", "起司", "奶油", "手工薄脆餅皮"],
      features: ["甜鹹交織獨特", "麻吉Q彈有嚼勁", "蜂蜜香氣濃郁"],
      pairing: "搭配台灣茶或牛奶，甜蜜下午茶首選",
      allergens: "乳製品（起司、奶油）、麥麩（餅皮、麻吉）",
    },
  ];

  const menuItems = [
    {
      id: 1,
      name: "新鮮芒果布丁雪花冰",
      description: "綿密的雪花冰搭配新鮮芒果和滑順布丁，一口咬下去就是夏日的幸福",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/OfJxJFhbgWYQVFvW.png",
      badge: "期間限定",
      color: "from-amber-50 to-orange-50",
      ingredients: ["新鮮芒果", "手工雪花冰", "滑順布丁", "煉乳", "芒果醬"],
      features: ["當季新鮮芒果", "布丁滑嫩香甜", "雪花冰入口即化"],
      allergens: "乳製品、雞蛋（布丁）",
    },
    {
      id: 2,
      name: "新鮮草莓奶酪雪花冰",
      description: "新鮮草莓搭配濃郁奶酪，酸酸甜甜的滋味在舌尖綻放",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/fUOVTtiUSdlcgtUW.png",
      badge: "期間限定",
      color: "from-rose-50 to-pink-50",
      ingredients: ["新鮮草莓", "手工雪花冰", "濃郁奶酪", "草莓醬", "煉乳"],
      features: ["酸甜草莓清爽", "奶酪濃郁滑順", "雙層口感層次"],
      allergens: "乳製品",
    },
    {
      id: 3,
      name: "Oreo巧克力布丁雪花冰",
      description: "經典Oreo餅乾搭配濃郁巧克力布丁，巧克力愛好者的必點",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YZiSIUzAAlNKHzgC.png",
      color: "from-stone-50 to-neutral-50",
      ingredients: ["Oreo餅乾碎", "手工雪花冰", "巧克力布丁", "巧克力醬", "鮮奶油"],
      features: ["巧克力香濃馥郁", "Oreo餅乾酥脆", "布丁滑嫩可口"],
      allergens: "乳製品、麥麩（Oreo）、雞蛋（布丁）",
    },
    {
      id: 4,
      name: "紅豆牛奶雪花冰",
      description: "傳統紅豆搭配香濃牛奶，懷舊風味中帶著溫暖",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/nVKrAcBpRhrFllUC.png",
      color: "from-red-50 to-rose-50",
      ingredients: ["自製紅豆", "手工雪花冰", "新鮮牛奶", "煉乳", "仙草凍（可加）"],
      features: ["紅豆鬆軟香甜", "牛奶濃郁滑順", "台灣傳統懷舊風味"],
      allergens: "乳製品",
    },
    {
      id: 5,
      name: "抹茶紅豆布丁&奶酪雪花冰",
      description: "清香抹茶搭配紅豆、布丁和奶酪，層次豐富的完美組合",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YwSIinLCkdiSlPIs.png",
      color: "from-green-50 to-emerald-50",
      ingredients: ["日式抹茶粉", "自製紅豆", "手工布丁", "奶酪", "手工雪花冰", "煉乳"],
      features: ["抹茶清香微苦", "四層口感豐富", "日式風情特色"],
      allergens: "乳製品、雞蛋（布丁）",
    },
    {
      id: 6,
      name: "滑嫩仙草凍",
      description: "Q彈的仙草凍搭配冰涼的糖水，清涼解渴的夏日聖品",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/grass_jelly_ice-D9Bs4uWMJEtGPHKedh6wfn.webp",
      color: "from-slate-50 to-gray-50",
      ingredients: ["天然仙草", "冰糖糖水", "手工雪花冰", "紅豆（可加）", "粉圓（可加）"],
      features: ["仙草Q彈滑嫩", "天然草本清涼", "低卡健康選擇"],
      allergens: "無主要過敏原（純素可食）",
    },
  ];

  return (
    <>
    <div className="min-h-screen bg-background relative">
      <FloatingParticles />

      {/* ===== 營業時間公告 ===== */}
      <div className="relative bg-gradient-to-r from-[#C0623A] via-[#E8896A] to-[#D4A574] text-white py-4 md:py-5 px-4 text-center overflow-hidden">
        {/* 裝飾背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl" />
        </div>
        <div className="relative container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white/75 text-xs font-medium mb-0.5">營業時間</p>
                <p className="text-base md:text-xl font-bold tracking-wide">週三至週日 12:00–21:00</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/30" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white/75 text-xs font-medium mb-0.5">公休日</p>
                <p className="text-base md:text-xl font-bold tracking-wide">每週一、二公休</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 導航欄 ===== */}
      <header
        className="sticky top-0 z-50 nav-glass"
        style={{
          transform: (!navMounted || !navVisible) ? "translateY(-100%)" : "translateY(0)",
          opacity: navMounted ? 1 : 0,
          // 進場 & 重新顯示：柔和緩慢（700ms spring）
          // 隱藏：迅速滞出（280ms ease-in）
          transition: navVisible
            ? "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "transform 280ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms ease-in",
        }}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className={[
              "flex items-center gap-2.5",
              "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              navMounted ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: navMounted ? "0ms" : "0ms" }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg shadow-md">
              🍧
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient-warm font-display leading-none">小阿姨雪花冰</h1>
              <p className="brand-english-nav">Auntie Dream Ice</p>
            </div>
          </div>

          {/* 桌面導航 */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "#about", label: "關於我們" },
              { href: "#brand", label: "品牌故事" },
              { href: "#menu", label: "人氣美食" },
              { href: "#contact", label: "聯絡我們" },
            ].map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                className={[
                  "nav-link-premium text-sm",
                  "transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  navMounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
                ].join(" ")}
                style={{ transitionDelay: navMounted ? `${(idx + 1) * 80}ms` : "0ms" }}
              >
                {item.label}
              </a>
            ))}
            <button
              className={[
                "btn-premium btn-interactive text-sm px-5 py-2",
                "transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
                navMounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: navMounted ? "440ms" : "0ms" }}
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            >
              探索菜單
            </button>
          </nav>

          {/* 手機漢堡選單 */}
          <button
            className={[
              "md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-primary/10 transition btn-interactive-circle",
              "transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]",
              navMounted ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: navMounted ? "160ms" : "0ms" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="開啟選單"
          >
            <span className={`block w-5 h-0.5 bg-foreground/70 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground/70 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground/70 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* 手機選單下拉 */}
        <div
          className={`md:hidden border-t border-warm bg-background/98 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="container py-4 flex flex-col gap-1">
              {[
                { href: "#about", label: "關於我們", emoji: "🌱" },
                { href: "#brand", label: "品牌故事", emoji: "📖" },
                { href: "#menu", label: "人氣美食介紹", emoji: "🍧" },
                { href: "#contact", label: "聯絡我們", emoji: "📍" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/75 hover:text-primary hover:bg-primary/8 transition-all font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.emoji}</span>
                  {item.label}
                  <ArrowRight className="w-4 h-4 ml-auto opacity-40" />
                </a>
              ))}
          </nav>
        </div>
      </header>

      {/* ===== 英雄區段 ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/hero_banner_ghibli-PypU9pjWRBkpJyDoWh4FFY.webp"
            alt="小阿姨雪花冰店面"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* 漸層遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="relative container py-20 md:py-40 flex flex-col md:flex-row items-center md:justify-between min-h-[680px] md:min-h-[780px]">
          <div className="flex-1 max-w-xl w-full">
            {/* 英文品牌名稱動畫 */}
            <div className="mb-3 animate-fade-in-up text-center md:text-left" style={{ animationDelay: "0.05s" }}>
              <span className="brand-english-hero text-4xl md:text-6xl">
                <span className="word-auntie">Auntie </span>
                <span className="word-dream">Dream </span>                <span className="word-ice">Ice</span>
              </span>
            </div>
            {/* 手機版：標題 + LOGO 並排，置中 */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-5 leading-tight font-display animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                小阿姨<br />
                <span className="text-[#FFD4B8]">雪花冰</span>
              </h1>
              {/* 手機版 LOGO（品牌文字旁，md 以上隱藏） */}
              <div className="flex-shrink-0 md:hidden mb-4 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
                <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                  <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(60,35,15,0.5) 100%)'
                  }} />
                  <img
                    src="/images/brand_logo_transparent.webp"
                    alt="小阿姨雪花冰 品牌 LOGO"
                    className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0 3px 16px rgba(80,45,10,0.45)) sepia(18%) saturate(0.9) brightness(0.95)' }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-on-dark-sub mb-3 leading-relaxed font-light animate-fade-in-up min-h-[2rem] text-center md:text-left" style={{ animationDelay: "0.2s" }}>
              {typedText}<span className="inline-block w-0.5 h-6 bg-white/80 ml-0.5 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
            </p>
            <p className="text-base md:text-lg text-on-dark-body mb-10 leading-relaxed animate-fade-in-up text-center md:text-left" style={{ animationDelay: "0.3s" }}>
              彰化線西最溫暖的冰品甜點專賣店<br />
              用最新鮮的食材和用心的製作，為您帶來每一份幸福滋味
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up justify-center md:justify-start" style={{ animationDelay: "0.4s" }}>
              <button
                className="btn-premium btn-interactive inline-flex items-center gap-2 text-base"
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              >
                探索菜單
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="btn-outline-premium btn-interactive-outline inline-flex items-center gap-2 text-base bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white/60"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                了解我們
              </button>
            </div>


          </div>
          {/* 品牌 LOGO 右側（桌面版 md 以上） */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* 暨色調暫變遠層（底部游離漸層） */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, transparent 55%, rgba(60,35,15,0.55) 100%)'
              }} />
              {/* 暨色調暫變遠層（底部淡出） */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-full pointer-events-none" style={{
                background: 'linear-gradient(to top, rgba(90,55,25,0.45) 0%, transparent 100%)'
              }} />
              <img
                src="/images/brand_logo_transparent.webp"
                alt="小阿姨雪花冰 品牌 LOGO"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(80,45,10,0.5)) sepia(18%) saturate(0.9) brightness(0.95)',
                  mixBlendMode: 'normal'
                }}
              />
            </div>
          </div>
        </div>
        {/* 底部波浪 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#FDF6F0" />
          </svg>
        </div>
      </section>

      {/* 波浪分隔 */}
      <div className="relative h-10 overflow-hidden bg-[#FFF5EE]">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1380,25 1440,20 L1440,40 L0,40 Z" fill="#FDF6F0" />
        </svg>
      </div>

      {/* 品牌數字統計已整合至「關於我們」區段 */}
      {/* ===== 品牌數字統計 ===== */}
      <section className="py-10 md:py-14 bg-background relative z-10" style={{display:'none'}}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto">
            <StatCard number="4.9★" label="Google 評分" icon="⭐" />
            <StatCard number="55+" label="顧客評價" icon="💬" />
            <StatCard number="10+" label="特色冰品" icon="🍧" />
            <StatCard number="100%" label="新鮮食材" icon="🌱" />
          </div>
        </div>
        {/* 裝飾分隔線 */}
        <div className="mt-10 divider-warm max-w-2xl mx-auto" />
      </section>

      {/* 波浪分隔 */}
      <div className="relative h-10 overflow-hidden">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,0 C360,40 720,0 1080,20 C1260,30 1380,10 1440,0 L1440,40 L0,40 Z" fill="#FFF5EE" />
        </svg>
      </div>

      {/* ===== 關於我們 ===== */}
      <section id="about" className="relative overflow-hidden">
        {/* ── 第一幕：品牌宣言 Hero ── */}
        <div className="relative py-24 md:py-36 overflow-hidden">
          {/* 背景：店家實景照片 */}
          <div className="absolute inset-0">
            <img
              src="/images/store_photo.jpg"
              alt="小阿姨雪花冰店內實景"
              className="w-full h-full object-cover object-center scale-105"
              style={{ filter: 'brightness(0.45) saturate(1.2)' }}
            />
          </div>
          {/* 漸層遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D1F0A]/60 via-transparent to-transparent" />

          <div className="container relative z-10">
            <div className="max-w-2xl">
              {/* 標籤 */}
              <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/30 text-white/90 text-sm font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A855] animate-pulse" />
                我們的故事
              </div>
              {/* 主標題 */}
              <h2 className="reveal reveal-delay-1 font-display font-bold leading-tight mb-6">
                <span className="block text-5xl md:text-7xl text-white drop-shadow-lg">關於</span>
                <span className="block text-5xl md:text-7xl" style={{
                  background: 'linear-gradient(135deg, #FFD4A0, #F0C878, #D4A855)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Auntie Dream Ice</span>
              </h2>
              {/* 副標 */}
              <p className="reveal reveal-delay-2 text-xl md:text-2xl text-on-dark-sub leading-relaxed font-light mb-10">
                一間充滿溫度的冰品甜點專賣店<br />
                <span className="text-on-dark-accent">用最用心的製作，為您帶來每一份幸福滋味</span>
              </p>
              {/* 數字統計橫排 */}
              <div className="reveal reveal-delay-3 flex flex-wrap gap-6">
                {[
                  { value: "4.9★", label: "Google 評分" },
                  { value: "55+", label: "顧客好評" },

                  { value: "100%", label: "新鮮食材" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold font-display" style={{
                      background: 'linear-gradient(135deg, #FFD4A0, #F0C878)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{s.value}</div>
                    <div className="text-on-dark-muted text-xs mt-1 tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 第二幕：品牌核心引言 ── */}
        <div className="bg-gradient-to-br from-[#3D1F0A] to-[#5A2D0C] py-16 md:py-20 relative overflow-hidden">
          {/* 大裝飾引號 */}
          <div className="absolute top-0 left-8 text-[200px] text-white/4 font-display leading-none select-none" style={{ fontFamily: 'Georgia, serif' }}>"</div>
          <div className="absolute bottom-0 right-8 text-[200px] text-white/4 font-display leading-none select-none rotate-180" style={{ fontFamily: 'Georgia, serif' }}>"</div>
          <div className="container relative z-10 text-center">
            <p className="reveal font-accent text-2xl md:text-4xl text-gradient-cream leading-relaxed font-bold max-w-3xl mx-auto">
              還記得小時候炎炎夏日<br />
              吃到一口冰就覺得開心的幸福感嗎？
            </p>
            <div className="flex justify-center mt-8 gap-2">
              {["🌸", "✨", "🍧", "✨", "🌸"].map((e, i) => (
                <span key={i} className="text-2xl animate-float opacity-70" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
              ))}
            </div>
            <p className="mt-6 text-on-dark-muted text-sm tracking-widest uppercase font-accent">— Auntie Dream Ice · 彰化線西</p>
          </div>
        </div>

        {/* ── 第三幕：品牌故事時間軸 ── */}
        <div className="py-20 md:py-32 relative overflow-hidden">
          {/* 水彩插圖背景 */}
          <div className="absolute inset-0">
            <img
              src="/images/brand_story_bg_warmth.webp"
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ filter: 'saturate(0.9) brightness(1.05)' }}
            />
          </div>
          {/* 柔和遮罩：保留圖片質感同時確保文字可讀 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F2]/60 via-[#FFF5EE]/40 to-[#FFF8F2]/60" />
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/4 rounded-full blur-3xl" />

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="reveal flex justify-center mb-5">
                <span className="section-tag">
                  <Sparkles className="w-3 h-3" />
                  品牌歷程
                </span>
              </div>
              <h3 className="reveal reveal-delay-1 text-3xl md:text-4xl font-bold font-display text-gradient-warm">我們的故事，從一個夢想開始</h3>
            </div>

            {/* 時間軸 */}
            <div className="relative max-w-4xl mx-auto">
              {/* 中央軸線 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-accent/50 to-primary/20 hidden md:block" />

              {[
                {
                  year: "起源",
                  side: "left",
                  emoji: "🌱",
                  title: "夢想萌芽",
                  text: "小阿姨雪花冰誕生於一個簡單卻深刻的夢想——讓每一位顧客都能在享受美食的同時，感受到來自心底的溫暖與關懷。我們相信，好的冰品不僅是食物，更是一份情感的傳遞。",
                  color: "from-emerald-50 to-green-50",
                  border: "border-emerald-200",
                  dot: "bg-emerald-400",
                },
                {
                  year: "用心",
                  side: "right",
                  emoji: "❄️",
                  title: "精心製冰",
                  text: "每一份冰品都精心製作，我們堅持使用最新鮮的水果、最細膩的雪花冰和最優質的配料，為您呈現最美好的午後時光。每一口都是我們對品質的承諾。",
                  color: "from-sky-50 to-blue-50",
                  border: "border-sky-200",
                  dot: "bg-sky-400",
                },
                {
                  year: "堅持",
                  side: "left",
                  emoji: "🥭",
                  title: "嚴選食材",
                  text: "在彰化線西這片溫暖的土地上，我們每日精選當季新鮮水果，嚴格把關每一項食材的品質。我們相信，好的冰品從好的食材開始，絕不妥協。",
                  color: "from-amber-50 to-yellow-50",
                  border: "border-amber-200",
                  dot: "bg-amber-400",
                },
                {
                  year: "今日",
                  side: "right",
                  emoji: "💝",
                  title: "溫暖傳遞",
                  text: "如今，小阿姨雪花冰已成為彰化線西最受歡迎的甜點去處。每一次的相遇，都是一份幸福的開始。我們持續創新，不斷推出限定新品，只為讓您的每一次造訪都有驚喜。",
                  color: "from-rose-50 to-pink-50",
                  border: "border-rose-200",
                  dot: "bg-rose-400",
                },
              ].map((item, i) => (
                <div key={i} className={`reveal relative flex md:items-center mb-10 md:mb-16 ${
                  item.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-col group/row`}>
                  {/* 內容卡片 */}
                  <div className={`md:w-[45%] ${
                    item.side === 'left' ? 'md:pr-12' : 'md:pl-12'
                  }`}>
                    <div className={`group bg-gradient-to-br ${item.color} rounded-3xl p-7 border ${item.border} shadow-[0_4px_20px_rgba(74,46,26,0.06)]
                      hover:shadow-[0_24px_64px_rgba(74,46,26,0.18),0_0_0_3px_rgba(255,160,100,0.25)]
                      hover:-translate-y-3 hover:scale-[1.025]
                      hover:border-primary/50
                      transition-all duration-500 ease-out
                      relative overflow-hidden cursor-default`}>

                      {/* 光掃效果：hover 時從左到右掃過 */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />
                      {/* 角落光暈裝飾 */}
                      <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/40 rounded-full blur-xl group-hover:bg-white/60 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/5 rounded-full blur-lg group-hover:bg-primary/15 group-hover:scale-150 transition-all duration-500 pointer-events-none" />
                      {/* 年份標籤 */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/70 rounded-full text-xs font-bold text-label-warm mb-4 border border-white/80 group-hover:bg-white/90 group-hover:border-primary/30 transition-all duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:scale-150 transition-transform duration-300" />
                        {item.year}
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        {/* 圖示框：hover 時旋轉 + 放大 + 發光 */}
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 rounded-2xl bg-white/60 group-hover:bg-white/95 flex items-center justify-center
                            shadow-sm group-hover:shadow-[0_0_18px_rgba(255,140,80,0.45)]
                            group-hover:scale-110 group-hover:rotate-6
                            transition-all duration-400 ease-out border border-white/80 group-hover:border-primary/30">
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-300 inline-block">{item.emoji}</span>
                          </div>
                          {/* 發光外圈 */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 ring-2 ring-primary/30 ring-offset-2" />
                        </div>
                        <h4 className="text-xl font-bold font-display text-title-primary group-hover:text-title-accent transition-colors duration-300">{item.title}</h4>
                      </div>
                      <p className="text-body-secondary leading-relaxed text-sm group-hover:text-body-primary transition-colors duration-300">{item.text}</p>
                      {/* 底部裝飾線：hover 時從左滑入全寬 */}
                      <div className="mt-5 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary/60 via-accent/60 to-primary/30 rounded-full transition-all duration-500 ease-out" />
                      {/* 右下角箭頭提示 */}
                      <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400">
                        <svg className="w-4 h-4 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* 中央圓點（桌面） */}
                  {/* 中央圓點（桌面）：hover 時放大 + 發光 */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-primary/30 items-center justify-center shadow-md z-10 text-lg
                    group-hover/row:scale-125 group-hover/row:border-primary/60 group-hover/row:shadow-[0_0_20px_rgba(255,140,80,0.45)]
                    transition-all duration-400 ease-out">
                    {item.emoji}
                  </div>

                  {/* 手機版左側線條 */}
                  <div className="md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-transparent" />
                  <div className="md:hidden absolute left-3 top-7 w-5 h-5 rounded-full bg-white border-2 border-primary/40 flex items-center justify-center text-xs">
                    {item.emoji}
                  </div>

                  {/* 空白佔位（另一側） */}
                  <div className="md:w-[45%]" />
                </div>
              ))}
            </div>
          </div>
         </div>
      </section>
      {/* 波浪分隔 */}
      <div className="relative h-10 overflow-hidden bg-[#FFF5EE]">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,20 C480,0 960,40 1440,20 L1440,40 L0,40 Z" fill="#FDF6F0" />
        </svg>
      </div>

      {/* ===== 品牌故事 ===== */}
      <section id="brand" className="py-20 md:py-32 relative overflow-hidden">
        {/* 店家實景背景圖 */}
        <div className="absolute inset-0">
          <img
            src="/images/store_photo.jpg"
            alt="小阿姨雪花冰店內實景"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* 半透明遮罩：調低透明度讓圖片清晰可見，頂部和底部稍深保留文字可讀性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE]/55 via-[#FDF6F0]/30 to-[#FFF5EE]/55" />
        {/* 大裝飾引號 */}
        <div className="absolute top-4 left-4 md:top-10 md:left-10 text-[160px] md:text-[200px] text-primary/5 font-display leading-none select-none pointer-events-none" style={{ fontFamily: 'Georgia, serif' }}>“</div>
        <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 text-[160px] md:text-[200px] text-primary/5 font-display leading-none select-none pointer-events-none rotate-180" style={{ fontFamily: 'Georgia, serif' }}>“</div>
        {/* 漣浮小圓裝飾 */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-accent/4 rounded-full blur-3xl" />

        <div className="container relative z-10">
          {/* 標題 */}
          <div className="text-center mb-16">
            <div className="reveal flex justify-center mb-5">
              <span className="section-tag">
                <Sparkles className="w-3 h-3" />
                品牌故事
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display text-gradient-gold leading-tight">
              小阿姨的夢想冰店
            </h2>
            <div className="reveal reveal-delay-2 mt-6 flex justify-center">
              <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">


            {/* 故事時間軸 */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-14">
              {/* 左欄：時間軸 */}
              <div className="reveal reveal-left">
                <div className="story-timeline space-y-8">
                  {[
                    {
                      emoji: "🌱",
                      title: "誤生夢想",
                      text: "小阿姨雪花冰就是在這樣溫暖的回憶中誤生的。這裡是我的夢想冰店，一個充滿溫度和故事的地方。",
                    },
                    {
                      emoji: "❄️",
                      title: "精心製作",
                      text: "每一份冰品都精心製作，我們堅持使用最新鮮的水果、最細致的雪花冰和最優質的配料。",
                    },
                    {
                      emoji: "💝",
                      title: "用心服務",
                      text: "我們相信，每一份甜點都應該帶著用心和溫暖，讓顧客在享受美食的同時，也能感受到那份關懷。",
                    },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-8">
                      {/* 時間軸圓點 */}
                      <div className="story-timeline-dot flex items-center justify-center text-xs">
                        <span className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary to-accent" />
                      </div>
                      {/* 內容 */}
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-primary/15 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{item.emoji}</span>
                          <h4 className="font-bold text-title-primary font-display text-base">{item.title}</h4>
                        </div>
                        <p className="text-body-secondary text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右欄：文字內容 */}
              <div className="reveal reveal-right space-y-6">

                {/* 小裝飾卡 */}
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-5 border border-primary/20 flex items-center gap-4">
                  <div className="text-4xl animate-heartbeat">🍧</div>
                  <div>
                    <p className="font-bold text-title-primary font-display text-sm">位於彰化線西</p>
                    <p className="text-body-muted text-xs mt-0.5">週三至週日 12:00–21:00 營業</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* 波浪分隔 */}
      <div className="relative h-10 overflow-hidden">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,10 C360,40 720,0 1080,30 C1260,40 1380,20 1440,10 L1440,40 L0,40 Z" fill="#FDF6F0" />
        </svg>
      </div>

      {/* ===== 為什麼選擇我們 ===== */}
      <section className="py-20 md:py-36 relative overflow-hidden">
        {/* 深色背景底層 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810] via-[#3D1F0A] to-[#2C1810]" />
        {/* 大光暈 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#D4A855]/8 rounded-full blur-[80px]" />
        {/* 細網格紋理 */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* 浮動光點 */}
        {["top-20 left-[10%]", "top-1/3 right-[8%]", "bottom-32 left-[15%]", "bottom-20 right-[20%]", "top-1/2 left-[50%]"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-[#D4A855]/50 animate-pulse`} style={{ animationDelay: `${i * 0.9}s` }} />
        ))}

        <div className="container relative z-10">
          {/* 標題 */}
          <div className="text-center mb-16 md:mb-24">
            <div className="reveal flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#D4A855]/15 border border-[#D4A855]/30 rounded-full text-[#D4A855] text-sm font-semibold tracking-widest backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                我們的特色
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display leading-tight">
              <span className="text-white">為什麼選擇</span>
              <span className="block" style={{
                background: 'linear-gradient(135deg, #FFE8C8, #F0C878, #D4A855, #F0C878, #FFE8C8)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmerText 4s linear infinite',
              }}>小阿姨雪花冰</span>
            </h2>
            <p className="reveal reveal-delay-2 text-lg text-white/55 max-w-2xl mx-auto leading-relaxed">
              我們的承諾與堅持，讓每一口都是幸福的滋味
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex justify-center items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A855]/60" />
              <div className="w-2 h-2 rounded-full bg-[#D4A855]/70 animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A855]/60" />
            </div>
          </div>

          {/* 三欄特色卡片 */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                emoji: "🥭",
                glowColor: "rgba(251,146,60,0.25)",
                accentColor: "#FB923C",
                borderColor: "rgba(251,146,60,0.25)",
                title: "嚴選新鮮食材",
                text: "每日精選新鮮水果，嚴格把關食材品質。我們相信，好的冰品從好的食材開始，絕不妥協。",
                badge: "每日新鮮",
                stats: { value: "100%", label: "新鮮食材" },
                delay: "",
                details: [
                  "每日清晨精選當季新鮮水果，保證最佳品質",
                  "不使用人工色素與保存劑，食材天然健康",
                  "直接向小農家合作選購，確保食材新鮮直送",
                  "季節限定食材定期更新，帶來不同驚喜",
                ],
              },
              {
                emoji: "❄️",
                glowColor: "rgba(56,189,248,0.25)",
                accentColor: "#38BDF8",
                borderColor: "rgba(56,189,248,0.25)",
                title: "細致雪花冰技術",
                text: "採用專業製冰技術，呈現入口即化的絕妙口感。每一口都是綿密的幸福，讓您感受真正的冰品藝術。",
                badge: "入口即化",
                stats: { value: "10+", label: "精選冰品" },
                delay: "reveal-delay-2",
                details: [
                  "雪花冰絲細絕美，入口即化不粉不粘",
                  "專業製冰機器精準控溫，確保每一磗都達到最佳狀態",
                  "每一磗冰品現做現賣，保證最佳新鮮口感",
                  "可客製甜度，滿足不同年齡顧客的口味需求",
                ],
              },
              {
                emoji: "💝",
                glowColor: "rgba(251,113,133,0.25)",
                accentColor: "#FB7185",
                borderColor: "rgba(251,113,133,0.25)",
                title: "溫暖用心服務",
                text: "我們把每位顧客都當作家人，用溫暖的笑容和細心的服務，為您創造最舐適的用餐體驗。",
                badge: "如家溫暖",
                stats: { value: "4.9★", label: "顧客評分" },
                delay: "reveal-delay-4",
                details: [
                  "小阿姨親自接待，用家人般的溫暖對待每位顧客",
                  "記得顧客偏好，常客光臨店就如回家",
                  "小朋友、長輩年齡均歡迎，每一位顧客都是家人",
                  "定期推出限定優惠，回饵常客有驚喜",
                ],
              },
            ].map((item, i) => {
              const isExpanded = expandedFeature === i;
              return (
              <div key={i} className={`group reveal ${item.delay}`}>
                <div
                  onClick={() => toggleFeature(i)}
                  className="relative rounded-3xl cursor-pointer select-none transition-all duration-500 ease-out overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                    border: `1px solid ${isExpanded ? item.accentColor + '60' : 'rgba(255,255,255,0.12)'}`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: isExpanded
                      ? `0 32px 80px ${item.glowColor}, 0 0 0 1px ${item.accentColor}30, inset 0 1px 0 rgba(255,255,255,0.15)`
                      : 'inset 0 1px 0 rgba(255,255,255,0.08)',
                    transform: isExpanded ? 'translateY(-8px) scale(1.02)' : undefined,
                  }}
                >
                  {/* 懸停光暈效果 */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{ boxShadow: `0 0 80px ${item.glowColor}` }}
                  />
                  {/* 頂部彩色線條 */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`, opacity: isExpanded ? 1 : 0.4 }}
                  />
                  {/* 角落裝飾光暈 */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: item.accentColor, filter: 'blur(40px)' }} />

                  {/* 主要內容區 */}
                  <div className="relative p-8">
                    {/* 標籤 + 展開指示 */}
                    <div className="absolute top-5 right-5 flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: item.accentColor + '20', color: item.accentColor, border: `1px solid ${item.accentColor}40` }}
                      >
                        {item.badge}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                      </div>
                    </div>

                    {/* 圖示 */}
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-400 ease-out
                        ${isExpanded ? 'scale-110 rotate-6' : 'group-hover:scale-125 group-hover:rotate-12'}`}
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}25, ${item.accentColor}10)`,
                        border: `2px solid ${item.accentColor}35`,
                        boxShadow: isExpanded ? `0 0 24px ${item.accentColor}40` : undefined,
                      }}
                    >
                      {item.emoji}
                    </div>

                    {/* 標題 */}
                    <h3 className="text-xl font-bold mb-3 font-display tracking-wide text-on-dark-title">{item.title}</h3>
                    {/* 簡介文字 */}
                    <p className="leading-relaxed text-sm mb-5 text-on-dark-body">{item.text}</p>

                    {/* 統計數字 */}
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <div
                        className={`font-bold font-display transition-all duration-300 ${isExpanded ? 'text-3xl' : 'text-2xl group-hover:text-3xl'}`}
                        style={{ color: item.accentColor }}
                      >{item.stats.value}</div>
                      <div className="text-xs font-medium text-on-dark-muted">{item.stats.label}</div>
                      <div className="ml-auto text-xs text-on-dark-muted font-medium">
                        {isExpanded ? '點擊收合' : '點擊了解更多'}
                      </div>
                    </div>
                  </div>

                  {/* 展開詳細說明 */}
                  <div
                    style={{
                      maxHeight: isExpanded ? '320px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                      transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      className="mx-5 mb-5 rounded-2xl p-5"
                      style={{
                        background: `linear-gradient(135deg, ${item.accentColor}12, ${item.accentColor}06)`,
                        border: `1px solid ${item.accentColor}30`,
                      }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: item.accentColor + 'cc' }}>我們的承諾</p>
                      <ul className="space-y-2.5">
                        {item.details.map((d, di) => (
                            <li key={di} className="flex items-start gap-2.5 text-sm text-on-dark-body leading-relaxed">
                            <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: item.accentColor + '30' }}>
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.accentColor }} />
                            </div>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 展開時底部色條 */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)`,
                      opacity: isExpanded ? 1 : 0,
                    }}
                  />
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 波浪分隔 */}
      <div className="relative h-10 overflow-hidden bg-[#FFF5EE]">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,30 C480,0 960,40 1440,10 L1440,40 L0,40 Z" fill="#FDF6F0" />
        </svg>
      </div>

      {/* ===== 品牌介紹影片 ===== */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] to-[#FDF6F0]" />
        <div className="container relative z-10">
          <SectionHeader
            tag="品牌影片"
            title="看見小阿姨的故事"
            subtitle="觀看小阿姨雪花冰的精彩介紹，感受我們的用心與溫度"
          />
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl">
              {/* 裝飾框 */}
              <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-lg" />
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/2vy-hNKVnJs?start=877&end=1010"
                  title="小阿姨雪花冰品牌介紹"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 冰品菜單 ===== */}
      <section id="menu" className="py-16 md:py-28 relative overflow-hidden">
        {/* 奶油漸層底色 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] via-[#FDF6F0] to-[#FFF5EE]" />
        {/* 水彩插圖背景 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/menu_section_watercolor_bg-SqJnZpmWvhDvNtTJdfRp7t.webp')`,
            opacity: 0.55,
            mixBlendMode: "multiply",
          }}
        />
        {/* 頂部波浪 */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" fill="#FFF5EE" />
          </svg>
        </div>

        <div className="container relative z-10">
          <SectionHeader
            tag="人氣冰品"
            title="精選冰品"
            iconImg="/images/icon_shaveice_transparent.webp"
            subtitle="每一口都是幸福的滋味，精心製作的雪花冰等您來品嚐"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menuItems.map((item, i) => (
              <div
                key={item.id}
                className="menu-card-premium group reveal"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* 圖片區 */}
                <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${item.color}`}>
                  {item.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="badge-premium bg-gradient-to-r from-[#C0623A]/90 to-[#E8896A]/90 text-white border-white/30 shadow-lg backdrop-blur-sm">
                        <span className="animate-pulse">⭐</span>
                        {item.badge}
                      </div>
                    </div>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  />
                  {/* 圖片底部漸層 */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* 頂部金色線 */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4A855]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* 內容區 */}
                <div className="p-5 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-title-primary mb-2 font-display leading-snug group-hover:text-title-accent transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-body-secondary text-sm leading-relaxed">{item.description}</p>
                  {/* 底部裝飾 */}
                  <div className="mt-4 pt-4 border-t border-[#EDD5C0]/50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-label-gold">
                      <span className="w-1 h-1 rounded-full bg-[#D4A855]/50" />
                      <span>手工製作</span>
                      <span className="w-1 h-1 rounded-full bg-[#D4A855]/50" />
                      <span>新鮮食材</span>
                    </div>
                    <button
                      onClick={() => setSelectedMenuItem(item)}
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors duration-200 group/btn btn-interactive-text"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>查看詳情</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* ===== 熱食區 - 披薩 ===== */}
      <section className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] via-[#FDF6F0] to-[#FFF5EE]" />
        {/* 裝飾 */}
        <div className="absolute top-10 left-10 text-8xl opacity-5 select-none">🍕</div>
        <div className="absolute bottom-10 right-10 text-8xl opacity-5 select-none">🍕</div>

        <div className="container relative z-10">
          <SectionHeader
            tag="熱食區"
            title="手工披薩"
            iconImg="/images/icon_pizza_transparent.webp"
            subtitle="6吋手工披薩，現做現烤。新鮮食材搭配傳統烘烤技術，每一片都是用心的傑作"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {pizzaItems.map((item, i) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-warm bg-white card-warm-shadow hover:card-warm-shadow transition-all duration-400 hover:-translate-y-3"
              >
                {/* 標籤 */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 bg-white/85 backdrop-blur-sm rounded-full text-xs font-semibold text-primary border border-primary/20">
                    {item.tag}
                  </span>
                </div>

                <div className="relative aspect-square overflow-hidden bg-amber-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/15 to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-title-primary mb-2 font-display leading-snug group-hover:text-title-accent transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-body-secondary text-xs leading-relaxed">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-accent/70">
                      <span>🔥</span>
                      <span>現烤現做</span>
                    </div>
                    <button
                      onClick={() => setSelectedMenuItem(item)}
                      className="text-xs px-3 py-1.5 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-white transition-all duration-300 font-medium btn-interactive-outline"
                    >
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* ===== 聯絡我們 ===== */}
      <section id="contact" className="py-20 md:py-36 relative overflow-hidden">
        {/* 深色背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0D06] via-[#2C1810] to-[#1A0D06]" />
        {/* 背景圖片深色疊加 */}
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/contact_section_bg-QFP7d7rxXTUbFLv3XWvdpn.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* 光暈 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#D4A855]/8 rounded-full blur-[80px]" />
        {/* 細點裝飾 */}
        {["top-16 left-[15%]", "top-1/3 right-[12%]", "bottom-20 left-[25%]", "bottom-12 right-[18%]"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-1 h-1 rounded-full bg-[#D4A855]/40 animate-pulse`} style={{ animationDelay: `${i * 1.1}s` }} />
        ))}

        <div className="relative container z-10">
          {/* 標題 */}
          <div className="text-center mb-16 md:mb-20">
            <div className="reveal flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#D4A855]/15 border border-[#D4A855]/30 rounded-full text-[#D4A855] text-sm font-semibold tracking-widest backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5" />
                聯絡資訊
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl font-bold mb-5 font-display text-white leading-tight">
              歡迎蒞臨
              <span className="block" style={{
                background: 'linear-gradient(135deg, #FFE8C8, #F0C878, #D4A855)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>小阿姨雪花冰</span>
            </h2>
            <p className="reveal reveal-delay-2 text-on-dark-body max-w-xl mx-auto leading-relaxed">位於彰化線西，期待與您分享每一份甜蜜時光</p>
          </div>

          {/* 三欄聯絡卡片 */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-14">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "店面地址",
                accentColor: "#FB923C",
                mainText: "彰化縣線西鄉復興路11-1號",
                mainHref: "https://maps.app.goo.gl/5K6ehAGyrB6YaQxLA",
                subText: "Xianxi Township, Changhua County",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "聯絡電話",
                accentColor: "#38BDF8",
                mainText: "+886 4 755 6840",
                mainHref: "tel:+886475568406",
                subText: "現在暫時關閉，敬請期待重新開幕",
              },
              {
                icon: <Facebook className="w-6 h-6" />,
                title: "追蹤我們",
                accentColor: "#818CF8",
                mainText: "Facebook 粉絲專頁",
                mainHref: "https://www.facebook.com/profile.php?id=100084743760507&mibextid=ZbWKwL",
                subText: "獲得最新消息和優惠資訊",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative rounded-3xl p-7 text-center overflow-hidden transition-all duration-500 hover:-translate-y-3 reveal"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(20px)',
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {/* 懸停光暈 */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 0 60px ${card.accentColor}30` }}
                />
                {/* 頂部彩色線 */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`, opacity: 0.5 }}
                />
                {/* 角落光暈 */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{ background: card.accentColor, filter: 'blur(40px)', opacity: 0.08 }} />

                <div className="relative z-10">
                  {/* 圖示圈 */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-400 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${card.accentColor}25, ${card.accentColor}10)`,
                      border: `2px solid ${card.accentColor}35`,
                      color: card.accentColor,
                      boxShadow: `0 8px 24px ${card.accentColor}20`,
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-4 font-display text-on-dark-title">{card.title}</h3>
                  <a
                    href={card.mainHref}
                    target={card.mainHref.startsWith('http') ? '_blank' : undefined}
                    rel={card.mainHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-semibold block mb-2 transition-colors duration-200 hover:opacity-80"
                    style={{ color: card.accentColor }}
                  >
                    {card.mainText}
                  </a>
                  <p className="text-xs text-on-dark-muted leading-relaxed">{card.subText}</p>
                  {/* 底部裝飾線 */}
                  <div
                    className="mt-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}50, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Google Maps 嵌入 */}
          <div className="max-w-4xl mx-auto reveal">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(212,168,85,0.25)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              {/* 地圖框頂部裝飾列 */}
              <div className="flex items-center gap-3 px-5 py-3" style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(212,168,85,0.15)' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <span className="text-xs text-on-dark-muted font-mono">maps.google.com · 小阿姨雪花冰</span>
                <a
                  href="https://maps.app.goo.gl/5K6ehAGyrB6YaQxLA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-80 btn-interactive-outline"
                  style={{ background: 'rgba(212,168,85,0.2)', color: '#D4A855', border: '1px solid rgba(212,168,85,0.3)' }}
                >
                  <MapPin className="w-3 h-3" />
                  開啟地圖
                </a>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.8!2d120.4056!3d24.0948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346f3b9c3b3b3b3b%3A0x0!2z5bGx5YyX57aT5YWJ5YyW5YWJ5YyW!5e0!3m2!1szh-TW!2stw!4v1715000000000"
                width="100%"
                height="300"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="小阿姨雪花冰位置"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 波浪分隔 */}
      <div className="relative h-10 overflow-hidden">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,20 C360,0 720,40 1080,10 C1260,0 1380,30 1440,20 L1440,40 L0,40 Z" fill="#FFF5EE" />
        </svg>
      </div>

      {/* ===== 顧客評價 ===== */}
      <section className="py-20 md:py-36 relative overflow-hidden">
        {/* 深色背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] via-[#FDF6F0] to-[#FFF5EE]" />
        {/* 大光暈裝飾 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/6 rounded-full blur-[80px]" />
        {/* 浮動星星 */}
        {[
          { pos: "top-12 left-[8%]", size: "text-3xl", delay: 0 },
          { pos: "top-20 right-[10%]", size: "text-2xl", delay: 0.8 },
          { pos: "bottom-16 left-[20%]", size: "text-xl", delay: 1.5 },
          { pos: "bottom-10 right-[15%]", size: "text-3xl", delay: 0.4 },
          { pos: "top-1/2 left-[5%]", size: "text-lg", delay: 1.2 },
        ].map((s, i) => (
          <div key={i} className={`absolute ${s.pos} ${s.size} opacity-20 animate-sparkle select-none`} style={{ animationDelay: `${s.delay}s` }}>⭐</div>
        ))}

        <div className="container relative z-10">
          {/* 標題 */}
          <div className="text-center mb-16 md:mb-20">
            <div className="reveal flex justify-center mb-6">
              <span className="section-tag">
                <Star className="w-3.5 h-3.5 fill-current" />
                顧客回饋
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl font-bold mb-5 font-display text-gradient-gold leading-tight">
              真實顧客評價
            </h2>
            <p className="reveal reveal-delay-2 text-body-secondary max-w-2xl mx-auto leading-relaxed">
              每一個評價都是我們持續進步的動力，感謝所有顧客的信任與支持
            </p>
            {/* 評分統計橫幅 */}
            <div className="reveal reveal-delay-3 mt-8 flex justify-center">
              <div
                className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,85,0.12), rgba(212,168,85,0.06))',
                  border: '1px solid rgba(212,168,85,0.25)',
                  boxShadow: '0 8px 32px rgba(212,168,85,0.1)',
                }}
              >
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <div className="h-5 w-px bg-[#D4A855]/30" />
                <span className="text-foreground/70 text-sm font-semibold">4.9 星評分</span>

              </div>
            </div>
          </div>

          <ReviewCarousel reviews={reviews} itemsPerView={3} autoPlayInterval={5000} />

          {/* 底部 CTA */}
          <div className="text-center mt-12">
            <a
              href="https://maps.app.goo.gl/5K6ehAGyrB6YaQxLA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:opacity-70"
              style={{ color: '#D4A855' }}
            >
              <Star className="w-4 h-4 fill-current" />
              在 Google Maps 留下您的評價
            </a>
          </div>
        </div>
      </section>

      {/* 波浪分隔 */}
      <div className="relative h-10 overflow-hidden bg-[#FFF5EE]">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path d="M0,10 C480,40 960,0 1440,30 L1440,40 L0,40 Z" fill="#FDF6F0" />
        </svg>
      </div>

      {/* ===== Instagram ===== */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #FFF5EE 0%, #FDF6F0 40%, #FFF8F2 70%, #FFF5EE 100%)' }}>
        {/* 背景裝飾 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[5%] w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,137,106,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-10 right-[5%] w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,168,85,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="container relative z-10">
          {/* 標題 */}
          <div className="text-center mb-12">
            <div className="reveal flex justify-center mb-4">
              <span className="section-tag-premium">社群媒體</span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl font-bold mb-4 font-display text-gradient-gold">Instagram 精選</h2>
            <p className="reveal reveal-delay-2 text-body-secondary max-w-xl mx-auto">
              追蹤
              <a href="https://www.instagram.com/auntie_dreamhouse" target="_blank" rel="noopener noreferrer"
                className="font-semibold mx-1 transition-colors hover:text-primary" style={{ color: '#C0623A' }}>
                @auntie_dreamhouse
              </a>
              ，看更多美食分享和幸福時刻
            </p>
          </div>

          {/* 圖片網格 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
            {[
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/OfJxJFhbgWYQVFvW.png", alt: "新鮮芒果布丁雪花冰", caption: "新鮮芒果布丁雪花冰 🥭 綿密入口即化，夏日必點！", likes: 128, comments: 24 },
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/fUOVTtiUSdlcgtUW.png", alt: "新鮮草莓奶酪雪花冰", caption: "新鮮草莓奶酪雪花冰 🍓 酸酸甜甜，療癒滋味", likes: 156, comments: 32 },
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YZiSIUzAAlNKHzgC.png", alt: "Oreo巧克力布丁雪花冰", caption: "Oreo 巧克力布丁雪花冰 🍫 巧克力愛好者必點！", likes: 189, comments: 41 },
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/nVKrAcBpRhrFllUC.png", alt: "紅豆牛奶雪花冰", caption: "紅豆牛奶雪花冰 🍶 懷舊風味，溫暖陪伴", likes: 142, comments: 28 },
            ].map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/auntie_dreamhouse"
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group relative overflow-hidden block cursor-pointer"
                style={{
                  borderRadius: '1.25rem',
                  border: '1px solid rgba(212,168,85,0.2)',
                  boxShadow: '0 4px 20px rgba(74,46,26,0.08)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(-8px) scale(1.02)';
                  el.style.boxShadow = '0 20px 48px rgba(232,137,106,0.22), 0 0 0 1.5px rgba(212,168,85,0.4)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = '';
                  el.style.boxShadow = '0 4px 20px rgba(74,46,26,0.08)';
                }}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={post.src}
                    alt={post.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                  />
                </div>
                 {/* Instagram 圖示（懸停顯示） */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <Instagram className="w-3.5 h-3.5 text-white" />
                </div>
                {/* 懸停遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-xs leading-relaxed line-clamp-2 mb-2">{post.caption}</p>
                  <div className="flex items-center gap-3 text-white/85 text-xs">
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.comments}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* 追蹤按鈕 */}
          <div className="reveal text-center">
            <a
              href="https://www.instagram.com/auntie_dreamhouse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                boxShadow: '0 8px 24px rgba(220,39,67,0.35)',
              }}
            >
              <Instagram className="w-5 h-5" />
              追蹤 @auntie_dreamhouse
            </a>
          </div>
        </div>
      </section>

       {/* ===== 頁尾 ===== */}
      <footer className="relative overflow-hidden footer-premium">
        {/* 頂部波浪 */}
        <div className="relative">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 block">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z" fill="#2C1810" />
          </svg>
        </div>
        <div className="bg-gradient-to-b from-[#2C1810] to-[#1E0F08] text-white">
          <div className="container py-12 md:py-16">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              {/* 品牌 */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center text-2xl shadow-lg border border-white/10">🍧</div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white tracking-wide">小阿姨雪花冰</h3>
                    <p className="text-xs text-on-dark-gold font-accent tracking-widest">Auntie Dream Ice</p>
                  </div>
                </div>
                <p className="text-on-dark-body text-sm leading-relaxed mb-5">
                  一口綿密，一點療愈，午後的甜品時光。彰化線西最溫暖的冰品甜點專賣店。
                </p>
                {/* 金色裝飾線 */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#D4A855]/40 to-transparent" />
              </div>

              {/* 快速連結 */}
              <div>
                <h4 className="font-bold mb-5 text-white font-display tracking-wide text-base flex items-center gap-2">
                  <span className="w-4 h-px bg-gradient-to-r from-[#D4A855] to-transparent" />
                  快速連結
                </h4>
                <ul className="space-y-3">
                  {[
                    { href: "#about", label: "關於我們" },
                    { href: "#brand", label: "品牌故事" },
                    { href: "#menu", label: "人氣美食介紹" },
                    { href: "#contact", label: "聯絡我們" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-on-dark-body hover:text-on-dark-accent text-sm transition-all duration-200 flex items-center gap-2.5 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A855]/40 group-hover:bg-[#D4A855] transition-colors" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 聯絡資訊 */}
              <div>
                <h4 className="font-bold mb-5 text-white font-display tracking-wide text-base flex items-center gap-2">
                  <span className="w-4 h-px bg-gradient-to-r from-[#D4A855] to-transparent" />
                  聯絡資訊
                </h4>
                <ul className="space-y-3.5 text-sm text-on-dark-body">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span>彰化縣線西鄉復興路11-1號</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary/70 flex-shrink-0" />
                    <span>週三至週日 12:00–21:00</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-primary/70 flex-shrink-0" />
                    <a href="https://www.instagram.com/auntie_dreamhouse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      @auntie_dreamhouse
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 版權 */}
            <div className="border-t border-white/8 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-[#D4A855]/60 to-transparent" />
                  <p className="text-on-dark-muted text-xs tracking-widest uppercase">Xianxi, Changhua</p>
                  <div className="h-px w-8 bg-gradient-to-l from-[#D4A855]/60 to-transparent" />
                </div>
                <p className="text-on-dark-muted text-xs">© 2026 小阿姨雪花冰 · Auntie Dream Ice. All rights reserved.</p>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/profile.php?id=100084743760507" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 transition-all duration-300 hover:scale-110 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60 hover:text-[#1877F2] hover:shadow-lg btn-interactive-circle"
                    style={{ transitionProperty: 'all' }}>
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/auntie_dreamhouse" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 transition-all duration-300 hover:scale-110 hover:border-[#E1306C]/60 hover:text-[#E1306C] hover:shadow-lg btn-interactive-circle"
                    style={{ transitionProperty: 'all' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(240,148,51,0.2), rgba(225,48,108,0.2))'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; }}>
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== 回到頂部按鈕 ===== */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-in btn-interactive-circle"
          aria-label="回到頂部"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>

    {/* ===== 菜單詳情 Modal ===== */}
    {selectedMenuItem && (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={() => setSelectedMenuItem(null)}
        style={{ animation: "fadeIn 0.25s ease" }}
      >
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        {/* Modal 內容 */}
        <div
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: "modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {/* 關閉按鈕 */}
          <button
            onClick={() => setSelectedMenuItem(null)}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200 btn-interactive-circle"
          >
            <X className="w-4 h-4 text-foreground/70" />
          </button>

          {/* 圖片區 */}
          <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${selectedMenuItem.color || "from-amber-50 to-orange-50"}`}>
            <img
              src={selectedMenuItem.image}
              alt={selectedMenuItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {selectedMenuItem.badge && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-gradient-to-r from-[#C0623A]/90 to-[#E8896A]/90 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                  ⭐ {selectedMenuItem.badge}
                </span>
              </div>
            )}
            <div className="absolute bottom-4 left-5 right-14">
              <h2 className="text-xl font-bold text-white font-display leading-snug drop-shadow-lg">
                {selectedMenuItem.name}
              </h2>
            </div>
          </div>

          {/* 內容區 */}
          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            {/* 描述 */}
            <p className="text-foreground/70 text-sm leading-relaxed">{selectedMenuItem.description}</p>

            {/* 成分 */}
            {selectedMenuItem.ingredients && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Leaf className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">主要成分</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedMenuItem.ingredients.map((ing: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-[#FFF5EE] border border-[#EDD5C0] rounded-full text-xs text-[#8B4513] font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 特色 */}
            {selectedMenuItem.features && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">風味特色</h3>
                </div>
                <div className="space-y-2">
                  {selectedMenuItem.features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4A855] flex-shrink-0" />
                      <span className="text-sm text-foreground/75">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

             {/* 建議搭配 */}
            {selectedMenuItem.pairing && (
              <div className="flex items-start gap-3 p-3.5 bg-[#FFF5EE] rounded-xl border border-[#EDD5C0]/60">
                <div className="w-6 h-6 rounded-full bg-[#FDEBD0] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">✨</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8B4513] mb-0.5">建議搭配</div>
                  <div className="text-xs text-[#A0522D]/80">{selectedMenuItem.pairing}</div>
                </div>
              </div>
            )}

            {/* 過敏原 */}
            {selectedMenuItem.allergens && (
              <div className="flex items-start gap-3 p-3.5 bg-orange-50 rounded-xl border border-orange-100">
                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs font-bold text-orange-700 mb-0.5">過敏原資訊</div>
                  <div className="text-xs text-orange-600/80">{selectedMenuItem.allergens}</div>
                </div>
              </div>
            )}

            {/* 底部品牌 */}
            <div className="pt-2 border-t border-[#EDD5C0]/40 flex items-center justify-between">
              <span className="text-xs text-foreground/30">小阿姨雪花冰 · 彰化線西</span>
              <span className="text-xs text-primary/60 font-medium">手工製作 · 新鮮食材</span>
            </div>
          </div>
        </div>
      </div>
     )}
    </>
  );
}

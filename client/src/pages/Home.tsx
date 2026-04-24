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
function SectionHeader({ tag, title, subtitle, center = true }: { tag?: string; title: string; subtitle?: string; center?: boolean }) {
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
      <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display text-gradient-warm leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-foreground/65 leading-relaxed max-w-2xl mx-auto">
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
      <div className="text-3xl md:text-4xl font-bold text-gradient-warm font-display mb-1">{number}</div>
      <div className="text-sm text-foreground/60 font-medium">{label}</div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
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
      image: "/manus-storage/seafood_combo_pizza_v2_09ef9a1f.jpg",
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
      image: "/manus-storage/philadelphia_beef_pizza_new_3599861b.jpg",
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
      image: "/manus-storage/magic_edit#TUFHeVVqSnZoWTgjMSMzY2UyMGE0MDFlODFmYjBkN2Y5NDcwZmE1ZjcxMzkwMiM4MDAjI1RSQU5TRk9STUFUSU9OX1JFUVVFU1Q_b19014c5.jpg",
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
      image: "/manus-storage/honey_mochi_pizza_new_5981896f.jpg",
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
      pairing: "搭配熱天午後，清涼消暑最佳",
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
      pairing: "搭配下午茶時光，少女心滿滿",
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
      pairing: "搭配熱咖啡或牛奶，巧克力控必點",
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
      pairing: "搭配熱茶或黑糖飲，懷舊感滿滿",
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
      pairing: "搭配和風點心或熱抹茶，層次更豐富",
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
      pairing: "搭配熱天午後，清涼解渴最佳",
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
                <p className="text-base md:text-xl font-bold tracking-wide">週二至週日 12:00–21:00</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-white/30" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white/75 text-xs font-medium mb-0.5">公休日</p>
                <p className="text-base md:text-xl font-bold tracking-wide">每週一公休</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 導航欄 ===== */}
      <header className="sticky top-0 z-50 nav-glass transition-all duration-300">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg shadow-md">
              🍧
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient-warm font-display leading-none">小阿姨雪花冰</h1>
              <p className="text-xs text-foreground/45 font-accent">Auntie Dreamice</p>
            </div>
          </div>

          {/* 桌面導航 */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "#about", label: "關於我們" },
              { href: "#brand", label: "品牌故事" },
              { href: "#menu", label: "人氣美食" },
              { href: "#contact", label: "聯絡我們" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link-premium text-sm"
              >
                {item.label}
              </a>
            ))}
            <button
              className="btn-premium text-sm px-5 py-2"
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            >
              探索菜單
            </button>
          </nav>

          {/* 手機漢堡選單 */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-primary/10 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="開啟選單"
          >
            <span className={`block w-5 h-0.5 bg-foreground/70 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground/70 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-foreground/70 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* 手機選單下拉 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-warm bg-background/98 backdrop-blur-sm">
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
        )}
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

        <div className="relative container py-24 md:py-40 flex items-center min-h-[680px] md:min-h-[780px]">
          <div className="max-w-xl">
            {/* 裝飾標籤 */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/25 text-white/90 text-sm font-medium mb-6 animate-fade-in-down">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              彰化線西 · 手工冰品甜點
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 leading-tight font-display animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              小阿姨<br />
              <span className="text-[#FFD4B8]">雪花冰</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-3 leading-relaxed font-light animate-fade-in-up min-h-[2rem]" style={{ animationDelay: "0.2s" }}>
              {typedText}<span className="inline-block w-0.5 h-6 bg-white/80 ml-0.5 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
            </p>
            <p className="text-base md:text-lg text-white/75 mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              彰化線西最溫暖的冰品甜點專賣店<br />
              用最新鮮的食材和用心的製作，為您帶來每一份幸福滋味
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <button
                className="btn-premium inline-flex items-center gap-2 text-base"
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              >
                探索菜單
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="btn-outline-premium inline-flex items-center gap-2 text-base bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white/60"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                了解我們
              </button>
            </div>

            {/* 評分展示 */}
            <div className="mt-10 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/25">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F0C878] text-[#F0C878] drop-shadow-sm" />
                  ))}
                </div>
                <span className="text-white text-sm font-bold ml-1">4.9</span>
              </div>
              <div className="h-4 w-px bg-white/30" />
              <span className="text-white/80 text-sm">55則 Google 評價</span>
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

      {/* ===== 品牌數字統計 ===== */}
      <section className="py-10 md:py-14 bg-background relative z-10">
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
      <section id="about" className="py-20 md:py-32 relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EE] via-background to-[#FFF0E8]" />
        {/* 大圓形裝飾 */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        {/* 小點裝飾 */}
        <div className="absolute top-1/3 left-8 w-3 h-3 rounded-full bg-primary/30 animate-pulse" />
        <div className="absolute top-2/3 right-12 w-2 h-2 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10">
          {/* 標題區 */}
          <div className="text-center mb-16 md:mb-20">
            <div className="reveal flex justify-center mb-5">
              <span className="section-tag">
                <Sparkles className="w-3 h-3" />
                我們的故事
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display text-gradient-warm leading-tight">
              關於小阿姨雪花冰
            </h2>
            <p className="reveal reveal-delay-2 text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              一間充滿溫度的冰品甜點專賣店，用最用心的製作，為您帶來每一份幸福滋味
            </p>
            <div className="reveal reveal-delay-3 mt-6 flex justify-center">
              <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </div>

          {/* 數字統計橫排 */}
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-14">
            {[
              { value: "4.9", unit: "★", label: "Google 評分", emoji: "⭐" },
              { value: "55", unit: "+", label: "顧客評價", emoji: "💬" },
              { value: "10", unit: "+", label: "精選冰品", emoji: "🍧" },
              { value: "100", unit: "%", label: "新鮮食材", emoji: "🌱" },
            ].map((stat, i) => (
              <div
                key={i}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-primary/10 hover:border-primary/25 hover:shadow-lg transition-all duration-400 text-center"
              >
                <div className="text-2xl mb-2 group-hover:animate-bounce">{stat.emoji}</div>
                <div className="flex items-end justify-center gap-0.5">
                  <span className="text-3xl md:text-4xl font-bold text-gradient-warm font-display leading-none">{stat.value}</span>
                  <span className="text-lg font-bold text-primary/70 mb-0.5">{stat.unit}</span>
                </div>
                <p className="text-xs text-foreground/55 mt-2 font-medium tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 非對稱三欄卡片 */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🌱",
                iconBg: "bg-gradient-to-br from-emerald-100 to-green-50",
                iconRing: "ring-emerald-200",
                title: "我們的起源",
                text: "小阿姨雪花冰誤生於一個簡單卻深刻的夢想——讓每一位顧客都能在享受美食的同時，感受到來自心底的溫暖與關懷。我們相信，好的冰品不僅是食物，更是一份情感的傳遞。",
                cardBg: "from-[#F0FDF4] to-[#ECFDF5]",
                cardBorder: "border-emerald-100",
                accent: "#10B981",
                delay: "",
              },
              {
                icon: "💡",
                iconBg: "bg-gradient-to-br from-amber-100 to-yellow-50",
                iconRing: "ring-amber-200",
                title: "品牌理念",
                text: "在彰化線西這片溫暖的土地上，我們堅持用最新鮮的食材、最細致的製冰技術和最真挚的服務態度，為每一位顧客創造獨特的美食體驗。",
                cardBg: "from-[#FFFBEB] to-[#FEF3C7]",
                cardBorder: "border-amber-100",
                accent: "#F59E0B",
                delay: "reveal-delay-2",
              },
              {
                icon: "🤝",
                iconBg: "bg-gradient-to-br from-rose-100 to-pink-50",
                iconRing: "ring-rose-200",
                title: "我們的承諾",
                items: [
                  { text: "每日精選新鮮食材", icon: "🌿" },
                  { text: "專業製冰技術", icon: "❄️" },
                  { text: "用心服務每一位顧客", icon: "💝" },
                  { text: "持續創新限定菜單", icon: "✨" },
                ],
                cardBg: "from-[#FFF1F2] to-[#FFE4E6]",
                cardBorder: "border-rose-100",
                accent: "#F43F5E",
                delay: "reveal-delay-4",
              },
            ].map((card, i) => (
              <div key={i} className={`group reveal ${card.delay}`}>
                <div
                  className={`bg-gradient-to-br ${card.cardBg} rounded-3xl p-8 border ${card.cardBorder} hover:shadow-[0_20px_60px_rgba(74,46,26,0.12)] hover:-translate-y-3 transition-all duration-500 h-full relative overflow-hidden`}
                >
                  {/* 裝飾角落圓弧 */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-white/50 rounded-bl-full" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/30 rounded-tr-full" />

                  {/* 圖示區 */}
                  <div className={`feature-card-icon ${card.iconBg} ring-2 ${card.iconRing} mb-6`}>
                    {card.icon}
                  </div>

                  {/* 標題 */}
                  <h3 className="text-xl font-bold text-foreground mb-4 font-display tracking-wide">{card.title}</h3>

                  {/* 內容 */}
                  {'text' in card && card.text ? (
                    <p className="text-foreground/68 leading-relaxed text-sm">{card.text}</p>
                  ) : (
                    <ul className="space-y-3">
                      {card.items?.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-foreground/70 group/item">
                          <span className="w-8 h-8 rounded-xl bg-white/70 flex items-center justify-center text-base flex-shrink-0 shadow-sm group-hover/item:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          <span className="font-medium">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* 底部裝飾線 */}
                  <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary/60 to-accent/60 rounded-full transition-all duration-600" />
                </div>
              </div>
            ))}
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
            src="/manus-storage/store_photo_b4b014c2.jpg"
            alt="小阿姨雪花冰店內實景"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* 半透明遮罩：降低透明度讓圖片更明顯，同時保留文字可讀性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE]/68 via-[#FDF6F0]/65 to-[#FFF5EE]/70" />
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
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display text-gradient-warm leading-tight">
              小阿姨的夢想冰店
            </h2>
            <div className="reveal reveal-delay-2 mt-6 flex justify-center">
              <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* 手寫風格引言區塊 */}
            <div className="reveal mb-14">
              <div className="relative bg-gradient-to-br from-white/92 to-[#FFF5EE]/95 backdrop-blur-md rounded-3xl border border-primary/20 shadow-[0_8px_40px_rgba(232,137,106,0.18)] overflow-hidden">
                {/* 裝飾左側色條 */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-accent to-primary/50 rounded-l-3xl" />
                {/* 大引號裝飾 */}
                <div className="absolute -top-2 left-8 text-7xl text-primary/20 font-display leading-none select-none" style={{ fontFamily: 'Georgia, serif' }}>“</div>
                <div className="absolute -bottom-4 right-8 text-7xl text-primary/20 font-display leading-none select-none rotate-180" style={{ fontFamily: 'Georgia, serif' }}>“</div>
                <div className="px-10 py-10 md:py-12">
                  <p className="font-accent text-2xl md:text-3xl text-[#A84F2A] leading-relaxed text-center font-bold drop-shadow-sm">
                    還記得小時候炎炎夏日吃到一口冰
                    <br className="hidden md:block" />
                    就覺得開心的幸福感嗎？
                  </p>
                  <div className="flex justify-center mt-5 gap-1">
                    {["🌸", "✨", "🍧", "✨", "🌸"].map((e, i) => (
                      <span key={i} className="text-lg opacity-60 animate-float" style={{ animationDelay: `${i * 0.4}s` }}>{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
                          <h4 className="font-bold text-[#3D1F0A] font-display text-base">{item.title}</h4>
                        </div>
                        <p className="text-[#5A3A1A]/85 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右欄：文字內容 */}
              <div className="reveal reveal-right space-y-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary/15 hover:border-primary/25 hover:shadow-md transition-all duration-300">
                  <p className="text-[#5A3A1A]/90 leading-relaxed font-medium">
                    無論是經典的芒果布丁、新鮮的草莓奶酪，還是特色的蜂蜜麻吉披薩，每一款都是我們對美食的執著和對顧客的尊重。
                  </p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-primary/15 hover:border-primary/25 hover:shadow-md transition-all duration-300">
                  <p className="text-[#5A3A1A]/90 leading-relaxed font-medium">
                    在彰化線西，我們用最溫暖的服務和最用心的製作，為每一位顧客創造獨特的美食體驗。每一次的相遇，都是一份幸福的開始。
                  </p>
                </div>
                {/* 小裝飾卡 */}
                <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-5 border border-primary/20 flex items-center gap-4">
                  <div className="text-4xl animate-heartbeat">🍧</div>
                  <div>
                    <p className="font-bold text-[#3D1F0A] font-display text-sm">位於彰化線西</p>
                    <p className="text-[#5A3A1A]/70 text-xs mt-0.5">週二至週日 12:00–21:00 營業</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 核心標語區塊 */}
            <div className="reveal">
              <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center">
                {/* 背景漸層 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C0623A] via-[#E8896A] to-[#D4A574] animate-gradient-shift" />
                {/* 裝飾圆形 */}
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/8 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full" />
                {/* 內容 */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4 animate-float">🍧</div>
                  <p className="font-accent text-2xl md:text-3xl text-white leading-relaxed mb-2">
                    小阿姨陪你們找回小時候的幸福
                  </p>
                  <p className="text-white/70 text-sm mt-3">— 小阿姨雪花冰 Auntie Dreamice</p>
                  <div className="flex justify-center mt-5 gap-3">
                    {["💝", "🍧", "✨", "🌸", "💝"].map((e, i) => (
                      <span key={i} className="text-xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
                    ))}
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
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFF5EE] to-[#FDF6F0]" />
        {/* 裝飾元素 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/4 rounded-full blur-3xl" />
        {/* 小點裝飾 */}
        {["top-16 left-16", "top-1/3 right-20", "bottom-24 left-1/3", "bottom-16 right-1/4"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-2 h-2 rounded-full bg-primary/25 animate-pulse`} style={{ animationDelay: `${i * 0.8}s` }} />
        ))}

        <div className="container relative z-10">
          {/* 標題 */}
          <div className="text-center mb-16 md:mb-20">
            <div className="reveal flex justify-center mb-5">
              <span className="section-tag">
                <Sparkles className="w-3 h-3" />
                我們的特色
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 text-4xl md:text-5xl lg:text-6xl font-bold mb-5 font-display text-gradient-warm leading-tight">
              為什麼選擇小阿姨
            </h2>
            <p className="reveal reveal-delay-2 text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
              我們的承諾與堅持，讓每一口都是幸福的滋味
            </p>
            <div className="reveal reveal-delay-3 mt-6 flex justify-center">
              <div className="h-0.5 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </div>

          {/* 三欄特色卡片 */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                emoji: "🥭",
                iconBg: "bg-gradient-to-br from-orange-100 to-amber-50",
                iconRing: "ring-orange-200",
                title: "嚴選新鮮食材",
                text: "每日精選新鮮水果，嚴格把關食材品質。我們相信，好的冰品從好的食材開始，絕不妥協。",
                badge: "每日新鮮",
                badgeColor: "bg-orange-100 text-orange-700",
                cardBg: "from-[#FFFBF5] to-[#FFF5E8]",
                cardBorder: "border-orange-100",
                expandBorder: "border-orange-300",
                expandBg: "bg-orange-50/80",
                stats: { value: "100%", label: "新鮮食材" },
                delay: "",
                details: [
                  { icon: "✅", text: "每日清晨精選當季新鮮水果，保證最佳品質" },
                  { icon: "✅", text: "不使用人工色素與保存劑，食材天然健康" },
                  { icon: "✅", text: "直接向小農家合作選購，確保食材新鮮直送" },
                  { icon: "✅", text: "季節限定食材定期更新，帶來不同驚喜" },
                ],
              },
              {
                emoji: "❄️",
                iconBg: "bg-gradient-to-br from-sky-100 to-blue-50",
                iconRing: "ring-sky-200",
                title: "細致雪花冰技術",
                text: "採用專業製冰技術，呈現入口即化的絕妙口感。每一口都是綿密的幸福，讓您感受真正的冰品藝術。",
                badge: "入口即化",
                badgeColor: "bg-sky-100 text-sky-700",
                cardBg: "from-[#F5FBFF] to-[#EBF5FF]",
                cardBorder: "border-sky-100",
                expandBorder: "border-sky-300",
                expandBg: "bg-sky-50/80",
                stats: { value: "10+", label: "精選冰品" },
                delay: "reveal-delay-2",
                details: [
                  { icon: "❄️", text: "雪花冰絲細絕美，入口即化不粉不粘" },
                  { icon: "❄️", text: "專業製冰機器精準控溫，確保每一碗都達到最佳狀態" },
                  { icon: "❄️", text: "每一碗冰品現做現賣，保證最佳新鮮口感" },
                  { icon: "❄️", text: "可客製甜度，滿足不同年齡顧客的口味需求" },
                ],
              },
              {
                emoji: "💝",
                iconBg: "bg-gradient-to-br from-rose-100 to-pink-50",
                iconRing: "ring-rose-200",
                title: "溫暖用心服務",
                text: "我們把每位顧客都當作家人，用溫暖的笑容和細心的服務，為您創造最舒適的用餐體驗。",
                badge: "如家溫暖",
                badgeColor: "bg-rose-100 text-rose-700",
                cardBg: "from-[#FFF5F7] to-[#FFE8EC]",
                cardBorder: "border-rose-100",
                expandBorder: "border-rose-300",
                expandBg: "bg-rose-50/80",
                stats: { value: "4.9★", label: "顧客評分" },
                delay: "reveal-delay-4",
                details: [
                  { icon: "💝", text: "小阿姨親自接待，用家人般的溫暖對待每位顧客" },
                  { icon: "💝", text: "記得顧客偏好，常客光臨店就如回家" },
                  { icon: "💝", text: "小朋友、長輩年齡均歡迎，每一位顧客都是家人" },
                  { icon: "💝", text: "定期推出限定優惠，回饋常客有驚喜" },
                ],
              },
            ].map((item, i) => {
              const isExpanded = expandedFeature === i;
              return (
              <div key={i} className={`group reveal ${item.delay}`}>
                <div
                  onClick={() => toggleFeature(i)}
                  className={`bg-gradient-to-br ${item.cardBg} rounded-3xl border
                    transition-all duration-500 ease-out
                    relative overflow-hidden cursor-pointer feature-spotlight select-none
                    ${
                      isExpanded
                        ? `${item.expandBorder} shadow-[0_24px_60px_rgba(74,46,26,0.22)] -translate-y-2 scale-[1.015]`
                        : `${item.cardBorder} hover:shadow-[0_32px_80px_rgba(74,46,26,0.18)] hover:-translate-y-5 hover:scale-[1.025]`
                    }`}
                >
                  {/* 懸停光斑游動層 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/30 rounded-full blur-3xl group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700" />
                    <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-2xl group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-700" />
                  </div>

                  {/* 裝飾角落 */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-white/60 rounded-bl-full transition-all duration-500 ${isExpanded ? 'w-40 h-40' : 'group-hover:w-40 group-hover:h-40'}`} />
                  <div className={`absolute bottom-0 left-0 w-20 h-20 bg-white/40 rounded-tr-full transition-all duration-500 ${isExpanded ? 'w-28 h-28' : 'group-hover:w-28 group-hover:h-28'}`} />

                  {/* 主要內容區 */}
                  <div className="relative p-8">
                    {/* 標籤 + 展開指示 */}
                    <div className="absolute top-5 right-5 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <div className={`w-6 h-6 rounded-full bg-white/80 flex items-center justify-center shadow-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="w-3.5 h-3.5 text-foreground/60" />
                      </div>
                    </div>

                    {/* 圖示 */}
                    <div
                      className={`feature-card-icon ${item.iconBg}
                        ring-2 ${item.iconRing}
                        mb-6
                        transition-all duration-400 ease-out
                        ${isExpanded ? 'scale-110 rotate-6 shadow-[0_0_20px_rgba(232,137,106,0.3)] ring-4' : 'group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-[0_0_24px_rgba(232,137,106,0.35)] group-hover:ring-4'}`}
                    >
                      {item.emoji}
                    </div>

                    {/* 標題 */}
                    <h3 className={`text-xl font-bold mb-3 font-display tracking-wide transition-colors duration-300 ${isExpanded ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>{item.title}</h3>

                    {/* 簡介文字 */}
                    <p className={`leading-relaxed text-sm mb-5 transition-colors duration-300 ${isExpanded ? 'text-foreground/75' : 'text-foreground/65 group-hover:text-foreground/80'}`}>{item.text}</p>

                    {/* 統計數字 */}
                    <div className="flex items-center gap-3 pt-4 border-t border-current/10">
                      <div className={`font-bold text-gradient-warm font-display transition-all duration-300 ${isExpanded ? 'text-3xl' : 'text-2xl group-hover:text-3xl'}`}>{item.stats.value}</div>
                      <div className={`text-xs font-medium transition-colors duration-300 ${isExpanded ? 'text-foreground/65' : 'text-foreground/50 group-hover:text-foreground/70'}`}>{item.stats.label}</div>
                      <div className="ml-auto text-xs text-foreground/40 font-medium">
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
                    <div className={`mx-5 mb-5 rounded-2xl border ${item.expandBorder} ${item.expandBg} backdrop-blur-sm p-5`}>
                      <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-3">我們的承諾</p>
                      <ul className="space-y-2.5">
                        {item.details.map((d, di) => (
                          <li key={di} className="flex items-start gap-2.5 text-sm text-foreground/75 leading-relaxed">
                            <span className="text-base flex-shrink-0 mt-0.5">{d.icon}</span>
                            <span>{d.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 展開時底部色條（常駐顯示） */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary/60 rounded-b-3xl transition-all duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-full'}`} />
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
      <section id="menu" className="py-16 md:py-28 bg-background relative overflow-hidden">
        {/* 頂部波浪 */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,0 L0,0 Z" fill="#FFF5EE" />
          </svg>
        </div>

        <div className="container relative z-10">
          <SectionHeader
            tag="人氣冰品"
            title="🍧 精選冰品"
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
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2 font-display leading-snug group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                  {/* 底部裝飾 */}
                  <div className="mt-4 pt-4 border-t border-[#EDD5C0]/50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#A87830]/70">
                      <span className="w-1 h-1 rounded-full bg-[#D4A855]/50" />
                      <span>手工製作</span>
                      <span className="w-1 h-1 rounded-full bg-[#D4A855]/50" />
                      <span>新鮮食材</span>
                    </div>
                    <button
                      onClick={() => setSelectedMenuItem(item)}
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold transition-colors duration-200 group/btn"
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
            title="🍕 手工披薩"
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
                  <h3 className="text-base font-bold text-foreground mb-2 font-display leading-snug group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-foreground/60 text-xs leading-relaxed">{item.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-accent/70">
                      <span>🔥</span>
                      <span>現烤現做</span>
                    </div>
                    <button
                      onClick={() => setSelectedMenuItem(item)}
                      className="text-xs px-3 py-1.5 rounded-full border border-accent/40 text-accent hover:bg-accent hover:text-white transition-all duration-300 font-medium"
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
      <section id="contact" className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/contact_section_bg-QFP7d7rxXTUbFLv3XWvdpn.webp"
            alt="聯絡背景"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
        </div>

        <div className="relative container z-10">
          <SectionHeader
            tag="聯絡資訊"
            title="歡迎蒞臨小阿姨"
            subtitle="位於彰化線西，期待與您分享每一份甜蜜時光"
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "店面地址",
                content: (
                  <>
                    <a
                      href="https://maps.app.goo.gl/5K6ehAGyrB6YaQxLA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold block mb-1"
                    >
                      彰化縣線西鄉復興路11-1號
                    </a>
                    <span className="text-xs text-foreground/45">Xianxi Township, Changhua County</span>
                  </>
                ),
                emoji: "📍",
                bg: "from-orange-50 to-amber-50",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "聯絡電話",
                content: (
                  <>
                    <a href="tel:+886475568406" className="text-primary hover:underline font-semibold block mb-1">
                      +886 4 755 6840
                    </a>
                    <span className="text-xs text-foreground/45">現在暫時關閉，敬請期待重新開幕</span>
                  </>
                ),
                emoji: "📞",
                bg: "from-blue-50 to-sky-50",
              },
              {
                icon: <Facebook className="w-6 h-6" />,
                title: "追蹤我們",
                content: (
                  <>
                    <a
                      href="https://www.facebook.com/profile.php?id=100084743760507&mibextid=ZbWKwL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold block mb-1"
                    >
                      Facebook 粉絲專頁
                    </a>
                    <span className="text-xs text-foreground/45">獲得最新消息和優惠資訊</span>
                  </>
                ),
                emoji: "💙",
                bg: "from-indigo-50 to-blue-50",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-7 border border-[#EDD5C0]/60 hover:border-[#D4A855]/40 hover:shadow-[0_16px_48px_rgba(74,46,26,0.12),0_0_0_1px_rgba(212,168,85,0.15)] hover:-translate-y-2 transition-all duration-400 text-center overflow-hidden"
              >
                {/* 頂部金色線 */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4A855]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* 背景漸層 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-60 rounded-2xl`} />
                {/* 角落裝飾 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D4A855]/10 to-transparent rounded-bl-full" />
                <div className="relative z-10">
                  {/* 金色圖示框 */}
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4A855]/25 flex items-center justify-center mx-auto mb-4 text-primary shadow-[0_4px_16px_rgba(212,168,85,0.15)] group-hover:shadow-[0_8px_24px_rgba(212,168,85,0.25)] group-hover:scale-110 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground font-display group-hover:text-primary transition-colors duration-300">{card.title}</h3>
                  <div className="text-sm text-foreground/70 leading-relaxed">{card.content}</div>
                  {/* 底部金色線 */}
                  <div className="mt-5 h-px bg-gradient-to-r from-transparent via-[#D4A855]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Google Maps 嵌入 */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/60">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.3!2d120.4!3d24.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346f3b3b3b3b3b3b%3A0x0!2z5bGx5YyX57aT5YWJ5YyW5YWJ5YyW!5e0!3m2!1szh-TW!2stw!4v1234567890"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="小阿姨雪花冰位置"
                className="w-full"
              />
              {/* 地圖遮罩按鈕 */}
              <a
                href="https://maps.app.goo.gl/5K6ehAGyrB6YaQxLA"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 btn-warm text-sm inline-flex items-center gap-2 px-4 py-2"
              >
                <MapPin className="w-4 h-4" />
                在 Google Maps 開啟
              </a>
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
      <section className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] via-background to-[#FFF5EE]" />
        {/* 裝飾星星 */}
        {["top-8 left-12", "top-16 right-20", "bottom-12 left-24", "bottom-8 right-16"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} text-2xl opacity-15 animate-sparkle`} style={{ animationDelay: `${i * 0.7}s` }}>⭐</div>
        ))}

        <div className="container relative z-10">
          <SectionHeader
            tag="顧客回饋"
            title="⭐ 真實顧客評價"
            subtitle="每一個評價都是我們持續進步的動力，感謝所有顧客的信任與支持"
          />

          <ReviewCarousel reviews={reviews} itemsPerView={3} autoPlayInterval={5000} />

          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-warm shadow-sm">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              <span className="text-foreground/70 text-sm font-medium">4.9 星評分 · 55則 Google 評價</span>
            </div>
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
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(232,137,106,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,165,116,0.08) 0%, transparent 50%)" }} />

        <div className="container relative z-10">
          <SectionHeader
            tag="社群媒體"
            title="📸 Instagram 精選"
            subtitle="追蹤 @auntie_dreamhouse，看更多美食分享和幸福時刻"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10">
            {[
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/OfJxJFhbgWYQVFvW.png", alt: "新鮮芒果布丁雪花冰", caption: "新鮮芒果布丁雪花冰 🥭 綿密入口即化，夏日必點！", likes: 128, comments: 24 },
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/fUOVTtiUSdlcgtUW.png", alt: "新鮮草莓奶酪雪花冰", caption: "新鮮草莓奶酪雪花冰 🍓 酸酸甜甜，療癒滋味", likes: 156, comments: 32 },
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YZiSIUzAAlNKHzgC.png", alt: "Oreo巧克力布丁雪花冰", caption: "Oreo 巧克力布丁雪花冰 🍫 巧克力愛好者必點！", likes: 189, comments: 41 },
              { src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/nVKrAcBpRhrFllUC.png", alt: "紅豆牛奶雪花冰", caption: "紅豆牛奶雪花冰 🍶 懷舊風味，溫暖陪伴", likes: 142, comments: 28 },
            ].map((post, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-warm bg-white card-warm-shadow hover:card-warm-shadow transition-all duration-400 hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={post.src}
                    alt={post.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                  />
                </div>
                {/* 懸停遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-xs leading-relaxed line-clamp-2">{post.caption}</p>
                  <div className="flex items-center gap-3 mt-2 text-white/80 text-xs">
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/auntie_dreamhouse"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-warm inline-flex items-center gap-2 text-base"
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
                    <p className="text-xs text-[#D4A855]/70 font-accent tracking-widest">Auntie Dreamice</p>
                  </div>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5">
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
                      <a href={link.href} className="text-white/50 hover:text-[#D4A855] text-sm transition-all duration-200 flex items-center gap-2.5 group">
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
                <ul className="space-y-3.5 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span>彰化縣線西鄉復興路11-1號</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary/70 flex-shrink-0" />
                    <span>週二至週日 12:00–21:00</span>
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
                  <p className="text-white/35 text-xs tracking-widest uppercase">Since 2020 · Xianxi, Changhua</p>
                  <div className="h-px w-8 bg-gradient-to-l from-[#D4A855]/60 to-transparent" />
                </div>
                <p className="text-white/30 text-xs">© 2026 小阿姨雪花冰 · Auntie Dreamice. All rights reserved.</p>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/profile.php?id=100084743760507" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-[#D4A855] hover:border-[#D4A855]/40 transition-all duration-200">
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://www.instagram.com/auntie_dreamhouse" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-[#D4A855] hover:border-[#D4A855]/40 transition-all duration-200">
                    <Instagram className="w-3.5 h-3.5" />
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
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-in"
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
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white hover:scale-110 transition-all duration-200"
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

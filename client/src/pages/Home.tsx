import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Facebook, Heart, MessageCircle, Instagram, Star, ChevronUp, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";
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

// 波浪分隔線元件
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

  const pizzaItems = [
    {
      id: 1,
      name: "海鮮總匯披薩",
      description: "新鮮蝦仁、透抽搭配濃郁起司，海味十足的經典組合",
      image: "/manus-storage/seafood_combo_pizza_v2_09ef9a1f.jpg",
      tag: "人氣首選",
    },
    {
      id: 2,
      name: "費城牛肉披薩",
      description: "嫩牛肉搭配起司和洋蔥、青椒、洋菇，咬下去香氣四溢的美味",
      image: "/manus-storage/philadelphia_beef_pizza_new_3599861b.jpg",
      tag: "招牌必點",
    },
    {
      id: 3,
      name: "瑪格麗特披薩",
      description: "經典義式披薩，番茄、起司、羅勒的完美組合",
      image: "/manus-storage/magic_edit#TUFHeVVqSnZoWTgjMSMzY2UyMGE0MDFlODFmYjBkN2Y5NDcwZmE1ZjcxMzkwMiM4MDAjI1RSQU5TRk9STUFUSU9OX1JFUVVFU1Q_b19014c5.jpg",
      tag: "經典口味",
    },
    {
      id: 4,
      name: "蜂蜜麻吉披薩",
      description: "甜蜜蜂蜜搭配Q彈麻吉，甜鹹交織的獨特風味",
      image: "/manus-storage/honey_mochi_pizza_new_5981896f.jpg",
      tag: "創意特色",
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
    },
    {
      id: 2,
      name: "新鮮草莓奶酪雪花冰",
      description: "新鮮草莓搭配濃郁奶酪，酸酸甜甜的滋味在舌尖綻放",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/fUOVTtiUSdlcgtUW.png",
      badge: "期間限定",
      color: "from-rose-50 to-pink-50",
    },
    {
      id: 3,
      name: "Oreo巧克力布丁雪花冰",
      description: "經典Oreo餅乾搭配濃郁巧克力布丁，巧克力愛好者的必點",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YZiSIUzAAlNKHzgC.png",
      color: "from-stone-50 to-neutral-50",
    },
    {
      id: 4,
      name: "紅豆牛奶雪花冰",
      description: "傳統紅豆搭配香濃牛奶，懷舊風味中帶著溫暖",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/nVKrAcBpRhrFllUC.png",
      color: "from-red-50 to-rose-50",
    },
    {
      id: 5,
      name: "抹茶紅豆布丁&奶酪雪花冰",
      description: "清香抹茶搭配紅豆、布丁和奶酪，層次豐富的完美組合",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YwSIinLCkdiSlPIs.png",
      color: "from-green-50 to-emerald-50",
    },
    {
      id: 6,
      name: "滑嫩仙草凍",
      description: "Q彈的仙草凍搭配冰涼的糖水，清涼解渴的夏日聖品",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/grass_jelly_ice-D9Bs4uWMJEtGPHKedh6wfn.webp",
      color: "from-slate-50 to-gray-50",
    },
  ];

  return (
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
      <header className="sticky top-0 z-50 glass-warm border-b border-warm shadow-sm">
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
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "#about", label: "關於我們" },
              { href: "#brand", label: "品牌故事" },
              { href: "#menu", label: "人氣美食" },
              { href: "#contact", label: "聯絡我們" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/8 rounded-lg transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
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
                className="btn-warm inline-flex items-center gap-2 text-base"
                onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              >
                探索菜單
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="px-6 py-3 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-semibold rounded-full border border-white/30 transition-all duration-300 text-base"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                了解我們
              </button>
            </div>

            {/* 評分展示 */}
            <div className="mt-10 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              <span className="text-white/85 text-sm font-medium">4.9 星 · 55則 Google 評價</span>
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
      <section id="about" className="py-16 md:py-28 relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EE] via-background to-[#FFF0E8]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <SectionHeader
            tag="我們的故事"
            title="關於小阿姨雪花冰"
            subtitle="一間充滿溫度的冰品甜點專賣店，用最用心的製作，為您帶來每一份幸福滋味"
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🌱",
                title: "我們的起源",
                text: "小阿姨雪花冰誕生於一個簡單卻深刻的夢想——讓每一位顧客都能在享受美食的同時，感受到來自心底的溫暖與關懷。我們相信，好的冰品不僅是食物，更是一份情感的傳遞。",
                gradient: "from-green-50 to-emerald-50",
                border: "border-green-100",
              },
              {
                icon: "💡",
                title: "品牌理念",
                text: "在彰化線西這片溫暖的土地上，我們堅持用最新鮮的食材、最細膩的製冰技術和最真摯的服務態度，為每一位顧客創造獨特的美食體驗。每一份冰品都是我們對品質的承諾。",
                gradient: "from-amber-50 to-yellow-50",
                border: "border-amber-100",
              },
              {
                icon: "🤝",
                title: "我們的承諾",
                items: ["每日精選新鮮食材", "專業製冰技術", "用心服務每一位顧客", "持續創新限定菜單"],
                gradient: "from-rose-50 to-pink-50",
                border: "border-rose-100",
              },
            ].map((card, i) => (
              <div key={i} className="group">
                <div
                  className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-8 border ${card.border} hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 h-full relative overflow-hidden`}
                >
                  {/* 裝飾角落 */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/40 rounded-bl-3xl" />
                  <div className="w-14 h-14 bg-white/70 rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 font-display">{card.title}</h3>
                  {card.text ? (
                    <p className="text-foreground/70 leading-relaxed text-sm">{card.text}</p>
                  ) : (
                    <ul className="space-y-3">
                      {card.items?.map((item, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-foreground/70">
                          <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
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
      <section id="brand" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5EE] via-[#FDF6F0] to-[#FFF5EE]" />
        {/* 裝飾引號 */}
        <div className="absolute top-8 left-8 text-[120px] text-primary/8 font-display leading-none select-none">"</div>
        <div className="absolute bottom-8 right-8 text-[120px] text-primary/8 font-display leading-none select-none rotate-180">"</div>

        <div className="container relative z-10">
          <SectionHeader tag="品牌故事" title="小阿姨的夢想冰店" />

          <div className="max-w-4xl mx-auto">
            {/* 主要引言 */}
            <div className="relative mb-10 p-8 md:p-10 bg-white/60 backdrop-blur-sm rounded-3xl border border-primary/15 shadow-lg">
              <div className="absolute -top-4 left-8 text-5xl text-primary/40 font-display">"</div>
              <p className="text-xl md:text-2xl text-primary font-semibold font-display leading-relaxed text-center italic">
                還記得小時候炎炎夏日吃到一口冰就覺得開心的幸福感嗎？
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-5 text-foreground/75 leading-relaxed">
                <p>
                  小阿姨雪花冰就是在這樣溫暖的回憶中誕生的。這裡是我的夢想冰店，一個充滿溫度和故事的地方。我們相信，每一份甜點都應該帶著用心和溫暖，讓顧客在享受美食的同時，也能感受到那份來自心底的關懷。
                </p>
                <p>
                  每一份冰品都精心製作，我們堅持使用最新鮮的水果、最細膩的雪花冰和最優質的配料，為您呈現最美好的午後時光。
                </p>
              </div>
              <div className="space-y-5 text-foreground/75 leading-relaxed">
                <p>
                  無論是經典的芒果布丁、新鮮的草莓奶酪，還是特色的蜂蜜麻吉披薩，每一款都是我們對美食的執著和對顧客的尊重。
                </p>
                <p>
                  在彰化線西，我們用最溫暖的服務和最用心的製作，為每一位顧客創造獨特的美食體驗。每一次的相遇，都是一份幸福的開始。
                </p>
              </div>
            </div>

            {/* 核心標語 */}
            <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8896A] via-[#D4A574] to-[#E8896A] animate-gradient-shift" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl font-bold text-white font-display leading-relaxed">
                  小阿姨陪你們找回小時候的幸福時刻
                </p>
                <div className="flex justify-center mt-4 gap-2">
                  {["💝", "🍧", "✨", "🌸", "💝"].map((e, i) => (
                    <span key={i} className="text-xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
                  ))}
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
      <section className="py-12 md:py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(232,137,106,0.06) 0%, transparent 70%)" }} />
        <div className="container relative z-10">
          <SectionHeader
            tag="我們的特色"
            title="為什麼選擇小阿姨"
            subtitle="我們的承諾與堅持"
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                emoji: "🥭",
                title: "嚴選新鮮食材",
                text: "每日精選新鮮水果，嚴格把關食材品質。我們相信，好的冰品從好的食材開始，絕不妥協。",
                highlight: "每日新鮮",
              },
              {
                emoji: "❄️",
                title: "細膩雪花冰技術",
                text: "採用專業製冰技術，呈現入口即化的絕妙口感。每一口都是綿密的幸福，讓您感受真正的冰品藝術。",
                highlight: "入口即化",
              },
              {
                emoji: "💝",
                title: "溫暖用心服務",
                text: "我們把每位顧客都當作家人，用溫暖的笑容和細心的服務，為您創造最舒適的用餐體驗。",
                highlight: "如家溫暖",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-8 border border-warm hover:border-primary/40 card-warm-shadow hover:card-warm-shadow transition-all duration-400 hover:-translate-y-2 overflow-hidden"
              >
                {/* 裝飾背景 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
                {/* 高亮標籤 */}
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary">
                  {item.highlight}
                </div>
                <div className="text-5xl mb-5 group-hover:animate-bounce transition-all duration-300">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground font-display">{item.title}</h3>
                <p className="text-foreground/65 leading-relaxed text-sm">{item.text}</p>
                {/* 底部裝飾線 */}
                <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500" />
              </div>
            ))}
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
                className="group relative overflow-hidden rounded-2xl border border-warm bg-white card-warm-shadow hover:card-warm-shadow transition-all duration-400 hover:-translate-y-3"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* 圖片區 */}
                <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${item.color}`}>
                  {item.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-[#C0623A] to-[#E8896A] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <span className="animate-pulse">⭐</span>
                        {item.badge}
                      </div>
                    </div>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                    style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
                  />
                  {/* 圖片底部漸層 */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* 內容區 */}
                <div className="p-5 md:p-6">
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-2 font-display leading-snug group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
                  {/* 底部裝飾 */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-primary/60">
                    <span className="w-1 h-1 rounded-full bg-primary/40" />
                    <span>手工製作 · 新鮮食材</span>
                  </div>
                </div>

                {/* 懸停光效 */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
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
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-accent/70">
                    <span>🔥</span>
                    <span>現烤現做</span>
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
                className={`group bg-gradient-to-br ${card.bg} rounded-2xl p-7 border border-warm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 text-center`}
              >
                <div className="text-3xl mb-4 group-hover:animate-bounce">{card.emoji}</div>
                <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center mx-auto mb-4 text-primary shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground font-display">{card.title}</h3>
                <div className="text-sm text-foreground/70 leading-relaxed">{card.content}</div>
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
      <footer className="relative overflow-hidden">
        {/* 頂部波浪 */}
        <div className="relative">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 block">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z" fill="#4A2E1A" />
          </svg>
        </div>

        <div className="bg-[#4A2E1A] text-white">
          <div className="container py-12 md:py-16">
            <div className="grid md:grid-cols-3 gap-10 mb-10">
              {/* 品牌 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-xl">🍧</div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white">小阿姨雪花冰</h3>
                    <p className="text-xs text-white/50 font-accent">Auntie Dreamice</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  一口綿密，一點療癒，午後的甜品時光。彰化線西最溫暖的冰品甜點專賣店。
                </p>
              </div>

              {/* 快速連結 */}
              <div>
                <h4 className="font-bold mb-4 text-white/90 font-display">快速連結</h4>
                <ul className="space-y-2">
                  {[
                    { href: "#about", label: "關於我們" },
                    { href: "#brand", label: "品牌故事" },
                    { href: "#menu", label: "人氣美食介紹" },
                    { href: "#contact", label: "聯絡我們" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-white/55 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary/60" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 聯絡資訊 */}
              <div>
                <h4 className="font-bold mb-4 text-white/90 font-display">聯絡資訊</h4>
                <ul className="space-y-3 text-sm text-white/55">
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
            <div className="border-t border-white/10 pt-8 text-center">
              <div className="flex justify-center gap-2 mb-3">
                {["🍧", "❄️", "💝", "🌸", "✨"].map((e, i) => (
                  <span key={i} className="text-lg opacity-40 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>{e}</span>
                ))}
              </div>
              <p className="text-white/40 text-xs">© 2026 小阿姨雪花冰 · Auntie Dreamice. All rights reserved.</p>
              <p className="text-white/30 text-xs mt-1">用心製作每一份幸福 · 彰化線西</p>
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
  );
}

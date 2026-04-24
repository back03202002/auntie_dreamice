import { MapPin, Phone, Facebook, Heart, MessageCircle, Instagram } from "lucide-react";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { reviews } from "@/lib/reviews";
import { Card } from "@/components/ui/card";

/**
 * Home Page - 小阿姨雪花冰官方網站
 * 溫暖懷舊風格設計
 * 色彩系統：奶油色背景 + 蜜桃色強調 + 深棕色文字
 * 字體系統：Playfair Display (標題) + Noto Sans TC (正文)
 */

export default function Home() {
  const pizzaItems = [
    {
      id: 1,
      name: "海鮮總匯披薩",

      description: "新鮮蝦仁、透抽搭配濃郁起司，海味十足的經典組合",
      image: "/manus-storage/seafood_combo_pizza_v2_09ef9a1f.jpg",
    },
    {
      id: 2,
      name: "費城牛肉披薩",

      description: "嫩牛肉搭配起司和洋蔥、青椒、洋菇，咬下去香氣四溢的美味",
      image: "/manus-storage/philadelphia_beef_pizza_new_3599861b.jpg",
    },
    {
      id: 3,
      name: "瑪格麗特披薩",

      description: "經典義式披薩，番茄、起司、羅勒的完美組合",
      image: "/manus-storage/magic_edit#TUFHeVVqSnZoWTgjMSMzY2UyMGE0MDFlODFmYjBkN2Y5NDcwZmE1ZjcxMzkwMiM4MDAjI1RSQU5TRk9STUFUSU9OX1JFUVVFU1Q_b19014c5.jpg",
    },
    {
      id: 4,
      name: "蜂蜜麻吉披薩",

      description: "甜蜜蜂蜜搭配Q彈麻吉，甜鹹交織的獨特風味",
      image: "/manus-storage/honey_mochi_pizza_new_5981896f.jpg",
    },
  ];

  const menuItems = [
    {
      id: 1,
      name: "新鮮芒果布丁雪花冰",

      description: "綿密的雪花冰搭配新鮮芒果和滑順布丁，一口咬下去就是夏日的幸福",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/OfJxJFhbgWYQVFvW.png",
      badge: "期間限定",
    },
    {
      id: 2,
      name: "新鮮草莓奶酪雪花冰",

      description: "新鮮草莓搭配濃郁奶酪，酸酸甜甜的滋味在舌尖綻放",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/fUOVTtiUSdlcgtUW.png",
      badge: "期間限定",
    },
    {
      id: 3,
      name: "Oreo巧克力布丁雪花冰",

      description: "經典Oreo餅乾搭配濃郁巧克力布丁，巧克力愛好者的必點",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YZiSIUzAAlNKHzgC.png",
    },
    {
      id: 4,
      name: "紅豆牛奶雪花冰",

      description: "傳統紅豆搭配香濃牛奶，懷舊風味中帶著溫暖",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/nVKrAcBpRhrFllUC.png",
    },
    {
      id: 5,
      name: "抹茶紅豆布丁&奶酪雪花冰",

      description: "清香抹茶搭配紅豆、布丁和奶酪，層次豐富的完美組合",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YwSIinLCkdiSlPIs.png",
    },
    {
      id: 6,
      name: "滑嫩仙草凍",

      description: "Q彈的仙草凍搭配冰涼的糖水，清涼解渴的夏日聖品",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/grass_jelly_ice-D9Bs4uWMJEtGPHKedh6wfn.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Business Hours Announcement */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground py-5 md:py-6 px-4 text-center shadow-lg border-b-4 border-primary-foreground/20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex-1">
              <p className="text-xs md:text-sm text-primary-foreground/80 mb-2 font-medium">營業時間</p>
              <p className="text-lg md:text-2xl font-bold tracking-wide">
                ⏰ 週二至週日 12:00-21:00
              </p>
            </div>
            <div className="hidden md:block w-1 h-10 bg-primary-foreground/40 rounded-full"></div>
            <div className="flex-1">
              <p className="text-xs md:text-sm text-primary-foreground/80 mb-2 font-medium">公休日</p>
              <p className="text-lg md:text-2xl font-bold tracking-wide">
                📅 週一
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍧</span>
            <h1 className="text-xl font-bold text-primary">小阿姨雪花冰</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition">關於我們</a>
            <a href="#brand" className="text-foreground hover:text-primary transition">品牌故事</a>
            <a href="#menu" className="text-foreground hover:text-primary transition">人氣美食介紹</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">聯絡我們</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/hero_banner_ghibli-PypU9pjWRBkpJyDoWh4FFY.webp"
            alt="小阿姨雪花冰店面"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        
        <div className="relative container py-20 md:py-32 flex items-center min-h-[650px] md:min-h-[750px]">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              小阿姨雪花冰
            </h1>
            <p className="text-xl text-white/90 mb-4 leading-relaxed">
              一口綿密，一點療癒，午後的甜品時光
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              彰化線西最溫暖的冰品甜點專賣店，用最新鮮的食材和用心的製作，為您帶來每一份幸福滋味
            </p>
            <button
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            >
              探索菜單
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-28 bg-gradient-to-br from-primary/15 via-background to-secondary/8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-primary font-semibold text-sm tracking-widest">我們的故事</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">關於小阿姨雪花冰</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">一間充滿溫度的冰品甜點專賣店，用最用心的製作，為您帶來每一份幸福滋味</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">我們的起源</h3>
                <p className="text-foreground/80 leading-relaxed">
                  小阿姨雪花冰誕生於一個簡單卻深刻的夢想——讓每一位顧客都能在享受美食的同時，感受到來自心底的溫暖與關懷。我們相信，好的冰品不僅是食物，更是一份情感的傳遞。
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">品牌理念</h3>
                <p className="text-foreground/80 leading-relaxed">
                  在彰化線西這片溫暖的土地上，我們堅持用最新鮮的食材、最細膩的製冰技術和最真摯的服務態度，為每一位顧客創造獨特的美食體驗。每一份冰品都是我們對品質的承諾。
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">我們的承諾</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                    <span className="text-sm">每日精選新鮮食材</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                    <span className="text-sm">專業製冰技術</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                    <span className="text-sm">用心服務每一位顧客</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                    <span className="text-sm">持續創新限定菜單</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="brand" className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary leading-tight">品牌故事</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 mx-auto"></div>
            </div>
            
            <div className="space-y-8 text-lg text-foreground/85 leading-relaxed">
              <p className="text-xl text-primary/90 font-semibold italic">
                「還記得小時候炎炎夏日吃到一口冰就覺得開心的幸福感嗎？」
              </p>
              <p>
                小阿姨雪花冰就是在這樣溫暖的回憶中誕生的。這裡是我的夢想冰店，一個充滿溫度和故事的地方。我們相信，每一份甜點都應該帶著用心和溫暖，讓顧客在享受美食的同時，也能感受到那份來自心底的關懷。
              </p>
              <p>
                每一份冰品都精心製作，我們堅持使用最新鮮的水果、最細膩的雪花冰和最優質的配料，為您呈現最美好的午後時光。無論是經典的芒果布丁、新鮮的草莓奶酪，還是特色的蜂蜜麻吉披薩，每一款都是我們對美食的執著和對顧客的尊重。
              </p>
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 my-8">
                <p className="text-2xl md:text-3xl font-bold text-primary text-center leading-relaxed">
                  小阿姨陪你們找回小時候的幸福時刻 💝
                </p>
              </div>
              
              <p className="text-foreground/80">
                在彰化線西，我們用最溫暖的服務和最用心的製作，為每一位顧客創造獨特的美食體驗。每一次的相遇，都是一份幸福的開始。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-primary">為什麼選擇小阿姨雪花冰</h2>
            <p className="text-lg text-foreground/70">我們的承諾與特色</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">🥭</div>
              <h3 className="text-xl font-bold mb-3 text-foreground">新鮮食材</h3>
              <p className="text-foreground/70 leading-relaxed">
                每日精選新鮮水果，嚴格把關食材品質。我們相信，好的冰品從好的食材開始，絕不妥協。
              </p>
            </Card>

            <Card className="p-8 bg-white border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">❄️</div>
              <h3 className="text-xl font-bold mb-3 text-foreground">細膩雪花冰</h3>
              <p className="text-foreground/70 leading-relaxed">
                採用專業製冰技術，呈現入口即化的絕妙口感。每一口都是綿密的幸福，讓您感受真正的冰品藝術。
              </p>
            </Card>

            <Card className="p-8 bg-white border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-bold mb-3 text-foreground">用心服務</h3>
              <p className="text-foreground/70 leading-relaxed">
                我們把每位顧客都當作家人，用溫暖的笑容和細心的服務，為您創造最舒適的用餐體驗。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Introduction Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">品牌介紹影片</h2>
            <p className="text-lg text-foreground/70">觀看小阿姨雪花冰的精彩介紹，了解我們的故事</p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/2vy-hNKVnJs?start=877&end=1010"
                title="小阿姨雪花冰品牌介紹"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🍧 冰品</h2>
            <p className="text-lg text-foreground/70">精選冰品，每一口都是幸福的滋味</p>
            <p className="text-foreground/60 mt-3">
              我們的冰品菜單精心設計，每一款都經過反覆調整，只為呈現最完美的風味組合。從經典必點到創意新作，都能找到您心頭好。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white border border-border hover:border-primary/50 hover:-translate-y-2 group"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {item.badge && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                      <span className="inline-block animate-pulse mr-1">⭐</span>
                      {item.badge}
                    </div>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-foreground leading-snug flex-1">{item.name}</h3>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Food Section - Pizza */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">🍕 熱食區</h2>
            <p className="text-lg text-foreground/70">6吋手工披薩，現做現烤的美味</p>
            <p className="text-foreground/60 mt-3">
              除了冰品，小阿姨也提供精心製作的手工披薩。使用新鮮食材和傳統烘烤技術，每一片披薩都是用心的傑作。無論是海鮮、肉類還是素食，都能滿足您的味蕾。
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pizzaItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white border border-border hover:border-primary/50 hover:-translate-y-2 group"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-foreground leading-snug flex-1">{item.name}</h3>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/contact_section_bg-QFP7d7rxXTUbFLv3XWvdpn.webp"
            alt="聯絡背景"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-white/80"></div>

        <div className="relative container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">聯絡我們</h2>
            <p className="text-lg text-foreground/70">歡迎蒞臨小阿姨雪花冰</p>
            <p className="text-foreground/60 mt-3">
              位於彰化線西的小阿姨雪花冰，期待與您分享每一份甜蜜時光。無論是外帶享受或在店內品嚐，我們都準備好用最溫暖的服務迎接您。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Location */}
            <Card className="text-center p-8 bg-white border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">地址</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                <a href="https://maps.app.goo.gl/5K6ehAGyrB6YaQxLA" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition">彰化縣線西鄉復興路11-1號</a><br />
                <span className="text-xs text-foreground/50 mt-2 block">No. 11-1, Fuxing Rd, Xianxi Township, Changhua County 507, Taiwan</span>
              </p>
            </Card>

            {/* Phone */}
            <Card className="text-center p-8 bg-white border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">電話</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                <a href="tel:+886475568406" className="hover:text-primary transition font-semibold">
                  +886 4 755 6840
                </a>
              </p>
              <p className="text-xs text-foreground/50 mt-3">
                現在暫時關閉<br />敬請期待重新開幕
              </p>
            </Card>

            {/* Social */}
            <Card className="text-center p-8 bg-white border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Facebook className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">追蹤我們</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                <a href="https://www.facebook.com/profile.php?id=100084743760507&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition font-semibold">
                  Facebook
                </a>
              </p>
              <p className="text-xs text-foreground/50 mt-3">
                獲得最新消息<br />和優惠資訊
              </p>
            </Card>
          </div>
        </div>
      </section>


      {/* Customer Reviews Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">⭐ 顧客評價</h2>
            <p className="text-lg text-foreground/70">來自真實顧客的溫暖回饋</p>
            <p className="text-foreground/60 mt-3">
              每一個評價都是我們持續進步的動力。感謝所有顧客的信任與支持，讓小阿姨雪花冰能夠不斷提升服務品質。
            </p>
          </div>

          <ReviewCarousel reviews={reviews} itemsPerView={3} autoPlayInterval={5000} />
          <div className="text-center mt-12">
            <p className="text-foreground/70 text-sm">
              ⭐ 4.9 星評分 (55則評價) · 在 Google 地圖上查看更多評價
            </p>
          </div>
        </div>
      </section>
      {/* Instagram Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">📸 Instagram 最新貼文</h2>
            <p className="text-lg text-foreground/70">追蹤我們的社群，看更多美食分享</p>
            <p className="text-foreground/60 mt-3">
              在 Instagram 上，我們分享每一份用心製作的冰品和披薩，以及顧客的幸福時刻。追蹤 @auntie_dreamhouse，成為小阿姨大家庭的一份子！
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* Instagram Post 1 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/OfJxJFhbgWYQVFvW.png"
                  alt="新鮮芒果布丁雪花冰"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 text-foreground/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>128</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>24</span>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">新鮮芒果布丁雪花冰 🥭 綿密入口即化，夏日必點！</p>
              </div>
            </div>
            {/* Instagram Post 2 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/fUOVTtiUSdlcgtUW.png"
                  alt="新鮮草莓奶酪雪花冰"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 text-foreground/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>156</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>32</span>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">新鮮草莓奶酪雪花冰 🍓 酸酸甜甜，療癒滋味</p>
              </div>
            </div>
            {/* Instagram Post 3 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/YZiSIUzAAlNKHzgC.png"
                  alt="Oreo巧克力布丁雪花冰"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 text-foreground/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>189</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>41</span>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">Oreo 巧克力布丁雪花冰 🍫 巧克力愛好者必點！</p>
              </div>
            </div>
            {/* Instagram Post 4 */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-square bg-muted overflow-hidden">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/nVKrAcBpRhrFllUC.png"
                  alt="紅豆牛奶雪花冰"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 text-foreground/60 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>142</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>28</span>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">紅豆牛奶雪花冰 🍶 懷舊風味，溫暖陪伴</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a
              href="https://www.instagram.com/auntie_dreamhouse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <Instagram className="w-5 h-5" />
              追蹤我們的 Instagram
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container text-center">
          <p className="mb-2">小阿姨雪花冰 🍧 Auntie Dreamice</p>
          <p className="text-sm opacity-90">一口綿密，一點療癒，午後的甜品時光</p>
          <p className="text-xs opacity-75 mt-4">© 2026 小阿姨雪花冰. All rights reserved.</p>
          <p className="text-xs opacity-70 mt-2">位於彰化線西，用心製作每一份幸福</p>
        </div>
      </footer>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { MapPin, Phone, Facebook, Heart, MessageCircle, Instagram } from "lucide-react";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { reviews } from "@/lib/reviews";

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
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/xxgtCHvQRoHPBWcA.jpg",
    },
    {
      id: 2,
      name: "費城牛肉披薩",

      description: "嫩牛肉搭配起司和洋蔥、青椒、洋菇，咬下去香氣四溢的美味",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/CjkOQbxxCttfQKQW.jpg",
    },
    {
      id: 3,
      name: "瑪格麗特披薩",

      description: "經典義式披薩，番茄、起司、羅勒的完美組合",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/NjljuSyLjTqZcRVU.jpg",
    },
    {
      id: 4,
      name: "蜂蜜麻吉披薩",

      description: "甜蜜蜂蜜搭配Q彈麻吉，甜鹹交織的獨特風味",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/kWbcmPtlrCpXrpwo.jpg",
    },
  ];

  const menuItems = [
    {
      id: 1,
      name: "新鮮芒果布丁雪花冰",

      description: "綿密的雪花冰搭配新鮮芒果和滑順布丁，一口咬下去就是夏日的幸福",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/OfJxJFhbgWYQVFvW.png",
      badge: "人氣必點",
    },
    {
      id: 2,
      name: "新鮮草莓奶酪雪花冰",

      description: "新鮮草莓搭配濃郁奶酪，酸酸甜甜的滋味在舌尖綻放",
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663593204561/fUOVTtiUSdlcgtUW.png",
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
      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground py-3 px-4 text-center shadow-md">
        <div className="container">
          <p className="text-sm md:text-base font-semibold">
            ⏰ 營業時間：週二至週日 12:00-21:00，週一公休
          </p>
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
            <a href="#brand" className="text-foreground hover:text-primary transition">品牌故事</a>
            <a href="#menu" className="text-foreground hover:text-primary transition">菜單</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">聯絡我們</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/manus-storage/auntie_dreamice_storefront_4b35957b.webp"
            alt="小阿姨雪花冰店面"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        
        <div className="relative container py-20 md:py-32 flex items-center min-h-[500px]">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              小阿姨雪花冰
            </h1>
            <p className="text-xl text-white/90 mb-4 leading-relaxed">
              一口綿密，一點療癒，午後的甜品時光
            </p>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              位於彰化線西，我們用最新鮮的水果和最細膩的雪花冰，為您打造每一份獨特的冰品體驗。無論是經典的芒果雪花冰，還是創意十足的手工披薩，每一口都是對品質的承諾。
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

      {/* Brand Story Section */}
      <section id="brand" className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary">品牌故事</h2>
              <div className="space-y-4 text-lg text-foreground leading-relaxed">
                <p>
                  還記得小時候炎炎夏日吃到一口冰就覺得開心的幸福感嗎？
                </p>
                <p>
                  這裡是我的夢想冰店，一個充滿溫度和故事的地方。
                </p>
                <p>
                  每一份冰品都精心製作，用最新鮮的水果和最細膩的雪花冰，為您呈現最美好的午後時光。
                </p>
                <p className="text-primary font-semibold text-xl pt-4">
                  小阿姨陪你們找回小時候的幸福時刻 💝
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Video Introduction Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">品牌介紹影片</h2>
            <p className="text-lg text-foreground/70">觀看小阿姨雪花冰的精彩介紹</p>
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
            <h2 className="text-4xl font-bold mb-4">🍧 冰品菜單</h2>
            <p className="text-lg text-foreground/70">精選冰品，每一口都是幸福的滋味</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-border hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {item.badge && (
                    <div className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
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

      {/* Ice Brick Flavors Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">冰磚口味介紹</h2>
            <p className="text-lg text-foreground/70">豐富多彩的冰磚選擇，讓您享受無限的冰品樂趣</p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/manus-storage/ice_brick_flavors_2248ae0e.webp"
                alt="冰磚口味介紹"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-border">
              <h3 className="text-2xl font-bold text-primary mb-4">單色冰磚</h3>
              <p className="text-foreground/80 leading-relaxed">
                我們精心選擇多種經典口味，從清爽的牛奶、花生，到濃郁的巧克力、抹茶，每一種都能帶給您獨特的冰品體驗。無論您是喜歡傳統風味還是創新口味，我們都有適合您的選擇。
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-border">
              <h3 className="text-2xl font-bold text-primary mb-4">雙色冰磚</h3>
              <p className="text-foreground/80 leading-relaxed">
                結合兩種不同的口味，創造出層次豐富的冰品體驗。巧克力與花生的完美搭配，抹茶與草莓的優雅組合，讓您一次享受雙倍的美味。我們的雙色冰磚是為了讓您發現新的風味組合。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Food Section - Pizza */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-primary">🍕 熱食區</h2>
            <p className="text-lg text-foreground/70">6吋手工披薩，現做現烤的美味</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pizzaItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-border hover:border-primary/30 hover:-translate-y-1"
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
        </div>
      </footer>
    </div>
  );
}

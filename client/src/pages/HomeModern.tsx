import { Button } from "@/components/ui/button";
import { MapPin, Phone, Facebook, Clock } from "lucide-react";

/**
 * Modern Minimalist Design Style
 * - Clean white/light background
 * - Deep navy blue (#1a2d4d) primary color
 * - Soft coral (#f4a582) and mint green (#a8d5ba) accents
 * - Minimalist geometric elements
 * - Professional sans-serif typography
 * - Ample white space
 */

export default function HomeModern() {
  const iceCreams = [
    {
      name: "新鮮芒果布丁雪花冰",
      description: "綿密的雪花冰搭配新鮮芒果和滑順布丁，一口咬下去就是夏日的幸福",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/mango_ice_extended-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "新鮮草莓奶酪雪花冰",
      description: "新鮮草莓搭配濃郁奶酪，酸酸甜甜的滋味在舌尖綻放",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/strawberry_ice_extended-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "Oreo巧克力布丁雪花冰",
      description: "經典Oreo餅乾搭配濃郁巧克力布丁，巧克力愛好者的必點",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/oreo_ice_extended-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "紅豆牛奶雪花冰",
      description: "傳統紅豆搭配香濃牛奶，懷舊風味中帶著溫暖",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/red_bean_ice_extended-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "抹茶紅豆布丁&奶酪雪花冰",
      description: "清香抹茶搭配紅豆、布丁和奶酪，層次豐富的完美組合",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/matcha_ice_extended-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "滑嫩仙草凍",
      description: "Q彈的仙草凍搭配冰涼的糖水，清涼解渴的夏日聖品",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/grass_jelly_ice-2977QsiMsN7SDPaTo8WGMP.webp",
    },
  ];

  const pizzas = [
    {
      name: "海鮮總匯披薩",
      description: "新鮮蝦仁、透抽搭配濃郁起司，海味十足的經典組合",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/seafood_pizza-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "費城牛肉披薩",
      description: "嫩牛肉搭配起司和洋蔥，咬下去肉汁四溢的美味",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/beef_pizza-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "瑪格麗特披薩",
      description: "經典義式披薩，番茄、起司、羅勒的完美組合",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/margherita_pizza-2977QsiMsN7SDPaTo8WGMP.webp",
    },
    {
      name: "蜂蜜麻吉披薩",
      description: "甜蜜蜂蜜搭配Q彈麻吉，甜鹹交織的獨特風味",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/honey_mochi_pizza-2977QsiMsN7SDPaTo8WGMP.webp",
    },
  ];

  const reviews = [
    {
      author: "林姿秀",
      rating: 5,
      text: "新鮮芒果雪花冰只要99元，還附上統一布丁。芒果非常多，真的很划算！",
      date: "8個月前",
    },
    {
      author: "杜育芯",
      rating: 5,
      text: "雪花冰入口即化，配料豐富，非常划算。擺盤也很獨特，老闆人非常親切！",
      date: "2年前",
    },
    {
      author: "林家瑩",
      rating: 5,
      text: "芒果雪花冰只要99元！便宜、好吃，份量超大！老闆也很親切，會再來！😍",
      date: "9個月前",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header with Business Hours */}
      <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "#e0e0e0" }}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "#1a2d4d" }}></div>
            <h1 className="text-2xl font-bold" style={{ color: "#1a2d4d" }}>Auntie Dream ice</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#story" className="text-sm font-medium" style={{ color: "#1a2d4d" }}>品牌故事</a>
            <a href="#menu" className="text-sm font-medium" style={{ color: "#1a2d4d" }}>菜單</a>
            <a href="#contact" className="text-sm font-medium" style={{ color: "#1a2d4d" }}>聯絡我們</a>
          </nav>
        </div>
        <div className="border-t" style={{ borderColor: "#e0e0e0" }}>
          <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm" style={{ color: "#666" }}>
            <Clock size={16} />
            <span>營業時間：週二至週日 12:00-21:00，週一公休</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6" style={{ color: "#1a2d4d" }}>
                小阿姨雪花冰
              </h2>
              <p className="text-xl mb-4" style={{ color: "#666" }}>
                一口綿密，一點療癒，午後的甜品時光
              </p>
              <p className="text-lg mb-8" style={{ color: "#999" }}>
                用最新鮮的水果和最細膩的雪花冰，為您呈現最美好的午後時光
              </p>
              <Button 
                size="lg"
                className="text-white font-semibold"
                style={{ backgroundColor: "#1a2d4d" }}
              >
                探索菜單
              </Button>
            </div>
            <div>
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663593204561/EF5GSx5PwhHPcYcAdnWu9S/modern_hero_banner-2977QsiMsN7SDPaTo8WGMP.webp"
                alt="Auntie Dream ice"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section id="story" className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center" style={{ color: "#1a2d4d" }}>品牌故事</h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6" style={{ color: "#666" }}>
              還記得小時候炎炎夏日吃到一口冰就覺得開心的幸福感嗎？
            </p>
            <p className="text-lg mb-6" style={{ color: "#666" }}>
              這裡是我的夢想冰店，一個充滿溫度和故事的地方。
            </p>
            <p className="text-lg mb-6" style={{ color: "#666" }}>
              每一份冰品都精心製作，用最新鮮的水果和最細膩的雪花冰，為您呈現最美好的午後時光。
            </p>
            <p className="text-lg font-semibold" style={{ color: "#f4a582" }}>
              小阿姨陪你們找回小時候的幸福時刻 💝
            </p>
          </div>
        </div>
      </section>

      {/* Ice Cream Menu */}
      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center" style={{ color: "#1a2d4d" }}>🍧 冰品菜單</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {iceCreams.map((ice, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 h-64">
                  <img 
                    src={ice.image}
                    alt={ice.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: "#1a2d4d" }}>
                  {ice.name}
                </h4>
                <p className="text-sm" style={{ color: "#999" }}>
                  {ice.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pizza Menu */}
      <section className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center" style={{ color: "#1a2d4d" }}>🍕 熱食區</h3>
          <p className="text-center text-lg mb-12" style={{ color: "#666" }}>6吋手工披薩，現做現烤的美味</p>
          <div className="grid md:grid-cols-2 gap-8">
            {pizzas.map((pizza, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 overflow-hidden rounded-lg bg-gray-100 h-48">
                  <img 
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold mb-2" style={{ color: "#1a2d4d" }}>
                  {pizza.name}
                </h4>
                <p className="text-sm" style={{ color: "#999" }}>
                  {pizza.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center" style={{ color: "#1a2d4d" }}>⭐ 顧客評價</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-6 rounded-lg" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} style={{ color: "#f4a582" }}>★</span>
                  ))}
                </div>
                <p className="mb-4" style={{ color: "#666" }}>
                  "{review.text}"
                </p>
                <p className="font-semibold mb-1" style={{ color: "#1a2d4d" }}>
                  {review.author}
                </p>
                <p className="text-sm" style={{ color: "#999" }}>
                  {review.date}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8" style={{ color: "#999" }}>
            ⭐ 4.9 星評分 (55則評價) · 在 Google 地圖上查看更多評價
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center" style={{ color: "#1a2d4d" }}>聯絡我們</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#a8d5ba" }}>
                <MapPin size={24} style={{ color: "#1a2d4d" }} />
              </div>
              <h4 className="font-bold mb-2" style={{ color: "#1a2d4d" }}>地址</h4>
              <a 
                href="https://maps.app.goo.gl/5K6ehAGyrB6YaQxLA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
                style={{ color: "#666" }}
              >
                彰化縣線西鄉復興路11-1號
              </a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#f4a582" }}>
                <Phone size={24} style={{ color: "#1a2d4d" }} />
              </div>
              <h4 className="font-bold mb-2" style={{ color: "#1a2d4d" }}>電話</h4>
              <a 
                href="tel:+886475556840"
                className="text-sm hover:underline"
                style={{ color: "#666" }}
              >
                +886 4 755 6840
              </a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#a8d5ba" }}>
                <Facebook size={24} style={{ color: "#1a2d4d" }} />
              </div>
              <h4 className="font-bold mb-2" style={{ color: "#1a2d4d" }}>追蹤我們</h4>
              <a 
                href="https://www.facebook.com/profile.php?id=100084743760507&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
                style={{ color: "#666" }}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t" style={{ borderColor: "#e0e0e0" }}>
        <div className="container mx-auto px-4 text-center" style={{ color: "#999" }}>
          <p>© 2026 小阿姨雪花冰. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

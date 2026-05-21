const SITE_URL = "https://auntie-dreamice.vercel.app";
const HERO_IMAGE = `${SITE_URL}/images/hero_banner_ghibli.webp`;

/**
 * SEO Schema Component
 * 提供結構化資料 (JSON-LD) 以改善 Google 搜尋結果
 * 包含：LocalBusiness、Restaurant、Review、BreadcrumbList Schema
 */
export function SEOSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: "小阿姨雪花冰",
    alternateName: "Auntie Dream Ice",
    description:
      "彰化線西最受歡迎的雪花冰專賣店，精選新鮮水果、手工披薩、冰品菜單。提供新鮮芒果、草莓、Oreo、紅豆等多種雪花冰選擇。",
    url: SITE_URL,
    telephone: "+886-4-755-6840",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+886-4-755-6840",
      areaServed: "TW",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "復興路11-1號",
      addressLocality: "線西鄉",
      addressRegion: "彰化縣",
      postalCode: "507",
      addressCountry: "TW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.0752",
      longitude: "120.3842",
    },
    image: HERO_IMAGE,
    priceRange: "$$",
    servesCuisine: ["Dessert", "Shaved Ice", "Pizza", "Taiwanese"],
    paymentAccepted: ["Cash", "Card"],
    acceptsReservations: false,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday"],
        opens: "00:00",
        closes: "00:00",
        description: "公休",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "21:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=100084743760507",
      "https://www.instagram.com/auntie_dreamhouse",
    ],
    hasMap: "https://www.google.com/maps/search/小阿姨雪花冰",
    keywords: "雪花冰,冰品,披薩,彰化,線西,甜品,冰淇淋,夏日冰品",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "55",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": SITE_URL,
    name: "小阿姨雪花冰",
    url: SITE_URL,
    menu: [
      ["新鮮芒果布丁雪花冰", "綿密的雪花冰搭配新鮮芒果和滑順布丁，一口咬下去就是夏日的幸福", "99"],
      ["新鮮草莓奶酪雪花冰", "新鮮草莓搭配濃郁奶酪，酸酸甜甜的滋味在舌尖綻放", "99"],
      ["Oreo巧克力布丁雪花冰", "經典Oreo餅乾搭配濃郁巧克力布丁，巧克力愛好者的必點", "99"],
      ["紅豆牛奶雪花冰", "傳統紅豆搭配香濃牛奶，懷舊風味中帶著溫暖", "99"],
      ["抹茶紅豆布丁&奶酪雪花冰", "清香抹茶搭配紅豆、布丁和奶酪，層次豐富的完美組合", "129"],
      ["滑嫩仙草凍", "Q彈的仙草凍搭配冰涼的糖水，清涼解渴的夏日聖品", "49"],
    ].map(([name, description, price]) => ({
      "@type": "MenuItem",
      name,
      description,
      offers: {
        "@type": "Offer",
        priceCurrency: "TWD",
        price,
      },
    })),
  };

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Person",
      name: "Google 評論者",
    },
    reviewBody: "小阿姨雪花冰提供最新鮮的水果和最細膩的雪花冰。每一份冰品都精心製作，為您呈現最美好的午後時光。",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "小阿姨雪花冰",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ["首頁", SITE_URL],
      ["品牌故事", `${SITE_URL}#brand`],
      ["菜單", `${SITE_URL}#menu`],
      ["聯絡我們", `${SITE_URL}#contact`],
    ].map(([name, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item,
    })),
  };

  const organizationSchema2 = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "小阿姨雪花冰",
    url: SITE_URL,
    logo: HERO_IMAGE,
    sameAs: [
      "https://www.facebook.com/profile.php?id=100084743760507",
      "https://www.instagram.com/auntie_dreamhouse",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+886-4-755-6840",
    },
  };

  return (
    <>
      {[organizationSchema, menuSchema, breadcrumbSchema, reviewSchema, organizationSchema2].map((schema, index) => (
        <script
          key={`${schema["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

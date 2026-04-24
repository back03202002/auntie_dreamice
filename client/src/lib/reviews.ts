/**
 * 顧客評價資料
 * 用於評價區塊的輪播展示
 */

export interface Review {
  id: number;
  rating: number;
  content: string;
  author: string;
  date: string;
  badge?: string; // "Local Guide" 或其他標籤
}

export const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    content: "新鮮芒果雪花冰只要99元，還附上統一布丁。芒果非常多，真的很划算！",
    author: "林姿秀",
    date: "8個月前",
    badge: "Local Guide"
  },
  {
    id: 2,
    rating: 5,
    content: "雪花冰入口即化，配料豐富，非常划算。擺盤也很獨特，老闆人非常親切！",
    author: "杜育芯",
    date: "2年前"
  },
  {
    id: 3,
    rating: 5,
    content: "芒果雪花冰只要99元！便宜、好吃，份量超大！老闆也很親切，會再來！😍",
    author: "林家瑩",
    date: "9個月前",
    badge: "Local Guide"
  },
  {
    id: 4,
    rating: 5,
    content: "抹茶紅豆布丁雪花冰超好吃，層次豐富，每一口都是驚喜。推薦必點！",
    author: "王小美",
    date: "3個月前"
  },
  {
    id: 5,
    rating: 5,
    content: "手工披薩新鮮現做，起司牽絲超滿足。搭配冰品一起享用，完美組合！",
    author: "陳大衛",
    date: "2個月前",
    badge: "Local Guide"
  },
  {
    id: 6,
    rating: 5,
    content: "環境舒適，老闆親切，冰品品質穩定。是我最愛的夏日甜點店！",
    author: "李欣怡",
    date: "1個月前"
  },
  {
    id: 7,
    rating: 5,
    content: "仙草凍清涼解渴，搭配冰涼糖水超消暑。每次來都要點一杯！",
    author: "張建文",
    date: "2週前"
  },
  {
    id: 8,
    rating: 5,
    content: "新鮮草莓奶酪雪花冰，酸酸甜甜的滋味在舌尖綻放。根本是天堂啊！",
    author: "黃思涵",
    date: "1週前",
    badge: "Local Guide"
  }
];

/**
 * 顧客評價資料
 * 用於評價區塊的輪播展示
 * 資料來源：Google Maps 4星和5星評論
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
    content: "新鮮芒果雪花冰只要 $99，還附上統一布丁。芒果超多...真的很划算！",
    author: "林姿秀",
    date: "8 個月前",
    badge: "Local Guide"
  },
  {
    id: 2,
    rating: 5,
    content: "雪花冰入口即化，配料超大方，CP 值超高。呈現方式也很獨特，老闆人超友善。還有很多優惠，是雪花冰界的首選！",
    author: "杜育芯",
    date: "2 年前"
  },
  {
    id: 3,
    rating: 5,
    content: "今天吃到芒果雪花冰只要 99 元！便宜、好吃，份量超大！😍",
    author: "林家瑩",
    date: "9 個月前",
    badge: "Local Guide"
  },
  {
    id: 4,
    rating: 5,
    content: "老闆人很友善，服務很好。冰不會太甜，夏天吃起來清涼舒服！👍",
    author: "68 車隊 李小姐",
    date: "1 年前",
    badge: "Local Guide"
  },
  {
    id: 5,
    rating: 5,
    content: "八寶奶雪花冰有很多好吃的配料，燉得很好。軟綿綿，入口即化。",
    author: "Monsoon An",
    date: "2 年前",
    badge: "Local Guide"
  },
  {
    id: 6,
    rating: 5,
    content: "芋頭牛奶雪花冰，芋頭超多！好吃😋 下次想試試其他口味😙",
    author: "丸丸丸",
    date: "1 年前",
    badge: "Local Guide"
  },
  {
    id: 7,
    rating: 5,
    content: "餐廳座位有限，但空間舒適。老闆人很大方，甚至贊助成績優異的孩子和弱勢群體。真的很善良。",
    author: "蔡 S",
    date: "1 年前",
    badge: "Local Guide"
  },
  {
    id: 8,
    rating: 5,
    content: "阿姨人很友善親切...食物精緻又好吃...大力推薦。",
    author: "武米",
    date: "2 年前",
    badge: "Local Guide"
  }
];

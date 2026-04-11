// 食物分类预设
export const FOOD_CATEGORIES = [
  { name: "主食", items: ["米饭", "面条", "馒头", "面包", "饺子", "包子", "安素"] },
  { name: "肉类", items: ["猪肉", "牛肉", "鸡肉", "鱼", "虾"] },
  { name: "蔬菜", items: ["青菜", "白菜", "西红柿", "黄瓜", "胡萝卜"] },
  { name: "水果", items: ["苹果", "香蕉", "橙子", "葡萄"] },
  { name: "饮品", items: ["牛奶", "咖啡", "茶", "果汁", "酒"] },
  { name: "零食", items: ["饼干", "薯片", "坚果", "巧克力"] },
] as const;

// 进食量选项
export const AMOUNT_OPTIONS = [
  { value: 1, label: "少量", emoji: "🍚" },
  { value: 2, label: "适中", emoji: "🍚🍚" },
  { value: 3, label: "大量", emoji: "🍚🍚🍚" },
] as const;

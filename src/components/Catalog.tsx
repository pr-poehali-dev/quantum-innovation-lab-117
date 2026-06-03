import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

const EXPORT_URL = "https://functions.poehali.dev/da1c9496-f4a0-4344-8624-4000b2c8535e";

const categories = [
  "Все",
  "Цемент и сыпучие",
  "Бетон и ЖБИ",
  "Металл",
  "Лесоматериалы",
  "Плитные материалы",
  "Утепление",
  "Гидроизоляция",
  "Сухие смеси",
  "ЛКМ",
  "Тротуарная плитка",
  "Заборы и ограждения",
];

const products = [
  // Цемент и сыпучие
  { id: 1, category: "Цемент и сыпучие", name: "Цемент ПЦ М500 Д0 50 кг", unit: "мешок", price: 390, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/5fa7b5ec-1f44-4628-859c-06d0b51a3a6a.jpg", badge: "Хит", article: "CEM-500-50" },
  { id: 2, category: "Цемент и сыпучие", name: "Цемент ПЦ М400 Д20 50 кг", unit: "мешок", price: 350, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/bf2049e3-9c59-456d-aae2-0405ca4090fe.jpg", badge: null, article: "CEM-400-50" },
  { id: 3, category: "Цемент и сыпучие", name: "Песок речной мытый", unit: "т", price: 1200, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/3f801f6a-f574-4e81-91ad-aab731f5120e.jpg", badge: null, article: "SAND-RCH" },
  { id: 4, category: "Цемент и сыпучие", name: "Щебень фракция 20-40 мм", unit: "т", price: 1450, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/04c9948b-875e-4b0c-b628-f2974e64fd6e.jpg", badge: null, article: "GRAVEL-2040" },
  { id: 5, category: "Цемент и сыпучие", name: "Отсев гранитный 0-5 мм", unit: "т", price: 980, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/3f801f6a-f574-4e81-91ad-aab731f5120e.jpg", badge: null, article: "GRANIT-05" },
  { id: 6, category: "Цемент и сыпучие", name: "Керамзит фракция 10-20 мм", unit: "м³", price: 2800, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/11fb8b62-bdcf-428e-a182-664a168fa46a.jpg", badge: null, article: "KERAM-1020" },

  // Бетон и ЖБИ
  { id: 7, category: "Бетон и ЖБИ", name: "Бетон товарный В15 (М200)", unit: "м³", price: 5200, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/16a43e5c-da55-4236-99e2-b60dc1873181.jpg", badge: null, article: "BETON-B15" },
  { id: 8, category: "Бетон и ЖБИ", name: "Бетон товарный В25 (М350)", unit: "м³", price: 6100, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/16a43e5c-da55-4236-99e2-b60dc1873181.jpg", badge: "Хит", article: "BETON-B25" },
  { id: 9, category: "Бетон и ЖБИ", name: "Кольцо колодезное КС 10-9", unit: "шт", price: 2400, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/527106c0-eb51-49bd-807e-435a26285056.jpg", badge: null, article: "KS-10-9" },
  { id: 10, category: "Бетон и ЖБИ", name: "Плита перекрытия ПК 60-15", unit: "шт", price: 18500, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/ff8c87a1-45b2-4fc0-b92b-05dcba17d37d.jpg", badge: null, article: "PK-60-15" },

  // Металл
  { id: 11, category: "Металл", name: "Арматура А500С d12 мм, 11,7 м", unit: "прут", price: 620, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/06aa06e9-1913-4b37-8adb-448e4dc01013.jpg", badge: "Хит", article: "ARM-A500-12" },
  { id: 12, category: "Металл", name: "Арматура А500С d8 мм, 11,7 м", unit: "прут", price: 280, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/06aa06e9-1913-4b37-8adb-448e4dc01013.jpg", badge: null, article: "ARM-A500-8" },
  { id: 13, category: "Металл", name: "Профильная труба 40×40×2 мм, 6 м", unit: "шт", price: 890, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/3b6e26fd-f2a0-43e1-88cb-6e0c6fadad39.jpg", badge: null, article: "PROF-40x40" },
  { id: 14, category: "Металл", name: "Уголок 50×50×5 мм, 6 м", unit: "шт", price: 1150, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/06aa06e9-1913-4b37-8adb-448e4dc01013.jpg", badge: null, article: "ANGLE-5050" },
  { id: 15, category: "Металл", name: "Лист стальной г/к 2 мм, 1250×2500", unit: "лист", price: 4200, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/f95af49c-328c-4a75-ac26-0c04c3b60283.jpg", badge: null, article: "SHEET-2MM" },

  // Лесоматериалы
  { id: 16, category: "Лесоматериалы", name: "Доска обрезная 25×150×6000 мм", unit: "м³", price: 22000, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/a255130a-067e-477c-8713-2a9670e50803.jpg", badge: null, article: "BOARD-25150" },
  { id: 17, category: "Лесоматериалы", name: "Брус строганый 100×100×6000 мм", unit: "м³", price: 28000, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/d4b48411-e28e-4874-ba00-bc4a8c052f31.jpg", badge: "Хит", article: "BEAM-100100" },
  { id: 18, category: "Лесоматериалы", name: "Рейка монтажная 25×50×3000 мм", unit: "шт", price: 95, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/7579a2e0-2c6f-474a-9245-fec69031bb4b.jpg", badge: null, article: "RAIL-2550" },

  // Плитные материалы
  { id: 19, category: "Плитные материалы", name: "Гипсокартон Knauf ГКЛ 12,5 мм", unit: "лист", price: 420, oldPrice: 490, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/598462fc-9237-4622-b118-95782574f04c.jpg", badge: "Хит", article: "GKL-125" },
  { id: 20, category: "Плитные материалы", name: "Гипсокартон влагостойкий ГКЛВ 12,5 мм", unit: "лист", price: 520, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/e02128fe-7950-448d-acf7-d408226dcc5b.jpg", badge: null, article: "GKLV-125" },
  { id: 21, category: "Плитные материалы", name: "OSB-3 плита 9 мм, 2500×1250", unit: "лист", price: 890, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/d6be925a-1459-463e-b466-564507bba93e.jpg", badge: null, article: "OSB3-9MM" },
  { id: 22, category: "Плитные материалы", name: "OSB-3 плита 12 мм, 2500×1250", unit: "лист", price: 1100, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/d6be925a-1459-463e-b466-564507bba93e.jpg", badge: null, article: "OSB3-12MM" },
  { id: 23, category: "Плитные материалы", name: "Фанера ФСФ 12 мм, 1525×1525", unit: "лист", price: 1350, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/216c2962-689c-4951-ac19-cb8d44678725.jpg", badge: null, article: "FSF-12MM" },

  // Утепление
  { id: 24, category: "Утепление", name: "Пенопласт ПСБ-С-25 50 мм, 1000×1000", unit: "м²", price: 145, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/23692d97-792e-44ce-9e75-bdcf5612fa34.jpg", badge: null, article: "PSB-S25-50" },
  { id: 25, category: "Утепление", name: "Пенопласт ПСБ-С-25 100 мм, 1000×1000", unit: "м²", price: 270, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/23692d97-792e-44ce-9e75-bdcf5612fa34.jpg", badge: "Хит", article: "PSB-S25-100" },
  { id: 26, category: "Утепление", name: "Минвата ROCKWOOL Лайт Баттс 50 мм", unit: "уп", price: 1850, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/f1286418-f76d-47b9-9580-45760f3d688f.jpg", badge: null, article: "RW-LB-50" },
  { id: 27, category: "Утепление", name: "Минвата ISOVER Классик 100 мм", unit: "уп", price: 2100, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/f3f5e951-cc1a-4bf4-9d43-70c42a1212d1.jpg", badge: null, article: "ISV-CLS-100" },

  // Гидроизоляция
  { id: 28, category: "Гидроизоляция", name: "Рубероид РКП-350 15 м²", unit: "рул", price: 380, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/b82c4dd5-b97d-4f0d-89c5-33d5e93bc646.jpg", badge: null, article: "RUB-350" },
  { id: 29, category: "Гидроизоляция", name: "Пленка п/э гидроизоляционная 200 мкм", unit: "м²", price: 18, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/600a0399-247f-4725-b55a-38223a58e0d1.jpg", badge: null, article: "FILM-200" },
  { id: 30, category: "Гидроизоляция", name: "Мастика битумная Технониколь 18 кг", unit: "ведро", price: 1650, oldPrice: 1900, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/b82c4dd5-b97d-4f0d-89c5-33d5e93bc646.jpg", badge: "Акция", article: "TN-MAST-18" },

  // Сухие смеси
  { id: 31, category: "Сухие смеси", name: "Штукатурка гипсовая Knauf Ротбанд 30 кг", unit: "мешок", price: 680, oldPrice: 750, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/6cc601bb-cd35-43c2-896c-420c0ef28606.jpg", badge: "Акция", article: "KN-ROT-30" },
  { id: 32, category: "Сухие смеси", name: "Плиточный клей Ceresit CM11 25 кг", unit: "мешок", price: 420, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/6cc601bb-cd35-43c2-896c-420c0ef28606.jpg", badge: "Хит", article: "CER-CM11-25" },
  { id: 33, category: "Сухие смеси", name: "Пескобетон М300 40 кг", unit: "мешок", price: 195, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/5fa7b5ec-1f44-4628-859c-06d0b51a3a6a.jpg", badge: null, article: "PB-M300-40" },
  { id: 34, category: "Сухие смеси", name: "Наливной пол Bergauf Basis 25 кг", unit: "мешок", price: 560, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/8db9813c-872b-4782-8c23-f7e6c3d78814.jpg", badge: null, article: "BG-BASIS-25" },
  { id: 35, category: "Сухие смеси", name: "Затирка Ceresit CE33 2 кг беж", unit: "уп", price: 290, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/d0808c0a-3efd-42d6-8f50-6ce4bbcbdec4.jpg", badge: null, article: "CER-CE33-2" },

  // ЛКМ
  { id: 36, category: "ЛКМ", name: "Краска фасадная Тиккурила Бетонит 10 л", unit: "ведро", price: 3200, oldPrice: 3600, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/68fc8633-b14c-429a-be2a-3ef1bed1edde.jpg", badge: "Акция", article: "TIK-BET-10" },
  { id: 37, category: "ЛКМ", name: "Грунтовка глубокого проникновения 10 л", unit: "канистра", price: 480, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/68fc8633-b14c-429a-be2a-3ef1bed1edde.jpg", badge: null, article: "GRUNT-10" },
  { id: 38, category: "ЛКМ", name: "Эмаль алкидная ПФ-115 белая 3 кг", unit: "банка", price: 390, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/4db9fb73-387f-4fa2-9688-2da86e26f157.jpg", badge: null, article: "PF115-3KG" },

  // Тротуарная плитка
  { id: 39, category: "Тротуарная плитка", name: "Плитка тротуарная Брусчатка 200×100×60", unit: "м²", price: 850, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/153968f4-6665-49b0-a6d6-5b4acb6c82ae.jpg", badge: "Хит", article: "PAV-BRUS-60" },
  { id: 40, category: "Тротуарная плитка", name: "Плитка тротуарная Катушка 60 мм", unit: "м²", price: 920, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/aff21470-92e4-421b-b3ae-469fc3561e91.jpg", badge: null, article: "PAV-KAT-60" },
  { id: 41, category: "Тротуарная плитка", name: "Бордюр дорожный 500×200×80", unit: "шт", price: 185, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/0ea5021a-d159-4292-8107-b9008be2a242.jpg", badge: null, article: "BORD-500" },

  // Заборы и ограждения
  { id: 42, category: "Заборы и ограждения", name: "Сетка рабица 50×50 оцинк. h=1,5 м, 10 п.м.", unit: "рул", price: 1650, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/606b9f1f-c9e0-496e-97f1-fbc892258813.jpg", badge: null, article: "MESH-5050" },
  { id: 43, category: "Заборы и ограждения", name: "Профнастил С8 h=2 м, шир. 1,2 м RAL 6005", unit: "лист", price: 680, oldPrice: 750, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/b5dd141a-8580-4f85-b2b5-ba0d0e2de917.jpg", badge: "Акция", article: "PROF-C8-GRN" },
  { id: 44, category: "Заборы и ограждения", name: "Столб для забора 60×60×2 мм, h=2,5 м", unit: "шт", price: 490, oldPrice: null, image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/946b4036-6315-42bb-8a0d-bd67c4f9c7d5.jpg", badge: null, article: "POST-60-25" },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cart, setCart] = useState<number[]>([]);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch(EXPORT_URL);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "price-list.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const filtered = activeCategory === "Все"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const toggleCart = (id: number) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="bg-neutral-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase text-neutral-400 text-xs tracking-widest mb-2">Прайс-лист</p>
          <h2 className="text-neutral-900 text-4xl md:text-5xl font-bold tracking-tight">
            Товары и цены
          </h2>
          <p className="text-neutral-500 mt-2 text-sm">{products.length} позиций в наличии</p>
        </div>

        {/* Фильтр по категориям */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Сетка карточек */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filtered.map((product) => {
              const inCart = cart.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-neutral-200 flex flex-col group hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Изображение */}
                  <div className="relative h-48 overflow-hidden bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 ${
                        product.badge === "Хит" ? "bg-black text-white" :
                        product.badge === "Акция" ? "bg-red-500 text-white" : "bg-white text-black"
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Контент */}
                  <div className="flex flex-col flex-1 p-4">
                    <p className="text-neutral-400 text-xs mb-1">Арт. {product.article}</p>
                    <h3 className="text-neutral-900 text-sm font-medium leading-snug mb-3 flex-1">
                      {product.name}
                    </h3>

                    {/* Цена */}
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-2xl font-bold text-neutral-900">
                        {product.price.toLocaleString("ru-RU")} ₽
                      </span>
                      <span className="text-xs text-neutral-400 mb-1">/ {product.unit}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-neutral-400 line-through mb-1">
                          {product.oldPrice.toLocaleString("ru-RU")} ₽
                        </span>
                      )}
                    </div>

                    {/* Кнопка */}
                    <button
                      onClick={() => toggleCart(product.id)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer border ${
                        inCart
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black hover:bg-black hover:text-white"
                      }`}
                    >
                      <Icon name={inCart ? "Check" : "ShoppingCart"} size={15} />
                      {inCart ? "В корзине" : "В корзину"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Нижняя строка */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            Показано {filtered.length} из {products.length} товаров
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wide bg-black text-white px-6 py-3 hover:bg-neutral-800 transition-all duration-300 disabled:opacity-60 cursor-pointer disabled:cursor-wait"
            >
              <Icon name={downloading ? "Loader2" : "Download"} size={15} />
              {downloading ? "Загрузка..." : "Скачать прайс Excel"}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wide border border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
            >
              <Icon name="FileText" size={15} />
              Запросить полный прайс
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
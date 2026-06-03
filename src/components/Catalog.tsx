import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/ui/icon";

const categories = [
  "Все",
  "Стройматериалы",
  "Инструмент",
  "Электрика",
  "Инженерные системы",
  "Финишная отделка",
  "Сантехника",
  "Крепёж",
];

const products = [
  {
    id: 1,
    category: "Стройматериалы",
    name: "Гипсокартон Knauf 12,5 мм",
    unit: "лист",
    price: 420,
    oldPrice: 490,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/598462fc-9237-4622-b118-95782574f04c.jpg",
    badge: "Хит",
    article: "KN-GKL-12",
  },
  {
    id: 2,
    category: "Стройматериалы",
    name: "Цемент М500 ПЦ 50 кг",
    unit: "мешок",
    price: 380,
    oldPrice: null,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/bf2049e3-9c59-456d-aae2-0405ca4090fe.jpg",
    badge: null,
    article: "CEM-M500-50",
  },
  {
    id: 3,
    category: "Стройматериалы",
    name: "Кирпич облицовочный красный",
    unit: "шт",
    price: 28,
    oldPrice: 32,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/eff98cce-2328-4291-9e03-081258b61145.jpg",
    badge: "Акция",
    article: "BR-RED-250",
  },
  {
    id: 4,
    category: "Стройматериалы",
    name: "Утеплитель ROCKWOOL Лайт Баттс 50мм",
    unit: "уп",
    price: 1850,
    oldPrice: null,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/f1286418-f76d-47b9-9580-45760f3d688f.jpg",
    badge: null,
    article: "RW-LB-50",
  },
  {
    id: 5,
    category: "Стройматериалы",
    name: "Металлочерепица Grand Line 0,5 мм",
    unit: "м²",
    price: 680,
    oldPrice: 750,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/550b5bc4-e53d-4af5-b3dc-1d3a67a381ff.jpg",
    badge: "Акция",
    article: "GL-MT-05",
  },
  {
    id: 6,
    category: "Инструмент",
    name: "Дрель-шуруповёрт Bosch GSR 180-LI",
    unit: "шт",
    price: 7490,
    oldPrice: 8900,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/ed3ab7dd-2d39-4506-b34b-725bbcfc0884.jpg",
    badge: "Хит",
    article: "BSH-GSR180",
  },
  {
    id: 7,
    category: "Электрика",
    name: "Кабель ВВГнг-LS 3×2,5 мм²",
    unit: "м.п.",
    price: 95,
    oldPrice: null,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/699ff6cc-59e3-4cda-a4fa-c7b6feee3db3.jpg",
    badge: null,
    article: "CBL-VVG-325",
  },
  {
    id: 8,
    category: "Финишная отделка",
    name: "Плитка керамическая Beton 60×60 см",
    unit: "м²",
    price: 1290,
    oldPrice: 1490,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/613fd9b5-1479-4e58-aa59-9aa2afbbe070.jpg",
    badge: "Акция",
    article: "TL-BTN-6060",
  },
  {
    id: 9,
    category: "Финишная отделка",
    name: "Дверь межкомнатная Белая Эмаль 2000×800",
    unit: "шт",
    price: 8900,
    oldPrice: null,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/51bbc22a-f110-4054-9705-35510f726655.jpg",
    badge: null,
    article: "DR-WHT-2080",
  },
  {
    id: 10,
    category: "Сантехника",
    name: "Смеситель для ванны Grohe Eurostyle",
    unit: "шт",
    price: 4650,
    oldPrice: 5200,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/92fd34c7-a733-4a63-9ab2-2ad93fc921d0.jpg",
    badge: "Хит",
    article: "GRH-ES-BT",
  },
  {
    id: 11,
    category: "Инженерные системы",
    name: "Труба полипропиленовая 25 мм PN20",
    unit: "м.п.",
    price: 68,
    oldPrice: null,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/08a05901-0f7a-4a2e-a40c-f6c07537a3c8.jpg",
    badge: null,
    article: "PP-25-PN20",
  },
  {
    id: 12,
    category: "Крепёж",
    name: "Саморезы универсальные 4×40 (200 шт)",
    unit: "уп",
    price: 185,
    oldPrice: 210,
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/efb8b684-256b-4753-aa28-4ab1905e016a.jpg",
    badge: "Акция",
    article: "SCR-440-200",
  },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cart, setCart] = useState<number[]>([]);

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
          <h2 className="text-neutral-900 text-4xl md:text-5xl font-bold tracking-tight">Товары и цены</h2>
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
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wide border border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
          >
            <Icon name="FileText" size={15} />
            Запросить полный прайс
          </a>
        </div>
      </div>
    </section>
  );
}

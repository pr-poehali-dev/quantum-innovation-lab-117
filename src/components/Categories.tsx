import { motion } from "framer-motion";

const categories = [
  {
    title: "Стройматериалы",
    count: "20+ подкатегорий",
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/47d08e6f-8d9e-4502-a85b-ab7978316ea1.jpg",
    items: ["Кирпич и блоки", "Кровля", "Фасад", "Теплоизоляция", "Сухие смеси"],
  },
  {
    title: "Инструмент",
    count: "18+ подкатегорий",
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/641faff4-c24e-4d9f-b4f3-c25ddd6ba5a8.jpg",
    items: ["Электроинструмент", "Ручной инструмент", "Измерительный", "Спецодежда", "Генераторы"],
  },
  {
    title: "Электрика",
    count: "17+ подкатегорий",
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/6191f99c-cefa-4f23-9bfb-8a6d4c4e92be.jpg",
    items: ["Кабель и провод", "Освещение", "Щитовое оборудование", "Умный дом", "Тёплый пол"],
  },
  {
    title: "Инженерные системы",
    count: "17+ подкатегорий",
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/883b2c5a-6378-459d-9c4f-2363698c3d3c.jpg",
    items: ["Отопление", "Водоснабжение", "Трубы и фитинги", "Вентиляция", "Насосы"],
  },
  {
    title: "Финишная отделка",
    count: "18+ подкатегорий",
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/42dd3c6e-7ff4-4782-b541-53d64e6ea97f.jpg",
    items: ["Плитка", "Напольные покрытия", "Обои", "Двери", "Подвесные потолки"],
  },
  {
    title: "Сантехника",
    count: "10+ подкатегорий",
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/e5b31d7e-dab9-4201-afa7-d5a16dcbd240.jpg",
    items: ["Ванны и душевые", "Смесители", "Унитазы", "Раковины", "Мебель для ванной"],
  },
  {
    title: "Крепёж",
    count: "17+ подкатегорий",
    image: "https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/541d5024-4c05-422a-8b1b-3e29d677ae4f.jpg",
    items: ["Саморезы", "Анкеры", "Дюбели", "Кровельный крепёж", "Такелаж"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Categories() {
  return (
    <section className="bg-neutral-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="uppercase text-neutral-500 text-xs tracking-widest mb-2">Полный каталог</p>
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight">7 разделов</h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-xs">
            Более 40 000 товаров в наличии на складе — для любого этапа строительства
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={item}
              className={`group relative overflow-hidden cursor-pointer ${i === 0 ? "sm:col-span-2 row-span-1" : ""}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <p className="text-neutral-400 text-xs uppercase tracking-widest mb-1">{cat.count}</p>
                  <h3 className="text-white text-xl font-bold mb-3">{cat.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {cat.items.map((sub) => (
                      <span
                        key={sub}
                        className="text-xs text-neutral-300 bg-white/10 px-2 py-0.5 rounded-sm"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

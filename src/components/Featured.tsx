const advantages = [
  { icon: "📦", title: "Широкий ассортимент", desc: "Более 10 000 позиций: от цемента до умного дома" },
  { icon: "🏗️", title: "Опт и розница", desc: "Специальные условия для строительных компаний и частных клиентов" },
  { icon: "🚚", title: "Быстрая доставка", desc: "Доставка по городу и области, самовывоз со склада" },
  { icon: "✅", title: "Проверенные бренды", desc: "Только сертифицированная продукция от ведущих производителей" },
];

export default function Featured() {
  return (
    <div id="catalog" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="/images/mountain-landscape.jpg"
          alt="Строительные материалы"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Всё для строительства и ремонта</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          7 крупных разделов, сотни категорий — от фундамента до финишной отделки. Работаем с профессионалами и частными застройщиками.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {advantages.map((a) => (
            <div key={a.title} className="flex gap-3 items-start">
              <span className="text-2xl">{a.icon}</span>
              <div>
                <p className="font-semibold text-neutral-900 text-sm">{a.title}</p>
                <p className="text-neutral-500 text-sm">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Запросить прайс
        </button>
      </div>
    </div>
  );
}
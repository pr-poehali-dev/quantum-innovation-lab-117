const advantages = [
  { icon: "📦", title: "Более 40 000 товаров", desc: "Стройматериалы, инструмент, электрика, сантехника, отделка — всё на одном складе" },
  { icon: "🏗️", title: "Опт и розница", desc: "Скидки для строительных компаний, ИП и частных застройщиков с первого заказа" },
  { icon: "🚚", title: "Доставка день-в-день", desc: "Собственный автопарк, доставка по Москве и области в удобное время" },
  { icon: "✅", title: "Гарантия качества", desc: "Только сертифицированная продукция: Knauf, Ceresit, Hilti, Bosch, DeWalt и другие" },
];

export default function Featured() {
  return (
    <div id="catalog" className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/540880f0-b60a-472b-963e-dae7ed9ae297/files/227b6ddd-70ea-4a88-a8d7-e799a5300326.jpg"
          alt="Склад строительных материалов"
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
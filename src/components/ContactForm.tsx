import { useState } from "react";
import { motion } from "framer-motion";

type FormType = "price" | "wholesale";

const formTypes = [
  { id: "price" as FormType, label: "Запросить прайс" },
  { id: "wholesale" as FormType, label: "Оптовое сотрудничество" },
];

export default function ContactForm() {
  const [type, setType] = useState<FormType>("price");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", company: "", comment: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="uppercase text-neutral-400 text-xs tracking-widest mb-2">Свяжитесь с нами</p>
        <h2 className="text-neutral-900 text-4xl md:text-5xl font-bold tracking-tight mb-10">
          Оставить заявку
        </h2>

        <div className="flex gap-2 mb-10">
          {formTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`px-5 py-2 text-sm uppercase tracking-wide border transition-all duration-300 cursor-pointer ${
                type === t.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-neutral-300 hover:border-black"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-neutral-200 p-10 text-center"
          >
            <p className="text-4xl mb-4">✅</p>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Заявка отправлена!</h3>
            <p className="text-neutral-500">Наш менеджер свяжется с вами в течение 30 минут в рабочее время.</p>
          </motion.div>
        ) : (
          <motion.form
            key={type}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-neutral-500">Имя *</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors duration-200 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-neutral-500">Телефон *</label>
                <input
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors duration-200 bg-white"
                />
              </div>
            </div>

            {type === "wholesale" && (
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase tracking-wide text-neutral-500">Компания</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="ООО «СтройПроект»"
                  className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors duration-200 bg-white"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase tracking-wide text-neutral-500">
                {type === "price" ? "Что интересует?" : "Комментарий"}
              </label>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                rows={4}
                placeholder={
                  type === "price"
                    ? "Например: кровельные материалы, утеплитель, крепёж..."
                    : "Расскажите об объёмах и направлении закупок"
                }
                className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors duration-200 bg-white resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <p className="text-xs text-neutral-400">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-neutral-800 transition-colors duration-300 cursor-pointer whitespace-nowrap"
              >
                {type === "price" ? "Получить прайс" : "Отправить заявку"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

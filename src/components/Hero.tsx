import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/mountain-landscape.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 opacity-70">Стройматериалы · Инструмент · Инженерные системы</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
          СТРОЙ<br />УВЕРЕННО
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 mb-8">
          Более 10 000 позиций для профессиональных строителей и частных застройщиков. Опт и розница — в одном месте.
        </p>
        <a href="#catalog" className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wide font-medium hover:bg-neutral-200 transition-colors duration-300">
          Смотреть каталог
        </a>
      </div>
    </div>
  );
}
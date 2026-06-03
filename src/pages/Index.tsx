import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Categories from "@/components/Categories";
import Promo from "@/components/Promo";
import Catalog from "@/components/Catalog";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Featured />
      <Categories />
      <Promo />
      <Catalog />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
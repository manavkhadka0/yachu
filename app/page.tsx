import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}

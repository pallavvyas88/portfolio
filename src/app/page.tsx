import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Tools from '@/components/Tools';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ThemeToggle />
      <Hero />
      <About />
      <Portfolio />
      <Tools />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

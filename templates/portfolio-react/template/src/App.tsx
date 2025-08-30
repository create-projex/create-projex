// Portfolio App
// #if blog
import { Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
// #endif
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// #if darkMode
import { ThemeProvider } from "./hooks/useTheme";
// #endif

function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  // #if darkMode
  return (
    <ThemeProvider>
      {/* #if blog */}
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
      </Routes>
      {/* #endif */}
      {/* #if !blog */}
      <Portfolio />
      {/* #endif */}
    </ThemeProvider>
  );
  // #endif
  
  // #if !darkMode
  return (
    <>
      {/* #if blog */}
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
      </Routes>
      {/* #endif */}
      {/* #if !blog */}
      <Portfolio />
      {/* #endif */}
    </>
  );
  // #endif
}

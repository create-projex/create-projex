// #if router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
// #endif

// #if !router
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Header />
      <Home />
    </>
  );
}
// #endif

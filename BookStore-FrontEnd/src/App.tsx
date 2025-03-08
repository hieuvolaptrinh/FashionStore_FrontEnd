import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import HomePage from "./layouts/homepage/HomePage";
import Header from "./layouts/Header";
import { useState } from "react";
function App() {
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <Header keyword={keyword} setKeyword={setKeyword} />
      <Navbar />
      <HomePage keyword={keyword} />
      <Footer />
    </>
  );
}

export default App;

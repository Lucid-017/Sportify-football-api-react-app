import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Banner from "../src/components/layouts/Banner";
import Footer from "../src/components/layouts/Footer";
import Competitions from "./components/pages/Competitions";
import Home from "./components/pages/Home";
import { SportifyProvider } from "./components/context/SportifyContext";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <SportifyProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Banner/>
          <main className="flex-1">
            <Routes>
                <Route path="/competitions/:name" element={<Competitions/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </SportifyProvider>

  );
}

export default App;

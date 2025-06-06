import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Banner from "../src/components/layouts/Banner";
import Footer from "../src/components/layouts/Footer";
import Competitions from "./components/pages/Competitions";
import Home from "./components/pages/Home";
import { SportifyProvider } from "./components/context/SportifyContext";
import Matches from "./components/Matches";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <SportifyProvider>
      <Router>
      <Banner/>
      <Routes>
          <Route path="/competitions/:name" element={<Competitions/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>  
      <Footer/>
    </Router>
    </SportifyProvider>
    
  );
}

export default App;

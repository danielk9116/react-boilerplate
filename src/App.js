import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Home,Error} from "./pages";
import {Navbar} from './components'
import {AnimatePresence} from "framer-motion";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AnimatePresence>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="*" element={<Error/>}/>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </>
  );
}

export default App;

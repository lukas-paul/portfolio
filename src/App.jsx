import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.scss";


function App() {
    let mobile = false;
    if (window.innerWidth < 650) {
        mobile = true;
    }
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route element={<Home prop={mobile} />} path="/" exact />
                <Route element={<About />} path="about" />
                <Route element={<Projects mobile={mobile} />} path="projects" />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

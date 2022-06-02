import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import NavBar from "./components/NavBar";
import "./App.scss";


function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route element={<Home />} path="/" exact />
                <Route element={<About />} path="/about" />
                <Route element={<Projects />} path="projects" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

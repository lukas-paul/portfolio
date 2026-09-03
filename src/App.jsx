import { lazy, Suspense } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.scss";

// Sanity Studio is a heavy dependency — only load it on /studio
const StudioRoute = lazy(() => import("./components/StudioRoute"));

function AppShell() {
    let mobile = false;
    if (window.innerWidth < 650) {
        mobile = true;
    }

    const isStudio = useLocation().pathname.startsWith("/studio");

    if (isStudio) {
        return (
            <Suspense fallback={null}>
                <Routes>
                    <Route path="/studio/*" element={<StudioRoute />} />
                </Routes>
            </Suspense>
        );
    }

    return (
        <>
            <NavBar />
            <Routes>
                <Route element={<Home prop={mobile} />} path="/" exact />
                <Route element={<About />} path="about" />
                <Route element={<Projects mobile={mobile} />} path="projects" />
            </Routes>
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    );
}

export default App;

import { lazy, Suspense } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.scss";

// Home stays eager (it's the entry route, most first-time visits land
// there) — About/Projects are split into their own chunks so neither
// page's code ships in the initial bundle unless it's actually visited.
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Impressum = lazy(() => import("./components/Impressum"));

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
            <Suspense fallback={null}>
                <Routes>
                    <Route element={<Home prop={mobile} />} path="/" exact />
                    <Route element={<About />} path="about" />
                    <Route
                        element={<Projects mobile={mobile} />}
                        path="projects"
                    />
                    <Route element={<Impressum />} path="impressum" />
                </Routes>
            </Suspense>
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

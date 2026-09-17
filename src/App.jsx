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
import { AboutSkeleton, ProjectsSkeleton } from "./components/skeletons.jsx";
import "./App.scss";
// About/Projects's own CSS, pulled in eagerly (unlike the components
// below) so their skeleton fallback is fully styled the instant it's
// shown — otherwise it would flash unstyled until the lazy chunk carrying
// this same stylesheet finishes downloading.
import "./About.scss";
import "./Projects.scss";

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
            <Routes>
                <Route element={<Home prop={mobile} />} path="/" exact />
                <Route
                    path="about"
                    element={
                        <Suspense fallback={<AboutSkeleton />}>
                            <About />
                        </Suspense>
                    }
                />
                <Route
                    path="projects"
                    element={
                        <Suspense fallback={<ProjectsSkeleton />}>
                            <Projects mobile={mobile} />
                        </Suspense>
                    }
                />
                <Route
                    path="impressum"
                    element={
                        <Suspense fallback={null}>
                            <Impressum />
                        </Suspense>
                    }
                />
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

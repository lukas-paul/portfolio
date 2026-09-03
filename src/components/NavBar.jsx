import React from "react";
import {NavLink} from "react-router-dom"

export default function NavBar() {
    return (
        <header>
            <div>
                <nav className="nav-bar">
                    <NavLink
                        to="/"
                        aria-label="Home"
                        className={({ isActive }) =>
                            isActive ? "active-nav-link active-home-button" : "nav-link home-button"
                        }
                    ></NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "active-nav-link" : "nav-link"
                        }
                    >
                        <p>About</p>
                    </NavLink>
                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            isActive ? "active-nav-link" : "nav-link"
                        }
                    >
                        <p>Projects</p>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

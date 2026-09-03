import React from "react";
import "../Footer.scss";

export default function Footer() {
    return (
        <footer className="site-footer">
            <a
                href="https://www.linkedin.com/in/lukas-frenzer-7abb01137/"
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>
            <a
                href="https://github.com/lukas-paul"
                target="_blank"
                rel="noopener noreferrer"
            >
                Github
            </a>
            <a href="mailto:lukas.frenzer@web.de?subject=Web Development Enquiry">
                Email
            </a>
        </footer>
    );
}

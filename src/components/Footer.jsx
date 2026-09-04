import React from "react";
import { useSanity } from "../sanity/useSanity.js";
import { socialsQuery } from "../sanity/queries.js";
import "../Footer.scss";

export default function Footer() {
    const { data } = useSanity(socialsQuery);
    const socials = data || [];

    return (
        <footer className="site-footer">
            {socials.map((s) => {
                const external = /^https?:/.test(s.url);
                return (
                    <a
                        key={s._key}
                        href={s.url}
                        {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                    >
                        {s.platform}
                    </a>
                );
            })}
        </footer>
    );
}

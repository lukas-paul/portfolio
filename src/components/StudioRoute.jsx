import React from "react";
import { Studio } from "sanity";
import config from "../../sanity.config";

// full-viewport wrapper — the Studio brings its own layout/scroll
export default function StudioRoute() {
    return (
        <div style={{ position: "fixed", inset: 0 }}>
            <Studio config={config} />
        </div>
    );
}

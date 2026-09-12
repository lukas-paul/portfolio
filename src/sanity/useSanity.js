import { useEffect, useState } from "react";
import client from "../client.js";

// Survives for the life of the tab. sessionStorage backs it up so a hard
// reload (or a direct URL visit to /about or /projects, which skips the SPA
// navigation entirely) still has something to render immediately instead of
// a blank page while the fresh fetch resolves in the background.
const memoryCache = new Map();

function readCache(key) {
    if (memoryCache.has(key)) return memoryCache.get(key);
    try {
        const raw = sessionStorage.getItem(key);
        if (raw) {
            const parsed = JSON.parse(raw);
            memoryCache.set(key, parsed);
            return parsed;
        }
    } catch {
        // sessionStorage can throw (private browsing, quota) — fall through
        // to a normal network fetch instead.
    }
    return undefined;
}

function writeCache(key, data) {
    memoryCache.set(key, data);
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
    } catch {
        // Ignore — the in-memory cache still works for the rest of this tab
        // session even if persisting it fails.
    }
}

// Runs a GROQ query and returns { data, error }. Any cached result for this
// exact query is returned synchronously on mount (no loading flash on a
// repeat visit), and a fresh fetch always runs in the background afterward
// to keep the cache up to date — stale-while-revalidate, so content edited
// in Sanity still shows up without needing a page reload.
export function useSanity(query, params) {
    const cacheKey = `sanity:${query}:${params ? JSON.stringify(params) : ""}`;
    const [data, setData] = useState(() => readCache(cacheKey) ?? null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;
        client
            .fetch(query, params || {})
            .then((res) => {
                if (!active) return;
                setData(res);
                writeCache(cacheKey, res);
            })
            .catch((err) => {
                if (active) setError(err);
                console.error(err);
            });
        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cacheKey]);

    return { data, error };
}

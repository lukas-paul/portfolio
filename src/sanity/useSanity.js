import { useEffect, useState } from "react";
import client from "../client.js";

// Small fetch helper: runs a GROQ query on mount and returns { data, error }.
export function useSanity(query, params) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const key = params ? JSON.stringify(params) : "";

    useEffect(() => {
        let active = true;
        client
            .fetch(query, params || {})
            .then((res) => {
                if (active) setData(res);
            })
            .catch((err) => {
                if (active) setError(err);
                console.error(err);
            });
        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, key]);

    return { data, error };
}

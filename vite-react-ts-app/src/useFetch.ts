import { useEffect, useState } from "react";

const cache = new Map<string, unknown>();

export default function useFetch<T = unknown>(url: string, options?: RequestInit) {
    const [state, setState] = useState<{ data: T | null; loading: boolean; error: Error | null }>({
        data: (cache.get(url) as T | undefined) ?? null,
        loading: !cache.has(url),
        error: null
    });
    useEffect(() => {
        if (!url) {
            setState({ data: null, loading: false, error: null });
            return;
        }
        if(cache.has(url)) {
            setState({ data: cache.get(url) as T, loading: false, error: null });
            return;
        }
        const controller = new AbortController();
        setState(prev => ({ ...prev, loading: true, error: null }));

        async function load() {
            try {
                const response = await fetch(url, { ...options, signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json() as T;
                cache.set(url, data);
                setState(prev => ({ ...prev, data, loading: false }));
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                setState(prev => ({
                    ...prev,
                    error: error instanceof Error ? error : new Error(String(error)),
                    loading: false,
                }));
            }
        }

        void load();
        return () => controller.abort();
    },[url, options]);
    return state;
}
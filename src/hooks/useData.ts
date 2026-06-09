import { useState, useEffect } from 'react';

// Göreceli (/ ile başlayan) yolların başına Vite'ın BASE_URL'ini ekler.
// Böylece GitHub Pages gibi alt yolda servis edilen kurulumlarda
// (örn. /iotcybersec/) fetch doğru adresi hedefler.
function resolveUrl(url: string): string {
    if (/^(https?:)?\/\//i.test(url)) return url;
    const base = import.meta.env.BASE_URL || '/';
    const normalizedBase = base.endsWith('/') ? base : base + '/';
    const normalizedPath = url.startsWith('/') ? url.slice(1) : url;
    return normalizedBase + normalizedPath;
}

export function useData<T>(url: string): { data: T | null; loading: boolean; error: string | null } {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(resolveUrl(url));
                if (!response.ok) throw new Error(`Veri yüklenemedi: ${response.status}`);
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}

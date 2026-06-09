import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'iotcybersec:theme';

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';

    // 1) Tarayıcı yüklenmeden önce index.html'deki inline script
    //    <html data-theme="..."> ataması yapmış olabilir; ona güven.
    const fromHtml = document.documentElement.getAttribute('data-theme');
    if (fromHtml === 'light' || fromHtml === 'dark') return fromHtml;

    // 2) localStorage
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
    } catch {
        // localStorage erişilemiyor olabilir, sessizce geç.
    }

    // 3) Sistem tercihi
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
}

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            window.localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // sessizce geç
        }
    }, [theme]);

    // Sistem teması değişirse ve kullanıcı manuel seçim yapmamışsa takip et.
    useEffect(() => {
        const media = window.matchMedia?.('(prefers-color-scheme: light)');
        if (!media) return;
        const handler = (e: MediaQueryListEvent) => {
            try {
                if (window.localStorage.getItem(STORAGE_KEY)) return;
            } catch {
                // erişim yok, takip etmeye devam
            }
            setThemeState(e.matches ? 'light' : 'dark');
        };
        media.addEventListener?.('change', handler);
        return () => media.removeEventListener?.('change', handler);
    }, []);

    const setTheme = useCallback((next: Theme) => setThemeState(next), []);
    const toggleTheme = useCallback(
        () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
        []
    );

    return { theme, setTheme, toggleTheme };
}

// src/assets altındaki tüm görselleri build zamanında eager olarak içe aktarır
// ve "dosya adı -> hash'lenmiş URL" şeklinde bir map üretir. Böylece JSON içinde
// sadece dosya adını (örn. "77500856.jfif") tutmak yeterli olur; Vite asset'i
// hash'leyip doğru BASE_URL ile servis eder (dev + GitHub Pages uyumlu).
const assetUrls = import.meta.glob(
    '../assets/*.{png,jpg,jpeg,jfif,webp,gif,svg}',
    { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const assetMap: Record<string, string> = Object.fromEntries(
    Object.entries(assetUrls).map(([path, url]) => {
        const name = path.split('/').pop() ?? path;
        return [name, url];
    })
);

export function resolvePortfolioAsset(fileName?: string): string | undefined {
    if (!fileName) return undefined;
    return assetMap[fileName];
}

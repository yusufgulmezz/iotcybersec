import type { ProjectCategoryId, ShowcaseProject } from '../types';

/** Yazar adını URL-dostu slug'a çevirir (örn. "Hamza Alhadeethi" → "hamza-alhadeethi"). */
export function authorToSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/ş/g, 's')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

export interface AuthorOption {
    name: string;
    slug: string;
    avatar: string;
    avatarImage?: string;
}

/** Tüm projelerden benzersiz yazar listesi üretir (avatar bilgisiyle). */
export function collectAuthors(projects: ShowcaseProject[]): AuthorOption[] {
    const seen = new Map<string, AuthorOption>();
    for (const project of projects) {
        for (const author of project.authors) {
            const slug = authorToSlug(author.name);
            if (!seen.has(slug)) {
                seen.set(slug, {
                    name: author.name,
                    slug,
                    avatar: author.avatar,
                    avatarImage: author.avatarImage,
                });
            }
        }
    }
    return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name, 'tr'));
}

export function filterProjects(
    projects: ShowcaseProject[],
    authorSlug: string | null,
    categoryId: ProjectCategoryId | null
): ShowcaseProject[] {
    return projects.filter((project) => {
        const authorMatch =
            !authorSlug ||
            project.authors.some((a) => authorToSlug(a.name) === authorSlug);
        const categoryMatch = !categoryId || project.category === categoryId;
        return authorMatch && categoryMatch;
    });
}

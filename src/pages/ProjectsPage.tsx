import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Github, X, ZoomIn } from 'lucide-react';
import { useData } from '../hooks/useData';
import type { ProjectCategoryId, ProjectsData, ShowcaseProject } from '../types';
import { resolvePortfolioAsset } from '../utils/portfolioAssets';
import { collectAuthors, filterProjects, type AuthorOption } from '../utils/projectFilters';
import styles from './ProjectsPage.module.css';

export default function ProjectsPage() {
    const { data, loading, error } = useData<ProjectsData>('/data/projects.json');
    const [searchParams, setSearchParams] = useSearchParams();

    const authorSlug = searchParams.get('yazar');
    const categoryId = searchParams.get('kategori') as ProjectCategoryId | null;

    const authors = useMemo(
        () => (data ? collectAuthors(data.projects) : []),
        [data]
    );

    const filteredProjects = useMemo(() => {
        if (!data) return [];
        return filterProjects(
            data.projects,
            authorSlug,
            categoryId && data.categories.some((c) => c.id === categoryId) ? categoryId : null
        );
    }, [data, authorSlug, categoryId]);

    const setAuthorFilter = (slug: string | null) => {
        const next = new URLSearchParams(searchParams);
        if (slug) next.set('yazar', slug);
        else next.delete('yazar');
        setSearchParams(next, { replace: true });
    };

    const setCategoryFilter = (id: ProjectCategoryId | null) => {
        const next = new URLSearchParams(searchParams);
        if (id) next.set('kategori', id);
        else next.delete('kategori');
        setSearchParams(next, { replace: true });
    };

    const clearFilters = () => setSearchParams({}, { replace: true });

    const hasActiveFilters = Boolean(authorSlug || categoryId);

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>Yükleniyor...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>Proje verisi yüklenemedi.</div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className="section-title">Projeler</h1>
                    <p className="section-subtitle">
                        Etkinlik katılımcılarının geliştirdiği projeleri detaylı olarak inceleyin.
                    </p>
                </div>

                <ProjectFilters
                    authors={authors}
                    categories={data.categories}
                    activeAuthor={authorSlug}
                    activeCategory={categoryId}
                    resultCount={filteredProjects.length}
                    hasActiveFilters={hasActiveFilters}
                    onAuthorChange={setAuthorFilter}
                    onCategoryChange={setCategoryFilter}
                    onClear={clearFilters}
                />

                {filteredProjects.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Seçili filtrelere uygun proje bulunamadı.</p>
                        <button type="button" className={styles.clearButton} onClick={clearFilters}>
                            Filtreleri temizle
                        </button>
                    </div>
                ) : (
                    <div className={styles.projectList}>
                        {filteredProjects.map((project, index) => (
                            <ProjectShowcase
                                key={project.id}
                                project={project}
                                categoryLabel={
                                    data.categories.find((c) => c.id === project.category)?.label
                                }
                                isLast={index === filteredProjects.length - 1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

interface ProjectFiltersProps {
    authors: AuthorOption[];
    categories: ProjectsData['categories'];
    activeAuthor: string | null;
    activeCategory: ProjectCategoryId | null;
    resultCount: number;
    hasActiveFilters: boolean;
    onAuthorChange: (slug: string | null) => void;
    onCategoryChange: (id: ProjectCategoryId | null) => void;
    onClear: () => void;
}

function ProjectFilters({
    authors,
    categories,
    activeAuthor,
    activeCategory,
    resultCount,
    hasActiveFilters,
    onAuthorChange,
    onCategoryChange,
    onClear,
}: ProjectFiltersProps) {
    return (
        <div className={styles.filters}>
            <div className={styles.authorFilterRow} role="group" aria-label="Yazar filtresi">
                {authors.map((author) => {
                    const active = activeAuthor === author.slug;
                    const imgSrc = resolvePortfolioAsset(author.avatarImage);
                    return (
                        <button
                            key={author.slug}
                            type="button"
                            className={`${styles.authorFilterItem} ${active ? styles.authorFilterItemActive : ''}`}
                            onClick={() =>
                                onAuthorChange(active ? null : author.slug)
                            }
                            aria-pressed={active}
                        >
                            <span
                                className={`${styles.authorFilterAvatar} ${imgSrc ? styles.authorFilterAvatarHasImage : ''}`}
                            >
                                {imgSrc ? (
                                    <img
                                        src={imgSrc}
                                        alt=""
                                        className={styles.authorFilterAvatarImg}
                                    />
                                ) : (
                                    author.avatar
                                )}
                            </span>
                            <span className={styles.authorFilterName}>{author.name}</span>
                        </button>
                    );
                })}
            </div>

            <div className={styles.categoryFilterRow} role="group" aria-label="Kategori filtresi">
                {categories.map((cat) => {
                    const active = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type="button"
                            className={`${styles.categoryChip} ${active ? styles.categoryChipActive : ''}`}
                            onClick={() => onCategoryChange(active ? null : cat.id)}
                            aria-pressed={active}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            <div className={styles.filterFooter}>
                <span className={styles.projectCount}>
                    {resultCount} Proje
                </span>
                {hasActiveFilters && (
                    <button type="button" className={styles.clearButton} onClick={onClear}>
                        <X size={14} />
                        Temizle
                    </button>
                )}
            </div>
        </div>
    );
}

function ProjectShowcase({
    project,
    categoryLabel,
    isLast,
}: {
    project: ShowcaseProject;
    categoryLabel?: string;
    isLast: boolean;
}) {
    const imageUrls = (project.images ?? [])
        .map((file) => resolvePortfolioAsset(file))
        .filter((url): url is string => Boolean(url));

    return (
        <article className={`${styles.showcase} ${isLast ? styles.showcaseLast : ''}`}>
            <header className={styles.authorRow}>
                {project.authors.map((author) => {
                    const imgSrc = resolvePortfolioAsset(author.avatarImage);
                    return (
                        <div key={author.name} className={styles.author}>
                            <div
                                className={`${styles.authorAvatar} ${imgSrc ? styles.authorAvatarHasImage : ''}`}
                            >
                                {imgSrc ? (
                                    <img
                                        src={imgSrc}
                                        alt={author.name}
                                        className={styles.authorAvatarImg}
                                    />
                                ) : (
                                    author.avatar
                                )}
                            </div>
                            <div className={styles.authorInfo}>
                                <span className={styles.authorName}>{author.name}</span>
                                {author.role && (
                                    <span className={styles.authorRole}>{author.role}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
                {categoryLabel && (
                    <span className={styles.categoryBadge}>{categoryLabel}</span>
                )}
            </header>

            <div
                className={`${styles.showcaseBody} ${imageUrls.length === 0 ? styles.showcaseBodyNoMedia : ''}`}
            >
                <div className={styles.content}>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className={styles.description}>{project.description}</p>

                    {project.features.length > 0 && (
                        <ul className={styles.features}>
                            {project.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    )}

                    <div className={styles.techList}>
                        {project.tech.map((item) => (
                            <span key={item} className={styles.techBadge}>
                                {item}
                            </span>
                        ))}
                    </div>

                    <div className={styles.links}>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.liveLink}
                            >
                                <ExternalLink size={16} />
                                Canlı Site
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={styles.repoLink}
                            >
                                <Github size={16} />
                                GitHub
                            </a>
                        )}
                    </div>
                </div>

                {imageUrls.length > 0 && (
                    <ProjectGallery
                        images={imageUrls}
                        title={project.title}
                        variant={project.galleryStyle ?? 'mobile'}
                    />
                )}
            </div>
        </article>
    );
}

function ProjectGallery({
    images,
    title,
    variant = 'mobile',
}: {
    images: string[];
    title: string;
    variant?: 'mobile' | 'wide';
}) {
    const [index, setIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const total = images.length;
    const isWide = variant === 'wide';

    const goPrev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
    const goNext = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

    const openLightbox = () => setLightboxOpen(true);
    const closeLightbox = () => setLightboxOpen(false);

    return (
        <>
            <div className={`${styles.gallery} ${isWide ? styles.galleryWide : ''}`}>
                {total > 1 && (
                    <button
                        type="button"
                        className={`${styles.galleryNav} ${styles.galleryNavPrev}`}
                        onClick={goPrev}
                        aria-label="Önceki görsel"
                    >
                        <ChevronLeft size={22} />
                    </button>
                )}

                <div className={`${styles.galleryFrame} ${isWide ? styles.galleryFrameWide : ''}`}>
                    <button
                        type="button"
                        className={styles.galleryImageButton}
                        onClick={openLightbox}
                        aria-label={`${title} — görsel ${index + 1}, büyüt`}
                    >
                        <img
                            src={images[index]}
                            alt={`${title} — görsel ${index + 1}`}
                            className={`${styles.galleryImage} ${isWide ? styles.galleryImageWide : ''}`}
                        />
                        <span className={styles.galleryZoomHint} aria-hidden="true">
                            <ZoomIn size={16} />
                        </span>
                    </button>
                    {total > 1 && (
                        <span className={styles.galleryCounter}>
                            {index + 1} / {total}
                        </span>
                    )}
                </div>

                {total > 1 && (
                    <button
                        type="button"
                        className={`${styles.galleryNav} ${styles.galleryNavNext}`}
                        onClick={goNext}
                        aria-label="Sonraki görsel"
                    >
                        <ChevronRight size={22} />
                    </button>
                )}
            </div>

            {lightboxOpen && (
                <ImageLightbox
                    images={images}
                    title={title}
                    index={index}
                    onClose={closeLightbox}
                    onIndexChange={setIndex}
                />
            )}
        </>
    );
}

function ImageLightbox({
    images,
    title,
    index,
    onClose,
    onIndexChange,
}: {
    images: string[];
    title: string;
    index: number;
    onClose: () => void;
    onIndexChange: (index: number) => void;
}) {
    const total = images.length;

    const goPrev = () => onIndexChange(index === 0 ? total - 1 : index - 1);
    const goNext = () => onIndexChange(index === total - 1 ? 0 : index + 1);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onIndexChange(index === 0 ? total - 1 : index - 1);
            if (e.key === 'ArrowRight') onIndexChange(index === total - 1 ? 0 : index + 1);
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [index, total, onClose, onIndexChange]);

    return createPortal(
        <div
            className={styles.lightboxOverlay}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — görsel galerisi`}
        >
            <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className={styles.lightboxClose}
                    onClick={onClose}
                    aria-label="Kapat"
                >
                    <X size={22} />
                </button>

                {total > 1 && (
                    <button
                        type="button"
                        className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                        onClick={goPrev}
                        aria-label="Önceki görsel"
                    >
                        <ChevronLeft size={28} />
                    </button>
                )}

                <figure className={styles.lightboxFigure}>
                    <img
                        src={images[index]}
                        alt={`${title} — görsel ${index + 1}`}
                        className={styles.lightboxImage}
                    />
                    <figcaption className={styles.lightboxCaption}>
                        <span className={styles.lightboxTitle}>{title}</span>
                        {total > 1 && (
                            <span className={styles.lightboxCounter}>
                                {index + 1} / {total}
                            </span>
                        )}
                    </figcaption>
                </figure>

                {total > 1 && (
                    <button
                        type="button"
                        className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                        onClick={goNext}
                        aria-label="Sonraki görsel"
                    >
                        <ChevronRight size={28} />
                    </button>
                )}
            </div>
        </div>,
        document.body
    );
}

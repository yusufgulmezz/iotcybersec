import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Briefcase, Mail, Github, Linkedin, Twitter, Globe,
    GraduationCap, Award, Code2, FolderGit2, Sparkles, ExternalLink, Hammer
} from 'lucide-react';
import { useData } from '../hooks/useData';
import type { PortfolioData, PortfolioPerson } from '../types';
import { resolvePortfolioAsset } from '../utils/portfolioAssets';
import styles from './PortfolioDetailPage.module.css';

export default function PortfolioDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error } = useData<PortfolioData>('/data/portfolio.json');

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
                <div className={styles.container}>Portfolyo verisi yüklenemedi.</div>
            </div>
        );
    }

    const person = data.people.find((p) => p.slug === slug);

    if (!person) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <h2>Profil bulunamadı</h2>
                        <p>Aradığınız profil mevcut değil veya kaldırılmış olabilir.</p>
                        <Link to="/portfolyo" className={styles.backLink}>
                            <ArrowLeft size={16} /> Portfolyoya dön
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const isPlaceholder = !person.about;
    const heroAvatarImg = resolvePortfolioAsset(person.avatarImage);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link to="/portfolyo" className={styles.backLink}>
                    <ArrowLeft size={16} /> Tüm Profiller
                </Link>

                {/* Hero / Profil başlık */}
                <section className={styles.hero}>
                    <div
                        className={`${styles.avatar} ${styles[`avatar_${person.fieldColor}`]} ${heroAvatarImg ? styles.avatarHasImage : ''}`}
                        aria-hidden="true"
                    >
                        {heroAvatarImg ? (
                            <img
                                src={heroAvatarImg}
                                alt={person.name}
                                className={styles.avatarImg}
                            />
                        ) : (
                            person.avatar
                        )}
                    </div>
                    <div className={styles.heroBody}>
                        <span
                            className={`${styles.fieldBadge} ${styles[`field_${person.fieldColor}`]}`}
                        >
                            {person.field}
                        </span>
                        <h1 className={styles.name}>{person.name}</h1>
                        <p className={styles.title}>
                            <Briefcase size={16} /> {person.title}
                        </p>

                        <div className={styles.heroMeta}>
                            {person.location && (
                                <span className={styles.metaItem}>
                                    <MapPin size={14} /> {person.location}
                                </span>
                            )}
                            {person.yearsOfExperience !== undefined && (
                                <span className={styles.metaItem}>
                                    <Sparkles size={14} /> {person.yearsOfExperience}+ yıl deneyim
                                </span>
                            )}
                            {person.available !== undefined && (
                                <span
                                    className={
                                        person.available ? styles.statusActive : styles.statusSoon
                                    }
                                >
                                    {person.available ? '● Yeni projelere açık' : 'Profil yakında'}
                                </span>
                            )}
                        </div>

                        {person.social && <SocialLinks social={person.social} />}
                    </div>
                </section>

                {isPlaceholder && (
                    <div className={styles.placeholder}>
                        <Hammer size={20} className={styles.placeholderIcon} />
                        <div>
                            <h3>Bu profil yakında güncellenecek</h3>
                            <p>
                                {person.name} için detaylı içerik (kariyer, projeler, eğitim) hazırlanıyor.
                                Şablon hazır; veri eklendikçe otomatik olarak doldurulacaktır.
                            </p>
                        </div>
                    </div>
                )}

                {person.about && (
                    <Section icon={<Sparkles size={20} />} title="Hakkında">
                        <p className={styles.paragraph}>{person.about}</p>
                    </Section>
                )}

                {person.skills && person.skills.length > 0 && (
                    <Section icon={<Code2 size={20} />} title="Yetenekler & Teknolojiler">
                        <div className={styles.skillsGrid}>
                            {person.skills.map((group) => (
                                <div key={group.category} className={styles.skillCard}>
                                    <h4>{group.category}</h4>
                                    <div className={styles.chipList}>
                                        {group.items.map((item) => (
                                            <span key={item} className={styles.chip}>
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {person.experience && person.experience.length > 0 && (
                    <Section icon={<Briefcase size={20} />} title="Deneyim">
                        <div className={styles.timeline}>
                            {person.experience.map((exp, i) => (
                                <div key={i} className={styles.timelineItem}>
                                    <div className={styles.timelineDot} />
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelineHead}>
                                            <h4>{exp.title}</h4>
                                            <span className={styles.period}>{exp.period}</span>
                                        </div>
                                        <p className={styles.company}>
                                            {exp.company}
                                            {exp.location && ` • ${exp.location}`}
                                        </p>
                                        <p className={styles.expDesc}>{exp.description}</p>
                                        {exp.highlights && (
                                            <ul className={styles.highlights}>
                                                {exp.highlights.map((h, j) => (
                                                    <li key={j}>{h}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {person.projects && person.projects.length > 0 && (
                    <Section icon={<FolderGit2 size={20} />} title="Projeler">
                        <div className={styles.projectsGrid}>
                            {person.projects.map((project, i) => (
                                <article
                                    key={i}
                                    className={`${styles.projectCard} ${project.highlight ? styles.projectHighlight : ''}`}
                                >
                                    <header className={styles.projectHead}>
                                        <h4>{project.name}</h4>
                                        {project.highlight && (
                                            <span className={styles.starBadge}>★ Öne Çıkan</span>
                                        )}
                                    </header>
                                    <p className={styles.projectDesc}>{project.description}</p>
                                    <div className={styles.chipList}>
                                        {project.tech.map((t) => (
                                            <span key={t} className={styles.chip}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className={styles.projectLinks}>
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={styles.projectLink}
                                            >
                                                <ExternalLink size={14} /> Detay
                                            </a>
                                        )}
                                        {project.repo && (
                                            <a
                                                href={project.repo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={styles.projectLink}
                                            >
                                                <Github size={14} /> Repo
                                            </a>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Section>
                )}

                {person.education && person.education.length > 0 && (
                    <Section icon={<GraduationCap size={20} />} title="Eğitim">
                        <div className={styles.eduList}>
                            {person.education.map((edu, i) => (
                                <div key={i} className={styles.eduItem}>
                                    <h4>{edu.degree}</h4>
                                    <p className={styles.eduSchool}>{edu.school}</p>
                                    <span className={styles.period}>{edu.year}</span>
                                    {edu.detail && <p className={styles.eduDetail}>{edu.detail}</p>}
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {person.certifications && person.certifications.length > 0 && (
                    <Section icon={<Award size={20} />} title="Sertifikalar">
                        <div className={styles.certGrid}>
                            {person.certifications.map((c, i) => (
                                <div key={i} className={styles.certItem}>
                                    <Award size={18} className={styles.certIcon} />
                                    <div>
                                        <h5>{c.name}</h5>
                                        <p>
                                            {c.issuer} • {c.year}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}
            </div>
        </div>
    );
}

interface SectionProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>{icon}</span>
                <h2>{title}</h2>
            </div>
            {children}
        </section>
    );
}

function SocialLinks({ social }: { social: NonNullable<PortfolioPerson['social']> }) {
    const items: { key: keyof typeof social; href?: string; icon: React.ReactNode; label: string }[] = [
        { key: 'github', href: social.github, icon: <Github size={16} />, label: 'GitHub' },
        { key: 'linkedin', href: social.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn' },
        { key: 'twitter', href: social.twitter, icon: <Twitter size={16} />, label: 'Twitter' },
        { key: 'website', href: social.website, icon: <Globe size={16} />, label: 'Web sitesi' },
        {
            key: 'email',
            href: social.email ? `mailto:${social.email}` : undefined,
            icon: <Mail size={16} />,
            label: 'E-posta',
        },
    ];

    const active = items.filter((i) => i.href);
    if (active.length === 0) return null;

    return (
        <div className={styles.socials}>
            {active.map((i) => (
                <a
                    key={i.key}
                    href={i.href}
                    target={i.key === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    className={styles.socialLink}
                    aria-label={i.label}
                    title={i.label}
                >
                    {i.icon}
                </a>
            ))}
        </div>
    );
}

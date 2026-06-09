import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase, UserCircle2 } from 'lucide-react';
import { useData } from '../hooks/useData';
import type { PortfolioData } from '../types';
import { resolvePortfolioAsset } from '../utils/portfolioAssets';
import styles from './PortfolioPage.module.css';

export default function PortfolioPage() {
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

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className="section-title">Portfolyo</h1>
                    <p className="section-subtitle">
                        Yazılım geliştirme, UI/UX tasarımı ve mobil uygulama alanlarında çalışan
                        ekip üyelerimizin profillerini inceleyin.
                    </p>
                </div>

                <div className={styles.grid}>
                    {data.people.map((person) => (
                        <Link
                            key={person.slug}
                            to={`/portfolyo/${person.slug}`}
                            className={styles.card}
                        >
                            <div className={styles.cardTop}>
                                {(() => {
                                    const imgSrc = resolvePortfolioAsset(person.avatarImage);
                                    return (
                                        <div
                                            className={`${styles.avatar} ${styles[`avatar_${person.fieldColor}`]} ${imgSrc ? styles.avatarHasImage : ''}`}
                                            aria-hidden="true"
                                        >
                                            {imgSrc ? (
                                                <img
                                                    src={imgSrc}
                                                    alt={person.name}
                                                    className={styles.avatarImg}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                person.avatar
                                            )}
                                        </div>
                                    );
                                })()}
                                <span
                                    className={`${styles.fieldBadge} ${styles[`field_${person.fieldColor}`]}`}
                                >
                                    {person.field}
                                </span>
                            </div>

                            <h3 className={styles.name}>{person.name}</h3>
                            <p className={styles.title}>
                                <Briefcase size={14} />
                                {person.title}
                            </p>

                            <p className={styles.bio}>{person.shortBio}</p>

                            <div className={styles.meta}>
                                {person.location && (
                                    <span className={styles.metaItem}>
                                        <MapPin size={14} />
                                        {person.location}
                                    </span>
                                )}
                                {person.yearsOfExperience !== undefined && (
                                    <span className={styles.metaItem}>
                                        <UserCircle2 size={14} />
                                        {person.yearsOfExperience}+ yıl deneyim
                                    </span>
                                )}
                            </div>

                            <div className={styles.cardFooter}>
                                <span className={styles.viewProfile}>
                                    Profili Gör
                                    <ArrowRight size={16} />
                                </span>
                                {person.available ? (
                                    <span className={styles.statusActive}>● Aktif</span>
                                ) : (
                                    <span className={styles.statusSoon}>Yakında</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

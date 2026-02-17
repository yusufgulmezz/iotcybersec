import { Shield, Radar, BrainCircuit, Eye } from 'lucide-react';
import { useData } from '../../hooks/useData';
import type { ScopeData } from '../../types';
import styles from './ScopeSection.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    Shield,
    Radar,
    BrainCircuit,
    Eye,
};

export default function ScopeSection() {
    const { data } = useData<ScopeData>('/data/scope.json');

    if (!data) return null;

    return (
        <section className={styles.scopeSection} id="scope">
            <div className={styles.container}>
                <h2 className="section-title">Etkinlik Kapsamı</h2>
                <p className="section-subtitle">
                    5 günlük program boyunca ele alınacak ana konu alanları
                </p>

                <div className={styles.grid}>
                    {data.sections.map((section) => {
                        const IconComponent = iconMap[section.icon] || Shield;
                        return (
                            <div key={section.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconBox}>
                                        <IconComponent size={22} />
                                    </div>
                                    <h3 className={styles.cardTitle}>{section.title}</h3>
                                </div>
                                <p className={styles.cardDesc}>{section.description}</p>
                                <ul className={styles.detailList}>
                                    {section.details.map((detail, i) => (
                                        <li key={i} className={styles.detailItem}>
                                            <span className={styles.detailDot} />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

import { useData } from '../hooks/useData';
import type { EventData } from '../types';
import {
    Target, BookOpen, Users, GraduationCap, Award,
    CheckCircle, Globe, FlaskConical, Sparkles
} from 'lucide-react';
import styles from './AboutPage.module.css';

export default function AboutPage() {
    const { data, loading } = useData<EventData>('/data/event.json');

    if (loading || !data) {
        return <div className={styles.page}><div className={styles.container}>Yükleniyor...</div></div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Başlık */}
                <div className={styles.header}>
                    <h1 className="section-title">Etkinlik Hakkında</h1>
                    <p className="section-subtitle">{data.topic}</p>
                </div>

                {/* Etkinlik Amacı */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Target size={22} className={styles.sectionIcon} />
                        <h2>Etkinliğin Amacı</h2>
                    </div>
                    <div className={styles.purposeList}>
                        {data.purpose.map((item, i) => (
                            <div key={i} className={styles.purposeItem}>
                                <CheckCircle size={18} className={styles.checkIcon} />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bilgi Gridleri */}
                <div className={styles.infoGrid}>
                    <div className={styles.infoCard}>
                        <BookOpen size={22} className={styles.cardIcon} />
                        <h3>Faaliyet Alanı</h3>
                        <p>{data.activityArea}</p>
                    </div>
                    <div className={styles.infoCard}>
                        <GraduationCap size={22} className={styles.cardIcon} />
                        <h3>Disiplin Türü</h3>
                        <p>{data.discipline}</p>
                    </div>
                    <div className={styles.infoCard}>
                        <Globe size={22} className={styles.cardIcon} />
                        <h3>Öncelikli Alan</h3>
                        <p>{data.priorityArea}</p>
                    </div>
                    <div className={styles.infoCard}>
                        <FlaskConical size={22} className={styles.cardIcon} />
                        <h3>Anahtar Kelimeler</h3>
                        <div className={styles.keywords}>
                            {data.keywords.map((kw, i) => (
                                <span key={i} className={styles.keyword}>{kw}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Ar-Ge */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Sparkles size={22} className={styles.sectionIcon} />
                        <h2>Ar-Ge ve Yenilik</h2>
                    </div>
                    <p className={styles.paragraph}>{data.rdAndInnovation}</p>
                </section>

                {/* Hedef Kitle */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Users size={22} className={styles.sectionIcon} />
                        <h2>Hedef Kitle</h2>
                    </div>
                    <div className={styles.audienceGrid}>
                        <div className={styles.audienceItem}>
                            <h4>Profil</h4>
                            <p>{data.targetAudience.profile}</p>
                        </div>
                        <div className={styles.audienceItem}>
                            <h4>Ön Koşul</h4>
                            <p>{data.targetAudience.prerequisites}</p>
                        </div>
                        <div className={styles.audienceItem}>
                            <h4>Seçim Ölçütleri</h4>
                            <p>{data.targetAudience.selectionCriteria}</p>
                        </div>
                        <div className={styles.audienceItem}>
                            <h4>Öncelik</h4>
                            <p>{data.targetAudience.priority}</p>
                        </div>
                    </div>
                </section>

                {/* Öğretim Yöntemleri */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <BookOpen size={22} className={styles.sectionIcon} />
                        <h2>Öğretim Yöntemleri ve Programın Niteliği</h2>
                    </div>
                    <p className={styles.paragraph}>{data.teachingMethods}</p>
                </section>

                {/* Kadro */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Award size={22} className={styles.sectionIcon} />
                        <h2>Yürütücü ve Eğitici Kadro</h2>
                    </div>
                    <div className={styles.committeeGrid}>
                        <div className={styles.committeeCard}>
                            <h4>Düzenleme Kurulu</h4>
                            <p>{data.organizationCommittee}</p>
                        </div>
                        <div className={styles.committeeCard}>
                            <h4>Bilim Kurulu</h4>
                            <p>{data.scienceCommittee}</p>
                        </div>
                        <div className={styles.committeeCard}>
                            <h4>Eğitici Kadrosu</h4>
                            <p>{data.instructorQuality}</p>
                        </div>
                        <div className={styles.committeeCard}>
                            <h4>Eğiticiler / Danışmanlar</h4>
                            <p>{data.advisors}</p>
                        </div>
                    </div>
                </section>

                {/* Yaygın Etki */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Globe size={22} className={styles.sectionIcon} />
                        <h2>Yaygın Etki</h2>
                    </div>
                    <div className={styles.impactList}>
                        {data.impact.map((item, i) => (
                            <div key={i} className={styles.purposeItem}>
                                <CheckCircle size={18} className={styles.checkIcon} />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

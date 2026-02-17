import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Calendar, Users, Clock } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBg}>
                <div className={styles.gridOverlay} />
            </div>

            <div className={styles.heroContent}>
                <div className={styles.badge}>
                    <Shield size={16} />
                    TÜBİTAK 2237-A Destekli Etkinlik
                </div>

                <h1 className={styles.title}>
                    IoT<span className={styles.titleAccent}>CyberSec</span>
                </h1>
                <p className={styles.subtitle}>
                    IoT ekosistemlerinde artan cihaz sayısı ve dağıtık mimariler sonucu ortaya
                    çıkan siber güvenlik riskleri, güvenli mimari tasarımı ve koruyucu güvenlik
                    mekanizmalarının uygulanmasını öğrenin.
                </p>

                <div className={styles.actions}>
                    <Link to="/basvuru" className="btn btn-primary">
                        Hemen Başvur
                        <ArrowRight size={18} />
                    </Link>
                    <Link to="/program" className="btn btn-secondary">
                        Programı İncele
                    </Link>
                </div>

                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>5</div>
                        <div className={styles.statLabel}>
                            <Calendar size={14} style={{ display: 'inline', marginRight: 4 }} />
                            Gün
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>40</div>
                        <div className={styles.statLabel}>
                            <Users size={14} style={{ display: 'inline', marginRight: 4 }} />
                            Kontenjan
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>Ücretsiz</div>
                        <div className={styles.statLabel}>
                            <Clock size={14} style={{ display: 'inline', marginRight: 4 }} />
                            Katılım
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Link } from 'react-router-dom';
import { Shield, Mail, MapPin, ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className={styles.footerBrand}>
                    <h3>
                        <Shield size={20} style={{ color: '#00d4aa' }} />
                        IoT<span className={styles.accent}>CyberSec</span>
                    </h3>
                    <p>
                        IoT ekosistemlerinde siber güvenlik eğitim etkinliği. TÜBİTAK 2237-A
                        desteğiyle düzenlenmektedir.
                    </p>
                    <div className={styles.supportBadge}>
                        <ExternalLink size={14} />
                        TÜBİTAK Destekli
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <h4>Sayfalar</h4>
                    <ul className={styles.footerLinks}>
                        <li><Link to="/">Ana Sayfa</Link></li>
                        <li><Link to="/hakkinda">Hakkında</Link></li>
                        <li><Link to="/program">Program</Link></li>
                        <li><Link to="/basvuru">Başvuru</Link></li>
                        <li><Link to="/iletisim">İletişim</Link></li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4>Konular</h4>
                    <ul className={styles.footerLinks}>
                        <li><a href="#scope">MQTT Güvenliği</a></li>
                        <li><a href="#scope">Saldırı Tespit (IDS)</a></li>
                        <li><a href="#scope">Makine Öğrenmesi</a></li>
                        <li><a href="#scope">XAI</a></li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4>İletişim</h4>
                    <ul className={styles.footerLinks}>
                        <li>
                            <a href="mailto:iotcybersec@sakarya.edu.tr">
                                <Mail size={14} />
                                iotcybersec@sakarya.edu.tr
                            </a>
                        </li>
                        <li>
                            <a href="#contact">
                                <MapPin size={14} />
                                Sakarya Üniversitesi
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <span>© 2025 IoTCyberSec — Tüm Hakları Saklıdır.</span>
                <span>Sakarya Üniversitesi</span>
            </div>
        </footer>
    );
}

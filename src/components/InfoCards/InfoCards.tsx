import { ShieldCheck, BookOpen, Award } from 'lucide-react';
import styles from './InfoCards.module.css';

const cards = [
    {
        icon: ShieldCheck,
        iconClass: styles.icon1,
        title: 'IoT Siber Güvenlik',
        description:
            'IoT ekosistemlerinde MQTT/CoAP protokol güvenliği, saldırı vektörleri ve savunma mekanizmalarını derinlemesine öğrenin.',
    },
    {
        icon: BookOpen,
        iconClass: styles.icon2,
        title: 'Uygulamalı Eğitim',
        description:
            'Teorik dersler, etkileşimli çalıştaylar ve gerçek veri setleri üzerinden Hands-on Lab oturumlarıyla hibrit eğitim metodu.',
    },
    {
        icon: Award,
        iconClass: styles.icon3,
        title: 'Katılım Sertifikası',
        description:
            'Etkinlik sonunda katılımcılara TÜBİTAK onaylı katılım sertifikası verilecektir. İaşe ve konaklama TÜBİTAK tarafından karşılanır.',
    },
];

export default function InfoCards() {
    return (
        <section className={styles.infoSection}>
            <div className={styles.container}>
                <h2 className="section-title">Neden IoTCyberSec?</h2>
                <p className="section-subtitle">
                    IoT güvenliği alanında kapsamlı, uygulamalı ve TÜBİTAK destekli bir eğitim deneyimi
                </p>
                <div className={styles.grid}>
                    {cards.map((card, index) => (
                        <div key={index} className={styles.card}>
                            <div className={`${styles.iconWrapper} ${card.iconClass}`}>
                                <card.icon size={24} />
                            </div>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardDesc}>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

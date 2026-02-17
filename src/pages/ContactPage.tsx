import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className="section-title">İletişim</h1>
                <p className="section-subtitle">
                    Sorularınız ve detaylı bilgi için bizimle iletişime geçebilirsiniz.
                </p>

                <div className={styles.grid}>
                    {/* İletişim Bilgileri */}
                    <div className={styles.infoSection}>
                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <Mail size={22} />
                            </div>
                            <div>
                                <h3>E-posta</h3>
                                <a href="mailto:iotcybersec@sakarya.edu.tr">iotcybersec@sakarya.edu.tr</a>
                            </div>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h3>Adres</h3>
                                <p>Sakarya Üniversitesi<br />Bilgisayar ve Bilişim Bilimleri Fakültesi<br />Esentepe Kampüsü, Serdivan/Sakarya</p>
                            </div>
                        </div>

                        <div className={styles.contactCard}>
                            <div className={styles.contactIcon}>
                                <Phone size={22} />
                            </div>
                            <div>
                                <h3>Telefon</h3>
                                <p>+90 (264) 295 XX XX</p>
                            </div>
                        </div>

                        {/* Harita */}
                        <div className={styles.mapContainer}>
                            <iframe
                                title="Sakarya Üniversitesi Konum"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.0!2d30.3310!3d40.7410!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409fcf2e5b2a5c7d%3A0x8e8e8e8e8e8e8e8e!2sSakarya%20University!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                                width="100%"
                                height="220"
                                style={{ border: 'none', borderRadius: '12px' }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* İletişim Formu */}
                    <div className={styles.formContainer}>
                        {sent ? (
                            <div className={styles.sentMessage}>
                                <Mail size={40} style={{ color: 'var(--accent-primary)', marginBottom: 16 }} />
                                <h3>Mesajınız Gönderildi!</h3>
                                <p>En kısa sürede size dönüş yapılacaktır.</p>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formGroup}>
                                    <label>Ad Soyad</label>
                                    <input type="text" placeholder="Adınız Soyadınız" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>E-posta</label>
                                    <input type="email" placeholder="ornek@mail.com" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Konu</label>
                                    <input type="text" placeholder="Mesaj konusu" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mesaj</label>
                                    <textarea placeholder="Mesajınızı yazınız..." rows={5} required />
                                </div>
                                <button type="submit" className={styles.sendButton}>
                                    <Send size={18} />
                                    Gönder
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

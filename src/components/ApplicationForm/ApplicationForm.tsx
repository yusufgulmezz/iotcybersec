import { useState, type FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import styles from './ApplicationForm.module.css';

export default function ApplicationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [hasThesis, setHasThesis] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Gerçek API entegrasyonu yapılabilir
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={styles.form}>
                <div className={styles.successMessage}>
                    <div className={styles.successIcon}>
                        <CheckCircle size={32} />
                    </div>
                    <h3>Başvurunuz Alındı!</h3>
                    <p>Başvurunuz değerlendirilecek ve sonuç e-posta ile bildirilecektir.</p>
                </div>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        Ad <span className={styles.required}>*</span>
                    </label>
                    <input type="text" className={styles.formInput} placeholder="Adınız" required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        Soyad <span className={styles.required}>*</span>
                    </label>
                    <input type="text" className={styles.formInput} placeholder="Soyadınız" required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        E-posta <span className={styles.required}>*</span>
                    </label>
                    <input type="email" className={styles.formInput} placeholder="ornek@mail.com" required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Telefon</label>
                    <input type="tel" className={styles.formInput} placeholder="05XX XXX XX XX" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        Üniversite <span className={styles.required}>*</span>
                    </label>
                    <input type="text" className={styles.formInput} placeholder="Üniversiteniz" required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        Bölüm <span className={styles.required}>*</span>
                    </label>
                    <input type="text" className={styles.formInput} placeholder="Bölümünüz" required />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        Öğrenim Düzeyi <span className={styles.required}>*</span>
                    </label>
                    <select className={styles.formSelect} required defaultValue="">
                        <option value="" disabled>Seçiniz</option>
                        <option value="lisans">Lisans (3. veya 4. Sınıf)</option>
                        <option value="yuksek-lisans">Yüksek Lisans</option>
                        <option value="doktora">Doktora</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                        GNO (4'lük) <span className={styles.required}>*</span>
                    </label>
                    <input type="text" className={styles.formInput} placeholder="3.25" required />
                </div>

                <div className={styles.checkboxGroup}>
                    <input
                        type="checkbox"
                        id="hasThesis"
                        className={styles.checkbox}
                        checked={hasThesis}
                        onChange={(e) => setHasThesis(e.target.checked)}
                    />
                    <label htmlFor="hasThesis" className={styles.checkboxLabel}>
                        IoT/Siber Güvenlik alanında tez çalışmam var
                    </label>
                </div>

                {hasThesis && (
                    <div className={`${styles.formGroup} ${styles.full}`}>
                        <label className={styles.formLabel}>Tez Konusu</label>
                        <input type="text" className={styles.formInput} placeholder="Tez konunuzu yazınız" />
                    </div>
                )}

                <div className={`${styles.formGroup} ${styles.full}`}>
                    <label className={styles.formLabel}>
                        Motivasyon <span className={styles.required}>*</span>
                    </label>
                    <textarea
                        className={styles.formTextarea}
                        placeholder="Bu etkinliğe neden katılmak istiyorsunuz? IoT güvenliği alanındaki çalışma motivasyonunuzu açıklayınız."
                        required
                    />
                </div>

                <div className={styles.submitContainer}>
                    <button type="submit" className={styles.submitButton}>
                        <Send size={18} />
                        Başvuru Gönder
                    </button>
                </div>
            </div>
        </form>
    );
}

import ApplicationForm from '../components/ApplicationForm/ApplicationForm';
import { useData } from '../hooks/useData';
import type { EventData } from '../types';
import { ClipboardCheck, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './ApplicationPage.module.css';

export default function ApplicationPage() {
    const { data } = useData<EventData>('/data/event.json');

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className="section-title">Başvuru</h1>
                <p className="section-subtitle">
                    IoTCyberSec eğitim etkinliğine başvurmak için aşağıdaki formu doldurunuz.
                </p>

                {/* Başvuru Koşulları */}
                <div className={styles.conditions}>
                    <div className={styles.conditionHeader}>
                        <ClipboardCheck size={20} />
                        <h2>Başvuru Koşulları</h2>
                    </div>
                    <div className={styles.conditionGrid}>
                        <div className={styles.conditionItem}>
                            <CheckCircle size={16} className={styles.condCheck} />
                            <span>{data?.targetAudience.profile || 'Bilgisayar, Yazılım, Elektrik-Elektronik Mühendisliği lisans/lisansüstü öğrencileri'}</span>
                        </div>
                        <div className={styles.conditionItem}>
                            <CheckCircle size={16} className={styles.condCheck} />
                            <span>{data?.targetAudience.prerequisites || 'Temel düzeyde Python bilgisi ve ağ kavramlarına aşinalık'}</span>
                        </div>
                        <div className={styles.conditionItem}>
                            <CheckCircle size={16} className={styles.condCheck} />
                            <span>{data?.targetAudience.selectionCriteria || 'GNO, motivasyon ve farklı üniversitelerden katılım dengesi'}</span>
                        </div>
                        <div className={styles.conditionItem}>
                            <AlertCircle size={16} className={styles.condPriority} />
                            <span>{data?.targetAudience.priority || 'IoT/Siber Güvenlik alanında tez çalışması yapanlara öncelik'}</span>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <ApplicationForm />
            </div>
        </div>
    );
}

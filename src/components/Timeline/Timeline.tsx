import { useState } from 'react';
import { useData } from '../../hooks/useData';
import type { ProgramData, ProgramEvent } from '../../types';
import styles from './Timeline.module.css';

function getBadgeClass(type: ProgramEvent['type']): string {
    const map: Record<string, string> = {
        'TEORİK': 'badge-teorik',
        'UYGULAMA': 'badge-uygulama',
        'ÇALIŞTAY': 'badge-calistay',
        'ARA': 'badge-ara',
        'YEMEK': 'badge-yemek',
        'AÇILIŞ': 'badge-acilis',
        'KAPANIŞ': 'badge-kapanis',
    };
    return map[type] || 'badge-teorik';
}

function isBreakEvent(type: ProgramEvent['type']): boolean {
    return type === 'ARA' || type === 'YEMEK';
}

export default function Timeline() {
    const { data, loading } = useData<ProgramData>('/data/program.json');
    const [activeDay, setActiveDay] = useState(0);

    if (loading || !data) {
        return (
            <section className={styles.timelineSection}>
                <div className={styles.container}>
                    <h2 className="section-title">Eğitim Programı</h2>
                    <p className="section-subtitle">Yükleniyor...</p>
                </div>
            </section>
        );
    }

    const currentDay = data.days[activeDay];

    return (
        <section className={styles.timelineSection} id="program">
            <div className={styles.container}>
                <h2 className="section-title">Eğitim Programı</h2>
                <p className="section-subtitle">
                    5 günlük yoğun eğitim programı — teori, uygulama ve çalıştaylar
                </p>

                <div className={styles.dayTabs}>
                    {data.days.map((day, index) => (
                        <button
                            key={day.day}
                            className={`${styles.dayTab} ${index === activeDay ? styles.active : ''}`}
                            onClick={() => setActiveDay(index)}
                        >
                            {day.day}. Gün
                        </button>
                    ))}
                </div>

                <h3 className={styles.dayTitle}>{currentDay.title}</h3>

                <div className={styles.timeline}>
                    {currentDay.events.map((event) => {
                        const isBreak = isBreakEvent(event.type);
                        return (
                            <div
                                key={event.id}
                                className={`${styles.timelineItem} ${isBreak ? (event.type === 'ARA' ? styles.ara : styles.yemek) : ''}`}
                            >
                                <div className={styles.timelineDot} />
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineHeader}>
                                        <span className={styles.timelineTime}>{event.time}</span>
                                        <span className={`badge ${getBadgeClass(event.type)}`}>{event.type}</span>
                                    </div>
                                    <div className={styles.timelineTitle}>{event.title}</div>
                                    {event.description && !isBreak && (
                                        <p className={styles.timelineDesc}>{event.description}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

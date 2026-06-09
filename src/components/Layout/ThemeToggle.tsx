import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
    variant?: 'icon' | 'full';
}

export default function ThemeToggle({ variant = 'icon' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const label = isDark ? 'Açık temaya geç' : 'Koyu temaya geç';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`${styles.toggle} ${variant === 'full' ? styles.full : ''}`}
            aria-label={label}
            title={label}
        >
            {isDark ? (
                <Sun size={18} className={styles.icon} />
            ) : (
                <Moon size={18} className={styles.icon} />
            )}
            {variant === 'full' && <span>{isDark ? 'Açık tema' : 'Koyu tema'}</span>}
        </button>
    );
}

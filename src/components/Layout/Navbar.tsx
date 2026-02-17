import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navItems = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/hakkinda', label: 'Hakkında' },
    { path: '/program', label: 'Program' },
    { path: '/basvuru', label: 'Başvuru' },
    { path: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles.navbarInner}>
                    <Link to="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <Shield size={20} />
                        </div>
                        IoT<span className={styles.logoAccent}>CyberSec</span>
                    </Link>

                    <ul className={styles.navLinks}>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link to="/basvuru" className={styles.ctaButton}>
                        Hemen Başvur
                    </Link>

                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Menü"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
                <ul className={styles.mobileNavLinks}>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.active : ''}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link to="/basvuru" className={`${styles.ctaButton} ${styles.mobileCta}`}>
                    Hemen Başvur
                </Link>
            </div>
        </>
    );
}

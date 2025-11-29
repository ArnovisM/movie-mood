import React from 'react';
import { Film, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <nav className="glass" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                padding: '1rem 0'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <Film color="var(--primary)" />
                        <span className="text-gradient">MovieMood</span>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <Link to="/watchlist" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                            Watchlist
                        </Link>
                        <button onClick={toggleTheme} style={{ color: 'var(--text-secondary)' }}>
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                </div>
            </nav>


        </>
    );
};

export default Navbar;

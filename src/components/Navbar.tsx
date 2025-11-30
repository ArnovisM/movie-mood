import React, { useState } from 'react';
import { Film, Sun, Moon, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SuggestionBox from './SuggestionBox';

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

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
                        <span className="text-gradient">VibeCine</span>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button
                            onClick={() => setIsSuggestionOpen(true)}
                            style={{
                                color: 'var(--text-secondary)',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <MessageSquare size={18} />
                            <span style={{ display: 'none', '@media (min-width: 640px)': { display: 'inline' } } as any}>Suggestions</span>
                        </button>
                        <Link to="/watchlist" style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
                            Watchlist
                        </Link>
                        <button onClick={toggleTheme} style={{ color: 'var(--text-secondary)' }}>
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            <SuggestionBox isOpen={isSuggestionOpen} onClose={() => setIsSuggestionOpen(false)} />
        </>
    );
};

export default Navbar;

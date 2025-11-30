import React from 'react';
import { moods, Mood } from '../services/moods';
import { useNavigate, Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import DailyRecommendation from './DailyRecommendation';

const MoodSelector: React.FC = () => {
    const navigate = useNavigate();

    const handleMoodSelect = (mood: Mood) => {
        navigate(`/recommendations/${mood.id}`);
    };

    return (
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    How are you <span className="text-gradient">feeling</span> today?
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                    Select your mood and let us find the perfect movie for you.
                </p>
            </div>

            <DailyRecommendation />

            <div className="mood-grid">
                {moods.map((mood) => (
                    <button
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood)}
                        className="glass glass-hover"
                        style={{
                            padding: '2rem',
                            borderRadius: '1rem',
                            textAlign: 'left',
                            transition: 'transform 0.3s ease, background 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{
                            fontSize: '3rem',
                            background: 'rgba(255,255,255,0.1)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {mood.emoji}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', color: mood.color, marginBottom: '0.5rem' }}>{mood.label}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{mood.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <div className="glass" style={{
                    padding: '3rem',
                    borderRadius: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                        Feeling <span className="text-gradient">Complex?</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        Create a custom blend of moods to find movies that match your exact vibe.
                    </p>
                    <Link
                        to="/mix"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem 2rem',
                            borderRadius: '3rem',
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Layers size={20} />
                        Create Custom Mix
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MoodSelector;

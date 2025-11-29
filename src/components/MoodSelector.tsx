import React from 'react';
import { moods, Mood } from '../services/moods';
import { useNavigate } from 'react-router-dom';
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
        </div>
    );
};

export default MoodSelector;

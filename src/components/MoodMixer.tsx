import React, { useState } from 'react';
import { extendedMoods, Mood } from '../services/moods';
import { useNavigate, Link } from 'react-router-dom';
import { Play, ArrowLeft, Check } from 'lucide-react';

const MoodMixer: React.FC = () => {
    const navigate = useNavigate();
    const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

    const handleMoodSelect = (mood: Mood) => {
        setSelectedMoods(prev => {
            if (prev.includes(mood.id)) {
                return prev.filter(id => id !== mood.id);
            } else {
                if (prev.length >= 5) return prev; // Increased limit to 5 for more fun
                return [...prev, mood.id];
            }
        });
    };

    const handleStartMix = () => {
        if (selectedMoods.length > 0) {
            navigate(`/recommendations/mix?moods=${selectedMoods.join(',')}`);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <Link
                to="/"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
                <ArrowLeft size={20} />
                Back to Home
            </Link>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    Mix Your <span className="text-gradient">Vibe</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                    Select up to 5 vibes to create your perfect movie blend.
                </p>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'center',
                maxWidth: '900px',
                margin: '0 auto'
            }}>
                {extendedMoods.map((mood) => {
                    const isSelected = selectedMoods.includes(mood.id);
                    return (
                        <button
                            key={mood.id}
                            onClick={() => handleMoodSelect(mood)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '2rem',
                                border: '1px solid',
                                borderColor: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: isSelected ? 'white' : 'var(--text-primary)',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: isSelected ? '0 4px 12px rgba(var(--primary-rgb), 0.3)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSelected) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            <span>{mood.emoji}</span>
                            <span style={{ fontWeight: isSelected ? '600' : '400' }}>{mood.label}</span>
                            {isSelected && <Check size={16} />}
                        </button>
                    );
                })}
            </div>

            {selectedMoods.length > 0 && (
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 100
                }}>
                    <button
                        onClick={handleStartMix}
                        className="glass"
                        style={{
                            padding: '1rem 2rem',
                            borderRadius: '3rem',
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            animation: 'bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        <Play fill="white" size={20} />
                        Mix & Match ({selectedMoods.length})
                    </button>
                    <style>{`
                        @keyframes bounceIn {
                            from { transform: scale(0.5); opacity: 0; }
                            to { transform: scale(1); opacity: 1; }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default MoodMixer;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { moods } from '../services/moods';
import { getMoviesByMood, Movie } from '../services/api';
import MovieCard from './MovieCard';

const MovieGrid: React.FC = () => {
    const { moodId } = useParams<{ moodId: string }>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProvider, setSelectedProvider] = useState<string>('');

    const mood = moods.find(m => m.id === moodId);

    const providers = [
        { id: '8', name: 'Netflix' },
        { id: '9', name: 'Amazon Prime' },
        { id: '337', name: 'Disney+' },
        { id: '1899', name: 'Max' }
    ];

    useEffect(() => {
        const fetchMovies = async () => {
            if (mood) {
                setLoading(true);
                const results = await getMoviesByMood(mood.genreIds, mood.id, selectedProvider);
                setMovies(results);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [mood, selectedProvider]);

    if (!mood) return <div className="container" style={{ paddingTop: '6rem' }}>Mood not found</div>;

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
                Back to Moods
            </Link>

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Movies for a <span style={{ color: mood.color }}>{mood.label}</span> mood
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    {mood.description} Here are our top picks for you.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Filter by:</span>
                    {providers.map(provider => (
                        <button
                            key={provider.id}
                            onClick={() => setSelectedProvider(prev => prev === provider.id ? '' : provider.id)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '2rem',
                                border: '1px solid',
                                borderColor: selectedProvider === provider.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                background: selectedProvider === provider.id ? 'var(--primary)' : 'transparent',
                                color: selectedProvider === provider.id ? 'white' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {provider.name}
                        </button>
                    ))}
                </div>
            </header>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <div className="animate-spin" style={{
                        width: '3rem',
                        height: '3rem',
                        border: '4px solid var(--bg-card)',
                        borderTopColor: 'var(--primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <div className="movie-grid">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieGrid;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Shuffle, Check } from 'lucide-react';
import { extendedMoods } from '../services/moods';
import { getMoviesByMood, Movie } from '../services/api';
import MovieCard from './MovieCard';

const MovieGrid: React.FC = () => {
    const { moodId } = useParams<{ moodId: string }>();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
    const [page, setPage] = useState<number>(1);

    // Determine if we are in mix mode
    const isMixMode = location.pathname.includes('/mix');
    const mixMoodIds = searchParams.get('moods')?.split(',') || [];

    // Get mood data - Use extendedMoods to support all new moods
    const mood = !isMixMode ? extendedMoods.find(m => m.id === moodId) : null;
    const mixMoods = isMixMode ? extendedMoods.filter(m => mixMoodIds.includes(m.id)) : [];

    // Derived data for display
    const displayLabel = isMixMode
        ? mixMoods.map(m => m.label).join(' & ')
        : mood?.label;



    const displayDescription = isMixMode
        ? "A unique blend of vibes just for you."
        : mood?.description;

    const handleShuffle = () => {
        // Random page between 1 and 10
        const randomPage = Math.floor(Math.random() * 10) + 1;
        setPage(randomPage);
    };

    const providers = [
        { id: '8', name: 'Netflix' },
        { id: '9', name: 'Amazon Prime' },
        { id: '337', name: 'Disney+' },
        { id: '1899', name: 'Max' }
    ];

    useEffect(() => {
        const fetchMovies = async () => {
            if (mood || (isMixMode && mixMoods.length > 0)) {
                setLoading(true);

                let genreIds: number[] = [];
                let currentMoodId = '';
                let separator = ',';

                if (isMixMode) {
                    // Combine all genres from selected moods
                    const allGenres = mixMoods.flatMap(m => m.genreIds);
                    // Remove duplicates
                    genreIds = [...new Set(allGenres)];
                    currentMoodId = 'mix';
                    separator = '|'; // Use OR for mixed moods
                } else if (mood) {
                    genreIds = mood.genreIds;
                    currentMoodId = mood.id;
                    separator = ','; // Use AND for single mood
                }

                const providersString = selectedProviders.join('|');

                const results = await getMoviesByMood(genreIds, currentMoodId, providersString, page, separator);
                setMovies(results);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [moodId, isMixMode, searchParams, selectedProviders, page]);

    // Initial random page on mount/mood change
    useEffect(() => {
        setPage(Math.floor(Math.random() * 5) + 1);
    }, [moodId, searchParams]);

    if (!mood && (!isMixMode || mixMoods.length === 0)) return <div className="container" style={{ paddingTop: '6rem' }}>Mood not found</div>;

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
                    Movies for a <span className={isMixMode ? "text-gradient" : ""} style={{ color: !isMixMode ? mood?.color : undefined }}>{displayLabel}</span> mood
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                    {displayDescription} Here are our top picks for you.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                        onClick={handleShuffle}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--primary)',
                            background: 'transparent',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--primary)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                    >
                        <Shuffle size={16} />
                        Shuffle
                    </button>

                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', margin: '0 0.5rem' }}></div>

                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Filter by:</span>
                    {providers.map(provider => {
                        const isSelected = selectedProviders.includes(provider.id);
                        return (
                            <button
                                key={provider.id}
                                onClick={() => setSelectedProviders(prev =>
                                    prev.includes(provider.id)
                                        ? prev.filter(id => id !== provider.id)
                                        : [...prev, provider.id]
                                )}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '2rem',
                                    border: '1px solid',
                                    borderColor: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                    background: isSelected ? 'var(--primary)' : 'transparent',
                                    color: isSelected ? 'white' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isSelected && <Check size={14} />}
                                {provider.name}
                            </button>
                        );
                    })}
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

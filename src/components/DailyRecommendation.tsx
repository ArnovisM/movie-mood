import React, { useEffect, useState } from 'react';
import { getMoviesByMood, Movie, getImageUrl } from '../services/api';
import { Link } from 'react-router-dom';
import { Calendar, Play, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { createMovieSlug } from '../utils/slug';

const days = [
    { name: 'Sunday', mood: 'Relaxed', genreIds: [35, 10751], color: 'var(--mood-happy)' },
    { name: 'Monday', mood: 'Motivational', genreIds: [18], color: 'var(--mood-adventurous)' },
    { name: 'Tuesday', mood: 'Action-packed', genreIds: [28, 12], color: 'var(--mood-tense)' },
    { name: 'Wednesday', mood: 'Mid-week Fun', genreIds: [35], color: 'var(--mood-happy)' },
    { name: 'Thursday', mood: 'Thrilling', genreIds: [53, 9648], color: 'var(--mood-scary)' },
    { name: 'Friday', mood: 'Party Time', genreIds: [27, 878], color: 'var(--secondary)' },
    { name: 'Saturday', mood: 'Blockbuster', genreIds: [12, 14], color: 'var(--primary)' },
];

const DailyRecommendation: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    const today = new Date().getDay();
    const currentDay = days[today];

    useEffect(() => {
        const fetchDailyMovies = async () => {
            try {
                const fetchedMovies = await getMoviesByMood(currentDay.genreIds, 'daily');
                if (fetchedMovies.length > 0) {
                    // Shuffle and pick 5
                    const shuffled = fetchedMovies.sort(() => 0.5 - Math.random());
                    setMovies(shuffled.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch daily movies", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDailyMovies();
    }, [currentDay.genreIds]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    };

    if (loading || movies.length === 0) return null;

    const movie = movies[currentIndex];

    return (
        <div className="container" style={{ marginBottom: '4rem' }}>
            <div className="glass" style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: '500px'
            }}>
                {/* Background Image with Transition */}
                <div key={movie.id} style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${movie.backdrop_path ? getImageUrl(movie.backdrop_path, 'original') : `https://source.unsplash.com/1600x900/?${currentDay.mood.split(' ')[0]},movie`})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.5,
                    zIndex: 0,
                    transition: 'background-image 0.5s ease-in-out'
                }} />

                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0.1) 100%)',
                    zIndex: 1
                }} />

                <div className="daily-rec-content" style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    width: '100%'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%'
                    }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(0, 0, 0, 0.8)',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            alignSelf: 'flex-start',
                            marginBottom: '1.5rem',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <Calendar size={16} color={currentDay.color} />
                            <span style={{
                                fontWeight: 600,
                                color: '#ffffff'
                            }}>
                                {currentDay.name}'s Picks: <span style={{ color: currentDay.color }}>{currentDay.mood}</span>
                            </span>
                        </div>

                        <div style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            padding: '2rem',
                            borderRadius: '1rem',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            marginBottom: '2rem'
                        }}>
                            <h2 style={{
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                lineHeight: 1.1,
                                animation: 'fadeIn 0.5s ease',
                                color: '#ffffff',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(0, 0, 0, 0.9), 1px -1px 2px rgba(0, 0, 0, 0.9), -1px 1px 2px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.8)'
                            }}>
                                {movie.title}
                            </h2>

                            <p style={{
                                fontSize: '1.1rem',
                                color: '#ffffff',
                                marginBottom: '0',
                                maxWidth: '600px',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                animation: 'fadeIn 0.5s ease 0.1s backwards',
                                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9), -1px -1px 2px rgba(0, 0, 0, 0.9), 1px -1px 2px rgba(0, 0, 0, 0.9), -1px 1px 2px rgba(0, 0, 0, 0.9), 0 0 6px rgba(0, 0, 0, 0.8)'
                            }}>
                                {movie.overview}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Link
                                to={`/movie/${createMovieSlug(movie.title, movie.id)}`}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: '0.75rem',
                                    fontWeight: 'bold',
                                    width: 'fit-content',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Play size={20} fill="currentColor" />
                                View Details
                            </Link>

                            <button
                                onClick={() => {
                                    if (isInWatchlist(movie.id)) {
                                        removeFromWatchlist(movie.id);
                                    } else {
                                        addToWatchlist(movie);
                                    }
                                }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: isInWatchlist(movie.id) ? 'var(--secondary)' : 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: '0.75rem',
                                    fontWeight: 'bold',
                                    width: 'fit-content',
                                    transition: 'all 0.2s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(8px)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                {isInWatchlist(movie.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                                {isInWatchlist(movie.id) ? 'In Watchlist' : 'Add to Watchlist'}
                            </button>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={prevSlide}
                                    className="glass glass-hover"
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '50%',
                                        color: 'var(--text-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="glass glass-hover"
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '50%',
                                        color: 'var(--text-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Dots Indicator */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2rem' }}>
                            {movies.map((_, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: idx === currentIndex ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                                        transition: 'background 0.3s ease'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyRecommendation;

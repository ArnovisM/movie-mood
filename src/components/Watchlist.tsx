import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from './MovieCard';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Watchlist: React.FC = () => {
    const { watchlist } = useWatchlist();

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

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    My <span className="text-gradient">Watchlist</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    {watchlist.length === 0
                        ? 'Your watchlist is empty. Start adding movies you want to watch later!'
                        : `You have ${watchlist.length} movie${watchlist.length !== 1 ? 's' : ''} in your watchlist`
                    }
                </p>
            </header>

            {watchlist.length > 0 && (
                <div className="movie-grid">
                    {watchlist.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;

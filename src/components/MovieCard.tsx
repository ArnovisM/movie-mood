import React, { useState } from 'react';
import { Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { Movie, getImageUrl } from '../services/api';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { createMovieSlug } from '../utils/slug';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(movie.id);

    const handleWatchlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <Link to={`/movie/${createMovieSlug(movie.title, movie.id)}`} style={{ display: 'block' }}>
            <div
                className="glass glass-hover"
                style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={{ position: 'relative', paddingTop: '150%' }}>
                    <img
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(4px)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        <Star size={14} fill="var(--mood-happy)" color="var(--mood-happy)" />
                        {movie.vote_average.toFixed(1)}
                    </div>

                    {/* Watchlist Button */}
                    <button
                        onClick={handleWatchlistClick}
                        style={{
                            position: 'absolute',
                            top: '0.5rem',
                            left: '0.5rem',
                            background: inWatchlist ? 'var(--primary)' : 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(4px)',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            cursor: 'pointer',
                            opacity: isHovered || inWatchlist ? 1 : 0,
                            transform: isHovered || inWatchlist ? 'scale(1)' : 'scale(0.8)',
                            transition: 'all 0.3s ease',
                            color: 'white'
                        }}
                        title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                        {inWatchlist ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    </button>
                </div>

                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {movie.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {new Date(movie.release_date).getFullYear()}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;

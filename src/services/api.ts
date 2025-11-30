import axios from 'axios';
import { getMockMovies } from './mockData';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface Provider {
    provider_id: number;
    provider_name: string;
    logo_path: string;
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime: number;
    tagline: string;
    credits: {
        cast: CastMember[];
    };
    'watch/providers': {
        results: {
            US?: {
                flatrate?: Provider[];
                rent?: Provider[];
                buy?: Provider[];
            };
        };
    };
}

export interface Review {
    id: string;
    author: string;
    content: string;
    created_at: string;
}

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
});

export const setApiKey = (key: string) => {
    localStorage.setItem('tmdb_api_key', key);
    window.location.reload();
};

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export const getMoviesByMood = async (genreIds: number[], moodId: string, watchProviders: string = '', page: number = 1, genreSeparator: string = ','): Promise<Movie[]> => {
    if (!API_KEY) {
        console.warn("No API Key found, using mock data");
        return getMockMovies(moodId);
    }

    try {
        const genreString = genreIds.join(genreSeparator);
        const params: any = {
            with_genres: genreString,
            sort_by: 'vote_average.desc',
            'vote_count.gte': 200,
            include_adult: false,
            page: page,
            watch_region: 'US'
        };

        if (watchProviders) {
            params.with_watch_providers = watchProviders;
        }

        const response = await api.get('/discover/movie', { params });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return getMockMovies(moodId);
    }
};

export const getMovieDetails = async (id: number): Promise<MovieDetails | null> => {
    if (!API_KEY) {
        // Return rich mock data for testing without API key
        return {
            ...getMockMovies('happy')[0],
            genres: [{ id: 35, name: 'Comedy' }, { id: 10751, name: 'Family' }],
            runtime: 112,
            tagline: "A mock movie for testing.",
            credits: {
                cast: [
                    { id: 1, name: "Mock Actor 1", character: "Hero", profile_path: null },
                    { id: 2, name: "Mock Actor 2", character: "Sidekick", profile_path: null },
                    { id: 3, name: "Mock Actor 3", character: "Villain", profile_path: null },
                ]
            },
            'watch/providers': {
                results: {
                    US: {
                        flatrate: [
                            { provider_id: 8, provider_name: "Netflix", logo_path: "/t2yyOv40HZeVlLjDaoVCOwk4ny.jpg" },
                            { provider_id: 9, provider_name: "Amazon Prime", logo_path: "/emthp39XA2YScoU8t5t7TB386Ot.jpg" }
                        ]
                    }
                }
            }
        } as MovieDetails;
    }

    try {
        const response = await api.get(`/movie/${id}`, {
            params: {
                append_to_response: 'credits,watch/providers'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

export const getMovieReviews = async (id: number): Promise<Review[]> => {
    if (!API_KEY) return [];
    try {
        const response = await api.get(`/movie/${id}/reviews`);
        return response.data.results.slice(0, 5);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
};

export const getMovieVideos = async (id: number): Promise<Video[]> => {
    if (!API_KEY) return [];
    try {
        const response = await api.get(`/movie/${id}/videos`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
};

export const getSimilarMovies = async (id: number): Promise<Movie[]> => {
    if (!API_KEY) return [];
    try {
        const response = await api.get(`/movie/${id}/similar`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching similar movies:", error);
        return [];
    }
};

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

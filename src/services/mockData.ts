import { Movie } from './api';

export const mockMovies: Record<string, Movie[]> = {
    happy: [
        {
            id: 1,
            title: "The Grand Budapest Hotel",
            overview: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
            poster_path: "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
            backdrop_path: "/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg",
            vote_average: 8.0,
            release_date: "2014-02-26",
            genre_ids: [35, 18]
        },
        {
            id: 2,
            title: "Paddington 2",
            overview: "Paddington settles in with the Brown family in Windsor Gardens, where he has become a popular member of the community, spreading joy and marmalade wherever he goes.",
            poster_path: "/t6TL7V9IsT4Ktx6JO8Cc8XPj0xh.jpg",
            backdrop_path: "/6088D8C9h9n3a3a3a3a3a3a3a3.jpg", // Placeholder
            vote_average: 7.5,
            release_date: "2017-11-10",
            genre_ids: [10751, 35, 12]
        }
    ],
    sad: [
        {
            id: 3,
            title: "The Shawshank Redemption",
            overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
            poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            backdrop_path: "/kXfqcd0tIuTLNGuqXuhw20Grec2.jpg",
            vote_average: 8.7,
            release_date: "1994-09-23",
            genre_ids: [18, 80]
        }
    ],
    adventurous: [
        {
            id: 4,
            title: "Inception",
            overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
            poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
            vote_average: 8.3,
            release_date: "2010-07-15",
            genre_ids: [28, 878, 12]
        }
    ],
    // Add more mock data as needed, these are just starters
};

// Helper to get mock data if API fails or no key
export const getMockMovies = (moodId: string): Movie[] => {
    return mockMovies[moodId] || mockMovies['happy']; // Default to happy if not found
};

export interface Mood {
    id: string;
    label: string;
    emoji: string;
    color: string;
    genreIds: number[];
    description: string;
}

export const moods: Mood[] = [
    {
        id: 'happy',
        label: 'Happy',
        emoji: '😊',
        color: 'var(--mood-happy)',
        genreIds: [35, 10751, 16], // Comedy, Family, Animation
        description: "I want to laugh and feel good."
    },
    {
        id: 'sad',
        label: 'Sad',
        emoji: '😢',
        color: 'var(--mood-sad)',
        genreIds: [18, 10749], // Drama, Romance
        description: "I need a good cry or something touching."
    },
    {
        id: 'adventurous',
        label: 'Adventurous',
        emoji: '😎',
        color: 'var(--mood-adventurous)',
        genreIds: [28, 12, 878], // Action, Adventure, Sci-Fi
        description: "Take me on a wild ride."
    },
    {
        id: 'romantic',
        label: 'Romantic',
        emoji: '🥰',
        color: 'var(--mood-romantic)',
        genreIds: [10749, 35], // Romance, Comedy
        description: "Love is in the air."
    },
    {
        id: 'scary',
        label: 'Scary',
        emoji: '😱',
        color: 'var(--mood-scary)',
        genreIds: [27, 53, 9648], // Horror, Thriller, Mystery
        description: "I want to be on the edge of my seat."
    },
    {
        id: 'tense',
        label: 'Tense',
        emoji: '😬',
        color: 'var(--mood-tense)',
        genreIds: [53, 80, 18], // Thriller, Crime, Drama
        description: "Keep me guessing."
    }
];

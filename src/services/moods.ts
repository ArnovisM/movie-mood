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

export const extendedMoods: Mood[] = [
    ...moods,
    { id: 'chill', label: 'Chill', emoji: '😌', color: '#4ADE80', genreIds: [35, 10751], description: 'Easy watching' },
    { id: 'mind-bending', label: 'Mind-bending', emoji: '🤯', color: '#A855F7', genreIds: [878, 9648, 53], description: 'Make me think' },
    { id: 'dark', label: 'Dark', emoji: '🌑', color: '#475569', genreIds: [80, 18, 9648], description: 'Gritty and serious' },
    { id: 'adrenaline', label: 'Adrenaline', emoji: '⚡', color: '#EF4444', genreIds: [28, 12], description: 'High octane action' },
    { id: 'feel-good', label: 'Feel-good', emoji: '✨', color: '#FBBF24', genreIds: [35, 10402, 10749], description: 'Lift my spirits' },
    { id: 'weird', label: 'Weird', emoji: '👽', color: '#10B981', genreIds: [878, 14, 27], description: 'Something different' },
    { id: 'classic', label: 'Classic', emoji: '🎞️', color: '#94A3B8', genreIds: [37, 36], description: 'Old school vibes' },
    { id: 'educational', label: 'Educational', emoji: '🧠', color: '#3B82F6', genreIds: [99, 36], description: 'Learn something new' },
    { id: 'fantasy', label: 'Fantasy', emoji: '🧚', color: '#EC4899', genreIds: [14, 12], description: 'Magic and wonder' },
    { id: 'epic', label: 'Epic', emoji: '⚔️', color: '#F59E0B', genreIds: [12, 28, 36], description: 'Grand scale stories' },
];

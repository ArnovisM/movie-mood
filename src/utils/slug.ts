/**
 * Converts a movie title to a URL-friendly slug
 * Example: "The Dark Knight" -> "the-dark-knight"
 */
export const createSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Creates a movie URL slug with ID
 * Example: "Inception", 27205 -> "inception-27205"
 */
export const createMovieSlug = (title: string, id: number): string => {
    const slug = createSlug(title);
    return `${slug}-${id}`;
};

/**
 * Extracts movie ID from a slug
 * Example: "inception-27205" -> 27205
 */
export const extractIdFromSlug = (slug: string): number => {
    const parts = slug.split('-');
    const id = parts[parts.length - 1];
    return parseInt(id, 10);
};

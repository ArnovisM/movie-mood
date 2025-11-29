# 🎬 MovieMood

A modern, responsive web application that recommends movies based on your current mood. Built with React, TypeScript, and Vite, powered by The Movie Database (TMDB) API.

## ✨ Features

- **Mood-Based Recommendations**: Select your current mood and get personalized movie suggestions
- **Daily Recommendations**: Curated movie picks for each day of the week
- **Movie Details**: View comprehensive information including cast, ratings, trailers, and reviews
- **Watchlist**: Save your favorite movies for later
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Dark Mode**: Beautiful glassmorphism UI with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/movie-mood-recommender.git
cd movie-mood-recommender
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:
```
VITE_TMDB_API_KEY=your_api_key_here
```

⚠️ **IMPORTANT**: Never commit your `.env` file to GitHub. It's already included in `.gitignore`.

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📦 Deploying to GitHub Pages

### One-Time Setup

1. Update `vite.config.ts` and replace `<REPO_NAME>` with your repository name:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

2. Install gh-pages (if not already installed):
```bash
npm install --save-dev gh-pages
```

### Deploy

Deploy to GitHub Pages:
```bash
npm run deploy
```

This will:
1. Build your project
2. Deploy the `dist` folder to the `gh-pages` branch
3. Your site will be available at `https://YOUR_USERNAME.github.io/REPO_NAME/`

### GitHub Pages Configuration

After deploying, go to your repository settings:
1. Navigate to **Settings** → **Pages**
2. Under **Source**, select the `gh-pages` branch
3. Click **Save**

Your site should be live within a few minutes!

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **TMDB API** - Movie data

## 📁 Project Structure

```
movie-mood-recommender/
├── src/
│   ├── components/      # React components
│   ├── context/         # React context providers
│   ├── services/        # API services and utilities
│   ├── styles/          # CSS variables and global styles
│   └── utils/           # Utility functions
├── public/              # Static assets
├── .env.example         # Environment variables template
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🔒 Security

- Never commit your `.env` file
- Never share your TMDB API key publicly
- The `.env` file is already in `.gitignore` to prevent accidental commits

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ by Arnovis Montero

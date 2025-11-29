
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MoodSelector from './components/MoodSelector';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/Watchlist';
import { WatchlistProvider } from './context/WatchlistContext';
import Footer from './components/Footer';

function App() {
    return (
        <WatchlistProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<MoodSelector />} />
                        <Route path="/recommendations/:moodId" element={<MovieGrid />} />
                        <Route path="/movie/:id" element={<MovieDetails />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </WatchlistProvider>
    );
}

export default App;

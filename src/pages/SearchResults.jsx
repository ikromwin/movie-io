import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Skeleton from "../components/Skeleton";

// COMPONENTS
import AlertMsg from "../components/AlertMsg";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedIds, setSavedIds] = useState(JSON.parse(localStorage.getItem("savedMovies") || "[]").map(m => m.id));
    const [alert, setAlert] = useState({ show: false, message: "", type: "saved" });


    useEffect(() => {
        if (!query) return;
        setLoading(true);

        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results || []);
                setLoading(false);

            });
    }, [query]);

    const handleSaveMovie = (movie) => {
        let saved = JSON.parse(localStorage.getItem("savedMovies") || "[]");

        if (!saved.some(m => m.id === movie.id)) {
            saved.push(movie);
            setSavedIds(prev => [...prev, movie.id]);
            localStorage.setItem("savedMovies", JSON.stringify(saved));
            setAlert({ show: true, message: "Saved", type: "saved" });
        } else {
            saved = saved.filter(m => m.id !== movie.id);
            setSavedIds(prev => prev.filter(id => id !== movie.id));
            localStorage.setItem("savedMovies", JSON.stringify(saved));
            setAlert({ show: true, message: "Removed", type: "removed" });
        }

        setTimeout(() => {
            setAlert((prev) => ({ ...prev, show: false }));
        }, 1000);
    };

    return (
        <div className="relative grid gap-6 z-2">
            <AlertMsg
                type={alert.type}
                message={alert.message}
                show={alert.show}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />

            {loading
                ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
                : movies.map((movie) =>
                    <MovieCard
                        key={movie.id}
                        details={movie}
                        isSaved={savedIds.includes(movie.id)}
                        onSave={handleSaveMovie}
                    />)
            }

            {movies.length == 0 && <p className="text-white">😴 Sorry, No data</p>}
        </div>

    );
}

export default SearchResults;

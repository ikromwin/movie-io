import { useEffect, useState } from "react";

// COMPONENTS
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";
import AlertMsg from "../components/AlertMsg";


function HomePage() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [alert, setAlert] = useState({ show: false, message: "", type: "saved" });

    const [savedIds, setSavedIds] = useState(
        JSON.parse(localStorage.getItem("savedMovies") || "[]").map(m => m.id)
    );

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${page}`
                );
                const data = await res.json();


                setMovies(data.results);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error("ERROR: FETCHING MOVIES (HOMEPAGE):", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page]);


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
        <>
            <AlertMsg
                type={alert.type}
                message={alert.message}
                show={alert.show}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />

            <div className="relative grid gap-6 z-2">
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
            </div>


            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </>
    );
}

export default HomePage;

import { useEffect, useState } from "react";

// COMPONENTS
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Skeleton from "../components/Skeleton";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY
                    }&language=en-US&page=${page}&include_adult=false`
                );
                const data = await res.json();
                
                console.log(data);
                
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

    return (
        <div className="relative">
            <div className="relative grid gap-6 z-2">
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
                    : movies.map((movie) => <MovieCard key={movie.id} details={movie} />)
                }
            </div>

            {/* Pagination controls */}
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}

export default HomePage;

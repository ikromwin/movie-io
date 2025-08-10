import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);


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



    return (
        <div className="relative grid gap-6 z-2">
            {loading
                ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
                : movies.map((movie) => <MovieCard key={movie.id} details={movie} />)
            }

            {movies.length == 0 && <p className="text-white">😴 Sorry, No data</p>}
        </div>

    );
}

export default SearchResults;

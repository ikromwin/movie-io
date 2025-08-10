import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovie() {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
                );
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovie();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>{movie.title}</h1>
            <p><strong>Tagline:</strong> {movie.tagline || "No tagline available"}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>

            {/* Fix for object/array rendering */}
            <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>

            {/* Example for companies */}
            <p>
                <strong>Production Companies:</strong>{" "}
                {movie.production_companies?.map(c => c.name).join(", ")}
            </p>

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "300px", marginTop: "20px" }}
            />
        </div>
    );
}

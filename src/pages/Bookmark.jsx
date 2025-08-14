import { useState } from "react";
import MovieCard from "../components/MovieCard";
import AlertMsg from "../components/AlertMsg";

function Bookmark() {

    const [alert, setAlert] = useState({ show: false, message: "", type: "saved" });
    const [savedIds, setSavedIds] = useState(JSON.parse(localStorage.getItem("savedMovies") || "[]").map(m => m.id));

    const savedMovies = JSON.parse(localStorage.getItem("savedMovies") || "[]");

    const handleSaveMovie = (movie) => {
        let saved = JSON.parse(localStorage.getItem("savedMovies") || "[]");

        saved = saved.filter(m => m.id !== movie.id);
        setSavedIds(prev => prev.filter(id => id !== movie.id));
        localStorage.setItem("savedMovies", JSON.stringify(saved));
        setAlert({ show: true, message: "Removed", type: "removed" });

        setTimeout(() => {
            setAlert((prev) => ({ ...prev, show: false }));
        }, 1000);
    };

    return (
        <div>
            <AlertMsg
                type={alert.type}
                message={alert.message}
                show={alert.show}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />

            {savedMovies.length === 0 ? (
                <p className="text-gray-400">No movies saved yet.</p>
            ) : (
                <ul className="relative grid gap-6 z-2">
                    {savedMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            details={movie}
                            isSaved={savedIds.includes(movie.id)}
                            onSave={handleSaveMovie}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Bookmark;

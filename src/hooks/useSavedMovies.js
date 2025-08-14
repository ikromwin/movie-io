import { useState, useEffect } from "react";

export function useSavedMovies() {
    const [savedMovies, setSavedMovies] = useState(
        JSON.parse(localStorage.getItem("savedMovies") || "[]")
    );

    useEffect(() => {
        const handler = () => {
            setSavedMovies(JSON.parse(localStorage.getItem("savedMovies") || "[]"));
        };

        // Listen for changes in localStorage from anywhere
        window.addEventListener("storage", handler);

        return () => {
            window.removeEventListener("storage", handler);
        };
    }, []);

    return {
        savedMovies,
        count: savedMovies.length,
        setSavedMovies,
    };
}

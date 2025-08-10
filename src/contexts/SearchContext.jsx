import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async (term) => {
        setQuery(term);
        if (!term.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`
            );
            const data = await res.json();
            setResults(data.results || []);

            console.log("SEARCH DATA: " + data);

        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchContext.Provider value={{ query, results, loading, searchMovies }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);

import { useEffect, useState } from "react";


// THIRD PARTY
import { Search, Star, Undo2 } from "lucide-react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

// COMPONENTS



function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === "") return;
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setQuery("");
    };

    const [backButton, setBackButton] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname == "/star") setBackButton(true)
        else if (location.pathname == "/search") setBackButton(true)

        else setBackButton(false)
    })

    return (
        <div className="flex items-center gap-2">

            {backButton &&
                <NavLink to="/" className="bg-overlay-dark p-4 rounded-full cursor-pointer active:scale-[0.96] hover:bg-overlay-overlay hover:transition-colors">
                    <Undo2 color="#999999" strokeWidth={2.25} size={16} />
                </NavLink>
            }

            <form onSubmit={handleSubmit} className="w-full flex bg-overlay-dark rounded-full">
                <input
                    type="search"
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-6 text-[16px] font-[600] py-3 text-white placeholder-[#666] "
                    placeholder="Searching..."
                    autoComplete="off"
                />

                <button type="submit" className="bg-overlay-overlay px-2 cursor-pointer rounded-full m-2 active:scale-[0.96] hover:bg-overlay-overlay-active hover:transition-colors">
                    <Search color="#999999" strokeWidth={2.25} size={16} />
                </button>
            </form>

            <NavLink to={"/star"} className={({ isActive }) => isActive ? "bg-overlay-overlay cursor-default flex gap-2 font-[500] items-center content-center p-4 bg-overlay-dark rounded-full" : "flex gap-2 font-[500] items-center content-center p-4  bg-overlay-dark rounded-full cursor-pointer active:scale-[0.96] hover:bg-overlay-overlay hover:transition-colors"}>
                <Star color="#ccc" strokeWidth={2.25} size={16} />

                <p className="text-[16px] font-bold leading-3 bg-gradient-to-r from-[#FFD014] to-[#D84040] text-transparent bg-clip-text">
                    10
                </p>
            </NavLink>

        </div >
    )
}

export default Header;
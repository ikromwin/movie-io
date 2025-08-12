import { useEffect, useRef, useState } from "react";



// THIRD PARTY
import { NavLink, useParams } from "react-router-dom";
import { Clock4, ImageOff, Loader, Undo2 } from "lucide-react";
import ImageLoad from "../components/ImageLoad";


const CAST_LIMIT = 10;
const CREW_LIMIT = 10;


export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [cast, setCast] = useState(CAST_LIMIT);
    const [crew, setCrew] = useState(CREW_LIMIT);

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
            }
        }
        fetchMovie();
    }, [id]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                // 1. Fetch movie details
                const movieRes = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY
                    }&language=en-US`
                );
                const movieData = await movieRes.json();
                setMovie(movieData);

                // 2. Fetch credits (cast & crew)
                const creditsRes = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY
                    }&language=en-US`
                );
                const creditsData = await creditsRes.json();
                setCredits(creditsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchMovieData();
    }, [id]);


    if (!movie || !credits) {
        return <div className="h-screen w-full flex items-center justify-center">
            <Loader className=" animate-spin" color="#999999" strokeWidth={2.25} size={24} />
        </div>
    }


    console.log(movie);


    const director = credits?.crew?.find((person) => person.job === "Director");
    const writer = credits?.crew?.find(
        (person) =>
            person.job === "Writer" ||
            person.job === "Screenplay" ||
            person.job === "Author"
    );
    const mainCharacter = credits?.cast?.length > 0 ? credits.cast[0].name : "N/A";








    if (!movie || !credits) return <p>Movie not found</p>;



    const costAndCrewStyle = "text-gray-300 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  lg:gap-8 snap-x snap-mandatory text-sm mt-6 overflow-x-auto"

    return (
        <div className="max-w-[1200px] mx-auto px-2">
            <div className="relative z-2 flex pt-8">
                <NavLink to="/" className="bg-white p-4 rounded-full cursor-pointer active:scale-[0.96] hover:transition-colors">
                    <Undo2 color="#333" strokeWidth={2.25} size={18} />
                </NavLink>
            </div>



            <div className="absolute w-full top-0 left-0">
                <img
                    src={`https://image.tmdb.org/t/p/w185${movie.backdrop_path}`}
                    alt="bg"
                    className={`transition-opacity duration-500 rounded-b-[50%] pointer-events-none h-[500px] object-cover select-none brightness-100 blur-2xl w-full ${movie.backdrop_path ? "opacity-8" : "opacity-0"}`}
                />
            </div>

            <div className="relative w-full grid sm:grid lg:flex justify-evenly gap-10 mt-10 pb-12">
                <div className="lg:max-w-[300px] mx:max-w-[300px] sm:max-w-[500px] w-full h-auto">

                    <div className="relative w-full aspect-[4/6] flex items-center justify-center rounded-2xl bg-overlay-overlay overflow-hidden">
                        <ImageLoad
                            width="full"
                            height="full"
                            imgSrc={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                            imgTitle={movie.title}
                        />

                    </div>


                    <div className="w-full mt-4">
                        <div className="mt-6 gap-2">
                            <p className="text-sm text-[#999] mb-1">Rating</p>

                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all ${movie.vote_average >= 7 ? "bg-green-500" : movie.vote_average >= 5 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${(movie.vote_average / 10) * 100}%` }}></div>
                            </div>

                            <p className="text-white text-sm mt-1">
                                {movie.vote_average?.toFixed(1) ?? "N/A"} / 10
                            </p>
                        </div>

                        <div className="mt-6 bg-overlay-dark p-3 px-4 rounded-2xl flex items-center gap-2">
                            <Clock4 className="text-yellow-400" size={18}/>

                            <span className="text-white text-sm font-medium">
                                {movie.runtime} min
                            </span>
                        </div>
                    </div>
                </div>





                <div className="w-full  ml-auto flex justify-center">
                    <div className="max-w-[600px] text-white">
                        <h1 className="text-2xl font-[600]">{movie.title} ({movie.release_date && movie.release_date.slice(0, 4)})</h1>

                        <div className="flex flex-wrap items-center gap-2 mt-6">
                            <p className="py-1 px-3 bg-white rounded-full text-[#666] text-sm">
                                {movie.release_date}
                            </p>
                            
                            <p className="py-1 px-3 bg-main rounded-full text-[#fff] text-sm">
                                {movie.genres?.map(g => g.name).join(", ")}
                            </p>
                        </div>


                        <p className="mt-12 text-[#ccc] leading-8 font-light">{movie.overview}</p>



                        <div className="mt-42 bg-overlay-dark rounded-3xl p-6 sm:p-6 p-4 text-center">
                            {/* Top Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-overlay-overlay border-b border-overlay-overlay pb-4">
                                <div className="p-4">
                                    <p className="text-sm text-[#999]">Main Character</p>
                                    <p className="text-white text-md font-medium">{mainCharacter}</p>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-[#999]">Director</p>
                                    <p className="text-white text-md font-medium">
                                        {director ? director.name : "N/A"}
                                    </p>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-[#999]">Writer</p>
                                    <p className="text-white text-md font-medium">
                                        {writer ? writer.name : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-overlay-overlay pt-4">
                                <div className="p-4">
                                    <p className="text-sm text-[#999]">Original Country</p>
                                    <p className="text-white text-md font-medium">
                                        {movie.origin_country ? movie.origin_country : "N/A"}
                                    </p>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-[#999]">Budget</p>
                                    <p className="text-white text-md font-medium">
                                        {movie.budget === 0
                                            ? "-"
                                            : movie.budget?.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                    </p>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-[#999]">Revenue</p>
                                    <p className="text-white text-md font-medium">
                                        {movie.revenue === 0
                                            ? "-"
                                            : movie.revenue?.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                    </p>
                                </div>
                            </div>
                        </div>






                        <div className="mt-26">
                            {credits.cast?.length > 0 ?
                                <>
                                    <h1 className="text-xl font-[#999] font-[800] uppercase">Cast</h1>
                                    <ul className={costAndCrewStyle}>
                                        {credits.cast?.slice(0, cast).map((actor, index) => (
                                            <PeopleCard key={index} photo={actor.profile_path} name={actor.name} character={actor.character}></PeopleCard>
                                        ))}
                                    </ul>


                                    {
                                        credits.cast?.length > CAST_LIMIT && cast < credits.cast?.length ?
                                            <button
                                                onClick={() => setCast(cast + CAST_LIMIT)}
                                                className="btn mt-6 w-full bg-overlay-overlay text-white hover:bg-overlay-dark hover:transition-colors active:scale-[0.96] p-2 rounded-full cursor-pointer">
                                                Load More
                                            </button>
                                            :
                                            null
                                    }
                                </>
                                : null
                            }


                            {credits.crew?.length > 0 ?
                                <>
                                    <h1 className="mt-26 text-xl font-[#999] font-[800] uppercase">Crew</h1>
                                    <ul className={costAndCrewStyle}>
                                        {credits.crew?.slice(0, crew).map((member, index) => (
                                            <PeopleCard key={index} photo={member.profile_path} name={member.name} character={member.job}></PeopleCard>
                                        ))}
                                    </ul>

                                    {
                                        credits.crew?.length > CREW_LIMIT && crew < credits.crew?.length ?
                                            <button
                                                onClick={() => setCrew(crew + CREW_LIMIT)}
                                                className="btn mt-6 w-full bg-overlay-overlay text-white hover:bg-overlay-dark hover:transition-colors active:scale-[0.96] p-2 rounded-full cursor-pointer">
                                                Load More
                                            </button>
                                            :
                                            null
                                    }
                                </>
                                : null
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}



function PeopleCard({ photo, name, character }) {
    return (
        <li className="text-center snap-center min-full bg-overlay-overlay rounded-lg overflow-hidden">
            <div className="flex h-[180px] bg-overlay-dark items-center justify-center">
                {photo ?
                    <ImageLoad width={"90px"} height={"160px"} imgSrc={`https://image.tmdb.org/t/p/w185${photo}`} imgTitle={name} />
                    :
                    <ImageOff color="#999999" strokeWidth={2.25} />
                }
            </div>

            <p className="px-1 text-main text-[14px] font-bold mt-2">{name ? name : "N/A"}</p>
            <p className="mb-2 text-sm">{character ? character : "N/A"}</p>
        </li>
    )
}
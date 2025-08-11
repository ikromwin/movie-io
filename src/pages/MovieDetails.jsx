import { useEffect, useRef, useState } from "react";



// THIRD PARTY
import { NavLink, useParams } from "react-router-dom";
import { ImageOff, Loader, Undo2 } from "lucide-react";
import ImageLoad from "../components/ImageLoad";





export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
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
            <div className="relative z-2 flex mt-10">
                <NavLink to="/" className="bg-white p-4 rounded-full cursor-pointer active:scale-[0.96] hover:transition-colors">
                    <Undo2 color="#333" strokeWidth={2.25} size={18} />
                </NavLink>
            </div>



            <div className="absolute w-full top-0 left-0 ">
                <img src={`https://image.tmdb.org/t/p/w185${movie.backdrop_path}`} alt="bg" className="select-none brightness-20  blur-xl w-full opacity-10 " />
            </div>

            <div className="relative w-full grid sm:grid lg:flex justify-evenly gap-10 mt-10 pb-12">
                <div className="">
                    <div className="relative w-full flex items-center justify-center rounded-lg bg-overlay-overlay overflow-hidden" >
                        <ImageLoad width={300} height={450} imgSrc={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} imgTitle={movie.title} />
                    </div>
                </div>




                <div className="w-full  ml-auto flex justify-center">
                    <div className="max-w-[600px] text-white">
                        <h1 className="text-2xl font-[600]">{movie.title} ({movie.release_date && movie.release_date.slice(0, 4)})</h1>

                        <div className="flex items-center gap-2 mt-6">
                            <p className="py-1 px-3 bg-white rounded-full text-[#666] text-sm">
                                {movie.release_date}
                            </p>
                            |
                            <p className="py-1 px-3 bg-main rounded-full text-[#fff] text-sm">
                                {movie.genres?.map(g => g.name).join(", ")}
                            </p>
                        </div>


                        <p className="mt-12 text-[#ccc] leading-8 font-light">{movie.overview}</p>



                        <div className="mt-42 bg-overlay-dark rounded-3xl p-6 text-center">
                            {/* Top Row */}
                            <div className="grid grid-cols-3 divide-x divide-overlay-overlay border-b border-overlay-overlay pb-4">
                                <div className="p-2">
                                    <p className="text-sm text-[#999]">Main Character</p>
                                    <p className="text-white text-md font-medium">{mainCharacter}</p>
                                </div>
                                <div className="p-2">
                                    <p className="text-sm text-[#999]">Director</p>
                                    <p className="text-white text-md font-medium">{director ? director.name : "N/A"}</p>
                                </div>
                                <div className="p-2">
                                    <p className="text-sm text-[#999]">Writer</p>
                                    <p className="text-white text-md font-medium">{writer ? writer.name : "N/A"}</p>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-3 divide-x divide-overlay-overlay pt-4">
                                <div className="p-2">
                                    <p className="text-sm text-[#999]">Original Language</p>
                                    <p className="text-white text-md font-medium">
                                        {movie.original_language}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <p className="text-sm text-[#999]">Budget</p>
                                    <p className="text-white text-md font-medium">
                                        {movie.budget === 0 ? "-" : movie.budget?.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <p className="text-sm text-[#999]">Revenue</p>
                                    <p className="text-white text-md font-medium">
                                        {movie.revenue === 0 ? "-" : movie.revenue?.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>





                        <div className="mt-26">
                            <h1 className="text-xl font-[#999] font-[800] uppercase">Cast</h1>
                            <ul className={costAndCrewStyle}>
                                {credits.cast?.map((actor, index) => (
                                    <PeopleCard key={index} photo={actor.profile_path} name={actor.name} character={actor.character}></PeopleCard>
                                ))}
                            </ul>


                            <h1 className="mt-26 text-xl font-[#999] font-[800] uppercase">Crew</h1>

                            <ul className={costAndCrewStyle}>
                                {credits.crew?.map((member, index) => (
                                    <PeopleCard key={index} photo={member.profile_path} name={member.name} character={member.job}></PeopleCard>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



function PeopleCard({ photo, name, character }) {
    return (
        <li className="text-center snap-center min-full bg-overlay-overlay rounded-lg overflow-hidden">
            <div className="flex h-[180px] bg-overlay-dark items-center justify-center">
                {photo ?
                    <ImageLoad width={90} height={160} imgSrc={`https://image.tmdb.org/t/p/w185${photo}`} imgTitle={name} />
                    :
                    <ImageOff color="#999999" strokeWidth={2.25} />
                }
            </div>

            <p className="px-1 text-main text-[14px] font-bold mt-2">{name}</p>
            <p className="mb-2 text-sm">{character}</p>
        </li>
    )
}
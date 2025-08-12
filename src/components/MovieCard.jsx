// THIRD PARTY
import { NavLink } from "react-router-dom"
import { ImageOff, Pointer, Star } from "lucide-react"
import ImageLoad from "./ImageLoad";

function MovieCard({ details }) {


    return (
        <div className="relative group flex items-center bg-overlay-dark rounded-4xl">
            <div className="ml-[5px]">
                <div className="relative w-[90px] h-[140px] flex items-center justify-center scale-[1.1] rounded-lg bg-overlay-overlay overflow-hidden">
                    {details.poster_path ?
                        <ImageLoad width={90} height={140} imgSrc={`https://image.tmdb.org/t/p/w185${details.poster_path}`} imgTitle={details.title || details.name}></ImageLoad>
                        :
                        <ImageOff color="#999999" strokeWidth={2.25} />
                    }
                </div>

            </div>

            <div className=" xl:ml-10 sm:ml-7 ml-7">
                <NavLink to={`/movie/${details.id}`} className="flex pr-6 text-xl font-[800] text-[#ccc] transition-all duration-400 ease hover:text-main">
                    <span>{details.title || details.name}</span>

                    <Pointer className="transition-all mt-2 duration-800 ease opacity-0 group-hover:opacity-100 ml-1" color="#fff" strokeWidth={1.6} size={16} />
                </NavLink>
                <p className="text-[#797979] font-[500] text-[14px] mt-5"><span className="hidden sm:inline xl:inline">Realized:</span> {details.release_date}</p>


            </div>

            <div className="absolute bottom-4 right-4">
                <button className="border border-overlay-overlay transition-colors duration-400 ease hover:bg-overlay-overlay p-4 rounded-2xl cursor-pointer active:scale-[0.96]">
                    <Star color="#999999" strokeWidth={2.25} size={20} />
                </button>
            </div>
        </div>
    )
}
export default MovieCard

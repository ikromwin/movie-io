import { useEffect, useRef, useState } from "react";

// THIRD PARTY
import { NavLink } from "react-router-dom"
import { ImageOff, Loader, Pointer, Star } from "lucide-react"

function MovieCard({ details }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const hasImage = Boolean(details.poster_path);
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);



    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);


    return (
        <div className="relative group flex items-center bg-overlay-dark rounded-4xl">
            <div className="ml-[5px]">
                <div
                    ref={imgRef}
                    className="relative w-[90px] flex items-center justify-center h-[140px] scale-[1.1] transition-all duration-600 ease group-hover:scale-[1.20] rounded-lg bg-overlay-overlay overflow-hidden"
                >
                    {!imgLoaded && <Loader className="absolute animate-spin" color="#999999" strokeWidth={2.25} />}

                    {hasImage ? (
                        isVisible ? (
                            <img
                                className={`w-full h-full rounded-lg transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"
                                    }`}
                                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                                alt={details.title}
                                width={90}
                                onLoad={() => setImgLoaded(true)}
                                onError={() => setImgLoaded(true)}
                            />
                        ) : (
                            <Loader className="animate-spin" color="#999999" strokeWidth={2.25} />
                        )
                    ) : (
                        <ImageOff color="#999999" strokeWidth={2.25} />
                    )}
                </div>
            </div>

            <div className="ml-10">
                <NavLink className="flex pr-6 text-xl font-[800] text-[#ccc] transition-all duration-400 ease hover:text-main">
                    <span>{details.title}</span>

                    <Pointer className="transition-all mt-2 duration-800 ease opacity-0 group-hover:opacity-100 ml-1" color="#fff" strokeWidth={1.6} size={16} />
                </NavLink>
                <p className="text-[#797979] font-[500] text-[14px] mt-5">Realized: {details.release_date} / {details.adult}</p>


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

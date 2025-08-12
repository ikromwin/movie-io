import { useEffect, useRef, useState } from "react";


// THIRD PARTY
import { Loader } from "lucide-react";







export default function ImageLoad({ imgSrc, imgTitle, width, height }) {
    const [imgLoaded, setImgLoaded] = useState(false);
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
        <div
            ref={imgRef}
            className={`relative w-[${width || "auto"}] h-[${height || "auto"}] flex items-center justify-center  scale-[1.1] transition-all duration-600 ease group-hover:scale-[1.20] rounded-lg bg-overlay-overlay`}
        >

            {
                isVisible ?
                    <>
                        {!imgLoaded && <Loader className="absolute animate-spin" color="#999999" strokeWidth={2.25} />}
                        <img
                            className={`w-full h-full rounded-lg transition-opacity duration-400 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                            src={`https://image.tmdb.org/t/p/w500${imgSrc}`}
                            alt={imgTitle}
                            width={width}
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgLoaded(true)}
                        />
                    </>
                    :
                    <Loader className="animate-spin" color="#999999" strokeWidth={2.25} />
            }
        </div>
    )
}
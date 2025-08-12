import { ChevronLeft, ChevronRight, Circle, MoveUp } from "lucide-react"
import { useEffect, useState } from "react";

function Pagination({ page, totalPages, onPageChange }) {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const btnClass = "border border-overlay-overlay transition-colors duration-400 ease hover:bg-overlay-overlay p-6 rounded-full cursor-pointer active:scale-[0.96]";
    const btnMobileClass = "border border-[#555] active:bg-overlay-overlay hover:bg-overlay-overlay w-full p-5 flex items-center justify-center rounded-full cursor-pointer active:scale-[0.95]";

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className="hidden xl:block sm:hidden sticky bottom-20">
                <div className="flex justify-between ml-[-55%]  mr-[-55%]">
                    {page !== 1 ? <button
                        onClick={() => onPageChange(Math.max(page - 1, 1))}
                        className={btnClass}
                    >
                        <ChevronLeft color="#999999" strokeWidth={2.25} size={18} />
                    </button> : <span></span>}



                    <div className="relative">
                        {showScrollTop &&
                            <button
                                onClick={scrollToTop}
                                className={`${btnClass} absolute bottom-20`}
                                title="Back to Top"
                            >
                                <MoveUp color="#999999" strokeWidth={2.25} size={18} />
                            </button>
                        }

                        <button
                            onClick={() => onPageChange(Math.max(page + 1, 1))}
                            className={btnClass}
                        >
                            <ChevronRight color="#999999" strokeWidth={2.25} size={18} />
                        </button>
                    </div>
                </div>
            </div>


            <div className="block sm:block xl:hidden fixed left-0 w-full z-10 bottom-0 p-2" >
                <div className="flex justify-between text-white items-center bg-white/1 border border-white/10 backdrop-blur-[4px] backdrop-brightness-110 shadow-lg shadow-black/10 p-2 rounded-full gap-2">
                    <button
                        onClick={() => onPageChange(Math.max(page - 1, 1))}
                        className={btnMobileClass}
                        disabled={page === 1}
                    >
                        <ChevronLeft color="#999999" strokeWidth={2.25} size={18} />
                    </button>

                    {showScrollTop &&
                        <>
                            <span className="opacity-50 w-[5px] h-4 bg-white"></span>
                            <button
                                onClick={scrollToTop}
                                className={`${btnMobileClass}`}
                                title="Back to Top"
                            >
                                <MoveUp color="#999999" strokeWidth={2.25} size={18} />
                            </button>
                            <span className="opacity-50 w-[5px] h-4 bg-white"></span>
                        </>
                    }

                    <button
                        onClick={() => onPageChange(Math.max(page + 1, 1))}
                        className={btnMobileClass}
                    >
                        <ChevronRight color="#999999" strokeWidth={2.25} size={18} />
                    </button>
                </div>
            </div>
        </>
    )
}



export default Pagination
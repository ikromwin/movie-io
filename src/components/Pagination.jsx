import { ChevronLeft, ChevronRight, MoveUp } from "lucide-react"
import { useEffect, useState } from "react";

function Pagination({ page, totalPages, onPageChange }) {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const btnClass = "border border-overlay-overlay transition-colors duration-400 ease hover:bg-overlay-overlay p-6 rounded-full cursor-pointer active:scale-[0.96]";

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
        <div className="sticky bottom-20">
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
    )
}



export default Pagination
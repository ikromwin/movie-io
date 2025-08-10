import { Star } from "lucide-react"

function Skeleton() {


    return (
        <div className="relative animate-pulse flex items-center bg-overlay-dark rounded-4xl">
            <div className="ml-[5px]">
                <div className="w-[90px] flex items-center justify-center h-[140px] scale-[1.1] rounded-lg bg-overlay-overlay"></div>
            </div>

            <div className="ml-10">
                <div className="flex bg-overlay-overlay w-[200px] p-3 rounded-lg"></div>
                <p className="flex bg-overlay-overlay w-[100px] p-3 rounded-lg mt-5"></p>
            </div>

            <div className="absolute bottom-4 right-4">
                <button className=" bg-overlay-overlay p-4 rounded-2xl">
                    <Star color="#555" strokeWidth={2.25} size={20} />
                </button>
            </div>
        </div>
    )
}

export default Skeleton
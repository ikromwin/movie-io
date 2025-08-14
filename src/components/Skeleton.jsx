import { Bookmark } from "lucide-react"

function Skeleton() {


    return (
        <div className="relative animate-pulse flex items-center bg-overlay-dark rounded-4xl">
            <div className="ml-[5px]">
                <div className="w-[90px] flex items-center justify-center h-[140px] scale-[1.1] rounded-lg bg-overlay-overlay"></div>
            </div>

            <div className="xl:ml-10 sm:ml-7 ml-7">
                <div className="flex bg-overlay-overlay xl:w-[200px] sm:w-[120px] w-[120px] p-3 rounded-lg"></div>
                <p className="flex bg-overlay-overlay xl:w-[100px] sm:w-[80px] w-[80px] p-3 rounded-lg mt-5"></p>
            </div>

            <div className="absolute bottom-4 right-4">
                <button className=" bg-overlay-overlay p-4 rounded-2xl">
                    <Bookmark color="#555" strokeWidth={2.25} size={20} />
                </button>
            </div>
        </div>
    )
}

export default Skeleton
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Heart, Trash2, X } from "lucide-react";

export default function AlertMsg({ type = "saved", message, show, onClose }) {
    const icons = {
        saved: <Heart className="w-5 h-5 text-white" />,
        removed: <Trash2 className="w-5 h-5 text-white" />,
    };

    const colors = {
        saved: "bg-[#166B5C] text-white",
        removed: "bg-[#486FD3] text-white",
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed z-50 top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 p-4 px-6 rounded-3xl shadow-xl ${colors[type]}`}
                    onClick={onClose}
                >
                    {icons[type]}
                    <span className="font-medium ">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Example usage:
// const [show, setShow] = React.useState(false);
// <Alert type="saved" message="Saved successfully!" show={show} onClose={() => setShow(false)} />

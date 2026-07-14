import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../context/StoreContext";

export default function Toast() {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-7 left-1/2 z-[110] bg-navy text-white px-6 py-3.5 rounded-full font-sans font-semibold text-sm tracking-[0.04em] shadow-xl flex items-center gap-2.5"
        >
          <span className="text-champagne">◆</span>
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

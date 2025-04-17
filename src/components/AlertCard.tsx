import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AlertCard({
  icon,
  title,
  count,
  color,
  textColor,
  showCheckmark,
  mode,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  color: string;
  textColor: string;
  showCheckmark?: boolean;
  mode: "with" | "without";
}) {
  // Calculate the number of representative icons to show
  // Each icon represents roughly 10-20 alerts, max ~10 icons displayed for visual clarity
  const representativeIconCount = Math.min(
    Math.ceil(count / (title === "Active Threats" ? 1 : 20)),
    10
  ); // Show more icons for Active Threats
  const representativeIcons = Array.from({ length: representativeIconCount });

  return (
    <motion.div
      className={cn(
        "rounded-xl p-5 border-2 shadow-lg relative overflow-hidden min-h-[160px]", // Increased min-height slightly for notification space
        color
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Top section: Icon, Title, Count/Checkmark */}
      <div className="flex items-start justify-between mb-2">
        {" "}
        {/* Use items-start */}
        <div className="flex items-center space-x-3">
          {/* Conditional rendering for main icon */}
          <AnimatePresence>
            {(mode === "without" || count > 0) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="p-1.5 rounded-full bg-white/10"
              >
                {icon}
              </motion.div>
            )}
          </AnimatePresence>
          <h3 className="text-base sm:text-xl text-white font-semibold pt-1">{title}</h3>{" "}
          {/* Added padding-top */}
        </div>
        {/* Count or Checkmark */}
        <AnimatePresence mode="wait">
          {showCheckmark && count === 0 ? (
            <motion.div
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex items-center"
            >
              <CheckCircle2 className="text-green-400 w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key={count}
              className={cn("text-3xl font-bold", textColor)}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* NEW: Representative Icons Container */}
      <div className="flex flex-wrap gap-1.5 mt-1 h-8 overflow-hidden">
        {" "}
        {/* Added fixed height and overflow hidden */}
        <AnimatePresence>
          {(mode === "without" || count > 0) &&
            representativeIcons.map((_, index) => (
              <motion.span
                key={`${title}-rep-${index}`} // Unique key
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }} // Slightly transparent
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }} // Stagger exit slightly
                // Determine color based on mode and card type
                className={cn(
                  mode === "with"
                    ? "text-green-400"
                    : title === "Active Threats"
                    ? "text-red-400"
                    : "text-blue-400"
                )}
              >
                {/* Using GripVertical for a small dot-like appearance */}
                <GripVertical size={10} strokeWidth={4} />
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
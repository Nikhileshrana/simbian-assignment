import React from "react";
import { cn } from "@/lib/utils";
import { LayoutGrid, Feather, Zap, Circle, ArrowDown } from "lucide-react";

export default function ConnectorIcons() {
    // Responsive: vertical on md+, horizontal on mobile
    const icons = [LayoutGrid, Feather, Zap, Circle];
    return (
      <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-6 py-6 md:py-0">
        {/* Top line */}
        <div className="hidden md:block w-px h-8 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600" />
        {/* Horizontal line for mobile */}
        <div className="block md:hidden h-px w-8 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" />
        {/* Icons with arrows */}
        {icons.map((Icon, idx) => (
          <React.Fragment key={idx}>
            <div
              className={cn(
                "p-2 rounded-lg border transition-colors",
                idx === icons.length - 1
                  ? "bg-blue-500/30 border-blue-400 text-blue-300"
                  : "bg-slate-700/50 border-slate-600 text-slate-400"
              )}
            >
              <Icon size={20} />
            </div>
            {idx < icons.length - 1 && (
              <>
                {/* Arrow between icons */}
                <ArrowDown
                  size={20}
                  className="hidden md:block text-slate-500"
                />
                <ArrowDown
                  size={20}
                  className="block md:hidden text-slate-500 rotate-90"
                />
              </>
            )}
          </React.Fragment>
        ))}
        {/* Bottom line */}
        <div className="hidden md:block w-px h-8 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-600" />
        <div className="block md:hidden h-px w-8 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" />
      </div>
    );
  }
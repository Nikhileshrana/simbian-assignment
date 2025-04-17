"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  AlertCircle,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Users,
  Brain,
  FileCheck,
  XCircle,
  Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AlertCard from "@/components/AlertCard";
import ConnectorIcons from "@/components/ConnectorIcons";



// --- Main SimbianComparison Component ---
export default function SimbianComparison() {
  const [mode, setMode] = useState<"with" | "without">("without");
  const initialCounts = useRef({ ignored: 200, wrongly: 35, active: 5 });
  const [ignoredAlerts, setIgnoredAlerts] = useState(
    initialCounts.current.ignored
  );
  const [wronglyClosed, setWronglyClosed] = useState(
    initialCounts.current.wrongly
  );
  const [activeThreats, setActiveThreats] = useState(
    initialCounts.current.active
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for notification timeout

  const processSteps = {
    with: [
      {
        icon: <CheckCircle2 className="text-green-500" size={24} />, // Smaller icon
        title: "Triaged & Reported",
        description: "The SOC Agent handled investigation and reporting.",
      },
      {
        icon: <Users className="text-green-500" size={24} />,
        title: "Less noise",
        description: "90% of alerts resolved automatically, 24/7",
      },
      {
        icon: <Brain className="text-green-500" size={24} />,
        title: "Holistic insight",
        description: "Correlate alerts and your environment into the big picture",
      },
      {
        icon: <FileCheck className="text-green-500" size={24} />,
        title: "Adapts automatically",
        description: "No SOAR needed. Investigate every alert...", // Shortened
      },
    ],
    without: [
      {
        icon: <XCircle className="text-red-500" size={24} />, // Use XCircle
        title: "Wasting valuable analyst time on false positives",
        bgColor: "bg-red-900/30",
        textColor: "text-red-300",
        description: ""
      },
      {
        icon: <Monitor className="text-red-500" size={24} />, // Use Monitor/Desktop icon
        title: "Processing one alert at a time, missing the big picture",
        bgColor: "bg-red-900/30",
        textColor: "text-red-300",
      },
      {
        icon: <AlertTriangle className="text-red-500" size={24} />, // Use AlertTriangle
        title: "More time fixing SOAR automation, less time on real threats",
        bgColor: "bg-red-900/30",
        textColor: "text-red-300",
      },
    ],
  };


  useEffect(() => {
    const interval = setInterval(() => {
     setMode(mode === "with"? "without" : "with");
    },5000)
  }, [])
  


  // Animate values when switching modes
  useEffect(() => {
    // ... existing interval clearing logic ...
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }

    if (mode === "with") {
      // Animate down to 0 for 'with' mode
      const duration = 2000; // 2 seconds total animation
      const steps = 20; // Number of steps
      const stepDuration = duration / steps;

      // Capture the counts *at the moment of switching* to animate down from
      const startIgnored = ignoredAlerts;
      const startWrongly = wronglyClosed;
      const startActive = activeThreats;

      let currentStep = 0;

      intervalRef.current = setInterval(() => {
        // Store interval ID
        currentStep++;
        const progress = currentStep / steps;

        setIgnoredAlerts(
          Math.max(0, Math.round(startIgnored * (1 - progress)))
        ); // Ensure count doesn't go below 0
        setWronglyClosed(
          Math.max(0, Math.round(startWrongly * (1 - progress)))
        );
        setActiveThreats(Math.max(0, Math.round(startActive * (1 - progress))));

        if (currentStep >= steps) {
          setIgnoredAlerts(0);
          setWronglyClosed(0);
          setActiveThreats(0);
          if (intervalRef.current) clearInterval(intervalRef.current); // Clear interval when done
          intervalRef.current = null;
        }
      }, stepDuration);
    } else {
      // Reset to initial base values when switching TO 'without' mode
      setIgnoredAlerts(initialCounts.current.ignored);
      setWronglyClosed(initialCounts.current.wrongly);
      setActiveThreats(initialCounts.current.active);

      // Start randomly incrementing counts for 'without' mode
      intervalRef.current = setInterval(() => {
        const randomChoice = Math.random();
        const increment = Math.ceil(Math.random() * 2);
        let incrementedCardTitle: string | null = null; // Track which card was incremented

        if (randomChoice < 0.6) {
          // 60% chance to increment Ignored
          setIgnoredAlerts((prev) => prev + increment);
          incrementedCardTitle = "Ignored Alerts";
        } else if (randomChoice < 0.9) {
          // 30% chance to increment Wrongly Closed
          setWronglyClosed((prev) => prev + increment);
          incrementedCardTitle = "Wrongly Closed";
        } else {
          // 10% chance to increment Active Threats
          setActiveThreats((prev) => prev + increment);
          incrementedCardTitle = "Active Threats";
        }

        // Set the last incremented card to trigger notification
        if (incrementedCardTitle) {
          // Clear previous notification timeout if any
          if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current);
          }
          // Set a timeout to clear the notification state after a delay
          notificationTimeoutRef.current = setTimeout(() => {
            notificationTimeoutRef.current = null;
          }, 1500); // Notification visible for 2.5 seconds
        }
      }, 1500); // Run every 1.5 seconds
    }

    // Cleanup interval and notification timeout on mode change or unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
        notificationTimeoutRef.current = null;
      }
    };
  }, [mode]); // Dependency on mode

  const cardData = [
    {
      title: "Ignored Alerts",
      count: ignoredAlerts, // Use state variable
      icon: <AlertCircle size={20} />,
      colorWithout: "bg-slate-800/70 border-blue-500",
      textColorWithout: "text-blue-300",
      colorWith: "bg-green-900/30 border-green-400",
      textColorWith: "text-green-300",
    },
    {
      title: "Wrongly Closed",
      count: wronglyClosed, // Use state variable
      icon: <AlertTriangle size={20} />,
      colorWithout: "bg-slate-800/70 border-blue-500",
      textColorWithout: "text-blue-300",
      colorWith: "bg-green-900/30 border-green-400",
      textColorWith: "text-green-300",
    },
    {
      title: "Active Threats",
      count: activeThreats, // Use state variable
      icon: <Shield size={20} />,
      colorWithout: "bg-red-900/50 border-red-500",
      textColorWithout: "text-red-300",
      colorWith: "bg-green-900/30 border-green-400",
      textColorWith: "text-green-300",
    },
  ];

  const currentProcessSteps = processSteps[mode];

  // Notification messages
  const notificationMessages = [
    "Critical: New security threat detected!",
    "Alert incorrectly marked as resolved",
    "New alert ignored without investigation",
  ];
  // Pick a random notification message on each render (when in 'without' mode)
  const randomNotification = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];

  return (
    <div
      className={cn(
        "min-h-screen w-full p-6 md:p-10 transition-colors duration-700 relative overflow-hidden",
        mode === "with"
          ? "bg-gradient-to-br from-slate-950 to-slate-700"
          : "bg-gradient-to-br from-black to-slate-950"
      )}
    >
      {/* Background Image and Shadow Layer */}
      <div className="absolute inset-0 z-0">
        {" "}
        {/* Positioned behind content */}
        <img
          src="/transformer-bg.jpg" // <-- REPLACE WITH YOUR IMAGE PATH
          alt="Background"
          className="w-full h-full object-cover opacity-20" // Cover the area, adjust opacity as needed
        />
        {/* Conditional Shadow Overlay */}
        <div
          className={cn(
            "absolute inset-0 shadow-inner", // Apply inner shadow
            mode === "with" ? "shadow-slate-600/50" : "shadow-slate-800/50" // Conditional shadow color and opacity
          )}
        ></div>
      </div>

      {/* Main Content Area (ensure it's above the background) */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={cn(
            "flex flex-col md:flex-row justify-between items-start mb-10 md:mb-16",
            mode === "with" ? "md:flex-row" : "md:flex-row-reverse"
          )}
        >
          <motion.div
            key={mode + "-header"}
            initial={{ opacity: 0, x: mode === "with" ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "with" ? 40 : -40 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-auto"
          >
            <motion.h1
              key={mode + "-title"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl font-bold mb-2",
                mode === "with" ? "text-green-300" : "text-blue-400"
              )}
            >
              {mode === "with" ? "With Simbian" : "Without Simbian"}
            </motion.h1>
            <motion.p
              key={mode + "-subtitle"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "text-lg md:text-xl",
                mode === "with" ? "text-green-100/80" : "text-blue-200/80"
              )}
            >
              {mode === "with"
                ? "Relax. Our AI Agents will take it from here."
                : "If this sounds all too familiar, you might want to..."}
            </motion.p>
            {mode === "without" && (
                <>
                <button className="p-2 text-base m-1 rounded-xl border-2 bg-white cursor-pointer">
                    Book a Demo 😀
                </button>
                </>
            )}
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div
          className={cn(
            "flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16",
            mode === "with" ? "md:flex-row" : "md:flex-row-reverse"
          )}
        >
          {/* Cards Column */}
          <div className="w-full md:w-5/12 lg:w-4/12 flex-shrink-0 space-y-5">
            {cardData.map((card) => (
              <AlertCard
                key={card.title}
                icon={React.cloneElement(card.icon, {
                  className:
                    mode === "with"
                      ? "text-green-400"
                      : card.title === "Active Threats"
                      ? "text-red-400"
                      : "text-blue-400",
                })}
                title={card.title}
                count={card.count}
                color={mode === "with" ? card.colorWith : card.colorWithout}
                textColor={
                  mode === "with" ? card.textColorWith : card.textColorWithout
                }
                showCheckmark={mode === "with"}
                mode={mode}
              />
            ))}
          </div>

          {/* Connector Icons Column */}
          <div className="flex flex-row md:flex-col items-center justify-center flex-shrink-0">
            <ConnectorIcons />
          </div>

          {/* Process Steps Column */}
          <div className="flex-1 w-full">
            {/* SIMPLIFIED: Always show a random notification in 'without' mode */}
            {mode === "without" && (
              <motion.div
                key={randomNotification} // ensure animation triggers on content change
                initial={{ opacity: 0, y: -20 }} // start above the view
                animate={{ opacity: 1, y: 0 }} // move into place
                exit={{ opacity: 0, y: -20 }} // exit the same way
                transition={{ duration: 0.4 }}
                className="bg-red-900/40 border border-red-500/50 rounded-lg p-3 mb-4"
              >
                <div className="flex items-center gap-2 text-sm text-red-200">
                  <AlertTriangle size={16} className="text-red-400" />
                  <span>{randomNotification}</span>
                </div>
              </motion.div>
            )}

            {/* Process Steps */}
            <div className="space-y-4">
              {currentProcessSteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "rounded-xl p-4 flex items-center gap-3",
                    mode === "with" ? "bg-green-900/30" : "bg-red-900/30"
                  )}
                >
                  <div className="p-1.5 rounded-full bg-black/20">
                    {step.icon}
                  </div>
                  <div>
                    <div
                      className={cn(
                        "font-semibold",
                        mode === "with" ? "text-green-200" : "text-red-300"
                      )}
                    >
                      {step.title}
                    </div>
                    {step.description && (
                      <div
                        className={cn(
                          "text-xs",
                          mode === "with"
                            ? "text-green-100/80"
                            : "text-red-200/80"
                        )}
                      >
                        {step.description}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

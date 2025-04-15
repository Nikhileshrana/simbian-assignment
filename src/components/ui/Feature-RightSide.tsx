"use client";
import React from "react";
import { motion } from "motion/react";
import { AlertTriangle, XCircle, Shield } from "lucide-react";
import {
  CheckCircle,
  Brain,
  ShieldCheck,
  Clock,
  ChevronRight,
} from "lucide-react";

export default function RightSide() {
  return (
    <div className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none border border-border bg-background text-foreground">
      <div className="w-full h-full bg-background text-foreground">
        <div className="absolute inset-0 p-6 flex flex-col">
          {/* Animated Header with Line */}
          <motion.div
            className="flex flex-col md:flex-row justify-end items-end mb-6 gap-2 md:gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-green-500 dark:text-green-600 flex items-center">
              With Simbian
              <motion.span
                className="ml-2"
                animate={{ x: [0, 8, 0], rotate: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                ✨
              </motion.span>
            </h2>
          </motion.div>

          {/* Responsive Steps with Animated Arrows */}
          <div className="w-full">
            {/* Desktop: horizontal flow */}
            <div className="hidden md:flex items-center justify-between relative mb-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Accurate Detection",
                  desc: "Zero false positives",
                },
                {
                  icon: Brain,
                  title: "Comprehensive Analysis",
                  desc: "AI recognized patterns",
                },
                {
                  icon: Shield,
                  title: "Automated Response",
                  desc: "Incidents automatically contained",
                },
                {
                  icon: Clock,
                  title: "24/7 Coverage",
                  desc: "No analyst fatigue",
                },
                {
                  icon: ShieldCheck,
                  title: "Triaged & Reported",
                  desc: "SOC Agent handled",
                },
              ].map((step, idx, arr) => (
                <div
                  key={idx}
                  className="flex flex-col items-center w-1/5 relative"
                >
                  <motion.div
                    className="bg-green-900 p-3 rounded-full mb-2 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                  >
                    <step.icon className="text-green-500 h-6 w-6" />
                  </motion.div>
                  <h3 className="text-xs text-center font-semibold">{step.title}</h3>
                  <p className="text-xs text-center text-gray-400">{step.desc}</p>
                  {/* Animated Arrow */}
                  {idx < arr.length - 1 && (
                    <motion.div
                      className="absolute right-[-18%] top-1/2 -translate-y-1/2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                    >
                      <motion.svg
                        width="32"
                        height="24"
                        viewBox="0 0 32 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ x: [0, 6, 0] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <ChevronRight />
                      </motion.svg>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            {/* Mobile/Tablet: 2-column grid */}
            <div className="md:hidden grid grid-cols-1 xs:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Accurate Detection",
                  desc: "Zero false positives",
                },
                {
                  icon: Brain,
                  title: "Comprehensive Analysis",
                  desc: "AI recognized patterns",
                },
                {
                  icon: Shield,
                  title: "Automated Response",
                  desc: "Incidents automatically contained",
                },
                {
                  icon: Clock,
                  title: "24/7 Coverage",
                  desc: "No analyst fatigue",
                },
                {
                  icon: ShieldCheck,
                  title: "Triaged & Reported",
                  desc: "SOC Agent handled",
                },
              ].map((step, idx, arr) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg border border-green-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.12 }}
                >
                  <motion.div
                    className="bg-green-900 p-2 rounded-full flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="text-green-500 h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-semibold flex items-center">
                      {step.title}
                      {idx < arr.length - 1 && (
                        <motion.span
                          className="ml-1 inline-block text-green-500"
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <ChevronRight />
                        </motion.span>
                      )}
                    </h3>
                    <p className="text-xs text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Ignored Alerts Card */}
            <motion.div
              className="bg-muted p-4 rounded-lg border border-green-500 dark:border-green-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Ignored Alerts</h3>
                <AlertTriangle className="text-green-500 dark:text-green-600" />
              </div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p className="text-3xl font-bold text-green-500 dark:text-green-600">
                  0
                </p>
                <CheckCircle className="ml-2 text-green-500 dark:text-green-600" />
              </motion.div>
            </motion.div>

            {/* Wrongly Closed Alerts Card */}
            <motion.div
              className="bg-muted p-4 rounded-lg border border-green-500 dark:border-green-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Wrongly Closed</h3>
                <XCircle className="text-green-500 dark:text-green-600" />
              </div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <p className="text-3xl font-bold text-green-500 dark:text-green-600">
                  0
                </p>
                <CheckCircle className="ml-2 text-green-500 dark:text-green-600" />
              </motion.div>
            </motion.div>

            {/* Active Threats Card */}
            <motion.div
              className="bg-muted p-4 rounded-lg border border-green-500 dark:border-green-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Active Threats</h3>
                <Shield className="text-green-500 dark:text-green-600" />
              </div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <p className="text-3xl font-bold text-green-500 dark:text-green-600">
                  0
                </p>
                <CheckCircle className="ml-2 text-green-500 dark:text-green-600" />
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-auto text-xs sm:text-sm text-muted-foreground">
            <p>• 90% of alerts resolved automatically, 24/7</p>
            <p>• Correlates alerts to your environment</p>
            <p>• Investigate every alert—no SOAR needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
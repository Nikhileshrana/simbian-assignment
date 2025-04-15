"use client";
import { useState, useEffect } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  AlertTriangle,
  XCircle,
  Shield as ShieldIcon,
} from "lucide-react";

export default function LeftSide({ inset }: any) {
  const alertTypes = [
    "Phishing Email Detected",
    "Suspicious Login Attempt",
    "Malware Activity",
    "Unusual Network Traffic",
    "Unauthorized Access",
    "Data Exfiltration Attempt",
    "Ransomware Signature",
    "Brute Force Attack",
    "SQL Injection Attempt",
    "DDoS Attack Detected",
  ];

  const [ignoredAlerts, setIgnoredAlerts] = useState(200);
  const [wronglyClosed, setWronglyClosed] = useState(35);
  const [activeThreats, setActiveThreats] = useState(5);
  const [alerts, setAlerts] = useState<
    { id: number; type: string; timestamp: Date }[]
  >([]);

  // Simulate new alerts coming in
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new alert
      const newAlert = {
        id: Date.now(),
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        timestamp: new Date(),
      };

      setAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);

      // Increase counters randomly
      if (Math.random() > 0.5) {
        setIgnoredAlerts((prev) => prev + 1);
      } else if (Math.random() > 0.5) {
        setWronglyClosed((prev) => prev + 1);
      } else {
        setActiveThreats((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none border border-border bg-background text-foreground"
      style={{
        clipPath: "inset(0 " + (100 - inset) + "% 0 0)",
      }}
    >
      <div className="w-full h-full bg-background text-foreground">
        <div className="absolute inset-0 p-6 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-500 dark:text-red-600">
            Without Simbian
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Ignored Alerts Card */}
            <motion.div
              className="bg-muted p-4 rounded-lg border border-red-500 dark:border-red-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Ignored Alerts</h3>
                <AlertTriangle className="text-red-500 dark:text-red-600" />
              </div>
              <motion.p
                className="text-3xl font-bold text-red-500 dark:text-red-600"
                key={ignoredAlerts}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {ignoredAlerts}
              </motion.p>
            </motion.div>

            {/* Wrongly Closed Alerts Card */}
            <motion.div
              className="bg-muted p-4 rounded-lg border border-orange-500 dark:border-orange-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Wrongly Closed</h3>
                <XCircle className="text-orange-500 dark:text-orange-600" />
              </div>
              <motion.p
                className="text-3xl font-bold text-orange-500 dark:text-orange-600"
                key={wronglyClosed}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {wronglyClosed}
              </motion.p>
            </motion.div>

            {/* Active Threats Card */}
            <motion.div
              className="bg-muted p-4 rounded-lg border border-yellow-500 dark:border-yellow-600"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Active Threats</h3>
                <Shield className="text-yellow-500 dark:text-yellow-600" />
              </div>
              <motion.p
                className="text-3xl font-bold text-yellow-500 dark:text-yellow-600"
                key={activeThreats}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {activeThreats}
              </motion.p>
            </motion.div>
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="text-lg font-semibold mb-2">Live Alerts</h3>
            <div className="bg-muted rounded-lg p-2 h-[calc(100%-2rem)] overflow-y-auto">
              <AnimatePresence>
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    className="bg-muted-foreground/10 p-3 rounded mb-2 border-l-4 border-red-500 dark:border-red-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-4 text-xs sm:text-sm text-muted-foreground">
            <p>• Wasting valuable analyst time on false positives</p>
            <p>• Processing one alert at a time, missing the big picture</p>
            <p>• More time fixing SOAR automation, less time on real threats</p>
          </div>
        </div>
      </div>
    </div>
  );
}

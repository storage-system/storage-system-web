"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

const RootStyle = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="fixed bottom-0 right-0 z-[9999] flex h-full w-full items-center justify-center bg-accent opacity-80">
        {children}
      </div>
    </>
  );
};

export default function Loading() {
  return (
    <RootStyle>
      <motion.div
        animate={{
          scale: [1, 0.9, 0.9, 1, 1],
          opacity: [1, 0.48, 0.48, 1, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <Package className="h-10 w-10" />
      </motion.div>
      <motion.div
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        className="absolute h-[100px] w-[100px] rounded-[25%] border-[3px] border-primary dark:border-secondary"
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        className="absolute h-[120px] w-[120px] rounded-[25%] border-8 border-primary dark:border-secondary"
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
      />
    </RootStyle>
  );
}

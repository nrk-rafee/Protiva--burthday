"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import Button from "../Button"

export default function IntroScreen({ onNext }) {
    return (
        <motion.div
            className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-end justify-center shadow-inner">
                <div className="text-7xl mb-5">
                    🎁
                </div>
            </div>

            <div className="text-center">
                <h1
                    className="text-2xl md:text-3xl font-semibold text-primary drop-shadow leading-tight"
                    style={{
                        filter: "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                    }}
                >
                    Something special
                    <br />
                    is waiting...
                </h1>

                <p className="mt-4 text-foreground">
                    Tap the button to open it ✨
                </p>
            </div>

            <div className="mt-4">
                <Button
                    onClick={() => onNext?.()}
                    className="bg-[#f43f8c] text-white"
                >
                    <Gift size={20} />
                    Open It!
                </Button>
            </div>
        </motion.div>
    )
}

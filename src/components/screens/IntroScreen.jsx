"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, MoveRight } from "lucide-react"
import Button from "../Button"

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)

    return (
        <AnimatePresence mode="wait">

            {/* STEP 1 — Something special is waiting */}
            {step === 0 && (
                <motion.div
                    key="special"
                    className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-center justify-center shadow-inner">
                        <motion.div
                            className="text-7xl"
                            animate={{
                                y: [0, -8, 0],
                                rotate: [0, -3, 3, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            🎁
                        </motion.div>
                    </div>

                    <div className="text-center">
                        <h1
                            className="text-2xl md:text-3xl font-semibold text-primary drop-shadow leading-tight"
                            style={{
                                filter:
                                    "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
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
                            onClick={() => setStep(1)}
                            className="bg-[#f43f8c] text-white"
                        >
                            <Gift size={20} />
                            Open It!
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* STEP 2 — Happy Birthday */}
            {step === 1 && (
                <motion.div
                    key="birthday"
                    className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Birthday image */}
                    <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-center justify-center shadow-inner">
                        <div className="text-7xl">
                            🎂
                        </div>
                    </div>

                    <div className="text-center">
                        <motion.h1
                            className="text-4xl md:text-5xl font-semibold text-[#ef3d78] leading-tight"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            Happy Birthday,
                        </motion.h1>

                        <motion.div
                            className="text-3xl md:text-4xl text-[#334155] mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                        >
                            Cutie ❤️
                        </motion.div>

                        <p className="mt-5 text-foreground text-base md:text-lg">
                            You fill my life with pure happiness and sweetness
                            <br />
                            everyday 🌸
                        </p>
                    </div>

                    <div className="mt-5">
                        <Button
                            onClick={() => setStep(2)}
                            className="bg-white text-[#ef3d78] shadow-lg border border-pink-100"
                        >
                            Let's explore
                            <MoveRight size={19} />
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* STEP 3 — A Cutiepie was born today */}
            {step === 2 && (
                <motion.div
                    key="born"
                    className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-end justify-center shadow-inner">
                        <img
                            loading="lazy"
                            src="/gifs/intro.gif"
                            alt="Cute"
                            className="w-26 md:w-32"
                        />
                    </div>

                    <div className="text-center">
                        <h1
                            className="text-2xl md:text-3xl font-semibold text-primary drop-shadow leading-tight"
                            style={{
                                filter:
                                    "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                            }}
                        >
                            A Cutiepie was born today, 16 years ago!
                        </h1>

                        <p className="mt-4 text-foreground">
                            Yes, it’s YOU! A little surprise awaits...
                        </p>
                    </div>

                    <div className="mt-4">
                        <Button
                            onClick={() => onNext?.()}
                            className="bg-[#f1caeb] text-primary"
                        >
                            <Gift size={20} />
                            Start the surprise
                        </Button>
                    </div>
                </motion.div>
            )}

        </AnimatePresence>
    )
}

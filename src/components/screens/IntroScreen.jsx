"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Heart } from "lucide-react"
import Button from "../Button"

// Different colored love balloons
const balloons = [
    {
        color: "#ff4d88",
        left: "3%",
        delay: 0,
        duration: 5.5,
        size: 48,
        rotate: -5,
    },
    {
        color: "#ff6b6b",
        left: "14%",
        delay: 1.2,
        duration: 6.2,
        size: 42,
        rotate: 4,
    },
    {
        color: "#ffd166",
        left: "27%",
        delay: 0.6,
        duration: 5.8,
        size: 45,
        rotate: -3,
    },
    {
        color: "#c084fc",
        left: "40%",
        delay: 1.8,
        duration: 6.5,
        size: 40,
        rotate: 5,
    },
    {
        color: "#ff4d6d",
        left: "53%",
        delay: 0.3,
        duration: 5.7,
        size: 50,
        rotate: -4,
    },
    {
        color: "#67e8f9",
        left: "66%",
        delay: 1.5,
        duration: 6.1,
        size: 43,
        rotate: 3,
    },
    {
        color: "#f9a8d4",
        left: "78%",
        delay: 0.9,
        duration: 5.9,
        size: 47,
        rotate: -4,
    },
    {
        color: "#a78bfa",
        left: "90%",
        delay: 2,
        duration: 6.4,
        size: 40,
        rotate: 4,
    },
]

function LoveBalloons() {
    return (
        <div className="fixed inset-x-0 bottom-0 h-[230px] md:h-[280px] pointer-events-none z-30 overflow-hidden">
            {balloons.map((balloon, index) => (
                <motion.div
                    key={index}
                    className="absolute bottom-[-20px] flex flex-col items-center"
                    style={{
                        left: balloon.left,
                    }}
                    initial={{
                        y: 120,
                        opacity: 0,
                        rotate: balloon.rotate,
                    }}
                    animate={{
                        y: [120, 10, -5, 12, 0],
                        opacity: [0, 1, 1, 1, 1],
                        rotate: [
                            balloon.rotate,
                            balloon.rotate + 6,
                            balloon.rotate - 6,
                            balloon.rotate + 4,
                            balloon.rotate,
                        ],
                        x: [0, 4, -5, 4, 0],
                    }}
                    transition={{
                        duration: balloon.duration,
                        delay: balloon.delay,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                >
                    {/* Heart balloon */}
                    <motion.div
                        animate={{
                            scale: [1, 1.04, 1, 1.03, 1],
                        }}
                        transition={{
                            duration: balloon.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <svg
                            width={balloon.size}
                            height={balloon.size}
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                filter:
                                    "drop-shadow(0 4px 7px rgba(0,0,0,0.16))",
                            }}
                        >
                            <path
                                d="M50 86C46 81 12 58 12 32C12 18 22 10 34 10C42 10 48 14 50 21C52 14 58 10 66 10C78 10 88 18 88 32C88 58 54 81 50 86Z"
                                fill={balloon.color}
                            />

                            {/* Balloon shine */}
                            <ellipse
                                cx="32"
                                cy="28"
                                rx="7"
                                ry="12"
                                fill="white"
                                opacity="0.45"
                                transform="rotate(-25 32 28)"
                            />

                            {/* Small highlight */}
                            <circle
                                cx="42"
                                cy="20"
                                r="3"
                                fill="white"
                                opacity="0.65"
                            />

                            {/* Balloon knot */}
                            <path
                                d="M46 82L50 89L54 82"
                                fill={balloon.color}
                            />
                        </svg>
                    </motion.div>

                    {/* Balloon string */}
                    <motion.div
                        animate={{
                            rotate: [-2, 2, -2],
                        }}
                        transition={{
                            duration: balloon.duration * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="origin-top"
                    >
                        <div
                            className="w-[1.5px] h-24 md:h-28"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(80,80,80,.35), rgba(80,80,80,.08))",
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}

export default function IntroScreen({ onNext }) {
    const [step, setStep] = useState(0)

    return (
        <AnimatePresence mode="wait">
            {/* ------------------------------------------------
                STEP 0
                Something special is waiting...
            ------------------------------------------------ */}
            {step === 0 && (
                <motion.div
                    key="step0"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        transition: { duration: 0.5 },
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
                >
                    {/* Top gift area */}
                    <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-center justify-center shadow-inner overflow-hidden">

                        {/* Soft glowing circles */}
                        <motion.div
                            className="absolute w-32 h-32 rounded-full bg-pink-300/20 blur-2xl"
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.4, 0.7, 0.4],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Gift */}
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                                rotate: [-2, 2, -2],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative z-10 text-7xl md:text-8xl"
                        >
                            🎁
                        </motion.div>
                    </div>

                    {/* Text */}
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

                    {/* Button */}
                    <div className="mt-4">
                        <Button
                            onClick={() => setStep(1)}
                            className="bg-[#f1caeb] text-primary"
                        >
                            <Gift size={20} />
                            Open It!
                        </Button>
                    </div>

                    {/* LOVE BALLOONS */}
                    <LoveBalloons />
                </motion.div>
            )}

            {/* ------------------------------------------------
                STEP 1
                Happy Birthday, Cutie
            ------------------------------------------------ */}
            {step === 1 && (
                <motion.div
                    key="step1"
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        y: -20,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
                >
                    {/* Birthday image area */}
                    <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-center justify-center shadow-inner overflow-hidden">

                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                                rotate: [-2, 2, -2],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="text-7xl md:text-8xl"
                        >
                            🎂
                        </motion.div>

                        {/* Small hearts */}
                        <motion.div
                            className="absolute top-6 left-10 text-2xl"
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            💕
                        </motion.div>

                        <motion.div
                            className="absolute bottom-8 right-10 text-2xl"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2.4,
                                repeat: Infinity,
                            }}
                        >
                            💖
                        </motion.div>
                    </div>

                    {/* Heading */}
                    <div className="text-center">
                        <h1
                            className="text-3xl md:text-4xl font-bold text-primary leading-tight"
                            style={{
                                filter:
                                    "drop-shadow(0 0 20px rgba(255,105,180,0.35))",
                            }}
                        >
                            Happy Birthday,
                            <br />
                            Cutie ❤️
                        </h1>

                        <p className="mt-4 text-foreground">
                            Today is all about you ✨
                        </p>
                    </div>

                    {/* Button */}
                    <div className="mt-4">
                        <Button
                            onClick={() => setStep(2)}
                            className="bg-[#f1caeb] text-primary"
                        >
                            <Heart size={20} />
                            Let's explore
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* ------------------------------------------------
                STEP 2
                Cutiepie was born...
            ------------------------------------------------ */}
            {step === 2 && (
                <motion.div
                    key="step2"
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4"
                >
                    {/* GIF area */}
                    <div className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-end justify-center shadow-inner overflow-hidden">
                        <img
                            loading="lazy"
                            src="/gifs/intro.gif"
                            alt="Cute"
                            className="w-26 md:w-32"
                        />
                    </div>

                    {/* Text */}
                    <div className="text-center">
                        <h1
                            className="text-2xl md:text-3xl font-semibold text-primary drop-shadow leading-tight"
                            style={{
                                filter:
                                    "drop-shadow(0 0 20px rgba(255,105,180,0.4))",
                            }}
                        >
                            A Cutiepie was born today,
                            <br />
                            16 years ago!
                        </h1>

                        <p className="mt-4 text-foreground">
                            Yes, it’s YOU! A little surprise awaits...
                        </p>
                    </div>

                    {/* Start surprise */}
                    <div className="mt-4">
                        <Button
                            onClick={() => {
                                onNext?.()
                            }}
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
